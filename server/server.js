const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const root_route = require("./routes/root_route");
const user_route = require("./routes/user_route");
const user_type_route = require("./routes/user_type_route");
const class_route = require("./routes/class_route");
const school_route = require("./routes/school_route");
const section_route = require("./routes/section_route");
const class_section_route = require("./routes/class_section_route");
const student_route = require("./routes/student_route");
const admin_route = require("./routes/admin_route");
const designation_route = require("./routes/designation_route");
const staff_route = require("./routes/staff_route");
const subject_route = require("./routes/subject_route");
const exam_category_route = require("./routes/exam_category_route");
const exam_route = require("./routes/exam_route");
const mark_details_route = require("./routes/mark_details_route");
const login_route = require("./routes/login_route");
const super_admin_route = require("./routes/super_admin_route");

app.use(express.json());
app.use(helmet());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Express Routes
app.use("/", root_route);
app.use("/class", class_route);
app.use("/school", school_route);
app.use("/section", section_route);
app.use("/classsection", class_section_route);
app.use("/student", student_route);
app.use("/user", user_route);
app.use("/usertype", user_type_route);
app.use("/admin", admin_route);
app.use("/designation", designation_route);
app.use("/staff", staff_route);
app.use("/subject", subject_route);
app.use("/examcategory", exam_category_route);
app.use("/exam", exam_route);
app.use("/markdetails", mark_details_route);
app.use("/login", login_route);
app.use("/superadmin", super_admin_route);

app.listen(process.env.PORT, () => {
  console.log(`Listening to Port:${process.env.PORT}`);
});
