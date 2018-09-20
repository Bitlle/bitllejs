/**
 * @file account.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Ale Xau <ale@xau.io>
 * @site bitlle.network
 * @date 2018
 */

const createKeccakHash = require('keccak');
const kUtils = require('keythereum');

var Account = function () {
    this._Sha3HM_buffer = function (value) {
        return createKeccakHash('keccak256').update(value).digest();
    };

    this._createKeyStore = function (buffer_privateKey, password) {
        var dk = kUtils.create();
        dk.privateKey = buffer_privateKey;

        var options = {
            kdf: "pbkdf2",
            cipher: "aes-128-ctr",
            kdfparams: {
                c: 2621,
                dklen: 32,
                prf: "hmac-sha256"
            }
        };

        return kUtils.dump(password, dk.privateKey, dk.salt, dk.iv, options);
    };
};

/**
 * Create JSON file an email address with salt and password encryption
 *
 * @method create
 * @param {String} email
 * @param {String} password
 * @param {Boolean} returnPrivateKey
 * @return {Object}
 */
Account.prototype.create = function (email, password, returnPrivateKey) {
    var privateKey = this._Sha3HM_buffer(email.toString() + password.toString() + Math.random().toString() + Date.now().toString());

    if (returnPrivateKey !== undefined)
        return {
            json: this._createKeyStore(privateKey, password),
            privateKey: '0x' + privateKey.toString('hex')
        };
    else
        return this._createKeyStore(privateKey, password);
};

/**
 * Receiving a private key for JSON file and password
 *
 * @method getPrivateKey
 * @param {String} password
 * @param {Object} jsonFile
 * @return {String}
 */
Account.prototype.getPrivateKey = function (password, jsonFile) {
    var privateKey = kUtils.recover(password.toString(), jsonFile);
    return privateKey.toString('hex');
};

/**
 * Change the encryption password for the JSON file
 *
 * @method getPrivateKey
 * @param {Object} jsonFile
 * @param {String} oldPassword
 * @param {String} newPassword
 * @return {Object}
 */
Account.prototype.changePassword = function (jsonFile, oldPassword, newPassword) {
    var privateKey = kUtils.recover(oldPassword, jsonFile);
    return this._createKeyStore(privateKey, newPassword);
};

module.exports = Account;