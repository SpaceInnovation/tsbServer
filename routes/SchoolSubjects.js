const express = require("express");
const router = express.Router();

//import Subjects controller
const subjectsController = require("../controllers/SchoolSubjects");
//API
router.get("/redundancies", subjectsController.redundancies);
router.get("/subject/:id", subjectsController.subject);
router.get("/school/:id", subjectsController.school);
router.get("/all", subjectsController.all);
router.post("/create", subjectsController.create);
router.post("/edit/:id", subjectsController.edit);
router.get("/details/:id", subjectsController.details);
router.delete("/delete/:id", subjectsController.deletes);

module.exports = router;
