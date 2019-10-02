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
    if (config.GasStation.GS1.version != '0.3.2') throw new Error('iGasStation ERROR: unknown GS1 contract version');//maybe need update the ABI


    //GasStation1 wrapper

    GS1.abi = config.GS1;

    GS1.contract = web3.eth.contract(GS1.abi);

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