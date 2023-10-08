const express = require('express');
const router = express.Router();
const weatherCtrl = require('../../controllers/api/weather');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', weatherCtrl.index);

module.exports = router;
