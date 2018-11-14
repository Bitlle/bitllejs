/**
 * @file nodeHealth.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Alexey Saliuk <alexey.saliuk@bitlle.network>
 * @site bitlle.network
 * @date 2018
 */

var NodeHealth = function (web3) {
    this.web3 = web3;
}

var maxDelaySec = 60;

NodeHealth.prototype.check = function() {
    console.log("\ncheck node status...");
    var lastBlock = this.web3.eth.getBlock('latest');
    console.log("last block:", lastBlock.number);
    console.log("timeStamp:", lastBlock.timestamp);
    var localTime = Date.now() / 1000;
    console.log("localTime:", localTime);
    var delay = localTime - lastBlock.timestamp;
    var exist = delay > maxDelaySec;
    if (exist) console.log("ACHTUNG ACHTUNG node delay", delay, "seconds");
    return exist;
}


module.exports = NodeHealth;