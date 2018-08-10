const { Pool } = require('pg')

const userConn = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blog',
    password: 'tesla1985',
    port: 5432
});
userConn.connect();

module.exports = userConn;