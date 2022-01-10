const StateModel = require("../models/StateModel");
const { asignValue } = require("../utils/");

// API FOR GETTING ALL THE StateS
exports.all = async (req, res) => {
  try {
    const States = await StateModel.find();
    res.status(200).json(States);
  } catch (error) {
    res.status(400).json("Could't fetch the State");
  }
};

// API FOR CREATING State
exports.create = async (req, res) => {
  const { name, stateID } = req.body;
  const State = await StateModel.findOne({ name });

  if (State) return res.status(400).json(`${name} State already exist.`);

  const newState = await new StateModel({
    name,
    stateID,
  });

  try {
    const States = await newState.save();
    res.status(200).json({
      States,
      message: `${name} State added successfully`,
    });
  } catch (error) {
    res.status(400).json("New State not added");
  }
};

// API FOR EDITING State
exports.edit = async (req, res) => {
  const id = await StateModel.findById(req.params.id);
  const { name } = req.body;
  try {
    if (id && name) {
      id.name = name;
      await id.save();
      res.status(200).json(`${name} edited successfully`);
    } else if (id) {
      return res.status(200).json(id);
    }
  } catch (error) {
    res.status(200).json(`Couldn't edit ${name} `);
  }
};
// API FOR  State DETAILS
exports.details = async (req, res) => {
  const id = await StateModel.findById(req.params.id);

  try {
    if (id) {
      res.status(200).json(id);
    }
  } catch (error) {
    res.status(404).json(`Not found `);
  }
};

// API FOR DELETING State
exports.delete = async (req, res) => {
  try {
    const id = await StateModel.findByIdAndDelete(req.params.id);
    const item_deleted = id.name;
    res.status(200).json(`${item_deleted} deleted successfully`);
  } catch (error) {
    res.status(200).json(`${item_deleted} not deleted successfully`);
  }
};
