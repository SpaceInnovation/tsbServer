const SchoolTeacher = require("../models/SchoolTeachers");
const School = require("../models/school");
const Subjects = require("../models/subject");
const { subject } = require("./allocations");

// API FOR GETTING THE REDUNDANCIES IN  SCHOOLS BASED ON SUBJECT AREA
exports.redundancies = async (req, res) => {
  // try {
  const subjects = await Subjects.find({});
  let schoolteachers;
  let subjectID;
  for (let i = 0; i < subjects.length; i++) {
    subjectID = JSON.parse(JSON.stringify(subjects[i]._id));
    if (subjectID) {
      schoolteachers = await SchoolTeacher.findOne({ subjectID });

      console.log(schoolteachers.length);
    }
  }
  res.status(200).json(subjects);
  // } catch (error) {
  //   res.status(400).json("Could't fetch the Teacher");
  // }
};
// API FOR GETTING THE teachers BY Teacher ID
exports.teacher = async (req, res) => {
  try {
    const teachers = await SchoolTeacher.find({
      teacher: req.params.id,
    }).populate("school teacher");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(400).json("Could't fetch the Teacher");
  }
};
// API FOR GETTING ALL THE teachers BY SCHOOL ID
exports.School = async (req, res) => {
  try {
    const teachers = await SchoolTeacher.find({
      school: req.params.id,
    }).populate("teacher");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(400).json("Could't fetch the Teacher");
  }
};

// API FOR GETTING ALL THE teacher
exports.all = async (req, res) => {
  try {
    const teachers = await SchoolTeacher.find({}).populate("school teacher");

    res.status(200).json(teachers);
  } catch (error) {
    res.status(400).json("Could't fetch the Teacher");
  }
};

// API FOR CREATING SchoolTeacher
exports.create = async (req, res) => {
  const { school, teacher } = req.body;

  const teacherExist = await SchoolTeacher.findOne({ school, teacher });

  if (teacherExist) return res.status(400).json(`Teacher already exist.`);

  const newteacher = await new SchoolTeacher({
    school,
    teacher,
    // createdBy: req.user.id,
  });

  try {
    newteacher.save();
    res.status(200).json(` Teacher added successfully`);
  } catch (error) {
    res.status(400).json(`New Teacher not added ${error.message}`);
  }
};

// API FOR EDITING school
exports.edit = async (req, res) => {
  const myteacher = await SchoolTeacher.findById(req.params.id);

  const { school, teacher, createdBy } = req.body;
  try {
    if (req.params.id && school && teacher) {
      myteacher.school = school;
      myteacher.teacher = teacher;
      // myteacher.createdBy = req.user.id;
      await myteacher.save();
      res
        .status(200)
        .json({ mydata: myteacher, message: "Teacher successfully updated " });
    } else if (req.params.id) {
      return res.status(200).json(myteacher);
    }
  } catch (error) {
    res.status(404).json("Teacher not found");
  }
};

// FOR GETTING SINGLE CLASS
exports.details = async (req, res) => {
  try {
    const myteacher = await SchoolTeacher.findOne({ _id: req.params.id });

    if (myteacher) {
      res.status(200).json(myteacher);
    }
  } catch (error) {
    res.status(200).json("Teacher not fetched");
  }
};

exports.deletes = async (req, res) => {
  try {
    await SchoolTeacher.findByIdAndDelete(req.params.id);
    res.status(200).json("Teacher deleted successfully");
  } catch (error) {
    res.status(200).json("Teacher not successfully deleted!");
  }
};
