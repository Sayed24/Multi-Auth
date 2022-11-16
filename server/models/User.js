//SCHEMA COMES IN FROM MONGOOSE
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    user_email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          throw new Error('Email is not valid');
        }
      },
    },
    user_password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
