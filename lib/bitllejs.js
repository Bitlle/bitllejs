var Account = require('./account');
var Signer = require('./signer');
var TxSender = require('./txSender');
var Exchange = require('./exchange');
var Web3 = require('web3');
var Contracts = require('./contracts');

var Bitllejs = function (contractsAddress, contractsAbi) {
    this.web3 = new Web3();
    this.contracts = new Contracts(this.web3);
    this.signer = new Signer(this);
    this.txSender = new TxSender(this);
    this.account = new Account();
    this.exchange = new Exchange(this);

    if (contractsAbi) {
        for (const key in contractsAbi) {
            if (contractsAbi.hasOwnProperty(key)) {
                const abi = contractsAbi[key];
                this.contracts.abi[key] = abi;
            }
        }
    }


    if (contractsAddress) {
        for (const key in contractsAddress) {

            if (contractsAddress.hasOwnProperty(key)) {
                const address = contractsAddress[key];
                this.contracts.address[key] = address;

                //TODO: creating contract instance
                //if (this.contracts.abi[key]) {
                //    this.contracts.ctr[key] = web3.eth.contract(contracts.abi[key]).at(address);
                //}
            }
        }
    }
};

Bitllejs.prototype.test = function () {
    console.log('test');
    console.log(this.exchange);
    return null;
};

module.exports = Bitllejs;