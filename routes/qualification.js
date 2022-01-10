const express = require("express");
const router = express.Router();

//import qualification controller
const qualification = require("../controllers/qualification");

//API
router.get("/all", qualification.all);
router.post("/create", qualification.create);
router.put("/edit/:id", qualification.edit);
router.get("/details/:id", qualification.details);
router.delete("/delete/:id", qualification.delete);

module.exports = router;
