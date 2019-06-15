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
    if (config.GasStation.GS1.version != '0.2.1') throw new Error('iGasStation ERROR: unknown GS1 contract version');//maybe need update the ABI


    //GasStation1 wrapper

    GS1.contract = web3.eth.contract([{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "_totalSupply", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "RegisterGasTank", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "tankID", "type": "uint256" }, { "name": "value", "type": "uint256" }], "name": "Mine", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "tankID", "type": "uint256" }], "name": "FreeGasTank", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "tankID", "type": "uint256" }], "name": "GotBounty", "outputs": [{ "name": "result", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "newAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tankID", "type": "uint256" }, { "name": "value", "type": "uint256" }], "name": "Burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "tankID", "type": "uint256" }], "name": "CalcBounty", "outputs": [{ "name": "bounty", "type": "uint256" }, { "name": "untilEpoch", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "CustomCall", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "name": "owner", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "BountyPerEpoch", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "currentEpoch", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "ConfirmAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "tanksOfOwner", "outputs": [{ "name": "tanksId", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "GasTanks", "outputs": [{ "name": "owner", "type": "address" }, { "name": "cashOutEpoch", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "epochTotalMined", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newAdmin", "type": "address" }], "name": "ChangeAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "BountyToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "tankId", "type": "uint256" }], "name": "slotsOfTank", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tankID", "type": "uint256" }], "name": "GetBounty", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "StartBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "KillMe", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "BlockPerEpoch", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_blockPerEpoch", "type": "uint256" }, { "name": "_bountyPerEpoch", "type": "uint256" }, { "name": "_token", "type": "address" }], "name": "ChangeBountyParam", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "slotsOfOwner", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokenMetadata", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": true, "name": "_tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_approved", "type": "address" }, { "indexed": true, "name": "_tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_operator", "type": "address" }, { "indexed": false, "name": "_approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }]);

    GS1.contract = GS1.contract.at(config.GasStation.GS1.address);

    //static call functions
    GS1.address = GS1.contract.address;

    GS1.tanksOfOwner = function (owner, callback) {
        if (callback) GS1.contract.tanksOfOwner(owner, callback);
        else return GS1.contract.tanksOfOwner(owner);
    }

    GS1.ownerOf = function (id, callback) {
        if (callback) GS1.contract.ownerOf(id, callback);
        else return GS1.contract.ownerOf(id);
    }

    GS1.currentEpoch = function (callback) {
        if (callback) GS1.contract.currentEpoch(callback);
        else return GS1.contract.currentEpoch();
    }

    GS1.calcBounty = function (tankID, callback) {
        var res = { bounty: 0, untilEpoch: 0 }
        if (callback) {
            GS1.contract.CalcBounty(tankID, (e, r) => {
                if (e) {
                    callback(e);
                } else {
                    res.bounty = r[0];
                    res.untilEpoch = r[1];
                    callback(null, res);
                }
            });
        }
        else {
            var response = GS1.contract.CalcBounty(tankID);
            res.bounty = response[0];
            res.untilEpoch = response[1];
            return res;
        }
    }

    //call functions
    GS1.registerGasTank = function (privateKey, callback) {
        var txData = GS1.contract.RegisterGasTank.getData();
        if (callback) bitlleJs.txSender.sendAsync(GS1.contract.address, null, txData, privateKey, null, null, null, callback);
        else bitlleJs.txSender.sendAsync(GS1.contract.address, null, txData, privateKey);
    }

    GS1.mine = function (tankID, value, privateKey, callback) {
        var txData = GS1.contract.Mine.getData(tankID, value);
        if (callback) bitlleJs.txSender.sendAsync(GS1.contract.address, null, txData, privateKey, null, null, null, callback);
        else bitlleJs.txSender.sendAsync(GS1.contract.address, null, txData, privateKey);
    }

    GS1.getBounty = function (tankID, privateKey, callback) {
        var txData = GS1.contract.GetBounty.getData(tankID);
        if (callback) bitlleJs.txSender.sendAsync(GS1.contract.address, null, txData, privateKey, null, null, null, callback);
        else bitlleJs.txSender.sendAsync(GS1.contract.address, null, txData, privateKey);
    }

}


GasStation.prototype.getGasTanks = async function (owner, callback) {

}

GasStation.prototype.registerGasTank = function () {

}

GasStation.prototype.GS1 = GS1;

module.exports = GasStation;