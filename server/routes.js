const express = require("express");
const router = express.Router();
const User = require("./models/userSchema");
const bodyParser = require("body-parser");
const bcrypt=require("bcrypt")

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("");
  console.log(__dirname);
});
router.post("/register", async (req, res, next) => {
  try {
    console.log("YESSS");
    const {
      name,
      id,
      email,
      phone,
      password,
      age,
      gender,
      branch,
      skill1,
      skill2,
      skill3,
      skill4,
      address,
    } = req.body;
    // const usernameCheck = await User.findOne({ name });
    // if (usernameCheck) {
    //   return res.json({ msg: "Username already used", status: false });
    // }
    // const emailCheck = await User.findOne({ email });
    // if (emailCheck) {
    //   return res.json({ msg: "Email already used", status: false });
    //   console.log("email present");
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      phone,
      id,
      age,
      gender,
      branch,
      skill1,
      skill2,
      skill3,
      skill4,
      address,
    });
    delete user.password;
    console.log(req.body);
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
