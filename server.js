const express = require('express'); // import express
const app = express();
const path = require('path');
const db = require('./db'); // import db.js
const auth = require('./routes/auth') // import auth route
const bodyParser = require('body-parser') // import bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



const port = process.env.PORT || 3000; // hosting port or local port
app.get('/', (req, res) => {
    res.send({ category: 'migaraaaa' });
    console.log('jjjj')
});

app.use(express.static(path.join(__dirname, "public")));


app.use('/auth', auth);

// run server
app.listen(port, () => {
    console.log(`server is running on: ${port}`)
    connectDB();
})