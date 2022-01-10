const { model, Schema } = require("mongoose");

const allocationSchema = new Schema(
  {
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
      require: true,
    },
    classes: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      require: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      require: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    status: {
      type: String,
      default: "Allocated",
    },
    createBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  { timestamps: true }
);

module.exports = model("Allocation", allocationSchema);
