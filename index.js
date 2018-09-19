var Bitllejs = require('./lib/bitllejs');

if (typeof window !== 'undefined' && typeof window.Bitllejs === 'undefined') {
    window.Bitllejs = Bitllejs;
}

module.exports = Bitllejs;