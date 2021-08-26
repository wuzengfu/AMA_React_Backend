const sessionModel = require("../model/sessionModel");
const generateSession = require("../utils/generateSession");

function createNew() {
    const user_session = generateSession();
    const owner_session = generateSession();

    return sessionModel.createNew(user_session, owner_session)
        .then(() => {
            return {user_session, owner_session}
        });
}

function startSession(user_session, owner_session) {
    return sessionModel.startSession(user_session, owner_session)
        .then((affectedRows) => {
            if (affectedRows !== 1) throw new Error("The user session does not match with owner session!");
        })
}

function stopSession(user_session, owner_session) {
    return sessionModel.stopSession(user_session, owner_session)
        .then((affectedRows) => {
            if (affectedRows !== 1) throw new Error("The user session does not match with owner session!");
        })
}

function getSessionStatus(user_session) {
    return sessionModel.checkUserSession(user_session)
        .then(status => {
            if (status) return status.is_started;
            throw new Error("The user session does not exist!");
        })
}

module.exports = {
    createNew,
    startSession,
    stopSession,
    getSessionStatus
}
