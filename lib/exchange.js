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
 * Returns a sign transaction
 *
 * @method getDepositArgs
 * @param {Object} token
 * @param {String} amount
 * @param {String} privateKey
 * @return {Object}
 */
Exchange.prototype.getDepositArgs = function (token, amount, privateKey) {
    return this.bitllejs.signer.getTransferSign(token, exchCtr.address, amount, 0, privateKey);
};

/**
 * Getting sign for new order
 *
 * @method getPlaceOrderArgs
 * @param {String} sell
 * @param {String} buy
 * @param {String} price
 * @param {String} amount
 * @param {String} privateKey
 * @return {Object}
 */
Exchange.prototype.getPlaceOrderArgs = function (sell, buy, price, amount, privateKey) {
    var cell = exchCtr.getFreeCell(sell, buy).toString();
    var sigAdr = '0x' + ethUtil.privateToAddress(new Buffer(privateKey.slice(2), 'hex')).toString('hex');
    var nonce = exchCtr.nonces(sigAdr).toString();
    return this.bitllejs.signer.getOrderSign(sell, buy, price, amount, cell, 0, nonce, privateKey);
};

/**
 * Returns sign transactions and placing an application
 *
 * @method getDepositAndOrderArgs
 * @param {String} sell
 * @param {String} buy
 * @param {String} price
 * @param {String} amount
 * @param {String} privateKey
 * @return {Array}
 */
Exchange.prototype.getDepositAndOrderArgs = function (sell, buy, price, amount, privateKey) {
    var depositArgs = this.getDepositArgs(sell, amount, privateKey);
    var placeOrderArgs = this.getPlaceOrderArgs(sell, buy, price, amount, privateKey);

    return [depositArgs, placeOrderArgs];
};

Exchange.prototype.getDealOrderArgs = function (sell, buy, amount, cell, privateKey, nonceIncr) {
    var sigAdr = '0x' + ethUtil.privateToAddress(new Buffer(privateKey.slice(2), 'hex')).toString('hex');
    var nonce = (Number(exchCtr.nonces(sigAdr)) + Number(nonceIncr)).toString();
    return this.bitllejs.signer.getDealSign(sell, buy, amount, cell, 0, nonce, privateKey);
};

Exchange.prototype.getOrderBook = function (sell, payIn) {
    var prices = exchCtr.getOderBookPrices(sell, payIn);
    var amounts = exchCtr.getOderBookAmounts(sell, payIn);

    var orderBook = [];
    for (var i = 0; i < prices.length; i++) {
        if (amounts[i] > 0) {
            orderBook.push({price: (prices[i] / this.multiplicator).toString(), amount: amounts[i].toString(), idx: i});
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

            cells.push({amToChange: amount, idx: orderBook[j].idx});
            amount = 0;

            break;
        }
        else {
            var amAvalible = orderBook[j].amount * orderBook[j].price;

            amAvalible = Math.ceil(amAvalible);
            amountGet += parseInt(orderBook[j].amount);
            cells.push({amToChange: amAvalible, idx: orderBook[j].idx});
            amount -= amAvalible;
        }
    }
    return {amountGet: amountGet, amountRest: amount, cells: cells};
}

Exchange.prototype.getDealParam = function (sell, buy, amount) {
    var orderBook = this.getOrderBook(sell, buy);
    return this.getOrdersForDeal(orderBook, amount);
};

Exchange.prototype.getDepositAndDealArgs = function (sell, buy, amount, privateKey) {
    var txs = [];

    txs.push(this.getDepositArgs(sell, amount, privateKey));

    var ob = this.getDealParam(buy, sell, amount);

    for (var i = 0; i < ob.cells.length; i++) {
        txs.push(this.getDealOrderArgs(sell, buy, ob.cells[i].amToChange, ob.cells[i].idx, privateKey, i));
    }

    return txs;
};

module.exports = Exchange;