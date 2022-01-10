const express = require("express");
const router = express.Router();

//import grade level controller
const gradelevel = require("../controllers/gradelevel");

//API
router.get("/all", gradelevel.all);
router.post("/create", gradelevel.create);
router.put("/edit/:id", gradelevel.edit);
// router.get('/details/:id', gradelevel.details);
router.delete("/delete/:id", gradelevel.delete);

module.exports = router;
