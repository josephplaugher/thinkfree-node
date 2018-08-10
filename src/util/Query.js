const db = require('./postgres.js');

function Query(prepare, values) {
    this.prepare = prepare;
    this.values = values;
    this.query = {"text":this.prepare, "values":this.values};
}

Query.prototype.runQuery = function() {
        db.query(this.query)
        .then(data => {
            return data.rows })
        .catch(e => console.error(e.stack))
}

module.exports = Query;