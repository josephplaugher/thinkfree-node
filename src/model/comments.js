const Conn = require('./../util/postgres');

const refreshComments = function (req, res, next) {
  console.log('the id:', req.params.postid)
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
        let comm = '';
        if(resp.rows){
          comm += '<div>';
          let data = resp.rows;
          data.forEach(elem => {
            comm += '<div id="' + elem.commentid +'" class="commentItem"><p><span class="userLabel">' + elem.username + '</span><br/><span class="commentBody">' + elem.body + '</span></p></div>';
          });
          comm += '</div>';
        }
          console.log('the comments: ',comm);
          res.status(200).json({ comments:comm });
        }) 
        .catch(e => console.error('Error: ',e.stack));
  }

  module.exports = refreshComments;
  