const express = require('express');
const router = express.Router();

const invoiceControllers = require('../controllers/invoices_controller');
router.get('/get',invoiceControllers.getInvoices)
router.get('/get:id',invoiceControllers.getInvoice);
router.post('/post',invoiceControllers.postInvoices)
router.post('/patch',invoiceControllers.patchInvoices)
module.exports = router;