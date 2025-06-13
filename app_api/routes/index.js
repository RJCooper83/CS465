const express = require("express"); // Express App
const router = express.Router(); // Router Logic

// Import controllers we will route
const tripsController = require('../controllers/trips');

// Define route for trips endpoint
router
	.route("/trips")
	.get(tripsController.tripsList) //GET method returns triplist
	.post(tripsController.tripAddTrip) // POST methode adds a trip

// GET method routes tripsByCode
// PUT method routes tripsUpdateTrip
// DELETE method 
router
	.route('/trips/:tripCode')
	.get(tripsController.tripsFindByCode)
	.put(tripsController.tripsUpdateTrip)
	.delete(tripsController.tripsDeleteTrip); // DELETE method deletes a trip

module.exports = router;