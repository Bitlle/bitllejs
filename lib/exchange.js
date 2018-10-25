/**
 * @file exchange.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Alexey Saliuk <alexey.saliuk@bitlle.network>
 * @site bitlle.network
 * @date 2018
 */

//TODO: Descriptions

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
Exchange.prototype.getDepositArgs = function (token, amount, fee, privateKey) {
    return this.bitllejs.signer.getTransferSig(token, exchCtr.address, amount, fee, privateKey);
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
Exchange.prototype.getPlaceOrderArgs = function (tknToSell, tknToBuy, price, amount, fee, privateKey) {

    var cell = exchCtr.getFreeCell(tknToSell, tknToBuy).toString();
    var nonce = Date.now(); //TODO: +random
    return this.bitllejs.signer.getPlaceOrderSig(tknToSell, tknToBuy, price, amount, cell, fee, nonce, privateKey);
};

Exchange.prototype.getCancelOrderAndCashOutArgs = function (tknToSell, tknToBuy, cell, fee, privateKey) {
    var nonce = Date.now(); //TODO: add random;
    return this.bitllejs.signer.getCancelOrderAndCashOutSig(tknToSell, tknToBuy, cell, nonce, fee, privateKey);
}

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
Exchange.prototype.getDepositAndPlaceOrderArgs = function (tknToSell, tknToBuy, price, amount, fee, privateKey) {
    var cell = exchCtr.getFreeCell(tknToSell, tknToBuy).toString();
    return this.bitllejs.signer.getDepositAndPlaceOrderSig(tknToSell, tknToBuy, price, amount, cell, fee, privateKey);
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

/**
 * Calc and returns data for Trade transaction (amountGet, amountRest, cells[{amToChange,idx}])
 *
 * @method getTradeParam
 * @param {String} payIn
 * @param {String} buy
 * @param {String} amount
 * @return {Object}
 */
Exchange.prototype.getTradeParam = function (payIn, buy, amount) {
    var orderBook = this.getOrderBook(buy, payIn);
    return this.getOrdersForDeal(orderBook, amount);
};

Exchange.prototype.getTradeArgs = function (tknToSell, tknToBuy, amount, cell, fee, privateKey) {
    var nonce = Date.now(); //TODO: +random();
    return this.bitllejs.signer.getTradeSig(tknToSell, tknToBuy, amount, cell, fee, nonce, privateKey);
};

Exchange.prototype.getTradesArgs = function (tknToSell, tknToBuy, amount, fee, privateKey) {
    var nonce = Date.now(); //TODO: +random();
    var orderBook = this.getTradeParam(tknToSell, tknToBuy, amount);
    var cells = [];
    var amounts = [];

    if (orderBook.amountRest > 0) console.log("amount grater of avalible on order book!");
    for (var i = 0; i < orderBook.cells.length; i++) {
        cells.push(orderBook.cells[i].idx);
        amounts.push(orderBook.cells[i].amToChange);
    }

    return this.bitllejs.signer.getTradesSig(tknToSell, tknToBuy, amounts, cells, fee, nonce, privateKey);
};

Exchange.prototype.getTradesDirectArgs = function (tknToSell, tknToBuy, amount, fee, privateKey) {
    var orderBook = this.getTradeParam(tknToSell, tknToBuy, amount);
    var cells = [];
    var amounts = [];
    if (orderBook.amountRest > 0) console.log("amount grater of avalible on order book!");
    for (var i = 0; i < orderBook.cells.length; i++) {
        cells.push(orderBook.cells[i].idx);
        amounts.push(orderBook.cells[i].amToChange);
    }
    var amTotal = amount - orderBook.amountRest;
    return this.bitllejs.signer.getTradesDirectSig(tknToSell, tknToBuy, amTotal, amounts, cells, fee, privateKey);
};

module.exports = Exchange;