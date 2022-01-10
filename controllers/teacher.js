const Teacher = require("../models/teacher");
const slugify = require("slugify");
const shortid = require("shortid");
const cloudinary = require("../cloudinary");
const Utils = require("../utils/");
const { retirement, asignValue } = new Utils();

// For handling cloudinary
// const cloudinary_upload = async (path) => cloudinary(path, "Image");
// API FOR FETCHING ALL THE TEACHERS
exports.retirements = async (req, res) => {
  const currentYear = new Date().getFullYear();

  try {
    const teacher = await Teacher.find({
      retirementYear: { $lte: currentYear + 2 },
    }).populate("LGAOrigin", "name");

    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json("Teachers not found");
  }
};

// API FOR FETCHING ALL THE TEACHERS
exports.all = async (req, res) => {
  // try {
  const teacher = await Teacher.find({ status: { $ne: "Retired" } })
    .populate("LGAOrigin", "name")
    .populate("qualification", "name")
    .populate("gradeLevel", "name")
    .populate("currentSchool", "name")
    .sort({ createdAt: 1 });
  let teacherRetirementAudit;
  let currentYear = new Date().getFullYear();
  for (let i = 0; i < teacher.length; i++) {
    teacherRetirementAudit = await Teacher.findById(teacher[i]._id);
    if (teacher[i].counter !== null) {
      if (currentYear > teacher[i].counter) {
        teacherRetirementAudit.servedYears = teacher[i].servedYears + 1;
        teacherRetirementAudit.age = teacher[i].age + 1;
        teacherRetirementAudit.counter = teacher[i].counter + 1;
      }
    }
    if (currentYear > teacher[i].retirementYear) {
      teacherRetirementAudit.status = "Retired";
    }
    await teacherRetirementAudit.save();
  }

  res.status(200).json(teacher);
  // } catch (error) {
  //   res.status(400).json("Teachers not found");
  // }
};
// API FOR FETCHING ALL THE TEACHERS IN A PARTICULAR LGA
exports.lgateachers = async (req, res) => {
  try {
    const teacher = await Teacher.find({ LGAOrigin: req.params.id })
      .populate("subject")
      .populate("qualification")
      .populate("gradeLevel")
      .sort({ createdAt: -1 });

    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json("Teachers not found");
  }
};
// API FOR GETING A TEACHERS for Edit
exports.teacherbyid = async (req, res) => {
  try {
    const teacher = await Teacher.findById({ _id: req.params.id })
      .populate("qualification", "name")
      .populate("gradeLevel", "name")
      .populate("stateOrigin", "name")
      .populate("LGAOrigin", "name");

    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json("Teachers not found");
  }
};
function stringGen(num) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (i = 0; i < num; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function genSerial(serial) {
  if (serial < 10) {
    return `000${serial}`;
  } else if (serial >= 10 && serial < 100) {
    return `00${serial}`;
  } else if (serial >= 100 && serial < 1000) {
    return `0${serial}`;
  } else {
    return serial;
  }
}

// API FOR CREATING THE TEACHERS
exports.create = async (req, res) => {
  // For holding the image url
  // let imageURL;
  // if (req.file) {
  //   let path = await cloudinary_upload(req.file.path);
  //   imageURL = path.url;
  //   //console.log(imageURL);
  // }

  const {
    title,
    email,
    phone,
    gender,
    dob,
    LGAOrigin,
    staffID,
    qualification,
    gradeLevel,
    appointmentDate,
    surname,
    firstName,
    otherNames,
    NIN,
    disability,
    maritalStatus,
    spouse,
    nationality,
    stateOrigin,
    address,
    discipline,
    subject,
    nextOfKin,
  } = req.body;

  const imageURL = req.file.path;

  let serial = 1;
  const countSerial = await Teacher.findOne({})
    .select("serial")
    .sort({ serial: -1 })
    .limit(1);
  if (countSerial) {
    if (countSerial.serial > 0) {
      serial = countSerial.serial + 1;
    }
  }

  let staffid = staffID;
  if (!staffID) {
    let year = new Date().getFullYear().toString().substring(2, 4);
    staffid = `TSB${year}${genSerial(serial)}${stringGen(2)}`;
  }

  // if(!req.file) return res.status(400).json("Image is required");

  // if (!title) return res.status(400).json("Title is required");
  // if (!surname) return res.status(400).json("surname is required");
  // if (!firstName) return res.status(400).json("firstName is required");
  // if (!NIN) return res.status(400).json("NIN is required");
  // if (!disability) return res.status(400).json("disability is required");
  // if (!maritalStatus) return res.status(400).json("maritalStatus is required");
  // if (!spouse) return res.status(400).json("spouse is required");
  // if (!nationality) return res.status(400).json("nationality is required");
  // if (!stateOrigin) return res.status(400).json("stateOrigin is required");
  // if (!address) return res.status(400).json("address is required");
  // if (!discipline) return res.status(400).json("discipline is required");
  // if (!subject) return res.status(400).json("subject is required");
  // if (!nextOfKin) return res.status(400).json("nextOfKin is required");
  // if (!email) return res.status(400).json("email is required");
  // if (!phone) return res.status(400).json("phone is required");
  // if (!gender) return res.status(400).json("gender is required");
  // if (!dob) return res.status(400).json("dob is required");
  // if (!LGAOrigin) return res.status(400).json("LGAOrigin is required");
  // if (!staffID) return res.status(400).json("staffID is required");
  // if (!qualification) return res.status(400).json("qualification is required");
  // if (!gradeLevel) return res.status(400).json("gradeLevel is required");
  // if (!appointmentDate)
  //   return res.status(400).json("appointmentDate is required");

  // checking for retirement info

  const DOB = parseInt(new Date(dob).getFullYear());
  const AppmtDate = parseInt(new Date(appointmentDate).getFullYear());

  const { age, servedYears, teacher_status, retirementYear } = retirement(
    DOB,
    AppmtDate
  );
  // const name = surname + "-" + firstName;
  // const slug = slugify(name) + "-" + shortid.generate().slice(0, 10);

  // const staffId = await Teacher.findOne({ staffID });
  // if (staffId)
  //   return res.status(400).json(`StaffID with ${staffID} already exist`);

  // const phoone = await Teacher.findOne({ phone });
  // if (phoone) return res.status(400).json(` Phone with ${phone} already exist`);

  // const nin = await Teacher.findOne({ NIN });
  // if (nin) return res.status(400).json(` NIN with ${NIN} already exist`);

  // const teacher = await Teacher.findOne({ email });

  // if (teacher) return res.status(400).json(`${email} already exist`);

  const newTeacher = await new Teacher({
    title,
    firstName,
    surname,
    otherNames,

    email,
    staffID: staffid,
    phone,
    gender,
    LGAOrigin,

    age,
    NIN,
    disability,
    maritalStatus,
    spouse,
    nationality,
    stateOrigin,
    address,
    discipline,
    subject,

    qualification,
    gradeLevel,

    appointmentDate,
    dob,

    nextOfKin,
    imageURL,

    servedYears,
    retirementYear,
    status: "Employed",
    serial,
    counter: new Date().getFullYear(),
  });

  // try {
  await newTeacher.save();
  res.status(200).json("New Teacher created successfully");
  // } catch (error) {
  //   res.status(400).json("New Teacher not created");
  // }
};

// API FOR EDITING THE TEACHERS
exports.edit = async (req, res) => {
  const id = await Teacher.findById(req.params.id);

  const {
    title,
    firstName,
    surname,
    otherNames,

    email,
    staffID,
    phone,
    gender,
    LGAOrigin,

    NIN,
    disability,
    maritalStatus,
    spouse,
    nationality,
    stateOrigin,
    address,
    discipline,
    subject,

    qualification,
    gradeLevel,

    appointmentDate,
    dob,

    nextOfKin,
  } = req.body;

  if ((surname || firstName) != undefined) {
    const name = surname + "-" + firstName;
    id.slug = slugify(name) + "-" + shortid.generate().slice(0, 10);
  }

  if (req.file) {
    const path = await cloudinary_upload(req.file.path);
    id.imageURL = asignValue(path.url, id.imageURL);
  }

  id.firstName = asignValue(firstName, id.firstName);
  id.title = asignValue(title, id.title);
  id.email = asignValue(email, id.email);
  id.otherNames = asignValue(otherNames, id.otherNames);
  id.surname = asignValue(surname, id.surname);
  id.NIN = asignValue(NIN, id.NIN);
  id.disability = asignValue(disability, id.disability);
  id.maritalStatus = asignValue(maritalStatus, id.maritalStatus);
  id.spouse = asignValue(spouse, id.spouse);
  id.nationality = asignValue(nationality, id.nationality);
  id.stateOrigin = asignValue(stateOrigin, id.stateOrigin);
  id.address = asignValue(address, id.address);
  id.discipline = asignValue(discipline, id.discipline);
  id.subject = asignValue(subject, id.subject);
  id.nextOfKin = asignValue(nextOfKin, id.nextOfKin);
  id.phone = asignValue(phone, id.phone);
  id.gender = asignValue(gender, id.gender);
  id.dob = asignValue(dob, id.dob);
  id.LGAOrigin = asignValue(LGAOrigin, id.LGAOrigin);
  id.staffID = asignValue(staffID, id.staffID);
  id.qualification = asignValue(qualification, id.qualification);
  id.gradeLevel = asignValue(gradeLevel, id.gradeLevel);
  id.appointmentDate = asignValue(appointmentDate, id.appointmentDate);
  id.createdBy = req.user.id;

  try {
    await id.save();
    res.status(200).json("Teacher updated successfully");
  } catch (er) {
    res.status(400).json("Teacher not updated");
  }
};

// API FOR THE TEACHERS DETAILS
exports.details = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ slug: req.params.slug });
    res.status(200).json(teacher);
  } catch (er) {
    res.status(400).json("Teacher details not found");
  }
};

// API FOR THE DELETING TEACHER
exports.delete = async (req, res) => {
  try {
    await Teacher.findByIdAndRemove(req.params.id);
    res.status(200).json("Teacher deleted");
  } catch (error) {
    res.status(400).json("Teacher not deleted");
  }
};

exports.signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "All fields are required." });
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ success: false, message: "Password missmatched" });
  const isExistingUser = await UserModel.findOne({ email });
  if (isExistingUser)
    return res
      .status(400)
      .send({ message: "An account with this email already exists." });
  try {
    let newUser = await UserModel.create({
      username,
      email,
      password,
    });
    // Create token
    const token = JWT.sign(
      { id: newUser._id, email },
      process.env.JWT_SECRETE,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    // save user token
    newUser.token = token;
    // Send actiovation mail to the user
    const activationURL = `${process.env.HOST}/accountactivation/${token}`;
    const message = `
    <h2>Your Account Activation Link</h2>
    <p>click the link below to activate your account </p>
     <p>Or copy and paste the link in your browser</p>
    <a href=${activationURL} clicktracking=off>${activationURL}</a>
    `;
    mailSender.sendEmailFromMailer(email, "ACCOUNT ACTIVATION", message);

    return res.status(201).json({
      token: token,
      user: saved_user,
      message: "Registration successful",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = JWT.sign(
        { id: user._id, email, role: user.role },
        process.env.JWT_SECRETE,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );
      // save user token
      user.token = token;
      res.status(200).json({ success: true, token, user });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Invalid login credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.HOST}/resetpassword/${resetToken}`;

    const message = `
    <h2>Your Password Reset Link</h2>
    <p>click the link below to reset your password</p>
     <p>Or copy and paste the link in your browser</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try {
      mailSender.sendEmailFromMailer(email, "Password Reset", message);
      res.status(201).json({
        success: true,
        message:
          "Password reset link has been sent to your email, kindly check!",
      });
    } catch (error) {
      res.status(404).json("Connection Error");
    }
  } catch (error) {
    res.status(500).json("Internal server Error");
  }
};

exports.resetpassword = async (req, res) => {
  let resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return re.status(400).json({
        success: false,
        message: "Invalid token provided, try again!",
      });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    returnres
      .status(201)
      .json({ success: true, message: "Password Reset Successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid token provided, token expired!",
    });
  }
};
