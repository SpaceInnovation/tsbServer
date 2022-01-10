const express = require('express');
const router = express.Router();

//import lgaOrigin controller
const lgaOrigin = require('../controllers/LGAOrigin')

//API 
router.get('/all', lgaOrigin.all);
router.post('/create', lgaOrigin.create);
router.post('/edit/:id', lgaOrigin.edit);
// router.get('/details/:id', lgaOrigin.details);
router.delete('/delete/:id', lgaOrigin.delete);

module.exports = router