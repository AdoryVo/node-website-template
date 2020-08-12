const bcrypt = require('bcrypt');

const salt = '$2b$09$Du8h37fka95b/zbEcYR8og'; // use bcrypt.genSalt(saltRounds) to make new salt

function encrypt(input) {
    return bcrypt.hashSync(input, salt).substring(salt.length);
}