/* ---------- MODULES ---------- */
const createDOMPurify = require('dompurify');
const express = require('express');
const { JSDOM } = require('jsdom');
const mongoose = require('mongoose');
const path = require('path');

/* ---------- CONSTANTS ---------- */
const app = express();
const DB_NAME = 'node-website-template';
const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/${DB_NAME}`;
const router = express.Router();
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window); // Use DOMPurify.sanitize(dirty) on inputs

/* ---------- FUNCTIONS ---------- */
function logCall(route) {
    console.log(`API Call: ${route} at ${new Date().toUTCString()}`);
}

/* ---------- INITIALIZATION ---------- */
/* ----- Express ----- */


/* ----- Mongoose ----- */
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch((err) => console.log(err));
const User = require('../models/User');

/* ---------- ROUTES ---------- */
// GET /api - Show API documentation.
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'api-docs.html'));
});

// GET /api/users - Gets a JSON of all users.
router.get('/users', (req, res) => {
    logCall('GET /api/users');

    User.find()
        .then((users) => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST /api/createUser - Create a user.
router.post('/createUser', async (req, res) => {
    logCall('POST /api/createUser');

    const name = DOMPurify.sanitize(req.body.name);

    const user = new User({
        name
    });

    user.save()
        .then(() => res.redirect('/users'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET /api/getUser/:id - Get a JSON of a user's data.
router.get('/getUser/:id', (req, res) => {
    logCall('GET /api/getUser');

    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})

// POST /api/updateUser/:id - Update a user.
router.post('/updateUser/:id', (req, res) => {
    logCall('POST /api/updateUser');

    User.findById(req.params.id)
        .then((user) => {
            user.name = DOMPurify.sanitize(req.body.name);

            user.save()
                .then(() => res.redirect('/users'))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

// DELETE /api/deleteUser/:id - Delete a user.
router.delete('/deleteUser/:id', (req, res) => {
    logCall('DELETE /api/deleteUser');

    User.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/users'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;