const GradeLevel = require("../models/gradelevel");
const { asignValue } = require("../utils/");

// API FOR GETTING ALL THE GRADELEVEL
exports.all = async (req, res) => {
  try {
    const gradelevel = await GradeLevel.find();
    res.status(200).json(gradelevel);
  } catch (error) {
    res.status(400).json("Could't fetch the gradelevel");
  }
};

// API FOR CREATING GRADELEVEL
exports.create = async (req, res) => {
  const { name } = req.body;

  const gradelevel = await GradeLevel.findOne({ name });

  if (gradelevel)
    return res.status(400).json(`${name} gradelevel already exist.`);

  const newGradelevel = await new GradeLevel({
    name,
  });

  try {
    await newGradelevel.save();
    res.status(200).json(`${name} gradelevel added successfully`);
  } catch (error) {
    res.status(400).json("New gradelevel not added");
  }
};

// API FOR EDITING GRADELEVEL
exports.edit = async (req, res) => {
  const id = await GradeLevel.findById(req.params.id);
  const { name } = req.body;

  try {
    if (id && name) {
      id.name = name;
      await id.save();
      return res.status(200).json(`${name} edited successfully`);
    } else if (id) {
      return res.status(200).json(id);
    }
  } catch (error) {
    res.status(200).json(`Couldn't edit ${name} `);
  }
};

// API FOR DELETING GRADELEVEL
exports.delete = async (req, res) => {
  try {
    const id = await GradeLevel.findByIdAndDelete(req.params.id);
    const item_deleted = id.name;
    res.status(200).json(`${item_deleted} deleted successfully`);
  } catch (error) {
    res.status(200).json(`${item_deleted} not deleted successfully`);
  }
};
