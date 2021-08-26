const questionModel = require("../model/questionModel");
const checkSessionUtils = require("../utils/checkSessionUtils");

function getAllQuestions(user_session) {
    return checkSessionUtils.checkUserSession(user_session)
        .then(() => questionModel.getAllQuestions(user_session));
}

function getQuestionById(user_session, question_id) {
    return checkSessionUtils.checkUserSession(user_session)
        .then(() => questionModel.getQuestionById(question_id))
        .then(result => {
            if (result.length > 1) {
                result[0].comment_description = [result[0].comment_description];

                for (let i = 1; i < result.length; i++) {
                    result[0].comment_description.push(result[i].comment_description);
                }

                result.length = 1;
            }

            return result;
        });
}

function postQuestion(user_session, question, follow_up_to) {
    if (!follow_up_to) follow_up_to = null;

    return checkSessionUtils.checkUserSession(user_session)
        .then(is_started => {
            if (!is_started) throw new Error("The session is not started by owner!");
        })
        .then(() => questionModel.postQuestion(user_session, question, follow_up_to))
}

function answerQuestion(user_session, owner_session, answer,question_id ) {
    return checkSessionUtils.checkOwnerSession(user_session, owner_session)
        .then(is_started => {
            if (!is_started) throw new Error("The session is not started by owner!");
        })
        .then(() => questionModel.answerQuestion(answer, question_id))
        .then(rows => {
            if (rows !== 1) throw new Error("Cannot find this question or it has already been answered!");
        });
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    postQuestion,
    answerQuestion
}
