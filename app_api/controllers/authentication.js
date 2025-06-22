const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

const register = async (req, res) => {
  // Validate message to ensure that all parameters are present
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'All fields required' });
  }

  // Create new user object
  const user = new User({
    name: req.body.name,
    email: req.body.email
    // password is handled separately via hashing
  });

  // Set hashed password
  user.setPassword(req.body.password);

  // DEBUG: Log the JWT secret used
  // console.log("JWT_SECRET (raw):", JSON.stringify(process.env.JWT_SECRET));

  try {
    const q = await user.save();

    if (!q) {
      // If save failed, return error
      return res
        .status(400)
        .json({ message: 'Error saving user' });
    } else {
      // Return JWT if successful
      const token = user.generateJWT();
      return res
        .status(200)
        .json({ token });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message });
  }
};


// Validate message to ensure that email and password are present
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "All fields required" });
  }

  // Authentication to passpord module
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }

    // Authentication success generate JWT and return to caller
    if (user) {
      const token = user.generateJWT();
      return res.status(200).json({ token });
    } else {
      return res.status(401).json(info);
    }
  })(req, res);
};

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden – token is invalid
      }
      req.user = user; // Optionally store user data in req
      next(); // Proceed to the route handler
    });
  } else {
    res.sendStatus(401); // Unauthorized – no token
  }
};

module.exports = {
  register,
  login,
  authenticateJWT
};
