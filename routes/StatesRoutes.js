const express = require("express");
const router = express.Router();

//import State controller
const State = require("../controllers/StatesController");
//API
router.get("/index", State.all);
router.post("/create", State.create);
router.put("/edit/:id", State.edit);
// router.get("/details/:id", State.details);
router.delete("/delete/:id", State.delete);

module.exports = router;
