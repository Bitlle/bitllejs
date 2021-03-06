/**
 * @file account.js
 * @author Denis Kashargin <denis@kashargin.ru>
 * @author Alexey Saliuk <alexey.saliuk@bitlle.network>
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
 * Returns the json file with the encrypted password private key.
 * When returnPrivateKey == true returns a JSON object with an open private key and JSON with an encrypted private key.
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
 * Returns the json file with the encrypted password private key.
 * When returnPrivateKey == true returns a JSON object with an open private key and JSON with an encrypted private key.
 *
 * @method create
 * @param {String} email
 * @param {String} password
 * @param {Boolean} returnPrivateKey
 * @param {String} salt
 * @return {Object}
 */
Account.prototype.createWithSalt = function (salt = '', password, returnPrivateKey) {
    var privateKey = this._Sha3HM_buffer(salt.toString() + password.toString());

    if (returnPrivateKey !== undefined)
        return {
            json: this._createKeyStore(privateKey, password),
            privateKey: '0x' + privateKey.toString('hex')
        };
    else
        return this._createKeyStore(privateKey, password);
};

/**
 * Returns a private key from JSON with an encrypted key and password
 *
 * @method getPrivateKey
 * @param {String} password
 * @param {Object} jsonFile
 * @return {String}
 */
Account.prototype.getPrivateKey = function (password, jsonFile) {
    var privateKey = kUtils.recover(password.toString(), jsonFile);
    return '0x' + privateKey.toString('hex');
};

/**
 * Returns JSON, encrypted with a new password
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