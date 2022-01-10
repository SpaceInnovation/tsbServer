const Allocations = require("../models/allocations");
const School = require("../models/school");

// API FOR GETTING ALL THE SUBJECTS THAT ARE VACANT
exports.vacancy = async (req, res) => {
  try {
    const allocations = await Allocations.find({ status: "Vacant" })
      .populate("school")
      .populate("classes")
      .populate("subject");
    res.status(200).json(allocations);
  } catch (error) {
    res.status(400).json("Could't fetch the Allocations");
  }
};
// API FOR GETTING ALL THE allocations
exports.all = async (req, res) => {
  try {
    const allocations = await Allocations.find({})
      .populate("school")
      .populate("classes")
      .populate("subject")
      .populate("teacher", "surname firstName otherNames");

    res.status(200).json(allocations);
  } catch (error) {
    res.status(400).json("Could't fetch the Allocations");
  }
};
// API FOR GETTING ALL THE allocations based on subject
exports.subject = async (req, res) => {
  try {
    const allocations = await Allocations.find({ subject: req.params.id })
      .populate("school")
      .populate("classes")
      .populate("subject")
      .populate("teacher", "surname firstName otherNames");

    res.status(200).json(allocations);
  } catch (error) {
    res.status(400).json("Could't fetch the Allocations");
  }
};
// API FOR GETTING ALL THE allocations based on teacher
exports.teacher = async (req, res) => {
  try {
    const allocations = await Allocations.find({ teacher: req.params.id })
      .populate("school")
      .populate("classes")
      .populate("subject")
      .populate("teacher", "surname firstName otherNames");
    res.status(200).json(allocations);
  } catch (error) {
    res.status(400).json("Could't fetch the Allocations");
  }
};
// API FOR GETTING ALL THE allocations based on school
exports.school = async (req, res) => {
  try {
    const allocations = await Allocations.find({ school: req.params.id })
      .populate("school")
      .populate("classes")
      .populate("subject")
      .populate("teacher", "surname firstName otherNames");

    res.status(200).json(allocations);
  } catch (error) {
    res.status(400).json("Could't fetch the Allocations");
  }
};
// API FOR GETTING ALL THE allocations based on class
exports.classes = async (req, res) => {
  try {
    const allocations = await Allocations.find({ school: req.params.id })
      .populate("school")
      .populate("classes")
      .populate("subject")
      .populate("teacher", "surname firstName otherNames");
    res.status(200).json(allocations);
  } catch (error) {
    res.status(400).json("Could't fetch the Allocations");
  }
};

// API FOR CREATING Allocations
exports.create = async (req, res) => {
  const { school, classes, subject, teacher, status, createBy } = req.body;

  const allocations = await Allocations.findOne({
    school,
    classes,
    subject,
    teacher,
  });

  if (allocations)
    return res
      .status(400)
      .json(`This teacher is already allocated to this subject in this class.`);

  const newAllocations = await new Allocations({
    school,
    classes,
    subject,
    teacher,
    status,
    // createdBy: req.user.id,
  });

  try {
    await newAllocations.save();
    res.status(200).json(`Theacher was allocated successfully`);
  } catch (error) {
    res.status(400).json("New Allocations not added");
  }
};

// API FOR EDITING Allocations
exports.edit = async (req, res) => {
  const allocation = await Allocations.findById(req.params.id)
    .populate("classes")
    .populate("subject")
    .populate("teacher");
  const { school, classes, subject, teacher, date } = req.body;

  try {
    if (req.params.id && school && classes && subject) {
      allocation.school = school;
      allocation.subject = subject;
      allocation.teacher = teacher;
      allocation.status = "Allocated";
      allocation.classes = classes;
      // allocation.createBy = req.user.id;
      await allocation.save();
      res
        .status(200)
        .json({ allocation, message: `Teacher allocated successfully` });
    } else if (req.params.id) {
      return res.status(200).json(allocation);
    }
  } catch (error) {
    res.status(200).json(`Couldn't edit`);
  }
};

// API FOR  Allocations Details
exports.details = async (req, res) => {
  try {
    const data = await Allocations.findById(req.params.id)
      .populate("classes")
      .populate("subject")
      .populate("teacher")
      .populate("school");
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json("Record does not exist!");
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};
// API FOR DELETING Allocations
exports.delete = async (req, res) => {
  try {
    await Allocations.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: `Record deleted successfully` });
  } catch (error) {
    res
      .status(400)
      .json({ success: true, message: `Record not deleted successfully` });
  }
};
