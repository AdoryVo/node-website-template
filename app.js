/* ---------- PACKAGES ---------- */
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');

/* ---------- CUSTOM MODULES ---------- */


/* ---------- CONSTANTS ---------- */
const app = express();
const hostname = 'localhost';
const port = 3000; // Port 3000 -> localhost:3000

/* ---------- FUNCTIONS ---------- */
const { updatePackages } = require('./update-packages.js');

/* ---------- INITIALIZATION ---------- */
app.use(express.static(__dirname + '/public')); // url path begins at /public
app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico'))); // go to http://localhost:3000/favicon.ico to refresh icon

// updatePackages() // For updating jQuery and Bootstrap CSS and JS files

/* ---------- ROUTES ---------- */
app.use('/', require('./routes/index.js'));

/* ---------- LAUNCH ---------- */
app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/\n`));