const express = require("express");
const router = express.Router();

//import class controller
const subject = require("../controllers/subject");
//API
router.get("/all", subject.all);
router.post("/create", subject.create);
router.post("/edit/:id", subject.edit);
// router.get('/details/:id', subject.details);
router.delete("/delete/:id", subject.delete);

module.exports = router;
