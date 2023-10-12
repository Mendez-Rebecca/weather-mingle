const express = require('express');
const router = express.Router();
const locationCtrl = require('../../controllers/api/location');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, locationCtrl.index);

module.exports = router;
