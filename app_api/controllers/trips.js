const mongoose = require('mongoose');
const Trip = require('../models/travlr'); 
const Model = mongoose.model('trips');   

// GET: /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Model.find().exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trips' });
  }
};

// GET: /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Model.findOne({ code: req.params.tripCode }).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trip by code' });
  }
};

// POST: /api/trips
const tripAddTrip = async (req, res) => {
  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });

  try {
    const q = await newTrip.save();
    res.status(201).json(q);
  } catch (err) {
    res.status(400).json({ message: 'Trip not saved', error: err });
  }
};

// PUT: /trips/:tripCode - Adds a new Trip 
// Regardless of outcome, response must include HTML status code 
// and JSON message to the requesting client 
const tripsUpdateTrip = async(req, res) => { 
 
    // Uncomment for debugging 
    console.log(req.params); 
    console.log(req.body); 
 
    const q = await Model 
        .findOneAndUpdate( 
            { 'code' : req.params.tripCode }, 
            { 
                code: req.body.code, 
                name: req.body.name, 
                length: req.body.length, 
                start: req.body.start, 
                resort: req.body.resort, 
                perPerson: req.body.perPerson, 
                image: req.body.image, 
                description: req.body.description 
            }  
        ) 
        .exec(); 
         
        if(!q) 
        { // Database returned no data 
            return res.status(400).json({ message: 'Trip not found to update'}); 

        } else { // Return resulting updated trip 
            return res.status(201).json(q); 
        }        
        // Uncomment the following line to show results of operation on the console 
        // console.log(q); 
}; 

// DELETE: /api/trips/:tripCode
const tripsDeleteTrip = async (req, res) => {
  try {
    const result = await Model.findOneAndDelete({ code: req.params.tripCode }).exec();
    if (!result) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(204).json(null); // No content
  } catch (err) {
    res.status(500).json({ message: 'Error deleting trip' });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
