const Conn = require('./../util/postgres');
const bcrypt = require('bcryptjs');
const log = require('./../util/Logger');
const email = require('./email');

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
        .catch(e => { log(e, 'newUser.js')})
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
    var password = bcrypt.hashSync(req.body.password, 14);
    var query = {
        "text": `
        INSERT into users (
            username, 
            email,
            password)
        VALUES ($1, $2, $3)`,
        "values": [req.body.username, req.body.email, password]
    }
    Conn.query(query)
        .catch(e => { log(e, 'newUser.js')})
        .then(result => {
            email(req.body, req, res);
            res.status(200).json({ success: true, userData:{username: req.body.username, email: req.body.email} });
        });
}

module.exports = {checkUsername, setNewUser};