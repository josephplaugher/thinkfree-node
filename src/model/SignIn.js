const Conn = require('./../util/postgres');
const bcrypt = require('bcryptjs');
const log = require('./../util/Logger');

function SignIn(req, res) {
  this.inputs = req.body;
  this.res = res;
}

SignIn.prototype.login = function () {
  const query = {
    "text": `SELECT email, password, username, subscribe 
      FROM users WHERE email = $1 `,
    "values": [this.inputs.email]
  };
  Conn.query(query)
    .catch(e => { log(e, 'SignIn.js')})
    .then(data => {
      this.checkPassword(data);
    });
  }

  SignIn.prototype.checkPassword = function (data) {
    if (data.rows[0]) {
      //if the email resulted in a user entry, compare password hashes
      var dbhash = data.rows[0].password;
      //if the password was hashed in PHP it will contain a '$2y$' hash.
      //if hashed in Node, it will contain a '$2a$a' hash.
      //if the former, we replace it before verifying.
      if (dbhash.includes('$2y$')) { dbhash = dbhash.replace(/^\$2y(.+)$/i, '$2a$1'); }
      //compaare the hashes
      bcrypt.compare(this.inputs.password, dbhash, (error, result) => {
        if (error){
          log(error, 'SignIn.js')
        }else if (result == false) {
          this.res.status(200).json({ success: false, userNotify: 'That email or password is invalid', userData: {} });
        } else if (result == true) {
          delete data.rows[0].password;//ensure the pw hash isn't sent along to the client
          this.res.status(200).json({ success: true, userNotify: '', userData: data.rows[0] });
        }
      });
    } else {
      //if no matching entry was found, report an error
      this.res.status(200).json({ userNotify: 'That email or password is invalid', userData: '' });
    }
  }

  module.exports = SignIn;