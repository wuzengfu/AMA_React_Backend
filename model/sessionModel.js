const {getPool} = require("../utils/DatabaseUtils");
const db = getPool();

function createNew(user_session, owner_session) {
    let sql = `INSERT INTO session_info(user_session, owner_session) values ($1,$2);`;
    let args = [user_session, owner_session];

    return db.query(sql, args);
}

function startSession(user_session, owner_session) {
    let sql = `UPDATE session_info
               SET is_started = true
               WHERE user_session = $1
                 AND owner_session = $2;`;
    let args = [user_session, owner_session];

    return db.query(sql, args).then(result => result.rowCount);
}

function stopSession(user_session, owner_session) {
    let sql = `UPDATE session_info
               SET is_started = false
               WHERE user_session = $1
                 AND owner_session = $2;`;
    let args = [user_session, owner_session];

    return db.query(sql, args).then(result => result.rowCount);
}

function checkUserSession(user_session) {
    let sql = `SELECT is_started
               FROM session_info
               WHERE user_session = $1;`;
    let args = [user_session];

    return db.query(sql, args)
        .then(result => result.rows[0]);
}

function checkOwnerSession(user_session, owner_session) {
    let sql = `SELECT is_started
               FROM session_info
               WHERE user_session = $1
                 AND owner_session = $2;`;
    let args = [user_session, owner_session];

    return db.query(sql, args)
        .then(result => result.rows[0]);
}

module.exports = {
    createNew,
    startSession,
    stopSession,
    checkUserSession,
    checkOwnerSession
}
