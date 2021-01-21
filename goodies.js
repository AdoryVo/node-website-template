const bcrypt = require('bcrypt');

const salt = '$2b$09$Du8h37fka95b/z10cne8og'; // use bcrypt.genSalt(saltRounds) to make new salt

/**
 * Encrypts an input using bcrypt and removes its salt from the value to prevent cracking.
 * @param {string} input
 * @return {string}
 */
exports.encrypt = (input) => {
    return bcrypt.hashSync(input, salt).substring(salt.length);
}