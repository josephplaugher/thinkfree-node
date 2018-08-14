const { Pool } = require('pg')

const Conn = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blog',
    password: 'tesla1985',
    port: 5432
});
Conn.connect();

module.exports = Conn;