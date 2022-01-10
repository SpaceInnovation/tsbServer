const express = require("express");
const router = express.Router();

//import schoolclass controller
const {
  all,
  create,
  edit,
  details,
  deletes,
  school,
} = require("../controllers/SchoolClasses");
//API
router.get("/all", all);
router.get("/school/:id", school);
router.post("/create", create);
router.post("/edit/:id", edit);
router.get("/details/:id", details);
router.delete("/delete/:id", deletes);

module.exports = router;
