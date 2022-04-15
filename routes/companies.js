const express = require('express');
const router = express.Router();

const companiesControllers = require('../controllers/companies_controller');
router.get('/get',companiesControllers.getCompanies);
router.get('/get:id',companiesControllers.getCompany);
router.post('/post',companiesControllers.postCompanies);
router.post('/patch',companiesControllers.patchCompanies);

module.exports = router;