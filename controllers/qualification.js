const Qualification = require("../models/qualification");
const { asignValue } = require("../utils/");

// API FOR GETTING ALL THE QUALIFICATIONS
exports.all = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.status(200).json(qualifications);
  } catch (error) {
    res.status(400).json("Could't fetch the qualification");
  }
};

// API FOR CREATING QUALIFICATION
exports.create = async (req, res) => {
  const { name } = req.body;
  const qualification = await Qualification.findOne({ name });

  if (qualification)
    return res.status(400).json(`${name} qualification already exist.`);

  const newQualification = await new Qualification({
    name,
  });

  try {
    const qualifications = await newQualification.save();
    res.status(200).json({
      qualifications,
      message: `${name} qualification added successfully`,
    });
  } catch (error) {
    res.status(400).json("New qualification not added");
  }
};

// API FOR EDITING QUALIFICATION
exports.edit = async (req, res) => {
  const id = await Qualification.findById(req.params.id);
  const { name } = req.body;
  try {
    if (id && name) {
      id.name = name;
      await id.save();
      res.status(200).json(`${name} edited successfully`);
    } else if (id) {
      res.status(200).json(id);
    }
  } catch (error) {
    res.status(200).json(`Couldn't edit ${name} `);
  }
};
// API FOR  QUALIFICATION DETAILS
exports.details = async (req, res) => {
  const id = await Qualification.findById(req.params.id);

  try {
    if (id) {
      res.status(200).json(id);
    }
  } catch (error) {
    res.status(404).json(`Not found `);
  }
};

// API FOR DELETING QUALIFICATION
exports.delete = async (req, res) => {
  try {
    const id = await Qualification.findByIdAndDelete(req.params.id);
    const item_deleted = id.name;
    res.status(200).json(`${item_deleted} deleted successfully`);
  } catch (error) {
    res.status(200).json(`${item_deleted} not deleted successfully`);
  }
};
