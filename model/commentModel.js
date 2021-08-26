const {getPool} = require("../utils/DatabaseUtils");
const db = getPool();

function postComment(comment, question_id) {
    let sql = `INSERT INTO comments(comment_description, question_id) VALUES ($1,$2);`;
    let args = [comment, question_id];

    return db.query(sql, args);
}

module.exports = {
    postComment
}
