const LGA = require("../models/LGA");
const StateSchema = require("../models/StateModel");
const SchoolSchema = require("../models/school");
const SchoolTeachers = require("../models/SchoolTeachers");

//API FOR CREATING LGA
exports.create = async (req, res) => {
  const { name, stateID } = req.body;

  if (!name) return res.status(400).json("All fields are neccessary");
  const lga = await LGA.findOne({ name, stateID });
  if (lga) return res.status(400).json(`${name} LGA already exist`);
  const newLGA = await LGA({
    name,
    stateID,
  });

  try {
    await newLGA.save();
    res.status(200).json(`${newLGA.name} LGA created successfully`);
  } catch (error) {
    res.status(400).json(`Could't save LGA, error encounted`);
  }
};
// APIs FOR EDITING LGAs
exports.edit = async (req, res) => {
  const { name, stateID } = req.body;
  const lga = await LGA.findById({ _id: req.params.id }).populate(
    "stateID",
    "name"
  );
  try {
    if (lga && name && stateID) {
      lga.name = name;
      lga.stateID = stateID;
      await lga.save();
      res.status(200).json(`${lga.name} LGA updated successfully`);
    } else if (lga) {
      return res.status(200).json(lga);
    }
  } catch (error) {
    res.status(400).json(`Could't save LGA, error encounted`);
  }
};
exports.all = async (req, res) => {
  try {
    const lga = await LGA.find().populate("stateID").sort({ createdAt: -1 });

    res.status(200).json(lga);
  } catch (error) {
    res.status(400).json("All the LGA not fetched");
  }
};
exports.benue = async (req, res) => {
  try {
    let myState = await StateSchema.findOne({ name: "Benue" });
    let stateID = JSON.parse(JSON.stringify(myState._id));
    const lga = await LGA.find({ stateID: stateID }).sort({ createdAt: -1 });

    res.status(200).json(lga);
  } catch (error) {
    res.status(400).json("All the LGA not fetched");
  }
};

exports.lgaschools = async (req, res) => {
  try {
    let myState = await StateSchema.findOne({ name: "Benue" });
    let stateID = JSON.parse(JSON.stringify(myState._id));
    let lga = await LGA.find({ stateID: stateID }).sort({ createdAt: -1 });

    let lgaID = "";
    let lgaSchCount = 0;
    let lgaSchools;
    let lgaTeachersCount = 0;
    let lgaTeachers;

    for (let i = 0; i < lga.length; i++) {
      //Count all the schools in a particular local government
      lgaID = JSON.parse(JSON.stringify(lga[i]._id));
      lgaSchCount = await SchoolSchema.find({
        lga: lgaID,
        name: { $ne: "Ministry" },
      });

      if (lgaSchCount !== null) {
        lgaSchools = await LGA.findById({ _id: lga[i]._id });
        lgaSchools.schools = lgaSchCount.length;
        lgaSchools.save();
        //count all the teachers in a particular local government
        lgaTeachersCount = await SchoolTeachers.find({ lga: { $eq: lgaID } });
        lgaTeachers = await LGA.findById({
          _id: lga[i]._id,
        });

        lgaTeachers.teachers = lgaTeachersCount.length;
        lgaTeachers.save();
      }
    }
    lga = await LGA.find({ stateID: stateID }).sort({ createdAt: -1 });
    res.status(200).json(lga);
  } catch (error) {
    res.status(400).json("All the LGA not fetched");
  }
};
// API FOR FETRCHING LGAs BY STATE ID
exports.fetchbystate = async (req, res) => {
  try {
    const stateID = req.params.id;
    const lga = await LGA.find({ stateID }).sort({ name: -1 });
    res.status(200).json(lga);
  } catch (error) {
    res.status(400).json("All the LGA not fetched");
  }
};
// API FOR DELETING LGA
exports.delete = async (req, res) => {
  const lga_id = req.params.id;
  try {
    const lga = await LGA.findByIdAndDelete(lga_id);
    res.status(200).json(`LGA is deleted successfully!`);
  } catch (error) {
    res.status(400).json(`LGA is not deleted!`);
  }
};

// API FOR THE LGA DETAILS
exports.details = async (req, res) => {
  try {
    await LGA.findOne(req.params.id, (err, lga) => {
      if (!err) {
        res.status(200).json(lga);
      }
    });
  } catch (er) {
    res.status(400).json("LGA details not found");
  }
};
