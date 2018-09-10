const Conn = require('./../util/postgres');

const checkGoogleUser = (req, res) => {
    var query = {
        "text":`
        SELECT userid, 
            password, 
            username, 
            email, 
            status, 
            admin 
            FROM users WHERE email = $1`,
        "values":[req.query.email]}
      Conn.query(query)
          .then(resp => {
                if(resp.rows){           
                    return res.status(200).json({ exists: true, user : resp.rows});
                }else{
                    return res.status(200).json({ exists : false });
                }
          }) 
}

module.exports = checkGoogleUser;