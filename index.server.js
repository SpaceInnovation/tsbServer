const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const path = require("path");
const Test = require("./utils/");
const { retirement } = new Test();

// setting up the env
env.config();

// app instance setup
const app = express();

// middlewares
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for production env testing
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public"));
  });
}

// const ans = retirement(1970, 2015)
// console.log(ans)
// const fullDOB = "wed nov 24 1970";
// const fullEmpDate = "wed nov 24 2015";
// const DOB = fullDOB.substring(11,15)
// const EMPDate = fullEmpDate.substring(11,15)
// const ans = retirement(DOB, EMPDate)
// console.log(ans)

// routes
app.use("/admin", require("./routes/admin"));
app.use("/teachers", require("./routes/teacher"));
app.use("/postings", require("./routes/Posting"));
app.use("/qualifications", require("./routes/qualification"));
app.use("/gradelevels", require("./routes/gradelevels"));
app.use("/subjects", require("./routes/subjects"));
app.use("/classes", require("./routes/classes"));
app.use("/allocations", require("./routes/allocations"));
app.use("/schools", require("./routes/schools"));
app.use("/schoolclasses", require("./routes/SchoolClasses"));
app.use("/schoolsubjects", require("./routes/SchoolSubjects"));
app.use("/schoolteachers", require("./routes/SchoolTeachers"));
app.use("/lga", require("./routes/lgas"));
app.use("/states", require("./routes/StatesRoutes"));
app.use("/roles", require("./routes/Roles"));
app.use("/status", require("./routes/status"));

// mongodb connection
let db = process.env.DBLocal;
if (process.env.NODE_ENV === "production") {
  db = process.env.DBCloud;
}

mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to db");
});

// Listening to the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listing on Port " + port);
});
