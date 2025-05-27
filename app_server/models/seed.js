const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');

// Read JSON file
const tripsData = JSON.parse(fs.readFileSync('./trips.json', 'utf8'));

mongoose.connection.once('open', async () => {
  try {
    await Trip.deleteMany({});
    console.log('Existing trips cleared.');

    await Trip.insertMany(tripsData);
    console.log('Trip data seeded successfully.');

  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.connection.close();
  }
});
