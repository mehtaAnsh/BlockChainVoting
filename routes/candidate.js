const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidate');
router.post('/registerCandidate',candidateController.register);
module.exports = router;