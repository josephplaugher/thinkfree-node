const Conn = require('./../util/postgres');

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

const getCurrentPost = (req, res, next) => {
  var query;
  if(req.params.postid) { 
    query = {
      "text":`
        SELECT title, description, body, postid 
        FROM posts 
        WHERE postid=$1 `,
      "values":[req.params.postid]}
    }else{
    query = `
      SELECT title, description, body, postid 
      FROM posts  
      ORDER BY postid DESC LIMIT 1`;
      console.log('which one: 2');
    }
  Conn.query(query)
    .then(resp => {
      req.latest = resp.rows;
      next();
    }) 
}

const getPostByID = (req, res, next) => {
  console.log('the requested post: ', req.params.postid);
  var query = {
    "text":`
      SELECT title, description, body, postid 
      FROM posts 
      WHERE postid=$1 
      ORDER BY postid DESC`,
    "values":[req.params.postid]}
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
    "values":[req.params.postid]}
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

module.exports = {getBlogList, getCurrentPost, getPostByID, getComments};