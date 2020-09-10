const bcrypt = require('bcrypt');

const salt = '$2b$09$Du8h37fka95b/z10cne8og'; // use bcrypt.genSalt(saltRounds) to make new salt

exports.encrypt = (input) => {
    return bcrypt.hashSync(input, salt).substring(salt.length);
}