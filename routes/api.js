/* ---------- MODULES ---------- */
const bodyParser = require('body-parser');
const createDOMPurify = require('dompurify');
const express = require('express');
const { JSDOM } = require('jsdom');
const mongoose = require('mongoose');
const path = require('path');

/* ---------- CONSTANTS ---------- */
const app = express();
const DB_NAME = 'node-website-template';
const router = express.Router();
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window); // Use DOMPurify.sanitize(dirty) on inputs

/* ---------- FUNCTIONS ---------- */
function logCall(route) {
    console.log(`API Call: ${route} at ${new Date().toUTCString()}`);
}

/* ---------- INITIALIZATION ---------- */
/* ----- Express ----- */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

/* ----- Mongoose ----- */
mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch((err) => console.log(err));
const UserModel = require('../models/UserModel');

/* ---------- ROUTES ---------- */
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

router.get('/users', (req, res) => {
    logCall('GET /api/users');

    UserModel.find()
        .then((users) => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/createUser', async (req, res) => {
    logCall('POST /api/createUser');

    const name = req.body.name;

    const user = new UserModel({
        name
    });

    user.save()
        .then(() => res.redirect('/users'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/getUser/:id', (req, res) => {
    logCall('GET /api/getUser');

    UserModel.findById(req.params.id)
        .then((user) => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/updateUser/:id', (req, res) => {
    logCall('POST /api/updateUser');

    UserModel.findById(req.params.id)
        .then((user) => {
            user.name = req.body.name;

            user.save()
                .then(() => res.redirect('/users'))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/deleteUser/:id', (req, res) => {
    logCall('DELETE /api/deleteUser');

    UserModel.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/users'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;