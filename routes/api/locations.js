const express = require('express');
const router = express.Router();
const locationCtrl = require('../../controllers/api/location');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', locationCtrl.index);

module.exports = router;
