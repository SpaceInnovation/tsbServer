const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/authMiddleware/auth");

//import class controller
const {
  all,
  create,
  deleteschool,
  edit,
  details,
  lgaschool,
  getedit,
} = require("../controllers/school");

//API
router.get("/index", all);
router.get("/lgaschool/:id", lgaschool);
router.get("/getedit/:id", getedit);
router.post("/create", create);
router.delete("/delete/:id", deleteschool);
router.post("/edit-item/:id", edit);
router.get("/details/:id", details);

module.exports = router;
