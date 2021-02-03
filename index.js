/* ---------- MODULES ---------- */
const bodyParser = require('body-parser');
const chalk = require('chalk');
const compression = require('compression');
const DOTENV_RESULT = require('dotenv').config();
const express = require('express');
const favicon = require('serve-favicon');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');

/* ---------- CUSTOM MODULES ---------- */


/* ---------- CONSTANTS ---------- */
const app = express();
const port = process.env.PORT || 3000; // Port 3000 -> localhost:3000

/* ---------- FUNCTIONS ---------- */

/* ---------- INITIALIZATION ---------- */
/* ----- Dotenv ----- */
if (DOTENV_RESULT.error) {
    console.error(chalk.red(`${DOTENV_RESULT.error}`))
}

/* ----- Express ----- */
app.use(compression()); // compress all responses
app.use(express.static(__dirname + '/dist')); // url path begins at /dist
app.use(favicon(path.join(__dirname, 'dist', 'images', 'favicon.ico'))); // go to http://localhost:3000/images/favicon.ico to refresh icon
app.use(session({
    name: 'qid',
    secret: process.env.SESSION_SECRET || 'dQw4w9WgXcQ',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 2 * 365 // 2 years
    }
}));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

/* ---------- ROUTES ---------- */
app.use('/', require('./routes/index.js'));
app.use('/api', require('./routes/api.js'));

// Redirect invalid pages
app.use((req, res) => {
    res.status(404);

    res.format({
        html: () => {
            console.error(chalk.red.bold(`Error 404: Requested page ${req.originalUrl}`));
            res.redirect('/error');
        },
        json: () => {
            res.json({error: 'Not found'})
        },
        default: () => {
            res.type('txt').send('Not found')
        }
    })
});

/* ---------- LAUNCH ---------- */
app.listen(port, () => {
    console.log(chalk.blue(`🚀 Server running at http://localhost:${port}/`));
    console.log(chalk.green('📝 Setup and details for this template: https://github.com/AdoryVo/node-website-template\n'));
});