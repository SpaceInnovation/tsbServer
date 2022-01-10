const { Schema, model } = require("mongoose");

const SchoolTeacherSchema = Schema(
  {
    teacher: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    school: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "School",
    },
    subject: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
    lga: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "LGA",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  { timestamps: true }
);

module.exports = model("SchoolTeacher", SchoolTeacherSchema);
