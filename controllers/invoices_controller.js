const db = require('../models/invoices')

module.exports.getInvoices = db.getInvoices;
module.exports.postInvoices = db.postInvoices;
module.exports.patchInvoices = db.patchInvoices;
module.exports.getInvoice = db.getInvoice;