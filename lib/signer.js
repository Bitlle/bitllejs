/**
 * @file signer.js
 * @author Denis Kashargin <denis@kashargin.ru>
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

    this.sign = function (privateKey, dataToSig) {
        var pkInBuffer = new Buffer(privateKey.slice(2), 'hex'); //Привожу ПК к правильномиу формату
        var ethMsg = ethUtil.hashPersonalMessage(new Buffer(dataToSig.slice(2), 'hex')); //Формирую хэш сообщения с префиксом x19Ethereu...
        return ethUtil.ecsign(ethMsg, pkInBuffer);
    };
};


Signer.prototype.transferSign = function (token, to, amount, fee, privateKey) {
    var nonce = Date.now();
    var dataToSig = this._getDataToSig(token, to, amount, fee, nonce);
    var sign = this.sign(privateKey, dataToSig);

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

Signer.prototype.orderSign = function (_tknSell, _tknBuy, _price, _amount, _cell, _fee, _nonce, privateKey) {
    _tknSell = this.web3.toChecksumAddress(_tknSell);
    _tknBuy = this.web3.toChecksumAddress(_tknBuy);
    _price = _price * 100000;

    if (!this.web3.isAddress(_tknBuy)) {
        throw "ERROR in GenerateOrderTX() _tknBuy address:" + _tknBuy + " incorrect!";
    }
    if (!this.web3.isAddress(_tknSell)) {
        throw "ERROR in GenerateOrderTX() _tknSell address:" + _tknSell + " incorrect!";
    }

    var correctParam = _tknSell + _tknBuy.slice(2) + this._to32byteLength(_price) + this._to32byteLength(_amount) + this._to32byteLength(_cell) + this._to32byteLength(_fee) + this._to32byteLength(_nonce);
    var dataToSig = this.web3.sha3(correctParam, {encoding: 'hex'});
    var sign = this.sign(privateKey, dataToSig);

    return {
        v: sign.v.toString(),
        rs: ["0x" + sign.r.toString('hex'), "0x" + sign.s.toString('hex')],
        u256: [_nonce.toString(), _price.toString(), _amount.toString(), _cell.toString(), _fee.toString()],
        tknSell: _tknSell,
        tknBuy: _tknBuy
    };
};

Signer.prototype.dealSign = function (_tknSell, _tknBuy, _amount, _cell, _fee, _nonce, privateKey) {
    _tknSell = this.web3.toChecksumAddress(_tknSell);
    _tknBuy = this.web3.toChecksumAddress(_tknBuy);

    if (!this.web3.isAddress(_tknBuy)) {
        throw "ERROR in GenerateDealTX() _tknBuy address:" + _tknBuy + " incorrect!";
    }
    if (!this.web3.isAddress(_tknSell)) {
        throw "ERROR in GenerateDealTX() _tknSell address:" + _tknSell + " incorrect!";
    }

    var correctParam = _tknSell + _tknBuy.slice(2) + this._to32byteLength(_amount) + this._to32byteLength(_cell) + this._to32byteLength(_nonce) + this._to32byteLength(_fee);
    var dataToSig = this.web3.sha3(correctParam, {encoding: 'hex'});
    var sign = this.sign(privateKey, dataToSig);

    return {
        v: sign.v,
        r: "0x" + sign.r.toString('hex'),
        s: "0x" + sign.s.toString('hex'),
        nonce: _nonce,
        fee: _fee,
        tknSell: _tknSell,
        tknBuy: _tknBuy,
        cell: _cell,
        amount: _amount
    };
};

module.exports = Signer;