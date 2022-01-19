const express = require('express');
const router = express.Router();

//import status controller
const {reset_password, resetting} = require('../controllers/auth/resetpassword')

//API 
router.post('/:token/:id', resetting);
router.post('/email', reset_password);



module.exports = router