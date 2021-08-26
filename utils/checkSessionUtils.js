const sessionModel = require("../model/sessionModel");

function checkUserSession(user_session) {
    return sessionModel.checkUserSession(user_session)
        .then(result => {
            if (!result) throw new Error("The user session does not exist!");
            return result.is_started;
        });
}

function checkOwnerSession(user_session, owner_session) {
    return sessionModel.checkOwnerSession(user_session, owner_session)
        .then(result => {
            if (!result) throw new Error("The user session does not match with owner session!");
            return result.is_started;
        });
}

module.exports = {
    checkUserSession,
    checkOwnerSession
}

