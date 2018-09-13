const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const csp = require('helmet-csp');
const blog = require('./model/blog');
const getComments = require('./model/comments');
const newComment = require('./model/newComment');
const getBlogList = blog.getBlogList;
const getCurrentPost = blog.getCurrentPost;
const userSelectPost = blog.userSelectPost;
const checkGoogleUser = require('./model/checkGoogleUser');

app.use(express.static('public'));
app.set('view engine', 'ejs');

let port = 8080;
app.listen(port, function(){
  console.log('server started port ' + port);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.set("X-Powered-By", "think free");
  next();
});

app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json

app.get('/', getBlogList, getCurrentPost);
app.get('/?postid=:postid', getBlogList, getCurrentPost);
app.get('/selectedPost/:postid', userSelectPost);
app.get('/getComments/:postid', getComments);
app.post('/newComment', newComment);
app.get('/checkGoogleUser*', checkGoogleUser);