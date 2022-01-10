const LGAOrigin = require("../models/LGAOrigin");

// API FOR GETTING ALL THE LGAOrigin
exports.all = async (req, res) => {
  try {
    const allLGAOrigin = await LGAOrigin.find().sort({ createdAt: -1 });
    res.status(200).json(allLGAOrigin);
  } catch (error) {
    res.status(400).json("Could't fetch the LGAOrigin");
  }
};

// API FOR CREATING LGAOrigin
exports.create = async (req, res) => {
  const { name } = req.body;

  const lgaOrigin = await LGAOrigin.findOne({ name });

  if (lgaOrigin)
    return res.status(400).json(`${name} LGAOrigin already exist.`);

  const newLGAOrigin = await new LGAOrigin({
    name,
  });

  try {
    await newLGAOrigin.save();
    res.status(200).json(`${name} LGAOrigin added successfully`);
  } catch (error) {
    res.status(400).json("New LGAOrigin not added");
  }
};

// API FOR EDITING LGAOrigin
exports.edit = async (req, res) => {
  const id = await LGAOrigin.findOne({ _id: req.params.id });
  const { name } = req.body;

  try {
    id.name = name;
    await id.save();
    res.status(200).json(`${name} edited successfully`);
  } catch (error) {
    res.status(400).json(`Couldn't edit ${name} `);
  }
};

// API FOR DELETING LGAOrigin
exports.delete = async (req, res) => {
  try {
    const id = await LGAOrigin.findByIdAndDelete(req.params.id);
    const item_deleted = id.name;
    res.status(200).json(`${item_deleted} deleted successfully`);
  } catch (error) {
    res.status(400).json(`${item_deleted} not deleted successfully`);
  }
};
