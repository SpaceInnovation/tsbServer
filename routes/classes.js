const express = require("express");
const router = express.Router();

//import class controller
const classes = require("../controllers/class");
//API
router.get("/all", classes.all);
router.post("/create", classes.create);
router.post("/edit/:id", classes.edit);
// router.get('/details/:id', classes.details);
router.delete("/delete/:id", classes.delete);

module.exports = router;
