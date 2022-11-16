const express = require('express');
//Bring in the user model
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Step 1: Create an account
router.post('/register', async (req, res) => {
  const { user_email, user_password } = req.body;
  console.log('REQUEST BODY - Register: ', req.body);

  let user = await User.findOne({ user_email });
  if (user) {
    return res.status(400).send('Email already exists');
  }

  try {
    user = new User(req.body);
    //Hash the password
    user.user_password = await bcrypt.hash(user_password, 10);
    //Save the user in the database
    await user.save();
    //return a success message
    res.status(201).send('User created successfully');
  } catch (e) {
    res.status(400).send(e);
  }
});

//Step 2: Login
router.post('/login', async (req, res) => {
  console.log('REQUEST BODY - Login: ', req.body);

  try {
    let user = await User.findOne({ user_email: req.body.user_email });
    if (!user) {
      return res.status(400).send('No user with this email address exists');
    }
    //Check if the password is correct (hashed)
    const isMatch = await bcrypt.compare(
      req.body.user_password,
      user.user_password
    );
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }
    //in order to not return hashed password in the response
    const { user_password, ...rest } = user.toObject();
    return res.send(rest);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
