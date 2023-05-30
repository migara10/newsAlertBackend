const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new Schema({
  _id: {
    type: Number,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: [true, 'username is required'],
    minLength: [6, 'minimum number in userName'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [isEmail, 'Email Not Valid'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minLength: [6, 'minimum number in password'],
  },
  role: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'editor',
  },
  isDeleted: {
    type: Boolean,
    default: false,
    /* validate: {
          validator: function (value) {
              return typeof value === 'boolean';
          },
          message: 'Invalid isDeleted value. Expected a boolean.'
      } */
  },
});

userSchema.plugin(AutoIncrement, {inc_field: '_id'});
const User = mongoose.model('userauths', userSchema); // save user in db
module.exports = User;
