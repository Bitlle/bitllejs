var path = require('path');
var config = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: 'bitllejs.js'
    },
    devtool: "eval-sourcemap",
    node: {
        fs: "empty"
    }
};
module.exports = function(evn, options) {
    var mode = options.mode === 'production';
    config.devtool = mode ? false : "eval-sourcemap";
    return config
};