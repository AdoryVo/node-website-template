/* ---------- PACKAGES ---------- */
const LocalStrategy = require('passport-local').Strategy;

/* ---------- CUSTOM MODULES ---------- */
const mysqlPlus = require('../mysql-plus.js');
const goodies = require('../goodies.js');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'username'
        }, async (username, password, done) => {
            console.log('Authenticating signin attempt\n');

            const userMatch = await mysqlPlus.searchTable('users', 'username', username, {
                request: (result) => {
                    if (result.length) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });

            const passMatch = await mysqlPlus.searchTable('users', 'password', goodies.encrypt(password), {
                request: (result) => {
                    if (result.length) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });

            console.log('------------------------------END-----------------------------')

            if (userMatch && passMatch) {
                return done(null, username);
            } else {
                return done(null, false);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        done(null, id);
    });
};