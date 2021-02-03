/* ---------- MODULES ---------- */
const DOTENV_RESULT = require('dotenv').config();
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

/* ---------- CUSTOM MODULES ---------- */


/* ---------- CONSTANTS ---------- */
const app = express();
const port = process.env.PORT || 3000; // Port 3000 -> localhost:3000

/* ---------- FUNCTIONS ---------- */

/* ---------- INITIALIZATION ---------- */
/* ----- Dotenv ----- */

/* ----- Express ----- */
app.use(express.static(__dirname + '/dist')); // url path begins at /dist
app.use(favicon(path.join(__dirname, 'dist', 'images', 'favicon.ico'))); // go to http://localhost:3000/images/favicon.ico to refresh icon

// updatePackages() // For updating jQuery and Bootstrap CSS and JS files

/* ---------- ROUTES ---------- */
app.use('/', require('./routes/index.js'));
app.use('/api', require('./routes/api.js'));

/* ---------- LAUNCH ---------- */
app.listen(port, () => console.log(`Server running at http://localhost:${port}/\n`));