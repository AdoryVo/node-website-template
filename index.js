/* ---------- PACKAGES ---------- */
const dotenv_result = require('dotenv').config();
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

/* ---------- CUSTOM MODULES ---------- */


/* ---------- CONSTANTS ---------- */
const app = express();
const hostname = 'localhost';
const port = 3000 || process.env.PORT; // Port 3000 -> localhost:3000

/* ---------- FUNCTIONS ---------- */

/* ---------- INITIALIZATION ---------- */
/* ----- Dotenv ----- */
if (dotenv_result.error) {
    throw dotenv_result.error;
}

/* ----- Express ----- */
app.use(express.static(__dirname + '/dist')); // url path begins at /dist
app.use(favicon(path.join(__dirname, 'dist', 'images', 'favicon.ico'))); // go to http://localhost:3000/images/favicon.ico to refresh icon

// updatePackages() // For updating jQuery and Bootstrap CSS and JS files

/* ---------- ROUTES ---------- */
app.use('/', require('./routes/index.js'));
app.use('/api', require('./routes/api.js'));

/* ---------- LAUNCH ---------- */
app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/\n`));