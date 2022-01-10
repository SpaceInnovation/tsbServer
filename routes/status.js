const express = require("express");
const router = express.Router();

//import status controller
const status = require("../controllers/status");

//API
router.get("/index", status.all);
router.post("/create", status.create);
router.post("/edit/:id", status.edit);
// router.get('/details/:id', status.details);
router.delete("/delete/:id", status.delete);

module.exports = router;
