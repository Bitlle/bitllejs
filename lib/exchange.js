/**
 * @file exchange.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Alexey Saliuk <alexey.saliuk@bitlle.network>
 * @site bitlle.network
 * @date 2018
 */

const ethUtil = require('ethereumjs-util');

var Exchange = function (bitllejs) {
    this.multiplicator = 100000;
    this.web3 = bitllejs.web3;
    this.bitllejs = bitllejs;
    exchCtr = this.bitllejs.contracts.ctr.exchange;
};

var exchCtr; 

/**
 * Returns a raw transaction of the exchanger ready to be sent
 *
 * @method getDepositRaw
 * @param {Object} token
 * @param {String} amount
 * @param {String} privateKey
 * @return {Object}
 */
Exchange.prototype.getDepositRaw = function (token, amount, privateKey) {
    var trArg = this.bitllejs.signer.getTransferSign(token, exchCtr.address , amount, 0, privateKey);
    return exchCtr.deposit.getData(trArg.token, trArg.to, trArg.amount, trArg.fee, trArg.nonce, trArg.v, trArg.r, trArg.s);
};


/**
 * Placing a new order
 *
 * @method getPlaceOrderRaw
 * @param {String} sell
 * @param {String} buy
 * @param {String} price
 * @param {String} amount
 * @param {String} privateKey
 * @return {Object}
 */
Exchange.prototype.getPlaceOrderRaw = function (sell, buy, price, amount, privateKey) {
    var cell = exchCtr.getFreeCell(sell, buy).toString();
    var sigAdr = '0x' + ethUtil.privateToAddress(new Buffer(privateKey.slice(2), 'hex')).toString('hex');
    var nonce = exchCtr.nonces(sigAdr).toString();
    var args = this.bitllejs.signer.getOrderSign(sell, buy, price, amount, cell, 0, nonce, privateKey);

    return exchCtr.placeOrderFor.getData(args.v, args.rs, args.u256, args.tknSell, args.tknBuy);
};


/**
 * Returns raw transactions and placing an application
 *
 * @method getDepositAndOrderRaws
 * @param {String} sell
 * @param {String} buy
 * @param {String} price
 * @param {String} amount
 * @param {String} privateKey
 * @return {Array}
 */
Exchange.prototype.getDepositAndOrderRaws = function (sell, buy, price, amount, privateKey) {
    var depositRaw = this.getDepositRaw(sell, amount, privateKey);
    var placeOrderRaw = this.getPlaceOrderRaw(sell, buy, price, amount, privateKey);

    return [depositRaw, placeOrderRaw];
};


Exchange.prototype.getDealOrderRaw = function (sell, buy, amount, cell, privateKey, nonceIncr) {
    var sigAdr = '0x' + ethUtil.privateToAddress(new Buffer(privateKey.slice(2), 'hex')).toString('hex');
    var nonce = (Number(exchCtr.nonces(sigAdr)) + Number(nonceIncr)).toString();
    var arg = this.bitllejs.signer.getDealSign(sell, buy, amount, cell, 0, nonce, privateKey);

    return exchCtr.tradeForDirect.getData(arg.v, arg.r, arg.s, arg.nonce, arg.fee, arg.tknSell, arg.tknBuy, arg.cell, arg.amount);
};

Exchange.prototype.getOrderBook = function (sell, payIn) {
    var prices = exchCtr.getOderBookPrices(sell, payIn);
    var amounts = exchCtr.getOderBookAmounts(sell, payIn);

    var orderBook = [];
    for (var i = 0; i < prices.length; i++) {
        if (amounts[i] > 0) {
            orderBook.push({ price: (prices[i] / this.multiplicator).toString(), amount: amounts[i].toString(), idx: i });
        }
    }

    orderBook.sort(function (a, b) {
        return Number(a.price) - Number(b.price);
    });

    return orderBook;
}

Exchange.prototype.getOrderInfo = function (sell, payIn) {
    var order = exchCtr.orderBook(sell, payIn);
   
   
    return orderBook;
}

Exchange.prototype.getOrdersForDeal = function (orderBook, amount) {
    var cells = [];
    var amountGet = 0;
    for (var j = 0; j < orderBook.length; j++) {
        var amAtPrice = Math.floor(amount / orderBook[j].price);

        if ((orderBook[j].amount - amAtPrice) >= 0) {
            amountGet += amAtPrice;

            amount = Math.ceil(amount);

            cells.push({ amToChange: amount, idx: orderBook[j].idx });
            amount = 0;

            break;
        }
        else {
            var amAvalible = orderBook[j].amount * orderBook[j].price;

            amAvalible = Math.ceil(amAvalible);
            amountGet += parseInt(orderBook[j].amount);
            cells.push({ amToChange: amAvalible, idx: orderBook[j].idx });
            amount -= amAvalible;
        }
    }
    return { amountGet: amountGet, amountRest: amount, cells: cells };
}

Exchange.prototype.getDealParam = function (sell, buy, amount) {
    var orderBook = this.getOrderBook(sell, buy);
    return this.getOrdersForDeal(orderBook, amount);
};

Exchange.prototype.getDepositAndDealRaws = function (sell, buy, amount, privateKey) {
    var txs = [];

    txs.push(this.getDepositRaw(sell, amount, privateKey));

    var ob = this.getDealParam(buy, sell, amount);

    for (var i = 0; i < ob.cells.length; i++) {
        txs.push(this.getDealOrderRaw(sell, buy, ob.cells[i].amToChange, ob.cells[i].idx, privateKey, i));
    }

    return txs;
};

module.exports = Exchange;