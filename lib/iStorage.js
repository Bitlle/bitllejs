
var bitlleJs;
var iStorage = function (_bitlleJs) {

    bitlleJs = _bitlleJs;

    
    function getKey(address, keySting) {
        var key = (bitlleJs.web3.toHex(keySting) + "0000000000000000000000000000000000000000000000000000000000000000").substr(0, 66);
        var corrParam = "" + address + key.slice(2);
        return bitlleJs.web3.sha3(corrParam, { encoding: 'hex' });
    }
}

iStorage.prototype.getArray = function(address, value) {
    return bitlleJs.contracts.ctr.storage.getArray(address, value);    
}

iStorage.prototype.getStringArray = function(address, value) {
    var res = [];
    var arr =  bitlleJs.contracts.ctr.storage.getArray(address, value);    
    arr.forEach(element => {
       res.push(bitlleJs.web3.toAscii(element).replace(/\u0000/g, '')); 
    });
    return res;
}



module.exports = iStorage;