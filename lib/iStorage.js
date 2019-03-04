
var bitlleJs;
var iStorage = function (_bitlleJs) {

    bitlleJs = _bitlleJs;


    function getKey(address, keySting) {
        var key = (bitlleJs.web3.toHex(keySting) + "0000000000000000000000000000000000000000000000000000000000000000").substr(0, 66);
        var corrParam = "" + address + key.slice(2);
        return bitlleJs.web3.sha3(corrParam, { encoding: 'hex' });
    }
}

iStorage.prototype.getArray = function (address, value, callback) {
    if (callback) {
        bitlleJs.contracts.ctr.storage.getArray(address, value, callback);
    } else return bitlleJs.contracts.ctr.storage.getArray(address, value);
}

iStorage.prototype.getStringArray = function (address, value, callback) {
    var res = [];
    if (callback) {
        bitlleJs.contracts.ctr.storage.getArray(address, value, (err, arr) => {
            if (err) return callback(err.message);
            if (!arr) return res;
            else {
                arr.forEach(element => {
                    res.push(bitlleJs.web3.toAscii(element).replace(/\u0000/g, ''));
                });
                return res;
            }
        });
    } else {
        var arr = bitlleJs.contracts.ctr.storage.getArray(address, value);
        arr.forEach(element => {
            res.push(bitlleJs.web3.toAscii(element).replace(/\u0000/g, ''));
        });
        return res;
    }
}



module.exports = iStorage;