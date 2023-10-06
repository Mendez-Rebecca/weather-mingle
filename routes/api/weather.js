const express = require('express');
const router = express.Router();
const weatherCtrl = require('../../controllers/api/weather');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/weather', weatherCtrl.getWeatherData);

module.exports = router;
