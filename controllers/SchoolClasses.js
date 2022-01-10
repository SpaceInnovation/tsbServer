const SchoolClasses = require("../models/SchoolClass");
const School = require("../models/school");

// API FOR GETTING ALL THE classes
exports.all = async (req, res) => {
  try {
    const classlist = await SchoolClasses.find({})
      .populate("classes", "name")
      .sort({ classes: 1 });
    res.status(200).json(classlist);
  } catch (error) {
    res.status(400).json("Couldn't fetch the Class");
  }
};

// API FOR GETTING ALL THE SCHOOLCLASSES BY School ID
exports.school = async (req, res) => {
  try {
    const classess = await SchoolClasses.find({
      school: req.params.id,
    }).populate("classes", "name");
    res.status(200).json(classess);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Couldn't fetch the Class" });
  }
};
// API FOR GETTING ALL THE SCHOOLCLASSES BY Class ID
exports.classes = async (req, res) => {
  try {
    const classess = await SchoolClasses.find({
      classes: req.params.id,
    }).populate("school classes");
    res.status(200).json(classess);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Couldn't fetch the Class" });
  }
};

// API FOR CREATING SchoolClasses
exports.create = async (req, res) => {
  const { school, classes } = req.body;

  const classExist = await SchoolClasses.findOne({ school, classes });

  if (classExist) return res.status(400).json(`Class already exist.`);

  const newsclass = await new SchoolClasses({
    school,
    classes,
    // createdBy: req.user.id,
  });

  try {
    newsclass.save();
    res.status(200).json(newsclass);
  } catch (error) {
    res.status(400).json(`New Class not added ${error.message}`);
  }
};

// API FOR EDITING school
exports.edit = async (req, res) => {
  const myclass = await SchoolClasses.findById(req.params.id);
  if (!myclass) return res.status(404).json("Class successfully updated ");
  const { school, classes, createdBy } = req.body;
  try {
    if (req.params.id && school && classes) {
      myclass.school = school;
      myclass.classes = classes;
      // myclass.createdBy = req.user.id;
      await myclass.save();
      res
        .status(200)
        .json({ mydata: myclass, message: "Class successfully updated " });
    } else if (req.params.id) {
      return res.status(200).json(myclass);
    }
  } catch (error) {
    console.log(error);
  }
};

// FOR GETTING SINGLE CLASS
exports.details = async (req, res) => {
  try {
    const myclass = await SchoolClasses.findOne({ _id: req.params.id });

    if (myclass) {
      res.status(200).json(myclass);
    }
  } catch (error) {
    res.status(200).json("Class not fetched");
  }
};

exports.deletes = async (req, res) => {
  try {
    SchoolClasses.findOne({ _id: req.params.id }).exec(function (err, result) {
      let classid = JSON.parse(JSON.stringify(result.classes._id));
      let schoolid = JSON.parse(JSON.stringify(result.school._id));

      School.findOneAndUpdate(
        { _id: schoolid },
        { $pull: { classes: classid } },
        { new: true }
      )
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    await SchoolClasses.findByIdAndDelete(req.params.id);
    res.status(200).json("Class deleted successfully");
  } catch (error) {
    res.status(200).json("Class not successfully deleted!");
  }
};
