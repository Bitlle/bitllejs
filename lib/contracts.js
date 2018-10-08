/**
 * @file contracts.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Alexey Saliuk <alexey.saliuk@bitlle.network>
 * @site bitlle.network
 * @date 2018
 */

var contracts = function (web3) {

    this.address = {
        RSH: "0xE73fbE3a90C7149A65758A0A867c867e29687754",
        B3N: "0x292791d3D43120548f4262655225d23FEde289c5",
        SWH: "0x9564fE83aCf1C4dDE9F68399b8B6BF6BfBC5418e",
        BTL: "0xB5dcbA49E008bb513c22A952DbEF1e4a29273FAA",
        exchange: "0x196A85885a9132E96eCE8D43c05Cced45a59bC65"
    };

    this.abi = {
        LT: [{
            "constant": true,
            "inputs": [],
            "name": "creator",
            "outputs": [{"name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{"name": "", "type": "bytes32"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
            "name": "approve",
            "outputs": [{"name": "success", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "bytes32"}],
            "name": "txHash",
            "outputs": [{"name": "", "type": "bool"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
                "name": "_value",
                "type": "uint256"
            }],
            "name": "transferFrom",
            "outputs": [{"name": "success", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "address"}],
            "name": "balances",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "address"}],
            "name": "allowed",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_owner", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "balance", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{"name": "", "type": "bytes32"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_token", "type": "address"}, {"name": "_to", "type": "address"}, {
                "name": "_value",
                "type": "uint256"
            }, {"name": "_fee", "type": "uint256"}, {"name": "_nonce", "type": "uint256"}],
            "name": "GetHashMessage",
            "outputs": [{"name": "", "type": "bytes32"}],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
            "name": "transfer",
            "outputs": [{"name": "success", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_token", "type": "address[]"}, {"name": "_to", "type": "address[]"}, {
                "name": "_value",
                "type": "uint256[]"
            }, {"name": "_fee", "type": "uint256[]"}, {"name": "_unxTime", "type": "uint256[]"}, {
                "name": "_v",
                "type": "uint8[]"
            }, {"name": "_r", "type": "bytes32[]"}, {"name": "_s", "type": "bytes32[]"}],
            "name": "multiTransferFor",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "KillMe",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_token", "type": "address"}, {"name": "_to", "type": "address"}, {
                "name": "_value",
                "type": "uint256"
            }, {"name": "_fee", "type": "uint256"}, {"name": "_unxTime", "type": "uint256"}, {
                "name": "_v",
                "type": "uint8"
            }, {"name": "_r", "type": "bytes32"}, {"name": "_s", "type": "bytes32"}],
            "name": "transferFor",
            "outputs": [{"name": "success", "type": "bool"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
            "name": "allowance",
            "outputs": [{"name": "remaining", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_hashMsg", "type": "bytes32"}, {"name": "_v", "type": "uint8"}, {
                "name": "_r",
                "type": "bytes32"
            }, {"name": "_s", "type": "bytes32"}],
            "name": "getSigner",
            "outputs": [{"name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        }, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
                "indexed": true,
                "name": "_to",
                "type": "address"
            }, {"indexed": false, "name": "_value", "type": "uint256"}],
            "name": "Transfer",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
                "indexed": true,
                "name": "_spender",
                "type": "address"
            }, {"indexed": false, "name": "_value", "type": "uint256"}],
            "name": "Approval",
            "type": "event"
        }],
        exchange: [{
            "constant": false,
            "inputs": [{"name": "_token", "type": "address"}, {"name": "_sender", "type": "address"}, {
                "name": "_value",
                "type": "uint256"
            }],
            "name": "depositERC20",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_token", "type": "address"}, {"name": "_amount", "type": "uint256"}],
            "name": "cashOut",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "lastSender",
            "outputs": [{"name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_v", "type": "uint8"}, {"name": "_r", "type": "bytes32"}, {
                "name": "_s",
                "type": "bytes32"
            }, {"name": "_nonce", "type": "uint256"}, {"name": "_fee", "type": "uint256"}, {
                "name": "_tknSell",
                "type": "address"
            }, {"name": "_tknBuy", "type": "address"}, {"name": "_cell", "type": "uint256"}, {
                "name": "_am",
                "type": "uint256"
            }],
            "name": "tradeForDirect",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_tknSell", "type": "address"}, {
                "name": "_tknBuy",
                "type": "address"
            }, {"name": "_price", "type": "uint256"}, {"name": "_am", "type": "uint256"}, {
                "name": "_cell",
                "type": "uint256"
            }],
            "name": "placeOrder",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_tknSell", "type": "address"}, {"name": "_tknBuy", "type": "address"}],
            "name": "getOderBookAmounts",
            "outputs": [{"name": "amounts", "type": "uint256[]"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_tknSell", "type": "address"}, {
                "name": "_tknBuy",
                "type": "address"
            }, {"name": "_cell", "type": "uint256"}, {"name": "_am", "type": "uint256"}],
            "name": "trade",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_v", "type": "uint8"}, {"name": "_r", "type": "bytes32"}, {
                "name": "_s",
                "type": "bytes32"
            }, {"name": "_nonce", "type": "uint256"}, {"name": "_fee", "type": "uint256"}, {
                "name": "_tknSell",
                "type": "address"
            }, {"name": "_tknBuy", "type": "address"}, {"name": "_cell", "type": "uint256"}, {
                "name": "_am",
                "type": "uint256"
            }],
            "name": "tradeFor",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_tknSell", "type": "address"}, {"name": "_tknBuy", "type": "address"}],
            "name": "getOderBookPrices",
            "outputs": [{"name": "prices", "type": "uint256[]"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_token", "type": "address"}, {"name": "_to", "type": "address"}, {
                "name": "_value",
                "type": "uint256"
            }, {"name": "_fee", "type": "uint256"}, {"name": "_unxTime", "type": "uint256"}, {
                "name": "_v",
                "type": "uint8"
            }, {"name": "_r", "type": "bytes32"}, {"name": "_s", "type": "bytes32"}],
            "name": "deposit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "address"}],
            "name": "nonces",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_v", "type": "uint8"}, {"name": "_rs", "type": "bytes32[2]"}, {
                "name": "_u256",
                "type": "uint256[5]"
            }, {"name": "_tknSell", "type": "address"}, {"name": "_tknBuy", "type": "address"}],
            "name": "placeOrderFor",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_tknSell", "type": "address"}, {"name": "_tknBuy", "type": "address"}],
            "name": "getOrderBookLength",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "address"}],
            "name": "balances",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_token", "type": "address"}, {"name": "_value", "type": "uint256"}, {
                "name": "_fee",
                "type": "uint256"
            }, {"name": "_nonce", "type": "uint256"}, {"name": "_v", "type": "uint8"}, {
                "name": "_r",
                "type": "bytes32"
            }, {"name": "_s", "type": "bytes32"}],
            "name": "cashOut",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "offer", "type": "address"}, {"name": "req", "type": "address"}],
            "name": "getFreeCell",
            "outputs": [{"name": "", "type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_token", "type": "address"}, {"name": "_to", "type": "address"}, {
                "name": "_value",
                "type": "uint256"
            }, {"name": "_fee", "type": "uint256"}, {"name": "_nonce", "type": "uint256"}],
            "name": "getHashMessage",
            "outputs": [{"name": "", "type": "bytes32"}],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "_token", "type": "address"}],
            "name": "cashOut",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "address"}, {
                "name": "",
                "type": "uint256"
            }],
            "name": "orderBook",
            "outputs": [{"name": "Sender", "type": "address"}, {"name": "Amount", "type": "uint256"}, {
                "name": "Price",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"name": "_hashMsg", "type": "bytes32"}, {"name": "_v", "type": "uint8"}, {
                "name": "_r",
                "type": "bytes32"
            }, {"name": "_s", "type": "bytes32"}],
            "name": "getSigner",
            "outputs": [{"name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        }, {"payable": true, "stateMutability": "payable", "type": "fallback"}]
    };

    this.ctr = {
        RSH: web3.eth.contract(this.abi.LT).at(this.address.RSH),
        B3N: web3.eth.contract(this.abi.LT).at(this.address.B3N),
        SWH: web3.eth.contract(this.abi.LT).at(this.address.SWH),
        BTL: web3.eth.contract(this.abi.LT).at(this.address.BTL),
        exchange: web3.eth.contract(this.abi.exchange).at(this.address.exchange)
    };

    // this.GetContract = function (address) {
    //     var res;
    //     for (var key in this.ctr) {
    //       if (this.ctr[key].address == address) {
    //             res = this.ctr[key];
    //         }
    //     };
    //     return res;
    // }
};

contracts.prototype.GetContract = function (address) {
    var res;
    for (var key in this.ctr) {
        if (this.ctr.hasOwnProperty(key)) {
            if (this.ctr[key].address === address) {
                res = this.ctr[key];
            }
        }
    }
    return res;
};


module.exports = contracts;