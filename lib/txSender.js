/**
 * @file TxSender.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Alexey Saliuk <alexey.saliuk@bitlle.network>
 * @site bitlle.network
 * @date 2018
 */

var Tx = require('ethereumjs-tx');
var util = require('ethereumjs-util');
var web3, log;
var TxSender = function (bitllejs) {
    web3 = bitllejs.web3;
};

/**
 * Ensures sequential execution of asynchronous functions. 
 * @param {Any function that takes a callback as the first argument, that will be executed upon completion.} task 
 */
TxSender.prototype.sequenceСontroller = function (task) {

    if (!this.promse) {
        this.promse = new Promise(function (resolve, reject) {
            task(() => { resolve() });
        });
    } else {
        this.promse = new Promise(function (resolve, reject) {
            this.promse.then(res => {
                task(() => { resolve(); });
            });
        });
    }
}

TxSender.prototype.setConsoleLog = function (active) {
    log = active ? true : false;
}

TxSender.prototype.sendSync = function (to, amount, msgData, privateKey, nonce, gasLimit, gasPrice) {
    if (!privateKey) throw new Error('empy private key');

    if (log) console.log("\nSending ethereum TX");

    //sender
    var sender = util.toChecksumAddress(util.privateToAddress(new Buffer.from(privateKey.slice(2), 'hex')).toString('hex'));

    //msg data
    if (!msgData) msgData = '0x';

    //Gas limit
    if (!gasLimit) {
        if (log) console.log('calc gas limit...');
        gasLimit = web3.eth.estimateGas({
            from: sender,
            to: to,
            data: msgData
        });
        if (gasLimit < 0) throw new Error('txSender ERROR, gas required exceeds allowance or always failing transaction');
    }

    //Gas price
    if (!gasPrice) {
        if (log) console.log('calc gas price...')
        var av_gasPrice = web3.eth.gasPrice - -1;
        if (log) console.log("average gas price: " + av_gasPrice);
        gasPrice = (10000000000 > av_gasPrice ? (av_gasPrice * 1.001) : 10000000000);
    }

    //nonce
    if (!nonce) {
        if (log) console.log('calc nonce...');
        nonce = web3.eth.getTransactionCount(sender, 'pending');
    } else if (nonce == 'pending' || nonce == 'latest') {
        if (log) console.log('calc nonce...');
        nonce = web3.eth.getTransactionCount(sender, nonce);
    }

    //value
    if (!amount) { amount = '0x00'; }
    else if (amount == 'full') {
        var adrBal = web3.eth.getBalance(sender, 'latest');
        var txCost = web3.toBigNumber(gasLimit).mul(web3.toBigNumber(gasPrice));
        amount = adrBal.minus(txCost);
    }



    var rawTx = {
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: to,
        value: amount,
        data: msgData
    };
    if (log) console.log(rawTx);

    var tx = new Tx(rawTx);

    tx.sign(new Buffer.from(privateKey.slice(2), 'hex'));

    if (log) console.log("txHash prev:", util.bufferToHex(tx.hash(true)))

    var serializedTx = tx.serialize();

    var txHash = web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));

    if (log) console.log("txHash from node:", txHash);

    return txHash;
};

TxSender.prototype.sendAsync = function (to, amount, msgData, privateKey, nonce, gasLimit, gasPrice, callBack) {

    function send() {

        return new Promise(function (resolve, reject) {

            if (!privateKey) reject('empy private key');

            if (log) console.log("\nprepare for sending ethereum TX...");

            //sender
            var sender = util.toChecksumAddress(util.privateToAddress(new Buffer.from(privateKey.slice(2), 'hex')).toString('hex'));

            //msg data
            if (!msgData) msgData = '0x';

            //Gas limit
            function calcGasLimit() {
                return new Promise(function (resolve, reject) {
                    if (gasLimit) {
                        resolve(gasLimit);
                    } else {
                        if (log) console.log('calc gas limit...');
                        web3.eth.estimateGas({
                            from: sender,
                            to: to,
                            data: msgData
                        }, function (e, r) {
                            if (e) {
                                reject(e);
                            } else if (r < 0) {
                                reject('txSender ERROR, gas required exceeds allowance or always failing transaction');
                            } else {
                                gasLimit = r;
                                resolve(gasLimit);
                            }
                        });
                    }
                });
            }

            //Gas price
            function calcGasPrice() {
                return new Promise(function (resolve, reject) {
                    if (gasPrice) {
                        resolve(gasPrice);
                    } else {
                        if (log) console.log('calc gas price...')
                        web3.eth.getGasPrice((error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                av_gasPrice = result.toNumber() - -1;
                                gasPrice = (10000000000 > av_gasPrice ? (av_gasPrice * 1.001) : 10000000000);
                                resolve(gasPrice);
                            }
                        });
                    }
                });
            }

            //nonce
            function calcNonce() {
                return new Promise(function (resolve, reject) {
                    if (nonce && nonce != 'pending' && nonce != 'latest') {
                        resolve(nonce);
                    } else {
                        if (log) console.log('calc nonce...');
                        web3.eth.getTransactionCount(sender, (nonce == 'latest' ? nonce : 'pending'), function (e, r) {
                            if (e) {
                                reject(e);
                            } else {
                                nonce = r;
                                resolve(nonce);
                            }
                        });
                    }
                });
            }

            //amount
            function calcAmount() {
                return new Promise(function (resolve, reject) {
                    if (!amount) {
                        amount = '0x00';
                        resolve(amount);
                    } else if (amount == 'full') {
                        web3.eth.getBalance(sender, 'latest', function (e, adrBal) {
                            if (e) {
                                reject(e);
                            } else {
                                var txCost = web3.toBigNumber(gasLimit).mul(web3.toBigNumber(gasPrice));
                                amount = adrBal.minus(txCost);
                                resolve(amount);
                            }
                        });
                    } else {
                        res(amount);
                    }
                });
            }

            function sendTx() {
                if (log) console.log("\nSending ethereum TX");

                var rawTx = {
                    nonce: nonce,
                    gasPrice: gasPrice,
                    gasLimit: gasLimit,
                    to: to,
                    value: amount,
                    data: msgData
                };
                if (log) console.log(rawTx);

                var tx = new Tx(rawTx);

                tx.sign(new Buffer.from(privateKey.slice(2), 'hex'));

                if (log) console.log("txHash prev:", util.bufferToHex(tx.hash(true)))

                var serializedTx = tx.serialize();

                web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, res) {
                    if (err) {
                        if (log) console.log('tx send error', err);
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            }



            calcGasLimit()
                .then(r => { return calcGasPrice() })
                .then(r => { return calcNonce() })
                .then(r => { return calcAmount() })
                .then(r => { return sendTx() })
                .catch(e => {
                    if (log) console.log('tx calc error', e);
                    reject(e);
                });
        });
    }

    //sequence controller
    if (!this.promise) this.promise = send();
    else this.promise = this.promise.then(r => { return send() }, e => { return send() });

    if (callBack) {
        this.promise.then(
            r => { callBack(null, r); },
            ex => { callBack(ex, null); }
        );
    }

    return this.promise;
};

module.exports = TxSender;