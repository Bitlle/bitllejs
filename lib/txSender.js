/**
 * @file TxSender.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Alexey Saliuk <alexey.saliuk@bitlle.network>
 * @site bitlle.network
 * @date 2018
 */

var Tx = require('ethereumjs-tx');

var TxSender = function (bitllejs) {
    this.web3 = bitllejs.web3;
};

TxSender.prototype.send = function (to, msgData, nonce, privateKey,gasLimit) {
    console.log("\nSending TX");

    var tx_estimateGas = this.web3.eth.estimateGas({
        to: to,
        data: msgData
    });

    console.log("tx estimate gas: " + tx_estimateGas);

    if (0 < tx_estimateGas) {
        if (3000000 > tx_estimateGas) {

            var av_gasPriceP = this.web3.eth.gasPrice;
            console.log("average gas price: " + av_gasPriceP);

            var av_gasPrice = this.web3.eth.gasPrice - -1;
            console.log("average gas price: " + av_gasPrice);

            var tx_gasPrice = (4000000000 > av_gasPrice ? this.web3.toHex(av_gasPrice) : web3.toHex(4000000000));
            console.log("tx gas price: " + tx_gasPrice);

            var tx_nonce = nonce;
            console.log("tx_nonce: " + tx_nonce);

            var rawTx = {
                nonce: tx_nonce,
                gasPrice: tx_gasPrice,
                gasLimit:  gasLimit>0?gasLimit:tx_estimateGas,
                to: to,
                value: '0x00',
                data: msgData
            };

            var tx = new Tx(rawTx);
            tx.sign(new Buffer(privateKey.slice(2), 'hex'));

            var serializedTx = tx.serialize();

            this.web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'),
                function (err, hash) {
                    if (err) {
                        console.log("web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {" + err);
                    } else {
                        console.log("tx hash: " + hash);
                    }
                });
        } else console.log("error 2");
    } else console.log("error 3");
};

module.exports = TxSender;