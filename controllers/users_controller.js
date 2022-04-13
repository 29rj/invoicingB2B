const db = require('../models/users')

module.exports.getUsers = db.getUsers;
module.exports.postUsers = db.postUsers;
module.exports.patchUsers = db.patchUsers;