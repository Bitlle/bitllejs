/**
 * @file exchange.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Ale Xau <ale@xau.io>
 * @site bitlle.network
 * @date 2018
 */

const ethUtil = require('ethereumjs-util');

var Exchange = function (bitllejs) {
    this.multiplicator = 100000;
    this.web3 = bitllejs.web3;
    this.bitllejs = bitllejs;
};


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
    var tx = this.bitllejs.signer.getTransferSign(token, this.bitllejs.exchangeContract.address, amount, 0, privateKey);

    return this.bitllejs.exchangeContract.deposit.getData(tx.token, tx.to, tx.amount, tx.fee, tx.nonce, tx.v, tx.r, tx.s);
};


/**
 * Placing a new order
 *
 * @method placeOrder
 * @param {String} sell
 * @param {String} buy
 * @param {String} price
 * @param {String} amount
 * @param {String} privateKey
 * @return {Object}
 */
Exchange.prototype.placeOrder = function (sell, buy, price, amount, privateKey) {
    var cell = this.bitllejs.exchangeContract.getFreeCell(sell, buy).toString();
    var sigAdr = '0x' + ethUtil.privateToAddress(new Buffer(privateKey.slice(2), 'hex')).toString('hex');
    var nonce = this.bitllejs.exchangeContract.nonces(sigAdr).toString();
    var tx = this.bitllejs.signer.getOrderSign(sell, buy, price, amount, cell, 0, nonce, privateKey);

    return this.bitllejs.exchangeContract.placeOrderFor.getData(tx.v, tx.rs, tx.u256, tx.tknSell, tx.tknBuy);
};


/**
 * Returns raw transactions and placing an application
 *
 * @method placeOrder
 * @param {String} sell
 * @param {String} buy
 * @param {String} price
 * @param {String} amount
 * @param {String} privateKey
 * @return {Array}
 */
Exchange.prototype.DepositAndOrder = function (sell, buy, price, amount, privateKey) {
    var depositRaw = this.getDepositRaw(sell, amount, privateKey);
    var tx = this.placeOrder(sell, buy, price, amount, privateKey);

    return [depositRaw, tx];
};


Exchange.prototype.DealOrderTx = function (sell, buy, amount, cell, privateKey, nonceIncr) {
    var sigAdr = '0x' + ethUtil.privateToAddress(new Buffer(privateKey.slice(2), 'hex')).toString('hex');
    var nonce = (Number(this.bitllejs.exchangeContract.nonces(sigAdr)) + Number(nonceIncr)).toString();
    var tx = this.bitllejs.signer.getDealSign(sell, buy, amount, cell, 0, nonce, privateKey);

    return this.bitllejs.exchangeContract.tradeForDirect.getData(tx.v, tx.r, tx.s, tx.nonce, tx.fee, tx.tknSell, tx.tknBuy, tx.cell, tx.amount);
};


Exchange.prototype.getDeal = function (sell, buy, amount) {
    var prices = this.bitllejs.exchangeContract.getOderBookPrices(sell, buy);
    var amounts = this.bitllejs.exchangeContract.getOderBookAmounts(sell, buy);

    var orderBook = [];
    for (var i = 0; i < prices.length; i++) {
        if (amounts[i] > 0) {
            orderBook.push({price: (prices[i] / this.multiplicator).toString(), amount: amounts[i].toString(), idx: i});
        }
    }

    orderBook.sort(function (a, b) {
        return Number(a.price) - Number(b.price);
    });

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
};


Exchange.prototype.DepositAndDealTxs = function (sell, buy, amount, privateKey) {
    var txs = [];

    txs.push(this.getDepositRaw(sell, amount, privateKey));

    var ob = this.getDeal(buy, sell, amount);

    for (var i = 0; i < ob.cells.length; i++) {
        txs.push(this.DealOrderTx(sell, buy, ob.cells[i].amToChange, ob.cells[i].idx, privateKey, i));
    }

    return txs;
};

module.exports = Exchange;