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
    if (!privateKey || privateKey.length != 66) throw new Error('empty or incorrect private key');

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
        gasPrice: Math.ceil(gasPrice),
        gasLimit: Math.ceil(gasLimit),
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

            if (!privateKey || privateKey.length != 66) {
                reject('txSender sendAsync: empty or incorrect private key');
                return;
            }

            if (!to && (!msgData || msgData == '0x')) {
                reject('txSender sendAsync: incorrect param, to ' + to + ' or msgData ' + msgData);
                return;
            }

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
                        resolve(amount);
                    }
                });
            }

            function sendTx() {
                if (log) console.log("\nSending ethereum TX");

                var rawTx = {
                    nonce: nonce,
                    gasPrice: Math.ceil(gasPrice),
                    gasLimit: Math.ceil(gasLimit),
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

/**
 * resend ethereum transaction with same nonce but supper gas price
 * @param {object} params 
 * {
 *  txInfo - is a result of web3.eth.getTransaction(...)
 *  privateKey - private key for tx signature
 *  step [optional] - step of aument tx gas price, 1 Gwei by default
 * }
 * @param {function} callBack [optional] (error,result)={}
 * @returns promise -> new tx hash or error
 */
TxSender.prototype.boostTx = function (params, callBack) {

    let result = new Promise(function (resolve, reject) {
        if (log) console.log('BOOST ETH TX', params.txInfo.hash);

        if (!params || !params.txInfo || !params.txInfo.nonce || !params.txInfo.gasPrice || !params.txInfo.gas || !params.txInfo.to || !params.txInfo.input || !params.txInfo.value) {
            let msg = 'BOOST TX ERROR: empty or incorrect txinfo param: ' + params + ', need to be result of web3.eth.getTransaction(...)'
            if (log) console.error(msg);
            reject(msg)
        }

        if (!params.privateKey || params.privateKey.length != 66) {
            let msg = 'BOOST TX ERROR: empty or incorrect privateKey param: ' + params;
            if (log) console.error(msg);
            reject(msg)
        }

        if (!params.step) params.step = 1000000000;

        let rawTx = {
            nonce: params.txInfo.nonce,
            gasPrice: Math.ceil(params.txInfo.gasPrice.plus(params.step).toNumber()),
            gasLimit: params.txInfo.gas,
            to: params.txInfo.to,
            value: web3.toHex(params.txInfo.value),
            data: params.txInfo.input
        };

        let ETHtxToSend = new Tx(rawTx);
        ETHtxToSend.sign(new Buffer.from(params.privateKey.slice(2), 'hex'));
        let serializedTx = ETHtxToSend.serialize();

        web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
            if (err || !hash) {
                let msg = 'BOOST TX ERROR: an error occurred during sending Raw Transaction ' + err;
                if (log) console.error(msg);
                reject(msg)
            } else {
                if (log) console.log("BOOST TX:", params.txInfo.hash, "new tx hash is " + hash);
                resolve(hash)
            }
        });
    });


    if (callBack) {
        result.then(
            r => { callBack(null, r); },
            ex => { callBack(ex, null); }
        );
    }

    return result;
}

/**
 * returns the response when the transaction is completed, automatically increases the price of gas, if necessary, by replacing the transaction.
 * @param {object} params 
 * {
 *  txHash - primary transaction hash
 *  privateKey - private key for tx signature
 *  updateTxHash [optional] - a single argument function that is called each time the transaction hash is updated
 *  step [optional] - step of aument tx gas price, 1 Gwei by default
 *  interval [optional] - an internal between checking  transaction statuses, 15000ms by default
 *  maxDelay [optional] - the maximum amount of time allocated to confirm the transaction, after which it is accelerated, 100000ms by default
 *  сonfirmations [optional] - minimum network confirmations qty for mined tx
 * }
 * @param {function} callBack [optional] (error,result)={}
 * @returns promise -> mined tx details or error
 */
TxSender.prototype.watchTx = function (params, callBack) {

    let result = new Promise(function (resolve, reject) {
        if (log) console.log('WATCH ETH TX', params.txHash);

        if (!params || !params.txHash || params.txHash.length != 66) {
            let msg = 'WATCH TX ERROR: empty or incorrect txHash param: ' + params;
            if (log) console.error(msg);
            reject(msg);
        }

        if (!params.privateKey || params.privateKey.length != 66) {
            let msg = 'WATCH TX ERROR: empty or incorrect privateKey param: ' + params;
            if (log) console.error(msg);
            reject(msg);
        }

        if (!params.step) params.step = 1000000000;
        if (!params.interval) params.interval = 15000;
        if (!params.updateTxHash) params.updateTxHash = () => { }; // boost report
        if (!params.maxDelay) params.maxDelay = 100000;
        if (!params.сonfirmations) params.сonfirmations = 3;
        if (!params.lossTimeOut) params.lossTimeOut = 3600000; // 1 hour

        let sender = util.toChecksumAddress(util.privateToAddress(new Buffer.from(params.privateKey.slice(2), 'hex')).toString('hex'));

        params.txPool = [{ hash: params.txHash, timestamp: Date.now() }];
        let curTxIndex = 0;
        var isRun = false;

        function check() {
            if (isRun) {
                console.log('WATCH TX ERROR: Dual run attempt!');
                return;
            }
            isRun = true;

            //console.log('check...');
            setTimeout(() => {

                curTxIndex = params.txPool.length - 1;

                function checkCur() {
                    //console.log('curr check ', params.txPool[curTxIndex].hash);
                    let curTx = params.txPool[curTxIndex].hash;
                    web3.eth.getTransaction(curTx, (err, tinfo) => {
                        if (err) {
                            let msg = 'WATCH TX ERROR: an error occurred during web3.eth.getTransaction(...) \nerror: ' + err + '\nparams: ' + JSON.stringify(params);
                            if (log) console.error(msg);
                            reject(msg);
                        } else if (!tinfo) {
                            if (log && curTxIndex == params.txPool.length - 1) console.log("'WATCH TX: " + curTx + " not found yet, ", params.txPool.length, 'tx in pool');

                            if (curTxIndex-- > 0) checkCur(); // next tx
                            else if (Date.now() < curTx.timestamp + params.lossTimeOut) check(isRun = false); //to new cycle
                            else {
                                let msg = "WATCH TX: " + curTx + " tx has been lost, stop monitor by timeout " + params.lossTimeOut / 1000 + ' sec';
                                if (log) console.log(msg);
                                reject(msg);
                            }
                        } else if (!tinfo.blockNumber) {
                            if (Date.now() > (params.txPool[curTxIndex].timestamp + params.maxDelay) && (curTxIndex == params.txPool.length - 1)) {

                                // only first tx can be boosted
                                web3.eth.getTransactionCount(sender, 'latest', function (e, nonce) {
                                    if (e) {
                                        let msg = 'WATCH TX ERROR: an error occurred during web3.eth.getTransactionCount(...) \nerror: ' + e + '\nparams: ' + JSON.stringify(params);
                                        if (log) console.error(msg);
                                        reject(e);
                                    } else {
                                        if (nonce == tinfo.nonce) {
                                            TxSender.prototype.boostTx({ txInfo: tinfo, privateKey: params.privateKey }).then(
                                                r => {
                                                    params.txPool.push({ hash: r, timestamp: Date.now() });
                                                    params.updateTxHash(r); // boost report
                                                    check(isRun = false); // to next cycle
                                                },
                                                ex => { reject(ex); }
                                            );
                                        } else {
                                            if (log) console.log('WATCH TX:', curTx, '\ncur tx nonce:', tinfo.nonce, 'first tx in queue nonce:', nonce, 'waiting for turn.');
                                            check(isRun = false); //to new cycle
                                        }
                                    }
                                });
                            } else {
                                check(isRun = false); //to new cycle
                            }
                        } else {
                            // TODO confirmations qty.
                            // if(params.сonfirmations> tinfo .... ) {
                            // if(log) console.log('WATCH TX: tx mined wating for',) 
                            // check(isRun = false); //to new cycle
                            // }
                            if (log) console.log('BOOST ETH TX: mined with tx hash', curTx);
                            resolve(tinfo);
                        }
                    });
                }
                checkCur();

            }, params.interval);
        }
        check();
    });


    if (callBack) {
        result.then(
            r => { callBack(null, r); },
            ex => { callBack(ex, null); }
        );
    }

    return result;
}

/**
 * @param {object} params
 * {
 *  privateKey - private key for tx signature
 *  to
 *  amount
 *  msgData
 *  privateKey
 *  nonce
 *  gasLimit
 *  gasPrice *  
 * }
 * @param {function} callBack
 */
TxSender.prototype.sendAnyWay = function (params, callBack) {
    var params = params;

    let result = new Promise(function (resolve, reject) {
        TxSender.prototype.sendAsync(
            params.to || null,
            params.amount || null,
            params.msgData || '0x',
            params.privateKey,
            params.nonce || null,
            params.gasLimit || null,
            params.gasPrice || null
        ).then(
            txHash => {
                TxSender.prototype.watchTx({
                    txHash: txHash,
                    privateKey: params.privateKey,
                    maxDelay: 150000,
                    step: 1000000000
                }).then(
                    r => resolve(r),
                    ex => reject(ex)
                );
            },
            e => reject(e)
        );

    });

    if (callBack) {
        result.then(
            r => { callBack(null, r); },
            ex => { callBack(ex, null); }
        );
    }

    return result;
}

module.exports = TxSender;


