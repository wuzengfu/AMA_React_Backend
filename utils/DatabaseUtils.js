// const mysql = require('mysql');
//
// let connection;
// require('dotenv').config();
//
// class Database {
//     constructor() {
//         if (!connection) connection = mysql.createPool(
//             {
//                 connectionLimit: 15,
//                 host: process.env.DB_HOST || "localhost",
//                 user: process.env.DB_USER || "root",
//                 password: process.env.DB_PASSWORD || "18106910338",
//                 database: process.env.DB_NAME || "ask_me_anything",
//             });
//     }
//
//     query(sql, args) {
//         return new Promise((resolve, reject) => {
//             connection.query(sql, args, (err, rows) => {
//                 if (err) {
//                     console.error(err);
//                     return reject(err);
//                 }
//                 resolve(rows);
//             });
//         })
//     }
//
//     close() {
//         return new Promise((resolve, reject) => {
//             connection.end(err => {
//                 if (err) return reject(err);
//                 resolve();
//             });
//         });
//     }
// }
//
// module.exports = Database;
//

const pg = require("pg");
const Pool = pg.Pool;
pg.defaults.ssl = true;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

let pool;
module.exports.getPool = function () {
    if (!pool) pool = new Pool({connectionString: process.env.DATABASE_URL});
    return pool;
};
