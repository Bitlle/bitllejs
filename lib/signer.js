/**
 * @file signer.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Alexey Saliuk <alexey.saliuk@bitlle.network>
 * @site bitlle.network
 * @date 2018
 */
var leftPad = require('left-pad');
var ethUtil = require('ethereumjs-util');

var Signer = function (bitllejs) {
    this.multiplicator = 100000;
    this.web3 = bitllejs.web3;

    this._NumTo32byteLength = function (value) {
        return leftPad(this.web3.toHex(value).slice(2), 64, 0);
    };

    this._sign = function (privateKey, dataToSig) {
        var pkInBuffer = new Buffer(privateKey.slice(2), 'hex'); //Привожу ПК к правильномиу формату
        var ethMsg = ethUtil.hashPersonalMessage(new Buffer(dataToSig.slice(2), 'hex')); //Формирую хэш сообщения с префиксом x19Ethereu...
        return ethUtil.ecsign(ethMsg, pkInBuffer);
    };
};


Signer.prototype.getTransferSign = function (token, to, amount, fee, privateKey) {
    var nonce = Date.now(); //TODO add random

    token = this.web3.toChecksumAddress(token);
    to = this.web3.toChecksumAddress(to);

    if (!this.web3.isAddress(token)) {
        throw "ERROR in getTransferSign() -> token address:" + token + " incorrect!";
    }
    if (!this.web3.isAddress(to)) {
        throw "ERROR in getTransferSign() -> to address:" + to + " incorrect!";
    }

    var correctParam = token + to.slice(2) + this._NumTo32byteLength(amount) + this._NumTo32byteLength(fee) + this._NumTo32byteLength(nonce);
    var dataToSig = this.web3.sha3(correctParam, {encoding: 'hex'});
    var sign = this._sign(privateKey, dataToSig);
console.log('token',token);
console.log('to',to);
console.log('amount',amount);
console.log('fee',fee);
console.log('privateKey',privateKey);
    return {
        token: token,
        to: to,
        amount: amount,
        fee: fee,
        nonce: nonce,
        v: sign.v,
        r: "0x" + sign.r.toString('hex'),
        s: "0x" + sign.s.toString('hex')
    };
};

Signer.prototype.getOrderSign = function (sell, buy, price, amount, cell, fee, nonce, privateKey) {
    sell = this.web3.toChecksumAddress(sell);
    buy = this.web3.toChecksumAddress(buy);
    price = price * this.multiplicator;

    if (!this.web3.isAddress(buy)) {
        throw "ERROR in getOrderSign() _tknBuy address:" + buy + " incorrect!";
    }
    if (!this.web3.isAddress(sell)) {
        throw "ERROR in getOrderSign() _tknSell address:" + sell + " incorrect!";
    }

    var correctParam = sell + buy.slice(2) + this._NumTo32byteLength(price) + this._NumTo32byteLength(amount) + this._NumTo32byteLength(cell) + this._NumTo32byteLength(fee) + this._NumTo32byteLength(nonce);
    var dataToSig = this.web3.sha3(correctParam, {encoding: 'hex'});
    var sign = this._sign(privateKey, dataToSig);

    return {
        v: sign.v.toString(),
        rs: ["0x" + sign.r.toString('hex'), "0x" + sign.s.toString('hex')],
        u256: [nonce.toString(), price.toString(), amount.toString(), cell.toString(), fee.toString()],
        tknSell: sell,
        tknBuy: buy
    };
};

Signer.prototype.getDealSign = function (sell, buy, amount, cell, fee, nonce, privateKey) {
    sell = this.web3.toChecksumAddress(sell);
    buy = this.web3.toChecksumAddress(buy);

    if (!this.web3.isAddress(buy)) {
        throw "ERROR in getDealSign() buy address:" + buy + " incorrect!";
    }
    if (!this.web3.isAddress(sell)) {
        throw "ERROR in getDealSign() sell address:" + sell + " incorrect!";
    }

    var correctParam = sell + buy.slice(2) + this._NumTo32byteLength(amount) + this._NumTo32byteLength(cell) + this._NumTo32byteLength(nonce) + this._NumTo32byteLength(fee);
    var dataToSig = this.web3.sha3(correctParam, {encoding: 'hex'});
    var sign = this._sign(privateKey, dataToSig);

    return {
        v: sign.v,
        r: "0x" + sign.r.toString('hex'),
        s: "0x" + sign.s.toString('hex'),
        nonce: nonce,
        fee: fee,
        tknSell: sell,
        tknBuy: buy,
        cell: cell,
        amount: amount
    };
};

module.exports = Signer;