const express = require('express'); // import express
const cors = require('cors');
// const mongoose = require('mongoose'); // import mongoose
const bodyParser = require('body-parser') // import bodyParser
const app = express();
const path = require('path');
app.use(cors());
const connectToDatabase = require('./db');
const auth = require('./routes/auth'); // import auth route
const authModel = require('./models/userModel'); // import authModel

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // hosting port or local port


app.get('/', async (req, res) => {
  const data = await authModel.find({});
  res.send({category: data});
  console.log('jjjj');
});
app.post('/', async (req, res) => {
  try {
    const query = {userName: req.body.userName};
    const data = await authModel.find(query);
    res.send({category: data});
  } catch (error) {
    console.log(error);
  }
});

app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', auth);

connectToDatabase(); // connect to database
// run server

app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});
