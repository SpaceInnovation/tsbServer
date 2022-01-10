const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/authMiddleware/auth");

//import lga controller
const lgaController = require("../controllers/lga");
//API
router.get("/index", lgaController.all);
router.get("/benue", lgaController.benue);
router.get("/lgaschools", lgaController.lgaschools);
router.post("/create", lgaController.create);
router.put("/update/:id", lgaController.edit);
router.get("/fetchstate/:id", lgaController.fetchbystate);
// router.get('/details/:id', lgaController.details);
router.delete("/delete/:id", lgaController.delete);

module.exports = router;
