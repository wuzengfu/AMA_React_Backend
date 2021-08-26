const {customAlphabet} = require("nanoid");

function generateSession(size = 10) {
    const customize = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return customAlphabet(customize, size)();
}

module.exports = generateSession;
