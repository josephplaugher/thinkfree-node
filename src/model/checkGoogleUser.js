const Conn = require('./../util/postgres');

const checkGoogleUser = (req, res) => {
    var query = {
        "text":`
        SELECT userid,
            username, 
            email
            FROM users WHERE email = $1`,
        "values":[req.query.email]}
      Conn.query(query)
          .then(resp => {
                if(resp.rows){ 
                    res.status(200).json({ user : resp.rows[0]});
                }
          }) 
}

module.exports = checkGoogleUser;