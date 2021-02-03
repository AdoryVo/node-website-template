/* ---------- MODULES ---------- */
const chalk = require('chalk');
const express = require('express');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

/* ---------- CUSTOM MODULES ---------- */

/* ---------- CONSTANTS ---------- */
const router = express.Router();
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/* ---------- FUNCTIONS  ---------- */
function logCall(route) {
    console.log(chalk.yellow.bold(`Webpage Call: ${route} at ${new Date().toUTCString()}`));
}

/* ---------- REQUEST METHODS ---------- */
router.get('/', async (req, res) => {
    logCall('/');

    res.render('../views/index.ejs');
});

router.get('/error', (req, res) => {
    logCall('/error');

    res.render('../views/404.ejs');
});

module.exports = router;