const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/company');
router.post('/register', CompanyController.create);
router.post('/authenticate', CompanyController.authenticate);
module.exports = router;