const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users_controller');
router.get('/get',usersControllers.getUsers);
router.post('/post',usersControllers.postUsers);
router.post('/patch',usersControllers.patchUsers);

module.exports = router;