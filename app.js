// PACKAGES
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const path = require('path');

// CUSTOM MODULES
const mysqlPlus = require('./mysql-plus.js');
// const extraModules = require('./extra-modules');

// CONSTANTS
const app = express();
const hostname = 'localhost';
const port = 3000; // Port 3000 -> localhost:3000

const con = mysql.createConnection({
    host: hostname,
    user: 'root',
    password: ''
});

// FUNCTIONS
function updatePackages() {
    require('update-packages').update();
}

// INITIALIZATION
app.use(express.static(__dirname + '/public')); // url path begins at /public
app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico'))); // go to http://localhost:3000/favicon.ico to refresh icon

// - MySQL Setup
con.connect();
mysqlPlus.use(con);
/*
mysqlPlus.createDB('project-name');
mysqlPlus.conDB('project-name');
*/
mysqlPlus.showDBs();

app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/!`));