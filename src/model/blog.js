const Conn = require('./../util/postgres');
const log = require('./../util/Logger');

const getBlogList = function (req, res, next) {
  Conn.query("SELECT title, description, postid FROM posts WHERE published = 'true' ORDER BY postid DESC")
    .catch(e => { log(e, 'blog.js')})
    .then(resp => {
      let list = '';
      let data = resp.rows;
      data.forEach(elem => {
        list += '<div id="' + elem.postid +'" class="bloglist" ><span class="listTitle">' + elem.title + '</span><br/><span class="listDesc">' + elem.description + '</span></div>';
      });
      req.bloglist = data;
      req.markedUplist = list;
      next();
    })
}

const getCurrentPost = function (req, res, next) {
  if(req.query.postid) { 
    module.exports.getPostByID(req, res, next);
  }else{
    let query = "SELECT title, description, body, postid FROM posts WHERE published = 'true' ORDER BY postid DESC LIMIT 1";
    Conn.query(query)
    .catch(e => { log(e, 'blog.js')})
    .then(resp => {
      req.latest = resp.rows;
      res.render('index', {
        title: req.latest[0].title,
        description: req.latest[0].description,
        body: req.latest[0].body,
        postid: req.latest[0].postid,
        blogList: req.markedUplist
      });
    }) 
  }
}

const getPostByID = function (req, res) {
  var query = {
    "text":"SELECT title, description, body, postid FROM posts WHERE postid=$1 AND published = 'true'",
    "values":[req.query.postid]}
  Conn.query(query)
    .catch(e => { log(e, 'blog.js')})
    .then(resp => {
      req.latest = resp.rows;
      res.render('index', {
        title: req.latest[0].title,
        description: req.latest[0].description,
        body: req.latest[0].body,
        postid: req.latest[0].postid,
        blogList: req.markedUplist
      });
    }) 
}

const userSelectPost = function (req, res) {
  var query = {
    "text":"SELECT title, description, body, postid FROM posts WHERE postid=$1 ",
    "values":[req.params.postid]}
  Conn.query(query)
    .catch(e => { log(e, 'blog.js')})
    .then(resp => {
      res.status(200).json({ postdata:resp.rows[0] });
    }) 
    .catch(e => console.error('Error: ',e.stack));
}

module.exports = {getBlogList, getCurrentPost, getPostByID, userSelectPost};