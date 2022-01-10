const express = require("express");
const router = express.Router();

//import class controller
const Roles = require("../controllers/RolesController");
//API
router.get("/all", Roles.all);
router.post("/create", Roles.create);
router.post("/edit/:id", Roles.edit);
router.get("/details/:id", Roles.details);
router.delete("/delete/:id", Roles.delete);

module.exports = router;
