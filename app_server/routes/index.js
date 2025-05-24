const express = require('express');
const router = express.Router();

const travelerController = require('../controllers/main'); // general site pages
const travelController = require('../controllers/travel'); // just travel page

// general routes
router.get('/', travelerController.home);
router.get('/rooms', travelerController.rooms);
router.get('/meals', travelerController.meals);
router.get('/news', travelerController.news);
router.get('/about', travelerController.about);
router.get('/contact', travelerController.contact);

// dynamic travel page
router.get('/travel', travelController.travel);

module.exports = router;
