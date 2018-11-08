/**
 * @file signer.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Alexey Saliuk <alexey.saliuk@bitlle.network>
 * @site bitlle.network
 * @date 2018
 */
var leftPad = require('left-pad');
var ethUtil = require('ethereumjs-util');
var bitllejs;
var Signer = function (_bitllejs) {
    bitllejs = _bitllejs;
    this.multiplicator = 100000;
    this.web3 = bitllejs.web3;

    this._NumTo32byteLength = function (value) {
        value = (value.toString().split('.'))[0];
        return leftPad(this.web3.toHex(value).slice(2), 64, 0);
    };

    this._sign = function (privateKey, dataToSig) {
        if (!privateKey) throw "private key empty";
        var pkInBuffer = new Buffer(privateKey.slice(2), 'hex');
        var ethMsg = ethUtil.hashPersonalMessage(new Buffer(dataToSig.slice(2), 'hex')); //to x19Ethereu...
        return ethUtil.ecsign(ethMsg, pkInBuffer);
    };
};

//TODO: Descriptions

Signer.prototype.getTransferSig = function (token, to, amount, fee, privateKey) {
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
    var dataToSig = this.web3.sha3(correctParam, { encoding: 'hex' });
    var sign = this._sign(privateKey, dataToSig);
    // console.log('token',token);
    // console.log('to',to);
    // console.log('amount',amount);
    // console.log('fee',fee);
    // console.log('privateKey',privateKey);
    //console.log('dataToSig', dataToSig);
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

Signer.prototype.getMintSig = function (token, to, amount, fee, privateKey) {
    
    var nonce = Date.now(); //TODO add random

    token = this.web3.toChecksumAddress(token);
    to = this.web3.toChecksumAddress(to);

    if (!this.web3.isAddress(token)) {
        throw "ERROR in getTransferSign() -> token address:" + token + " incorrect!";
    }
    if (!this.web3.isAddress(to)) {
        throw "ERROR in getTransferSign() -> to address:" + to + " incorrect!";
    }

    if (this.web3.toHex(nonce) === token) nonce++;

    var correctParam = "0x" + this._NumTo32byteLength(nonce) + token.slice(2) + to.slice(2) + this._NumTo32byteLength(amount) + this._NumTo32byteLength(fee);
    
    var dataToSig = this.web3.sha3(correctParam, { encoding: 'hex' });
    var sign = this._sign(privateKey, dataToSig);

    //console.log('dataToSig', dataToSig);
    return {
        token: token,
        nonce: nonce,
        to: to,
        amount: amount,
        fee: fee,
        v: sign.v,
        r: "0x" + sign.r.toString('hex'),
        s: "0x" + sign.s.toString('hex')
    };
};

Signer.prototype.getBurnSig = function (token, amount, fee, privateKey) {
    
    var nonce = Date.now(); //TODO add random

    token = this.web3.toChecksumAddress(token);    

    if (!this.web3.isAddress(token)) {
        throw "ERROR in getTransferSign() -> token address:" + token + " incorrect!";
    }
        
    if (this.web3.toHex(nonce) === token) nonce++;

    var correctParam = "0x" + this._NumTo32byteLength(nonce) + token.slice(2) + this._NumTo32byteLength(amount) + this._NumTo32byteLength(fee);
    var dataToSig = this.web3.sha3(correctParam, { encoding: 'hex' });
    var sign = this._sign(privateKey, dataToSig);
    
    //console.log('dataToSig', dataToSig);
    return {
        token: token,
        nonce: nonce,
        amount: amount,
        fee: fee,
        v: sign.v,
        r: "0x" + sign.r.toString('hex'),
        s: "0x" + sign.s.toString('hex')
    };
};

Signer.prototype.getPlaceOrderSig = function (tknSell, tknBuy, price, amount, cell, fee, nonce, privateKey) {

    tknSell = this.web3.toChecksumAddress(tknSell);
    tknBuy = this.web3.toChecksumAddress(tknBuy);
    price = price * this.multiplicator;

    if (!this.web3.isAddress(tknBuy)) {
        throw "ERROR in getPlaceOrderSign() tknBuy address:" + tknBuy + " incorrect!";
    }
    if (!this.web3.isAddress(tknSell)) {
        throw "ERROR in getPlaceOrderSign() tknSell address:" + tknSell + " incorrect!";
    }

    var correctParam = tknSell + tknBuy.slice(2) + this._NumTo32byteLength(price) + this._NumTo32byteLength(amount) + this._NumTo32byteLength(cell) + this._NumTo32byteLength(fee) + this._NumTo32byteLength(nonce);
    var dataToSig = this.web3.sha3(correctParam, { encoding: 'hex' });
    var sign = this._sign(privateKey, dataToSig);

    return {
        v: sign.v,
        r: "0x" + sign.r.toString('hex'),
        s: "0x" + sign.s.toString('hex'),
        nonce: nonce.toString(),
        price: price.toString(),
        amount: amount.toString(),
        cell: cell.toString(),
        fee: fee.toString(),
        tknSell: tknSell,
        tknBuy: tknBuy
    };
};

Signer.prototype.getCancelOrderAndCashOutSig = function (tknToSell, tknToBuy, cell, nonce, fee, privateKey) {

    tknToSell = this.web3.toChecksumAddress(tknToSell);
    tknToBuy = this.web3.toChecksumAddress(tknToBuy);

    if (!this.web3.isAddress(tknToBuy)) {
        throw "ERROR in getCancelOrderAndCashOutSig() buy address:" + tknToBuy + " incorrect!";
    }
    if (!this.web3.isAddress(tknToSell)) {
        throw "ERROR in getCancelOrderAndCashOutSig() sell address:" + tknToSell + " incorrect!";
    }


    //bytes32 msgHash = keccak256(abi.encodePacked(_tknSell,_tknBuy,_cell,_nonce,_fee));

    var correctParam = tknToSell + tknToBuy.slice(2) + this._NumTo32byteLength(cell) + this._NumTo32byteLength(nonce) + this._NumTo32byteLength(fee);
    var dataToSig = this.web3.sha3(correctParam, { encoding: 'hex' });
    var sign = this._sign(privateKey, dataToSig);

    return {
        tknSell: tknToSell,
        tknBuy: tknToBuy,
        cell: cell.toString(),
        nonce: nonce.toString(),
        fee: fee.toString(),
        v: sign.v,
        r: "0x" + sign.r.toString('hex'),
        s: "0x" + sign.s.toString('hex')
    };
}

Signer.prototype.getDepositAndPlaceOrderSig = function (tokenToSell, tokenToBuy, price, amount, cell, fee, privateKey) {

    var transferSig = this.getTransferSig(tokenToSell, bitllejs.contracts.address.exchange, amount, fee, privateKey);
    var orderSign = this.getPlaceOrderSig(tokenToSell, tokenToBuy, price, amount, cell, 0, transferSig.nonce, privateKey);

    return {
        /*   
         array dexct from Smart contract
         bytes32
         0. Dr
         1. Ds
         2. r
         3. s
         uint256
         0. nonce
         1. Price
         2. Amount
         3. Cell
         4. Fee
         */

        v: orderSign.v,
        Dv: transferSig.v,
        rs: [
            transferSig.r,
            transferSig.s,
            orderSign.r,
            orderSign.s
        ],
        u256: [
            transferSig.nonce,
            orderSign.price,
            amount.toString(),
            cell.toString(),
            fee.toString()
        ],
        tknSell: orderSign.tknSell,
        tknBuy: orderSign.tknBuy
    };
};

Signer.prototype.getTradeSig = function (tknToSell, tknToBuy, amount, cell, fee, nonce, privateKey) {

    tknToSell = this.web3.toChecksumAddress(tknToSell);
    tknToBuy = this.web3.toChecksumAddress(tknToBuy);

    if (!this.web3.isAddress(tknToBuy)) {
        throw "ERROR in getTradeSig() buy address:" + tknToBuy + " incorrect!";
    }
    if (!this.web3.isAddress(tknToSell)) {
        throw "ERROR in getTradeSig() sell address:" + tknToSell + " incorrect!";
    }

    var correctParam = tknToSell + tknToBuy.slice(2) + this._NumTo32byteLength(amount) + this._NumTo32byteLength(cell) + this._NumTo32byteLength(nonce) + this._NumTo32byteLength(fee);
    var dataToSig = this.web3.sha3(correctParam, { encoding: 'hex' });
    var sign = this._sign(privateKey, dataToSig);

    return {
        v: sign.v,
        r: "0x" + sign.r.toString('hex'),
        s: "0x" + sign.s.toString('hex'),
        nonce: nonce,
        fee: fee,
        tknSell: tknToSell,
        tknBuy: tknToBuy,
        cell: cell,
        amount: amount
    };
};

Signer.prototype.getTradesSig = function (tknToSell, tknToBuy, amounts, cells, fee, nonce, privateKey) {

    tknToSell = this.web3.toChecksumAddress(tknToSell);
    tknToBuy = this.web3.toChecksumAddress(tknToBuy);

    if (!this.web3.isAddress(tknToBuy)) {
        throw "ERROR in getTradeSig() buy address:" + tknToBuy + " incorrect!";
    }
    if (!this.web3.isAddress(tknToSell)) {
        throw "ERROR in getTradeSig() sell address:" + tknToSell + " incorrect!";
    }

    var amountsString = "";
    amounts.forEach(function (element) {
        amountsString += this._NumTo32byteLength(element);
    });

    var cellsString = "";
    cells.forEach(function (element) {
        cellsString += this._NumTo32byteLength(element);
    });

    var correctParam = tknToSell + tknToBuy.slice(2) + amountsString + cellsString + this._NumTo32byteLength(nonce) + this._NumTo32byteLength(fee);

    var dataToSig = this.web3.sha3(correctParam, { encoding: 'hex' });
    var sign = this._sign(privateKey, dataToSig);

    return {
        v: sign.v,
        r: "0x" + sign.r.toString('hex'),
        s: "0x" + sign.s.toString('hex'),
        nonce: nonce,
        fee: fee,
        tknSell: tknToSell,
        tknBuy: tknToBuy,
        cells: cells,
        amounts: amounts
    };
};

Signer.prototype.getTradesDirectSig = function (tknToSell, tknToBuy, amountTotal, amounts, cells, fee, privateKey) {

    var depositArgs = this.getTransferSig(tknToSell, bitllejs.contracts.address.exchange, amountTotal, fee, privateKey);
    var nonce = depositArgs.nonce;

    /* msgHash = keccak256(_u256,_tknSellBuy);   
     where _u256 = uint256
     0. nonce
     1. fee
     2. AmountTotal
     3. deasQty
     4++ 1 cell idx 1 cell amount
     */
    tknToSell = this.web3.toChecksumAddress(tknToSell);
    tknToBuy = this.web3.toChecksumAddress(tknToBuy);

    if (!this.web3.isAddress(tknToBuy)) {
        throw "ERROR in getTradeSig() buy address:" + tknToBuy + " incorrect!";
    }
    if (!this.web3.isAddress(tknToSell)) {
        throw "ERROR in getTradeSig() sell address:" + tknToSell + " incorrect!";
    }

    var u256 = [nonce, fee, amountTotal, cells.length];

    var correctParam = "0x" + this._NumTo32byteLength(nonce) + this._NumTo32byteLength(fee) + this._NumTo32byteLength(amountTotal) + this._NumTo32byteLength(cells.length);

    for (var index = 0; index < cells.length; index++) {
        correctParam += this._NumTo32byteLength(cells[index]);
        correctParam += this._NumTo32byteLength(amounts[index]);
        u256.push(cells[index]);
        u256.push(amounts[index]);
    }

    correctParam += leftPad(tknToSell.slice(2), 64, 0) + leftPad(tknToBuy.slice(2), 64, 0);
    var dataToSig = this.web3.sha3(correctParam, { encoding: 'hex' });
    var sign = this._sign(privateKey, dataToSig);

    return {
        tknSellBuy: [tknToSell, tknToBuy],
        v: [depositArgs.v, sign.v],
        rs: [
            depositArgs.r,
            depositArgs.s,
            ("0x" + sign.r.toString('hex')),
            ("0x" + sign.s.toString('hex'))
        ],
        u256: u256
    };
};

module.exports = Signer;