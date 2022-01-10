const SchoolSubjects = require("../models/Schoolsubjects");
const SchoolSchema = require("../models/school");
const Allocations = require("../models/allocations");

// API FOR GETTING ALL THE subject BY SUBJECT ID
exports.redundancies = async (req, res) => {
  try {
    let subjects;
    let subjectAllocations;
    let schSubjects;
    let schools = await SchoolSchema.find({ name: { $ne: "Ministry" } });
    for (let i = 0; i < schools.length; i++) {
      subjects = await SchoolSubjects.find({
        school: schools[i]._id,
      })
        .select("subject")
        .populate("subject", "name");
      //GET COUNT OF ALLOCATED SUBJECTS AND ASIGN THEM TO THEIR RESPECTIVE SUBJECTS IN SCHOOLSUBJECT TABLE
      for (let j = 0; j < subjects.length; j++) {
        subjectAllocations = await Allocations.find({
          subject: subjects[j].subject._id,
          school: schools[i]._id,
        })
          .populate("school", "_id")
          .populate("subject", "name");

        schSubjects = await SchoolSubjects.findById({
          _id: subjects[j]._id,
        });
        if (subjectAllocations.length) {
          schSubjects.subjectCount = subjectAllocations.length;
        } else {
          schSubjects.subjectCount = 0;
        }
        schSubjects.save();
      }
    }
    subjects = await SchoolSubjects.find({})
      .select("subject")
      .populate("subject", "name");
    res.status(200).json(subjects);
  } catch (error) {
    res.status(400).json("Could't fetch the Subject");
  }
};
// API FOR GETTING ALL THE subject BY SUBJECT ID
exports.subject = async (req, res) => {
  try {
    const schools = await SchoolSubjects.find({
      school: req.params.id,
    }).populate("school subject");

    res.status(200).json(schools);
  } catch (error) {
    res.status(400).json("Could't fetch the Subject");
  }
};
// API FOR GETTING ALL THE subject BY SCHOOL ID
exports.school = async (req, res) => {
  try {
    const schoolubjects = await SchoolSubjects.find({
      school: req.params.id,
    }).populate("subject", "name");

    res.status(200).json(schoolubjects);
  } catch (error) {
    res.status(400).json("Could't fetch the Subject");
  }
};

// API FOR GETTING ALL THE subject
exports.all = async (req, res) => {
  try {
    const schools = await SchoolSubjects.find({}).populate("school subject");

    res.status(200).json(schools);
  } catch (error) {
    res.status(400).json("Could't fetch the Subject");
  }
};

// API FOR CREATING SchoolSubjects
exports.create = async (req, res) => {
  const { school, subject } = req.body;

  const subjectExist = await SchoolSubjects.findOne({ school, subject });

  if (subjectExist) return res.status(400).json();

  const newSubject = new SchoolSubjects({
    school,
    subject,
    // createdBy: req.user.id,
  });

  try {
    await newSubject.save();
    res.status(200).json(newSubject);
  } catch (error) {
    res.status(400).json(`New Subject not added ${error.message}`);
  }
};

// API FOR EDITING school
exports.edit = async (req, res) => {
  const mysubject = await SchoolSubjects.findById(req.params.id);
  const { school, subject, createdBy } = req.body;

  //Update Subject in school
  try {
    if (req.params.id && school && subject) {
      mysubject.school = school;
      mysubject.subject = subject;
      // mysubject.createdBy = req.user.id;
      await mysubject.save();
      res
        .status(200)
        .json({ mydata: mysubject, message: "Subject successfully updated " });
    } else if (req.params.id) {
      return res.status(200).json(mysubject);
    }
  } catch (error) {
    res.status(404).json("Subject not found");
  }
};

// FOR GETTING SINGLE CLASS
exports.details = async (req, res) => {
  try {
    const mysubject = await SchoolSubjects.findOne({ _id: req.params.id });

    if (mysubject) {
      res.status(200).json(mysubject);
    }
  } catch (error) {
    res.status(200).json("Subject not fetched");
  }
};

exports.deletes = async (req, res) => {
  try {
    await SchoolSubjects.findByIdAndDelete(req.params.id);
    res.status(200).json("Subject deleted successfully");
  } catch (error) {
    res.status(200).json("Subject not successfully deleted!");
  }
};
