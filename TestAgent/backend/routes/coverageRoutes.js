const express = require('express');
const router = express.Router();
const { runCoverageCheck } = require('../controllers/coverageController');

router.post('/run-coverage', runCoverageCheck);

module.exports = router;
