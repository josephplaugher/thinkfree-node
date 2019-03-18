const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const log = require("./util/Logger");
const SetUrl = require("./util/SetUrl");
const blog = require("./model/blog");
const getComments = require("./model/comments");
const newComment = require("./model/newComment");
const getBlogList = blog.getBlogList;
const getCurrentPost = blog.getCurrentPost;
const userSelectPost = blog.userSelectPost;
const checkGoogleUser = require("./model/checkGoogleUser");
const newUser = require("./model/newUser");
const SignIn = require("./model/SignIn");
const checkUsername = newUser.checkUsername;
const updateSubscribed = require("./model/updateSubscribed");

app.use(express.static("public"));
app.set("view engine", "ejs");

let port = process.env.PORT;
app.listen(port, function() {
  var msg =
    "server started in " + process.env.NODE_ENV + " mode on port " + port;
  if (process.env.NODE_ENV === "production") {
    log("", msg);
  } else {
    console.log(msg);
  }
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", SetUrl());
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.set("X-Powered-By", "think free");
  next();
});

app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json data

app.get("/?postid=:postid", getBlogList, getCurrentPost);
app.get("/selectedPost/:postid", userSelectPost);
app.get("/getComments/:postid", getComments);
app.post("/newComment", newComment);
app.get("/checkGoogleUser*", checkGoogleUser);
app.post("/newUser", checkUsername);
app.post("/signIn", (req, res) => {
  const signin = new SignIn(req, res);
  signin.login();
});
app.post("/updateSubscribed", updateSubscribed);
app.get("/", getBlogList, getCurrentPost);
