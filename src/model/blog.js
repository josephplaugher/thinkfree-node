const Conn = require('./../util/postgres');

const getBlogList = function (req, res, next) {
  Conn.query(`
    SELECT title, description, postid 
    FROM posts 
    ORDER BY postid DESC
  `)
    .then(resp => {
      let list;
      let data = resp.rows;
      data.forEach(elem => {
        list += '<div id="' + elem.postid +'"><span class="listTitle">' + elem.title + '</span><br/><span class="listDesc">' + elem.description + '</span></div>';
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
    let query = `
      SELECT title, description, body, postid 
      FROM posts  
      ORDER BY postid DESC LIMIT 1`;
    Conn.query(query)
      .then(resp => {        
        req.latest = resp.rows;
        next();
      }) 
  }
}

const getPostByID = function (req, res, next) {
  var query = {
    "text":`
      SELECT title, description, body, postid 
      FROM posts 
      WHERE postid=$1 
      ORDER BY postid DESC`,
    "values":[req.query.postid]}
  Conn.query(query)
    .then(resp => {
      req.latest = resp.rows;
      next();
    }) 
}

const getComments = function (req, res, next) {
  var query = {
    "text":`
      SELECT commentid, 
          username, 
          body 
      FROM comments
      WHERE postid=$1 
      ORDER BY postid DESC`,
    "values":[req.query.postid]}
  Conn.query(query)
    .then(resp => {
      let comm = '<div>';
      let data = resp.rows;
      data.forEach(elem => {
        comm += '<div id="' + elem.commentid +'" class="commentItem"><p><span class="userLabel">' + elem.username + '</span><br/><span class="commentBody">' + elem.body + '</span></p></div>';
      });
      comm += '</div>';
      req.comments = comm;
      /*console.log('post: ',req.latest[0]);
      console.log('list: ',req.markedUplist);
      console.log('comments: ',req.comments);*/
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