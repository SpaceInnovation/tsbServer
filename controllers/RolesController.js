const RoleModel = require("../models/Roles");

// API FOR GETTING ALL THE RoleS
exports.all = async (req, res) => {
  try {
    const allRole = await RoleModel.find();
    res.status(200).json(allRole);
  } catch (error) {
    res.status(400).json("Could't fetch the Role");
  }
};

// API FOR CREATING Role
exports.create = async (req, res) => {
  const { name } = req.body;

  const Role = await RoleModel.findOne({ name });

  if (Role) return res.status(400).json(`${name} Role already exist.`);

  const newRole = await new RoleModel({
    name,
  });

  try {
    await newRole.save();
    res.status(200).json(newRole);
  } catch (error) {
    res.status(400).json("New Role not added");
  }
};

// API FOR EDITING Role
exports.edit = async (req, res) => {
  const id = await RoleModel.findOne({ _id: req.params.id });
  const { name } = req.body;

  try {
    id.name = name;
    await id.save();
    res.status(200).json(`${name} edited successfully`);
  } catch (error) {
    res.status(200).json(`Couldn't edit ${name} `);
  }
};

// API Role Details
exports.details = async (req, res) => {
  try {
    const role = await RoleModel.findByrolrAndDelete(req.params.id);
    res.status(200).json(role);
  } catch (error) {
    res.status(404).json(`Role not found`);
  }
};
// API FOR DELETING Role
exports.delete = async (req, res) => {
  try {
    const id = await RoleModel.findByIdAndDelete(req.params.id);
    const item_deleted = id.name;
    res.status(200).json(`${item_deleted} deleted successfully`);
  } catch (error) {
    res.status(200).json(`${item_deleted} not deleted successfully`);
  }
};
