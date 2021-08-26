const commentModel = require("../model/commentModel");
const checkSessionUtils = require("../utils/checkSessionUtils");

function postComment(user_session, comment, question_id) {
    return checkSessionUtils.checkUserSession(user_session)
        .then(is_started => {
            if (!is_started) throw new Error("The session is not started by owner!");
        })
        .then(() => commentModel.postComment(comment, question_id))
        .catch(err => {
            if (err.errno === 1452) throw new Error("Cannot find this question!");
            throw new Error(err.message);
        })
}


module.exports = {
    postComment
}
