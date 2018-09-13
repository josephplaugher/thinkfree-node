const Conn = require('./../util/postgres');

const newComment = function (req, res) {
    console.log('the request: ',req.body);
    var i = req.body;
      var query = {
        "text":`
            INSERT INTO comments 
            (postid, username, body) 
            VALUES ($1, $2, $3)`,
        "values":[i.postid, i.username, i.comment]}
      Conn.query(query)
        .then(data => {
            res.status(200).json({ success: data });
        }) 
        .catch(e => console.error('Error: ',e.stack));
}

module.exports = newComment;