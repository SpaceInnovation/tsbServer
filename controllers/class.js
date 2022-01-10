const ClassModel = require("../models/class");
const SchoolClass = require("../models/SchoolClass");

// API FOR GETTING ALL THE classModelS
exports.all = async (req, res) => {
  try {
    const classlist = await ClassModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(classlist);
  } catch (error) {
    res.status(400).json("Could't fetch the class");
  }
};

// API FOR CREATING classModel
exports.create = async (req, res) => {
  const { name } = req.body;
  const classModel = await ClassModel.findOne({ name });
  if (classModel)
    return res.status(400).json(`${name} classModel already exist.`);
  const newclassModel = await new ClassModel({
    name,
  });

  try {
    await newclassModel.save();
    res.status(200).json(newclassModel);
  } catch (error) {
    res.status(400).json("New class not added");
  }
};

// API FOR EDITING classModel
exports.edit = async (req, res) => {
  const id = await ClassModel.findById(req.params.id);
  const { name } = req.body;

  try {
    id.name = name;
    await id.save();
    res.status(200).json(`${name} edited successfully`);
  } catch (error) {
    res.status(200).json(`Couldn't edit ${name} `);
  }
};

// API FOR DELETING classModel
exports.delete = async (req, res) => {
  try {
    const id = await ClassModel.findByIdAndDelete(req.params.id);
    const item_deleted = id.name;
    // Deleting all classes in schoolclasses
    SchoolClass.deleteMany({ classes: id })
      .then(function () {
        console.log("Data deleted"); // Success
      })
      .catch(function (error) {
        res.status.json(error); // Failure
      });
    res.status(200).json(`${item_deleted} deleted successfully`);
  } catch (error) {
    res.status(200).json(`${item_deleted} not deleted successfully`);
  }
};
