var Web3 = require('web3');
var Account = require('./account');
var Signer = require('./signer');
var Exchange = require('./exchange');
var Contracts = require('./contracts');
var NodeHeath = require('./nodeHealth.js')
var IStorage = require('./iStorage.js')
var TxSender = require('./txSender');
var GasStation = require('./iGasStation.js'); 
var Config = require('./config'); 


var Bitllejs = function (contractsAddress, contractsAbi) {
    this.config = Config;
    this.web3 = new Web3();
    this.signer = new Signer(this);
    this.account = new Account();
    this.exchange = new Exchange(this);
    this.nodeHealth = new NodeHeath(this.web3);
    this.txSender = new TxSender(this);

    this.contracts = new Contracts(this.web3);
    this.iStorage = new IStorage(this);
    this.iGasStation = new GasStation(this);   


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