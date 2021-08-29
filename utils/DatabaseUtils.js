const pg = require("pg");
const Pool = pg.Pool;

require('dotenv').config();
let config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}

if (process.env.DATABASE_URL) {
    pg.defaults.ssl = true;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    config = {connectionString: process.env.DATABASE_URL};
}

let pool;
module.exports.getPool = function () {
    if (!pool) pool = new Pool(config);
    return pool;
};
