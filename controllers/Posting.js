const Posting = require("../models/Posting");
const LGA = require("../models/LGA");
const StateSchema = require("../models/StateModel");
const TeacherSchema = require("../models/teacher");
const SchoolTeachers = require("../models/SchoolTeachers");
const School = require("../models/school");
const Allocation = require("../models/allocations");

// API FOR GETTING ALL THE postintModelS
exports.all = async (req, res) => {
  try {
    var query = Posting.find({});

    query.exec(function (err, someValue) {
      if (err) return next(err);

      res.status(200).json(someValue);
    });
  } catch (error) {
    res.status(400).json("Couldn't post the teacher");
  }
};
// API FOR FETCHING ALL NEWLY EMPLOYED TEACHERS
exports.employed = async (req, res) => {
  try {
    const teacher = await TeacherSchema.find({ status: "Employed" });
    // .populate("qualification")
    // .populate("gradeLevel")
    // .sort({ appointmentDate: +1 });

    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json("Teachers not found");
  }
};

// API FOR FETCHING ALL POSTED TEACHERS
exports.postedfortransfer = async (req, res) => {
  try {
    const teacher = await TeacherSchema.find({
      $or: [{ status: "Posted" }, { status: "Active" }],
    });

    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json("Teachers not found");
  }
};

// API FOR FETCHING ALL THE RECENTLY TRANSFERRED TEACHERS
exports.transferredteachers = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const teacher = await Posting.find({ year: year })
      .populate("schoolFrom", "name")
      .populate("schoolTo", "name")
      .populate("teacher");
    console.log(teacher);
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json("Teachers not found");
  }
};

// API FOR THE TEACHERS POSTINGDETAILS
exports.posting = async (req, res) => {
  try {
    const teacher = await TeacherSchema.findById({ _id: req.params.id });

    let myState = await StateSchema.findOne({ name: "Benue" });
    let stateID = JSON.parse(JSON.stringify(myState._id));
    const school = await School.findOne({
      name: "Ministry",
    });
    let schFromID = JSON.parse(JSON.stringify(school._id));

    let lgas = await LGA.find({ stateID });
    res.status(200).json({ teacher, lgas, schFromID });
  } catch (er) {
    res.status(400).json("Teacher details not found");
  }
};
// API FOR THE TEACHER TRANSFER DETAILS
exports.transferDetails = async (req, res) => {
  try {
    const teacher = await TeacherSchema.findById(req.params.id);

    let myState = await StateSchema.findOne({ name: "Benue" });
    let stateID = JSON.parse(JSON.stringify(myState._id));
    const school = await Posting.findOne({ teacher: req.params.id })
      .populate("schoolTo")
      .sort({ serial: -1 })
      .limit(1);

    let schFrom = school.schoolTo;

    let lgas = await LGA.find({ stateID });
    res.status(200).json({ teacher, lgas, schFrom });
  } catch (er) {
    res.status(400).json("Teacher details not found");
  }
};
// API FOR THE TEACHERS POSTING
exports.transfer = async (req, res) => {
  const { schoolFrom, schoolTo, teacher, lga } = req.body;

  let serial = 1;
  const posting = await Posting.findOne({ teacher })
    .sort({ serial: -1 })
    .limit(1);
  let myPostedYear = new Date().getFullYear();
  if (posting) {
    serial = posting.serial + 1;
  }

  if (schoolFrom === schoolTo)
    return res
      .status(400)
      .json(
        `Can not tranfer teacher to same school, choose a different school please.`
      );

  const newTransfer = new Posting({
    schoolFrom,
    schoolTo,
    teacher,
    serial,
    status: "Active",
    year: myPostedYear,
  });

  try {
    await newTransfer.save();
    const teacherStatus = await TeacherSchema.findById({ _id: teacher });
    teacherStatus.status = "Active";
    teacherStatus.currentSchool = schoolTo;
    teacherStatus.save();

    let teacherExist = await SchoolTeachers.findOne({
      teacher: teacher,
    });
    if (!teacherExist) {
      const schoolteacher = await new SchoolTeachers({
        school: schoolTo,
        teacher,
        lga,
      });
      schoolteacher.save();
    } else {
      teacherExist = await SchoolTeachers.findOneAndUpdate(
        {
          teacher: teacher,
        },
        { $set: { school: schoolTo, lga: lga } }
      );
    }

    res.status(200).json(newTransfer);
  } catch (error) {
    res.status(400).json("New class not added");
  }
};
// API FOR THE TEACHERS POSTING
exports.schoolsByLGA = async (req, res) => {
  try {
    const school = await School.find({
      name: { $ne: "Ministry" },
      lga: req.params.id,
    });
    res.status(200).json(school);
  } catch (er) {
    res.status(400).json("Teacher details not found");
  }
};
// API FOR CREATING posting
exports.create = async (req, res) => {
  const { schoolFrom, schoolTo, teacher, lga } = req.body;

  let myPostedYear = new Date().getFullYear();
  const checkPosting = await Posting.findOne({
    schoolFrom,
    schoolTo,

    teacher,
  });
  if (checkPosting)
    return res
      .status(400)
      .json(`This teacher is already posted to this school.`);

  const newposting = new Posting({
    schoolFrom,
    schoolTo,
    teacher,
    status: "Posted",
    year: myPostedYear,
  });

  try {
    await newposting.save();
    const teacherStatus = await TeacherSchema.findById({ _id: teacher });
    teacherStatus.status = "Posted";
    teacherStatus.currentSchool = schoolTo;
    teacherStatus.save();
    const teacherExist = await SchoolTeachers.findOne({
      schoolTo: schoolTo,
      teacher: teacher,
    });
    if (!teacherExist) {
      const schoolteacher = await new SchoolTeachers({
        school: schoolTo,
        teacher,
        lga,
      });
      schoolteacher.save();
    }
    await Allocation.updateMany(
      { teacher: teacher },
      { $set: { Status: "Vacant" } }
    );
    res.status(200).json(newposting);
  } catch (error) {
    res.status(400).json("New class not added");
  }
};

// API FOR EDITING posting
exports.edit = async (req, res) => {
  const { teacher, postedDate, schoolFrom, schoolTo } = req.body;
  try {
    const id = await Posting.findById(req.params.id);
    id.teacher = teacher;
    id.postedDate = postedDate;
    id.schoolFrom = schoolFrom;
    id.schoolTo = schoolTo;
    //id.createdBy=req.user.id;
    await id.save();
    res.status(200).json(`Teacher edited successfully`);
  } catch (error) {
    res.status(200).json(`Couldn't edit ${teacher} `);
  }
};

// API FOR DELETING posting
exports.delete = async (req, res) => {
  try {
    await Posting.findByIdAndDelete(req.params.id);
    res.status(200).json(`Teacher deleted successfully`);
  } catch (error) {
    res.status(200).json(`Teacher not deleted successfully`);
  }
};
