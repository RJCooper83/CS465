const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

// OLD STUFF
// var fs = require("fs"):
// var trips = JSON.parse(fs.readfileSync("./data/trips.json","utf8:));

const travel = async function (req,res,next) {
	// console.log ("TRAVEL CONTROLLER BEGIN");

	fetch(tripsEndpoint, options)
	  .then((res) => res.json())
	  .then((json) => {
	    let message = null;
	    if (!(json instanceof Array)) {
	      message = "API Lookup error!";
	      json = [];
	    }
	     else {
	     if (!json.length) {
	      message = "No trips exist in our database!";
	     }}
	    res.render("travel", { title: "Travlr Getaways", trips: json, message });
	  })
	  .catch((err) => res.status(500).send(err.message));
};

module.exports = {
 travel,
};
