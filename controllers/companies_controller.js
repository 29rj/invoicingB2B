const db = require('../models/companies')

module.exports.getCompanies = db.getCompanies;
module.exports.postCompanies = db.postCompanies;
module.exports.patchCompanies = db.patchCompanies;
module.exports.getCompany= db.getCompany;