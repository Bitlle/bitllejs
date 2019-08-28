/**
 * @file iGasStation.js
 * @author Alexey Saliuk <dev@saliuk.ru>
 * @site bitlle.network
 * @date 2019
 */


var bitlleJs, web3, config, GS1 = {};

var GasStation = function (_bitlleJs) {
    bitlleJs = _bitlleJs;
    web3 = bitlleJs.web3;
    config = bitlleJs.config;
    if (config.GasStation.GS1.version != '0.3.0') throw new Error('iGasStation ERROR: unknown GS1 contract version');//maybe need update the ABI


    //GasStation1 wrapper

    GS1.contract = web3.eth.contract([{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tankID", "type": "uint256" }, { "name": "value", "type": "uint256" }], "name": "mine", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "customCall", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "_totalSupply", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "tankID", "type": "uint256" }], "name": "gotBounty", "outputs": [{ "name": "result", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "bountyToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "newAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "startBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "tankID", "type": "uint256" }], "name": "calcBounty", "outputs": [{ "name": "bounty", "type": "uint256" }, { "name": "untilEpoch", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "bountyPerEpoch", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "name": "owner", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tankID", "type": "uint256" }], "name": "freeGasTank", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "currentEpoch", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "adr", "type": "address" }, { "name": "active", "type": "bool" }], "name": "setBitlleNetworkAddres", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "tanksOfOwner", "outputs": [{ "name": "tanksId", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "GasTanks", "outputs": [{ "name": "owner", "type": "address" }, { "name": "cashOutEpoch", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "epochTotalMined", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newAdmin", "type": "address" }], "name": "changeAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "tankId", "type": "uint256" }], "name": "slotsOfTank", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tankID", "type": "uint256" }, { "name": "value", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "killMe", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "registerGasTank", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_blockPerEpoch", "type": "uint256" }, { "name": "_bountyPerEpoch", "type": "uint256" }, { "name": "_token", "type": "address" }], "name": "changeBountyParam", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "tankID", "type": "uint256" }], "name": "getBounty", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "slotsOfOwner", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "blockPerEpoch", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "confirmAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "tokenMetadata", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": true, "name": "_tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_approved", "type": "address" }, { "indexed": true, "name": "_tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_operator", "type": "address" }, { "indexed": false, "name": "_approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }]);

    GS1.contract = GS1.contract.at(config.GasStation.GS1.address);

    //static call functions
    GS1.address = GS1.contract.address;

    GS1.tanksOfOwner = function (owner, callback) {
        if (callback) GS1.contract.tanksOfOwner(owner, callback);
        else {
            try {
                return GS1.contract.tanksOfOwner(owner);
            } catch (error) {
                return error;
            }
        }

    }

    GS1.ownerOf = function (id, callback) {
        if (callback) GS1.contract.ownerOf(id, callback);
        else {
            try {
                return GS1.contract.ownerOf(id);
            } catch (error) {
                return error;
            }
        }
    }

    GS1.currentEpoch = function (callback) {
        if (callback) GS1.contract.currentEpoch(callback);
        else {
            try {
                return GS1.contract.currentEpoch();
            } catch (error) {
                return error;
            }
        }
    }

    GS1.calcBounty = function (tankID, callback) {
        var res = { bounty: 0, untilEpoch: 0 }
        if (callback) {
            GS1.contract.calcBounty(tankID, (e, r) => {
                if (e) {
                    callback(e);
                } else {
                    res.bounty = r[0];
                    res.untilEpoch = r[1];
                    callback(null, res);
                }
            });
        } else {
            try {
                var response = GS1.contract.сalcBounty(tankID);
                res.bounty = response[0];
                res.untilEpoch = response[1];
                return res;
            } catch (error) {
                return error;
            }

        }
    }

    //call functions
    GS1.registerGasTank = function (privateKey, callback) {
        var param = {
            privateKey: privateKey,
            to: GS1.contract.address,
            msgData: GS1.contract.registerGasTank.getData(),
        }
        if (callback) bitlleJs.txSender.sendAnyWay(param, callback);
        else return bitlleJs.txSender.sendAnyWay(param);
    }

    GS1.mine = function (tankID, value, privateKey, callback) {
        var param = {
            privateKey: privateKey,
            to: GS1.contract.address,
            msgData: GS1.contract.mine.getData(tankID, value),
        }
        if (callback) bitlleJs.txSender.sendAnyWay(param, callback);
        else return bitlleJs.txSender.sendAnyWay(param);
    }

    GS1.getBounty = function (tankID, privateKey, callback) {
        var param = {
            privateKey: privateKey,
            to: GS1.contract.address,
            msgData: GS1.contract.getBounty.getData(tankID),
        }
        if (callback) bitlleJs.txSender.sendAnyWay(param, callback);
        else return bitlleJs.txSender.sendAnyWay(param);
    }

}


GasStation.prototype.getGasTanks = async function (owner, callback) {

}

GasStation.prototype.GS1 = GS1;

module.exports = GasStation;