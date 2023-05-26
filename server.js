const express = require('express'); // import express
const cors = require('cors')
const mongoose = require('mongoose'); // import mongoose
const authModel = require('./models/userModel') // import authModel
const app = express();
const path = require('path');
app.use(cors())
const db = require('./db'); // import db.js
const auth = require('./routes/auth') // import auth route
const bodyParser = require('body-parser') // import bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());




// app.use(express.static(path.join(__dirname, "public")));


app.use('/auth', auth);
app.get('/', async (req, res) => {
    try {
        const data = await authModel.find({}).maxTimeMS(90000);
        res.send({ category: data });
        console.log('get')
    } catch (error) {
        console.log(error, 'err')
    }
});
app.post('/', async (req, res) => {
    try {
        const query = { userName: req.body.userName };
        const data = await authModel.find(query).maxTimeMS(90000);
        res.send({ category: data });
        console.log('post')
    } catch (error) {
        console.log(error, 'err')
    }
});
const port = process.env.PORT || 3000; // hosting port or local port

// run server
app.listen(port, () => {
    console.log(`server is running on: ${port}`)
    // connectDB();
    const db = 'mongodb+srv://migara:game1994@unilog.z3swk.mongodb.net/derana?retryWrites=true&w=majority';

    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
})