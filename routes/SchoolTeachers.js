const express = require("express");

const router = express.Router();

//import school teachers controller
const {
  all,
  create,
  edit,
  details,
  deletes,
  teacher,
  School,
  redundancies,
} = require("../controllers/SchoolTeachers");
//API
router.get("/teacher/:id", teacher); // GET BY TEACHER ID
router.get("/School/:id", School); // GET BY SCHOOL ID
router.get("/index", all);
router.get("/redundancies", redundancies);
router.post("/create", create);
router.post("/edit/:id", edit);
router.get("/details/:id", details);
router.delete("/delete/:id", deletes);

module.exports = router;
