const express = require("express"); // Express App
const router = express.Router(); // Router Logic
const jwt = require('jsonwebtoken'); // Enable JSON web tokens

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
  // console.log('In Middleware');
  
  const authHeader = req.headers['authorization'];
  // console.log('Auth Header: ' + authHeader);

  if (authHeader == null) {
    console.log('Auth Header Required but NOT PRESENT!');
    return res.sendStatus(401);
  }

  let headers = authHeader.split(' ');
  if (headers.length < 2) {
    console.log('Not enough tokens in Auth Header: ' + headers.length);
    return res.sendStatus(501);
  }

  const token = headers[1];
  // console.log('Token: ' + token);

  if (token == null) {
    console.log('Null Bearer Token');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      console.log('Token Validation Error!');
      return res.status(401).json({ message: 'Token Validation Error!' });
    }
    req.auth = verified; // Attach decoded token to request
    next(); // Continue to the route handler
  });
}

// Import controllers we will route
const tripsController = require('../controllers/trips');
const authController = require("../controllers/authentication");

// Register User
router.route("/register").post(authController.register);
// Route for logging in
router.route("/login").post(authController.login);

// Define route for trips endpoint
router
	.route("/trips")
	.get(tripsController.tripsList) //GET method returns triplist
	.post(authenticateJWT, tripsController.tripAddTrip) // POST methode adds a trip

// GET method routes tripsByCode
// PUT method routes tripsUpdateTrip
// DELETE method 
router
	.route('/trips/:tripCode')
	.get(tripsController.tripsFindByCode)
	.put(authenticateJWT, tripsController.tripsUpdateTrip)
	.delete(authenticateJWT, tripsController.tripsDeleteTrip); // DELETE method deletes a trip

module.exports = router;