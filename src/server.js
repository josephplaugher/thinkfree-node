const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const Query = require('./util/Query');
const Conn = require('./util/postgres');

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

const getBlogList = (req, res, next) => {
  Conn.query(`
    SELECT title, description, postid 
    FROM posts 
    ORDER BY postid DESC
  `)
    .then(resp => {
      let list = '<div>';
      let data = resp.rows;
      data.forEach(elem => {
        list += '<div id="' + elem.postid +'">' + elem.title + '<br/>' + elem.description + '</div>';
      });
      list += '</div>';
      req.bloglist = data;
      req.markedUplist = list;
      next();
    })
}

const getLatestPost = (req, res, next) => {
  var query = {
    "text":`
      SELECT title, description, body, postid 
      FROM posts 
      WHERE postid=$1 
      ORDER BY postid DESC`,
    "values":[req.bloglist[0].postid]}
  Conn.query(query)
    .then(resp => {
      req.latest = resp.rows;
      next();
    }) 
}

const getComments = (req, res, next) => {
  var query = {
    "text":`
      SELECT commentid, 
          username, 
          body 
      FROM comments
      WHERE postid=$1 
      ORDER BY postid DESC`,
    "values":[req.bloglist[0].postid]}
  Conn.query(query)
    .then(resp => {
      let comm = '<div>';
      let data = resp.rows;
      data.forEach(elem => {
        comm += '<div id="' + elem.commentid +'">' + elem.username + '<br/>' + elem.body + '</div>';
      });
      comm += '</div>';
      req.comments = comm;
      res.render('index', {
        title: req.latest[0].title,
        description: req.latest[0].description,
        body: req.latest[0].body,
        blogList: req.markedUplist,
        comments: req.comments
      });
    })
}

app.get('/', getBlogList, getLatestPost, getComments);
