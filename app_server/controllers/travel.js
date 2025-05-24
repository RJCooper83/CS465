const fs = require('fs');
const path = require('path');

exports.travel = function(req, res) {
  const tripData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8'));
  res.render('travel', {
    title: 'Travlr Getaways',
    trips: tripData
  });
};
