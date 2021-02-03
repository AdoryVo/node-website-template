/* ---------- MODULES ---------- */
const bodyParser = require('body-parser');
const DOTENV_RESULT = require('dotenv').config();
const express = require('express');
const favicon = require('serve-favicon');
const methodOverride = require('method-override');
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
app.use((req, res, next) => {
    res.status(404);

    res.format({
        html: () => {
            res.redirect('/error');
        },
        json: function () {
            res.json({error: 'Not found'})
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    })
});

/* ---------- LAUNCH ---------- */
app.listen(port, () => console.log(`Server running at http://localhost:${port}/\n`));