const { findOne } = require("../models/school");
const School = require("../models/school");
const Utils = require("../utils/");
const { updateValue } = new Utils();

// API FOR GETTING ALL THE school
exports.all = async (req, res) => {
  try {
    const schools = await School.find()
      .populate("teachers")
      .populate("classes")
      .populate("subjects")
      .sort({ createdAt: -1 });
    res.status(200).json(schools);
  } catch (error) {
    res.status(400).json("Could't fetch the schools");
  }
};

// API FOR CREATING school
exports.create = async (req, res) => {
  const { name, lga, subjects, classes, teachers } = req.body;

  const school_name = await School.findOne({ name });
  const school_lga = await School.findOne({ lga });

  if (school_name && school_lga)
    return res.status(400).json(`${name} already exist in our records.`);

  const newschool = await new School({
    name,
    lga,
    subjects: [subjects],
    classes: [classes],
    teachers: [teachers],
    createdBy: req.user.id,
  });

  try {
    await newschool.save();
    res.status(200).json(`${name} school added successfully`);
  } catch (error) {
    res.status(400).json("New school not added");
  }
};

// // API FOR EDITING school
// exports.edit = async(req, res)=>{
//     const {subjects, name, feldID} = req.body
//     const parentID = req.params.id

//   const school = await School.findOne({_id:parentID})

//   console.log(school)

//     const c = school.subjects.push(subjects)

//     await school.save()

// }

// API FOR REMOVING FIELD

exports.removeItem = async (req, res) => {
  const { subjects, classes, teachers, name, lga, fieldID } = req.body;

  const parentID = await School.findOne({ _id: req.params.id });

  if (subjects) {
    console.log(fieldID);
    const temp_subject_name = subjects.name;
    await School.findByIdAndUpdate(
      { _id: parentID },
      { $pull: { subjects: { _id: fieldID } } },
      { new: true }
    );

    res.status(200).json(`${temp_subject_name} removed successful`);
  } else if (classes) {
    console.log("from classes field");
    const temp_subject_name = classes.name;
    console.log(fieldID);
    await School.findByIdAndUpdate(
      { _id: parentID },
      { $pull: { classes: { _id: fieldID } } },
      { new: true }
    );
    res.status(200).json(`${temp_subject_name} removed successful`);
  } else if (teachers) {
    console.log("from classes field");
    const temp_subject_name = teachers.name;
    console.log(fieldID);
    await School.findByIdAndUpdate(
      { _id: parentID },
      { $pull: { teachers: { _id: fieldID } } },
      { new: true }
    );

    res.status(200).json(`${temp_subject_name} removed successful`);
  }
};

// API FOR ADDING ITEM TO school
exports.addItem = async (req, res) => {
  const { subjects, classes, teachers, name, lga } = req.body;
  const parentID = req.params.id;
  const school = await School.findOne({ _id: parentID });

  if (subjects) {
    console.log("from subject field");

    const isField = school.subjects.find(
      (subject) => subject.name == subjects.name
    );

    if (isField) return res.status(400).json("This subject already exist.");

    school.subjects.push(subjects);

    await school.save();
    res.status(200).json("new subject added");
  } else if (classes) {
    console.log("from classes field");

    const isField = school.classes.find(
      (classe) => classe.name == classes.name
    );
    console.log(isField);
    if (isField) return res.status(400).json("This classes already exist.");

    school.classes.push(classes);

    await school.save();
    res.status(200).json("new classes added");
  } else if (teachers) {
    console.log("from teachers field");

    const isField = school.teachers.find(
      (teacher) => teacher.name == teachers.name
    );

    if (isField) return res.status(400).json("This teacher already exist.");

    school.teachers.push(teachers);

    await school.save();
    res.status(200).json("New teacher added");
  } else if (name) {
    school.name = name;
    await school.save();
    res.status(200).json("Name edited");
  } else if (lga) {
    school.lga = lga;
    console.log(c);
    await school.save();
    res.status(200).json("LGA edited");
  }
};
// FOR GETTING SINGLE SCHOOL
exports.details = async (req, res) => {
  try {
    const school = await School.findOne({ _id: req.params.id })
      .populate("teachers")
      .populate("classes")
      .populate("subjects");

    if (school) {
      res.status(200).json(school);
    }
  } catch (error) {
    res.status(200).json("School not fetched");
  }
};

exports.delete_school = async (req, res) => {
  // const temp_school_name =
  try {
    await School.findByIdAndDelete(req.params.id);
    res.status(200).json("School successfully deleted!");
  } catch (error) {
    res.status(200).json("School not successfully deleted!");
  }
};
