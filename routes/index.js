const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/home_controllers');
router.get('/',homeControllers.home);

router.use('/companies',require('./companies'));
router.use('/users',require('./users'));
router.use('/invoices',require('./invoices'));

module.exports = router;