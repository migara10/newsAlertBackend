const express = require('express'); // import express
const cors = require('cors')
const mongoose = require('mongoose'); // import mongoose
const app = express();
const path = require('path');
app.use(cors())
// const db = require('./db'); // import db.js
const auth = require('./routes/auth') // import auth route
const bodyParser = require('body-parser') // import bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const db = 'mongodb+srv://migara:game1994@unilog.z3swk.mongodb.net/derana?retryWrites=true&w=majority';

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const authModel = require('./models/userModel') // import authModel



const port = process.env.PORT || 3000; // hosting port or local port
app.get('/', async (req, res) => {
    const data = await authModel.find({}).maxTimeMS(20000);
    res.send({ category: data });
    console.log('jjjj')
});

app.use(express.static(path.join(__dirname, "public")));


app.use('/auth', auth);


// run server
app.listen(port, () => {
    console.log(`server is running on: ${port}`)
    // connectDB();
})