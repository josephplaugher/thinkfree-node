const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const blog = require('./model/blog')
const getBlogList = blog.getBlogList;
const getLatestPost = blog.getLatestPost;
const getCurrentPost = blog.getCurrentPost;
const getComments = blog.getComments;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(8080, function(){
  console.log('server started port 8080');
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.set("X-Powered-By", "think free");
  next();
});

app.get('/', getBlogList, getCurrentPost, getComments);
app.get('/postid/:postid', getBlogList, getCurrentPost, getComments);
