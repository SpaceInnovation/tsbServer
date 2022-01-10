const { Schema, model } = require("mongoose");

const PostingSchema = new Schema({
  schoolFrom: {
    type: Schema.Types.ObjectId,
    ref: "School",
  },
  schoolTo: {
    type: Schema.Types.ObjectId,
    ref: "School",
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  serial: {
    type: Number,
    require: true,
    default: 1,
  },
  year: {
    type: Number,
    require: true,
  },
  // createdBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Admin",
  //   require: true,
  // },
  postedDate: {
    type: Date,
    default: Date.now(),
    require: true,
  },
  status: String,
});

module.exports = model("Posting", PostingSchema);
