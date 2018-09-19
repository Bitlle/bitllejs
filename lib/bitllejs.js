var Account = require('./account');
var Signer = require('./signer');
var Sender = require('./sender');
var Web3 = require('web3');

var Bitllejs = function (tokenAbi, tokenAddresses, exchangeAbi, exchangeAddress) {
    this.web3 = new Web3();
    this.tokenAbi = tokenAbi;
    this.tokenAddresses = tokenAddresses;
    this.exchangeAbi = exchangeAbi;
    this.exchangeAddress = exchangeAddress;
    this.exchange = this.web3.eth.contract(this.exchangeAbi).at(this.exchangeAddress);

    this.tokens = [];

    for (key in this.tokenAddresses) {
        this.tokens.push(this.web3.eth.contract(this.tokenAbi).at(this.tokenAddresses[key]));
    }

    this.account = new Account();
    this.signer = new Signer(this);
    this.sender = new Sender(this);
};

Bitllejs.prototype.test = function (string, options) {
    console.log('test');
    return null;
};


Bitllejs.prototype.token = function (address) {
    var res;

    this.tokens.forEach(function (element) {
        if (element.address === address) {
            res = element;
        }
    });
    return res;
};


module.exports = Bitllejs;