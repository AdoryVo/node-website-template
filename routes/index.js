/* ---------- PACKAGES ---------- */
const express = require('express');
const path = require('path');
const passport = require('passport');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

/* ---------- CUSTOM MODULES ---------- */
const goodies = require('../goodies.js');
const mysqlPlus = require('../mysql-plus.js');

/* ---------- CONSTANTS ---------- */
const router = express.Router();
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const sanitize = DOMPurify.sanitize;

/* ---------- REQUEST METHODS ---------- */
router.get('/', async (req, res) => {
    res.sendFile(path.join(process.cwd(), 'www', 'index.html'));
});

module.exports = router;