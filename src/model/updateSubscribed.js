const Conn = require("../util/postgres");
const log = require("../util/Logger");

updateSubscribed = (req, res) => {
  if (req.body.subscribe === true) {
    var sql = `UPDATE users SET subscribe = true WHERE email = $1`;
  } else {
    var sql = `UPDATE users SET subscribe = false WHERE email = $1`;
  }
  const query = {
    text: sql,
    values: [req.body.email]
  };
  Conn.query(query)
    .catch(e => {
      log(e, "updateSubscribed.js");
    })
    .then(data => {
      res.status(200).json({ success: true });
    });
};

module.exports = updateSubscribed;
