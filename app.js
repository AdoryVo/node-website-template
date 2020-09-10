/* ---------- PACKAGES ---------- */
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const passport = require('passport');

/* ---------- CUSTOM MODULES ---------- */
const mysqlPlus = require('./mysql-plus.js');

/* ---------- CONSTANTS ---------- */
const app = express();
const hostname = 'localhost';
const port = 3000; // Port 3000 -> localhost:3000

const con = mysql.createConnection({
    host: hostname,
    user: 'root',
    password: ''
});

/* ---------- FUNCTIONS ---------- */
const { updatePackages } = require('./update-packages.js');

/* ---------- INITIALIZATION ---------- */
app.use(express.static(__dirname + '/public')); // url path begins at /public
app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico'))); // go to http://localhost:3000/favicon.ico to refresh icon

// Passport Config
require('./passport-config.js')(passport);

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

/* ---------- ROUTES ---------- */
app.use('/', require('./routes/index.js'));

/* ---------- MYSQL QUERIES ---------- */
mysqlPlus.use(con);

//mysqlPlus.createDB('project-name');
//mysqlPlus.conDB('project-name');
mysqlPlus.showDBs();

//mysqlPlus.createTable('users', {username: 'str', email: 'str', password: 'str'});

/* ---------- LAUNCH ---------- */
app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/\n`));