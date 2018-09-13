const Conn = require('./../util/postgres');

const getComments = function (req, res) {
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
          res.status(200).json({ comments:resp.rows });
        }) 
        .catch(e => console.error('Error: ',e.stack));
  }

  module.exports = getComments;
  