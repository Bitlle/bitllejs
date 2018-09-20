/**
 * @file signer.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Ale Xau <ale@xau.io>
 * @site bitlle.network
 * @date 2018
 */

var leftPad = require('left-pad');
var ethUtil = require('ethereumjs-util');

var Signer = function (bitllejs) {
    this.web3 = bitllejs.web3;

    this._to32byteLength = function (val) {
        return leftPad(Number(val).toString(16), 64, 0);
    };

    this._getDataToSig = function (token, to, amount, fee, nonce) {
        token = bitllejs.web3.toChecksumAddress(token);
        to = bitllejs.web3.toChecksumAddress(to);

        if (!bitllejs.web3.isAddress(token)) {
            throw "ERROR in GetDataToSig(token, to, amount, fee, nonce) -> token address:" + token + " incorrect!";
        }
        if (!bitllejs.web3.isAddress(to)) {
            throw "ERROR in GetDataToSig(token, to, amount, fee, nonce) -> to address:" + to + " incorrect!";
        }

        var correctParam = token + to.slice(2) + this._to32byteLength(amount) + this._to32byteLength(fee) + this._to32byteLength(nonce);

        return bitllejs.web3.sha3(correctParam, {encoding: 'hex'});
    };

    this._sign = function (privateKey, dataToSig) {
        var pkInBuffer = new Buffer(privateKey.slice(2), 'hex'); //Привожу ПК к правильномиу формату
        var ethMsg = ethUtil.hashPersonalMessage(new Buffer(dataToSig.slice(2), 'hex')); //Формирую хэш сообщения с префиксом x19Ethereu...
        return ethUtil.ecsign(ethMsg, pkInBuffer);
    };
};


Signer.prototype.transferSign = function (token, to, amount, fee, privateKey) {
    var nonce = Date.now();
    var dataToSig = this._getDataToSig(token, to, amount, fee, nonce);
    var sign = this._sign(privateKey, dataToSig);

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

Signer.prototype.orderSign = function (tknSell, tknBuy, price, amount, cell, fee, nonce, privateKey) {
    tknSell = this.web3.toChecksumAddress(tknSell);
    tknBuy = this.web3.toChecksumAddress(tknBuy);
    price = price * 100000;

    if (!this.web3.isAddress(tknBuy)) {
        throw "ERROR in GenerateOrderTX() _tknBuy address:" + tknBuy + " incorrect!";
    }
    if (!this.web3.isAddress(tknSell)) {
        throw "ERROR in GenerateOrderTX() _tknSell address:" + tknSell + " incorrect!";
    }

    var correctParam = tknSell + tknBuy.slice(2) + this._to32byteLength(price) + this._to32byteLength(amount) + this._to32byteLength(cell) + this._to32byteLength(fee) + this._to32byteLength(nonce);
    var dataToSig = this.web3.sha3(correctParam, {encoding: 'hex'});
    var sign = this._sign(privateKey, dataToSig);

    return {
        v: sign.v.toString(),
        rs: ["0x" + sign.r.toString('hex'), "0x" + sign.s.toString('hex')],
        u256: [nonce.toString(), price.toString(), amount.toString(), cell.toString(), fee.toString()],
        tknSell: tknSell,
        tknBuy: tknBuy
    };
};

Signer.prototype.dealSign = function (tknSell, tknBuy, amount, cell, fee, nonce, privateKey) {
    tknSell = this.web3.toChecksumAddress(tknSell);
    tknBuy = this.web3.toChecksumAddress(tknBuy);

    if (!this.web3.isAddress(tknBuy)) {
        throw "ERROR in GenerateDealTX() _tknBuy address:" + tknBuy + " incorrect!";
    }
    if (!this.web3.isAddress(tknSell)) {
        throw "ERROR in GenerateDealTX() _tknSell address:" + tknSell + " incorrect!";
    }

    var correctParam = tknSell + tknBuy.slice(2) + this._to32byteLength(amount) + this._to32byteLength(cell) + this._to32byteLength(nonce) + this._to32byteLength(fee);
    var dataToSig = this.web3.sha3(correctParam, {encoding: 'hex'});
    var sign = this._sign(privateKey, dataToSig);

    return {
        v: sign.v,
        r: "0x" + sign.r.toString('hex'),
        s: "0x" + sign.s.toString('hex'),
        nonce: nonce,
        fee: fee,
        tknSell: tknSell,
        tknBuy: tknBuy,
        cell: cell,
        amount: amount
    };
};

module.exports = Signer;