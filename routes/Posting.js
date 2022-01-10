const express = require("express");
const router = express.Router();

//import posting controller
const postingController = require("../controllers/Posting");
//API
router.get("/all", postingController.all);
router.get("/employed", postingController.employed);
router.get("/posted", postingController.postedfortransfer);
router.get("/transferredteachers", postingController.transferredteachers);
router.get("/transferdetails/:id", postingController.transferDetails);
router.post("/transfer", postingController.transfer);
router.post("/create", postingController.create);
router.get("/posting/:id", postingController.posting);
router.get("/fetchSchoolsBylgaid/:id", postingController.schoolsByLGA);
router.post("/edit/:id", postingController.edit);
// router.get('/details/:id', postingController.details);
router.delete("/delete/:id", postingController.delete);

module.exports = router;
