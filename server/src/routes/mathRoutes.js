const express = require('express');
const router = express.Router();
const mathController = require('../controllers/mathController');

// Math operation routes
router.post('/addition', mathController.addition);
router.get('/factorial/:number', mathController.factorial);
router.get('/fibonacci/:count', mathController.fibonacci);

// Database query routes
router.get('/calculations', mathController.getCalculationHistory);
router.get('/calculations/:id', mathController.getCalculationById);

module.exports = router;