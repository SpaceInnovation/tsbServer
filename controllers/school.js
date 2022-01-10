const School = require("../models/school");
const LGA = require("../models/LGA");
const SchoolTeachers = require("../models/SchoolTeachers");
const SchoolSubjects = require("../models/Schoolsubjects");
const SchoolClasses = require("../models/SchoolClass");
const Allocations = require("../models/allocations");

// API FOR GETTING ALL THE school
exports.all = async (req, res) => {
  try {
    let schools = await School.find({ name: { $ne: "Ministry" } });
    let schoolTeachers;
    let schoolClasses;
    let schoolSubjects;
    let schoolUpdate;
    for (let i = 0; i < schools.length; i++) {
      schoolTeachers = await SchoolTeachers.find({ school: schools[i]._id });
      schoolSubjects = await SchoolSubjects.find({ school: schools[i]._id });
      schoolClasses = await SchoolClasses.find({ school: schools[i]._id });
      schoolUpdate = await School.findById({ _id: schools[i]._id });
      schoolUpdate.teachers = schoolTeachers.length;
      schoolUpdate.subjects = schoolSubjects.length;
      schoolUpdate.classes = schoolClasses.length;
      schoolUpdate.save();
    }
    schools = await School.find({ name: { $ne: "Ministry" } })
      .populate("lga", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(schools);
  } catch (error) {
    res.status(400).json("Could't fetch the schools");
  }
};
// API FOR GETTING one school by id
exports.getedit = async (req, res) => {
  try {
    const schools = await School.findById({ _id: req.params.id }).populate(
      "lga",
      "name"
    );
    res.status(200).json(schools);
  } catch (error) {
    res.status(400).json("Could't fetch the schools");
  }
};

// API FOR GETTING ALL THE school IN A PARTICULAR LGA
exports.lgaschool = async (req, res) => {
  try {
    const schs = await School.find({
      lga: req.params.id,
      name: { $ne: "Ministry" },
    }).sort({ createdAt: -1 });
    const lga = await LGA.findById({ _id: req.params.id }).select("name");

    res.status(200).json({ schs, lga });
  } catch (error) {
    res.status(400).json("Could't fetch the schools");
  }
};
exports.schoolsteacherscount = async (req, res) => {
  try {
    await School.find(req.params.id).sort({ createdAt: -1 });

    res.status(200).json({});
  } catch (error) {
    res.status(400).json("All the school not fetched");
  }
};

// API FOR CREATING school
exports.create = async (req, res) => {
  const { name, lga } = req.body;

  const school_name = await School.findOne({ name, lga });

  if (school_name)
    return res.status(400).json(`${name} already exist in our records.`);

  const newSchool = await new School({
    name,
    lga,
    // createdBy: req.user.id,
  });

  try {
    await newSchool.save();
    res.status(200).json(`${name} school added successfully`);
  } catch (error) {
    res.status(400).json("New school not added");
  }
};

// API FOR EDITING school
exports.edit = async (req, res) => {
  const school = await School.findById(req.params.id);
  const { name, lga, address } = req.body;

  try {
    school.name = name;
    school.lag = lga;
    school.address = address;
    school.createdBy = req.user.id;
    await school.save();
    res.status(200).json(`${name} edited successfully`);
  } catch (error) {
    res.status(200).json(`Couldn't edit ${name} `);
  }
};

// FOR GETTING SINGLE SCHOOL
exports.details = async (req, res) => {
  try {
    const school = await School.findOne({ _id: req.params.id }).populate("lga");

    if (school) {
      res.status(200).json(school);
    }
  } catch (error) {
    res.status(200).json("School not fetched");
  }
};

exports.deleteschool = async (req, res) => {
  try {
    await School.findByIdAndDelete(req.params.id);

    //Deleting all schools in schoolclasses
    SchoolClasses.deleteMany({ school: req.params.id })
      .then(function () {})
      .catch(function (error) {});
    SchoolSubjects.deleteMany({ school: req.params.id })
      .then(function () {})
      .catch(function (error) {});
    SchoolTeachers.deleteMany({ school: req.params.id })
      .then(function () {})
      .catch(function (error) {});
    Allocations.deleteMany({ school: req.params.id })
      .then(function () {})
      .catch(function (error) {});
    res.status(200).json("School successfully deleted!");
  } catch (error) {
    res.status(200).json("School not successfully deleted!");
  }
};
