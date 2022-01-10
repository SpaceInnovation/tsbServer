const { model, Schema } = require("mongoose");

const adminModel = new Schema(
  {
    school: { type: Schema.Types.ObjectId, ref: "School", require: true }, // make username unique
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher", require: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    // createdBy : {
    //     type: Schema.Type.ObjectId,
    //     ref:"Admin"
    // },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      default: "support",
    },
  },
  { timestamps: true }
);

module.exports = model("Admin", adminModel);
