const Conn = require('./../util/postgres');

const checkUsername = (req, res) => {
    if(req.body.username === 'null' || typeof req.body.username === 'undefined' || req.body.username === '') {
        res.status(200).json({ error : {username:"Username is required"}} );
    }else{
    var query = {
        "text":`
        SELECT userid
        FROM users WHERE username = $1`,
        "values":[req.body.username]}
      Conn.query(query)
          .then(result => {
                if(result.rowCount > 0){ 
                    res.status(200).json({ error : {username:"That username is taken. Please choose something else"}} );
                }else{
                    module.exports.setNewUser(req, res);
                }
          }) 
    }
}

const setNewUser = (req, res) => {
    var query = {
        "text": `
        INSERT into users (
            username, 
            email)
        VALUES ($1, $2)`,
        "values": [req.body.username, req.body.email]
    }
    Conn.query(query)
        .then(result => {
            res.status(200).json({ success: true, user:{username: req.body.username, email: req.body.email} });
        });
}

module.exports = {checkUsername, setNewUser};