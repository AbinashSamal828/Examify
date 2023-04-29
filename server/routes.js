const express = require("express");
const router = express.Router();
const User = require("./models/userSchema");
const Post = require("./models/ofSchema");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const alert=require("alert");


router.use(bodyParser.urlencoded({ extended: false }));
let cors = require("cors");
router.use(cors());

router.get("/user/:id", async (req, res) => {
  const result = await User.findOne({ id: req.params.id });
  console.log(result);
  const obj = {
    name: result.name,
    email: result.email,
    phone: result.phone,
    age: result.age,
    id: result.id,
    gender: result.gender,
    branch: result.branch,
    skill1: result.skill1 ? result.skill1 : "",
    skill2: result.skill2 ? result.skill2 : "",
    skill3: result.skill3 ? result.skill3 : "",
    skill4: result.skill4 ? result.skill4 : "",
    address: result.address,
  };
  res.json(obj);
});

router.get("/list_files", (_, res) => {
  //let uploadedFiles = [];
  fs.readdir(path.join(__dirname, "/uploads"), (err, files) => {
    if (err) console.log(err);
    else {
      res.json(files);
    }
  });
});
router.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.json({ message: "Successfully uploaded files" });
}

router.get("/getFile/:fileName", (req, res) => {
  const fn = req.params.fileName;
  res.download(path.join(__dirname, "/uploads/", fn));
});

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
    const idCheck = await User.findOne({ id });
    if (idCheck) {
      return res.json({ msg: "ID already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
      console.log("email present");
    }
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
    res.redirect("http://192.168.43.95:5501/public/login.html");
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const idCheck = await User.findOne({ id });
    if (!idCheck) {
      alert('incorrect username or password');
      return res.redirect("http://192.168.43.95:5501/public/login.html");
    }
    const isPasswordValid = await bcrypt.compare(password, idCheck.password);
    if (!isPasswordValid){
      alert('incorrect username or password');
      return res.redirect("http://192.168.43.95:5501/public/login.html");
    }
    delete idCheck.password;
    // console.log(usernameCheck);

    // res.json({ status: true, user: idCheck });
    res.redirect("http://192.168.43.95:5501/public/myWall.html");
    return;
  } catch (error) {
    console.log(error);
  }
});

router.post("/post", async (req, res, next) => {
  try {
    console.log(req.body);
    const { content, id, username } = req.body;
    // const id = localStorage.getItem("id");
    console.log(content);
    const post = Post.create({
      id,
      username,
      content,
    });
    // res.json({status:true,post});
    res.redirect("http://192.168.43.95:5501/public/of.html");
  } catch (error) {
    console.log(error);
  }
});

router.get("/all_posts", async (req, res) => {
  try {
    const id = "testid123";
    const post = await Post.find({});
    console.log(post);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});
router.get("/all_users/:id", async (req, res) => {
  try {
    // const id='testid123';
    const id = req.params["id"];
    const user = await User.findOne({ id });
    // console.log(post);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});
router.post("/reply/:pos", async (req, res) => {
  try {
    const pos = req.params["pos"];
    const posts = await Post.find({});
    const _id = posts[pos]._id;
    const post = posts[pos];
    console.log(post.comments);
    const { id, username, comment } = req.body;
    post.comments.push({ id, username, comment });
    console.log(post.comments);
    await Post.updateOne(
      { _id: _id },
      {
        $push: { comments: { id, username, comment } },
      }
    );
    res.redirect("http://192.168.43.95:5501/public/ofreply.html");
    // console.log(post);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
