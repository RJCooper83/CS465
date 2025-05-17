const express = require('express');
const router = express.Router();
const travelerController = require('../controllers/main');

router.get('/', travelerController.home);
router.get('/travel', travelerController.travel);
router.get('/rooms', travelerController.rooms);
router.get('/meals', travelerController.meals);
router.get('/news', travelerController.news);
router.get('/about', travelerController.about);
router.get('/contact', travelerController.contact);

module.exports = router;