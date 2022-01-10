const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/authMiddleware/auth");

//import class controller
const staff_signup = require("../controllers/auth/admin_signup");
const staff_signin = require("../controllers/auth/admin_signin");

//API SIGNUP
router.get("/all", staff_signup.allAdmin);
router.post("/signup", staff_signup.create);
router.post("/edit/:id", Auth, staff_signup.edit);
router.get("/details/:id", Auth, staff_signup.detail);
router.delete("/delete/:id", Auth, staff_signup.delete);

//API SIGNIN
router.post("/signin", staff_signin.signin);
router.post("/authen-user", staff_signin.authen_user);

module.exports = router;
