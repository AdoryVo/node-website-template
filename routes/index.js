/* ---------- MODULES ---------- */
const express = require('express');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

/* ---------- CUSTOM MODULES ---------- */

/* ---------- CONSTANTS ---------- */
const router = express.Router();
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/* ---------- FUNCTIONS  ---------- */

/* ---------- REQUEST METHODS ---------- */
router.get('/', async (req, res) => {
    res.render('../views/index.ejs');
});

router.get('/error', (req, res) => {
    res.render('../views/404.ejs');
});

module.exports = router;