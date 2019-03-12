/**
 * @file contracts.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Alexey Saliuk <alexey.saliuk@bitlle.network>
 * @site bitlle.network
 * @date 2018
 */

var Contracts = function (web3) {

    this.address = {
        RSH: "0x79848624A3D3BE292E396f3bE7cE468059372d7a",//(v3.3.1)      //v3.2 "0x9A5596dC56b7f08C31ACf66A6710eAA75Af814C3",//"0x5d400c12f5afe52828e181572260219731231074",
        B3N: "0x55e7f50189185a5e913096Ee0D03b7Dc27387e4E",//(v3.3.1)      //v3.2 "0xc608Cd734e72afEB1F40b8eDCC1C3DAb61d9a3d3",//"0x57d6042d9af36b086f823875d1a0db979ac025d8",
        SWH: "0x5b76AAf29899CF0e3f9f82b9a757Ef8892670632",//(v3.3.1)      //v3.2 "0x447975Ab82571F2f313cD58e802C1B69AED2F0Ba",//"0x8bdd99026588009e168bc7d0d7a79554ed182af4",
        BTL: "0x752777721dd5fe2Db110e9e03B3b8fEAcfF1665E",//(v3.3.1)      //v3.2 "0x71C1B9bc9E9Fd2d5d5A47e2285a86B7CB87b2f31",//"0x197531730d643234740e178b25c64d047a5cf495",
        CAR: "0x854f639023a72cd33f023ac1ecaf571f57d13593",//(v1.0.0 Lim)  //v3.3.1 "0x2BE6B0465e02C4984FE72Bff3d9d8eb122891277",//v3.2 "0xC14a4C322b78798022cB85e605575E20bE9070D7",//"0xe133a7e3373094ce48c2db91dfc9b6d817832264",
        exchange: "0x34a7993016476edacb59c02aacf58794655a009e", //v2.1 //old"0x127E77E12C30ca367a6710533BD61aD3B231f242"//v2.0 //old"0x5Da9B78514B2c5f43650391f87028D909Af4477b"//v2.0 beta //old 0x8cDB477E92892F3159df2c2d54e729c5acEEEc5e //v1.0
        storage: "0x2d7f1a3ea6d019ed45ff49f684c2f84760aeb3a1"
    };

    this.abi = {
        LT: [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "minter", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }, { "name": "_fee", "type": "uint256" }, { "name": "_unxTime", "type": "uint256" }, { "name": "_v", "type": "uint8" }, { "name": "_r", "type": "bytes32" }, { "name": "_s", "type": "bytes32" }], "name": "burnFor", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "bytes32" }], "name": "txHash", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "newAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "mint", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "burn", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_fee", "type": "uint256" }, { "name": "_unxTime", "type": "uint256" }, { "name": "_v", "type": "uint8" }, { "name": "_r", "type": "bytes32" }, { "name": "_s", "type": "bytes32" }], "name": "mintFor", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newAdmin", "type": "address" }], "name": "changeAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address[]" }, { "name": "_value", "type": "uint256[]" }, { "name": "_fee", "type": "uint256[]" }, { "name": "_unxTime", "type": "uint256[]" }, { "name": "_v", "type": "uint8[]" }, { "name": "_r", "type": "bytes32[]" }, { "name": "_s", "type": "bytes32[]" }], "name": "multiTransferFor", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_fee", "type": "uint256" }, { "name": "_unxTime", "type": "uint256" }, { "name": "_v", "type": "uint8" }, { "name": "_r", "type": "bytes32" }, { "name": "_s", "type": "bytes32" }], "name": "transferFor", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "KillMe", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "confirmAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_hashMsg", "type": "bytes32" }, { "name": "_v", "type": "uint8" }, { "name": "_r", "type": "bytes32" }, { "name": "_s", "type": "bytes32" }], "name": "getSigner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": false, "inputs": [{ "name": "_minter", "type": "address" }], "name": "setMinter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "txHash", "type": "bytes32" }, { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }, { "indexed": false, "name": "_fee", "type": "uint256" }], "name": "TransferSigned", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "txHash", "type": "bytes32" }, { "indexed": true, "name": "txSender", "type": "address" }, { "indexed": false, "name": "message", "type": "string" }], "name": "Error", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }],
        exchange: [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_tknSell",
                        "type": "address"
                    },
                    {
                        "name": "_tknBuy",
                        "type": "address"
                    },
                    {
                        "name": "_cell",
                        "type": "uint256"
                    }
                ],
                "name": "cancelOrderAndCashOut",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_tknSell",
                        "type": "address"
                    },
                    {
                        "name": "_tknBuy",
                        "type": "address"
                    },
                    {
                        "name": "_cell",
                        "type": "uint256"
                    },
                    {
                        "name": "_nonce",
                        "type": "uint256"
                    },
                    {
                        "name": "_fee",
                        "type": "uint256"
                    },
                    {
                        "name": "_v",
                        "type": "uint8"
                    },
                    {
                        "name": "_r",
                        "type": "bytes32"
                    },
                    {
                        "name": "_s",
                        "type": "bytes32"
                    }
                ],
                "name": "cancelOrderAndCashOutSig",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_token",
                        "type": "address"
                    }
                ],
                "name": "cashOutAll",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_token",
                        "type": "address"
                    },
                    {
                        "name": "_am",
                        "type": "uint256"
                    }
                ],
                "name": "cashOutPart",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_token",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    },
                    {
                        "name": "_fee",
                        "type": "uint256"
                    },
                    {
                        "name": "_nonce",
                        "type": "uint256"
                    },
                    {
                        "name": "_v",
                        "type": "uint8"
                    },
                    {
                        "name": "_r",
                        "type": "bytes32"
                    },
                    {
                        "name": "_s",
                        "type": "bytes32"
                    }
                ],
                "name": "cashOutSig",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "buyer",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "tokenSold",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "amSold",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "tokenBought",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "amBought",
                        "type": "uint256"
                    }
                ],
                "name": "Deal",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_token",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    },
                    {
                        "name": "_fee",
                        "type": "uint256"
                    },
                    {
                        "name": "_unxTime",
                        "type": "uint256"
                    },
                    {
                        "name": "_v",
                        "type": "uint8"
                    },
                    {
                        "name": "_r",
                        "type": "bytes32"
                    },
                    {
                        "name": "_s",
                        "type": "bytes32"
                    }
                ],
                "name": "deposit",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_v",
                        "type": "uint8"
                    },
                    {
                        "name": "_Dv",
                        "type": "uint8"
                    },
                    {
                        "name": "_rs",
                        "type": "bytes32[4]"
                    },
                    {
                        "name": "_u256",
                        "type": "uint256[5]"
                    },
                    {
                        "name": "_tknSell",
                        "type": "address"
                    },
                    {
                        "name": "_tknBuy",
                        "type": "address"
                    }
                ],
                "name": "depositAndPlaceOrderSig",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_token",
                        "type": "address"
                    },
                    {
                        "name": "_sender",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "depositERC20",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "tokenToSell",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "amToSell",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "quote",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "name": "tokenToBuy",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "amToBuy",
                        "type": "uint256"
                    }
                ],
                "name": "OrderSent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "func",
                        "type": "string"
                    },
                    {
                        "indexed": true,
                        "name": "txSender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "message",
                        "type": "string"
                    }
                ],
                "name": "Error",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_tknSell",
                        "type": "address"
                    },
                    {
                        "name": "_tknBuy",
                        "type": "address"
                    },
                    {
                        "name": "_price",
                        "type": "uint256"
                    },
                    {
                        "name": "_am",
                        "type": "uint256"
                    },
                    {
                        "name": "_cell",
                        "type": "uint256"
                    }
                ],
                "name": "placeOrder",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_v",
                        "type": "uint8"
                    },
                    {
                        "name": "_r",
                        "type": "bytes32"
                    },
                    {
                        "name": "_s",
                        "type": "bytes32"
                    },
                    {
                        "name": "_nonce",
                        "type": "uint256"
                    },
                    {
                        "name": "_price",
                        "type": "uint256"
                    },
                    {
                        "name": "_amount",
                        "type": "uint256"
                    },
                    {
                        "name": "_cell",
                        "type": "uint256"
                    },
                    {
                        "name": "_fee",
                        "type": "uint256"
                    },
                    {
                        "name": "_tknSell",
                        "type": "address"
                    },
                    {
                        "name": "_tknBuy",
                        "type": "address"
                    }
                ],
                "name": "placeOrderSig",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_tknSell",
                        "type": "address"
                    },
                    {
                        "name": "_tknBuy",
                        "type": "address"
                    },
                    {
                        "name": "_cell",
                        "type": "uint256"
                    },
                    {
                        "name": "_am",
                        "type": "uint256"
                    }
                ],
                "name": "trade",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_tknSellBuy",
                        "type": "address[2]"
                    },
                    {
                        "name": "_v",
                        "type": "uint8[2]"
                    },
                    {
                        "name": "_rs",
                        "type": "bytes32[4]"
                    },
                    {
                        "name": "_u256",
                        "type": "uint256[]"
                    }
                ],
                "name": "tradesDirect",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_v",
                        "type": "uint8"
                    },
                    {
                        "name": "_r",
                        "type": "bytes32"
                    },
                    {
                        "name": "_s",
                        "type": "bytes32"
                    },
                    {
                        "name": "_nonce",
                        "type": "uint256"
                    },
                    {
                        "name": "_fee",
                        "type": "uint256"
                    },
                    {
                        "name": "_tknSell",
                        "type": "address"
                    },
                    {
                        "name": "_tknBuy",
                        "type": "address"
                    },
                    {
                        "name": "_cell",
                        "type": "uint256"
                    },
                    {
                        "name": "_am",
                        "type": "uint256"
                    }
                ],
                "name": "tradeSig",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_v",
                        "type": "uint8"
                    },
                    {
                        "name": "_r",
                        "type": "bytes32"
                    },
                    {
                        "name": "_s",
                        "type": "bytes32"
                    },
                    {
                        "name": "_nonce",
                        "type": "uint256"
                    },
                    {
                        "name": "_fee",
                        "type": "uint256"
                    },
                    {
                        "name": "_tknSell",
                        "type": "address"
                    },
                    {
                        "name": "_tknBuy",
                        "type": "address"
                    },
                    {
                        "name": "_cells",
                        "type": "uint256[]"
                    },
                    {
                        "name": "_ams",
                        "type": "uint256[]"
                    }
                ],
                "name": "tradesSig",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "payable": true,
                "stateMutability": "payable",
                "type": "fallback"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    },
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balances",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "offer",
                        "type": "address"
                    },
                    {
                        "name": "req",
                        "type": "address"
                    }
                ],
                "name": "getFreeCell",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_tknSell",
                        "type": "address"
                    },
                    {
                        "name": "_tknBuy",
                        "type": "address"
                    }
                ],
                "name": "getOderBookAmounts",
                "outputs": [
                    {
                        "name": "amounts",
                        "type": "uint256[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_tknSell",
                        "type": "address"
                    },
                    {
                        "name": "_tknBuy",
                        "type": "address"
                    }
                ],
                "name": "getOderBookPrices",
                "outputs": [
                    {
                        "name": "prices",
                        "type": "uint256[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_tknSell",
                        "type": "address"
                    },
                    {
                        "name": "_tknBuy",
                        "type": "address"
                    }
                ],
                "name": "getOrderBookLength",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hashMsg",
                        "type": "bytes32"
                    },
                    {
                        "name": "_v",
                        "type": "uint8"
                    },
                    {
                        "name": "_r",
                        "type": "bytes32"
                    },
                    {
                        "name": "_s",
                        "type": "bytes32"
                    }
                ],
                "name": "getSigner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "MULTIPLICATOR",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    },
                    {
                        "name": "",
                        "type": "address"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "orderBook",
                "outputs": [
                    {
                        "name": "Sender",
                        "type": "address"
                    },
                    {
                        "name": "Amount",
                        "type": "uint256"
                    },
                    {
                        "name": "Price",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "name": "status",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ],
        storage: [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "key",
                        "type": "bytes32"
                    },
                    {
                        "name": "value",
                        "type": "bytes32[]"
                    }
                ],
                "name": "setArray",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "key",
                        "type": "bytes32"
                    },
                    {
                        "name": "value",
                        "type": "string"
                    }
                ],
                "name": "setLine",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "key",
                        "type": "bytes32"
                    },
                    {
                        "name": "idx",
                        "type": "uint256"
                    },
                    {
                        "name": "value",
                        "type": "bytes32"
                    }
                ],
                "name": "setValueInArray",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "bytes32"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "array",
                "outputs": [
                    {
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "adr",
                        "type": "address"
                    },
                    {
                        "name": "key",
                        "type": "bytes32"
                    }
                ],
                "name": "getArray",
                "outputs": [
                    {
                        "name": "",
                        "type": "bytes32[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "bytes32"
                    }
                ],
                "name": "line",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]
    };

    this.ctr = {
        RSH: web3.eth.contract(this.abi.LT).at(this.address.RSH),
        B3N: web3.eth.contract(this.abi.LT).at(this.address.B3N),
        SWH: web3.eth.contract(this.abi.LT).at(this.address.SWH),
        BTL: web3.eth.contract(this.abi.LT).at(this.address.BTL),
        CAR: web3.eth.contract(this.abi.LT).at(this.address.CAR),
        exchange: web3.eth.contract(this.abi.exchange).at(this.address.exchange),
        storage: web3.eth.contract(this.abi.storage).at(this.address.storage)
    };
};

Contracts.prototype.getContract = function (address) {
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

module.exports = Contracts;