const express = require("express");
const router = express.Router();

//import class controller
const allocation = require("../controllers/allocations");
//API
router.get("/all", allocation.all);
router.get("/vacancy", allocation.vacancy);
router.get("/school/:id", allocation.school);
router.get("/subject/:id", allocation.subject);
router.get("/teacher/:id", allocation.teacher);
router.get("/classes/:id", allocation.classes);
router.post("/create", allocation.create);
router.post("/edit/:id/:sid", allocation.edit);
router.get("/details/:id", allocation.details);
router.delete("/delete/:id", allocation.delete);

module.exports = router;
