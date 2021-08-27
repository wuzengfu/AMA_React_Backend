const {getPool} = require("../utils/DatabaseUtils");
const db = getPool();

function getAllQuestions(user_session) {
    let sql = `SELECT question_id, question_description, is_answered, answer, follow_up_to
               FROM questions
               WHERE user_session = $1 ORDER BY question_id;`;
    let args = [user_session];

    return db.query(sql, args).then(result => result.rows);
}

function getQuestionById(question_id) {
    let sql = `SELECT question_description, answer, follow_up_to, comment_description
               FROM questions
                        left join comments c on questions.question_id = c.question_id
               WHERE questions.question_id = $1;`;
    let args = [question_id];

    return db.query(sql, args).then(result => result.rows[0]);
}

function postQuestion(user_session, question, follow_up_to) {
    let sql = `INSERT INTO questions (user_session,question_description, follow_up_to) values ($1,$2,$3);`;
    let args = [user_session, question, follow_up_to];

    return db.query(sql, args);
}

function answerQuestion(answer, question_id) {
    let sql = `UPDATE questions
               SET is_answered = true,
                   answer     = $1
               WHERE question_id = $2
                 AND is_answered = false;`;
    let args = [answer, question_id];

    return db.query(sql, args).then(result => result.rowCount);
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    postQuestion,
    answerQuestion,
}
