const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/authMiddleware/auth");
const multer = require("multer");
const path = require("path");
const shortId = require("shortid");

// FOR MANAGING IMAGES
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: (req, file, cb) => {
    const filename = file.originalname;
    cb(null, filename + "-" + shortId.generate());
  },
});

// const upload = multer({ storage });
const { upload } = require("../Helpers/Helper");
//import teacher controller
const teacherController = require("../controllers/teacher");
//API
router.get("/all", teacherController.all);
router.get("/retirements", teacherController.retirements);
router.get("/lgateachers/:id", teacherController.lgateachers);
router.get("/teacherbyid/:id", teacherController.teacherbyid);
router.post("/create", upload, teacherController.create);
router.post("/edit/:id", Auth, upload, teacherController.edit);
router.get("/details/:slug", Auth, teacherController.details);
router.delete("/delete/:id", Auth, teacherController.delete);

module.exports = router;
