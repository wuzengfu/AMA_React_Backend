const express = require('express');
const router = express.Router();
const createHttpError = require('http-errors');
const sessionService = require('../service/sessionService');
const checkSessionUtils = require("../utils/checkSessionUtils");

// Get new sessions (user and owner)
router.get("/", (req, res, next) => {
    sessionService.createNew()
        .then(result => res.json(result))
        .catch(err => next(createHttpError(500, err)));
});

// Get the status of sessions
router.get("/status", (req, res, next) => {
    const {user_session} = req.query;

    if (user_session.length !== 10) {
        return next(createHttpError(400, `Session (${user_session}) must be the length of 10!`));
    }

    sessionService.getSessionStatus(user_session)
        .then(status => res.send(status))
        .catch(err => next(createHttpError(400, err)));
});

// Check the existence of user session
router.post("/check/user", (req, res, next) => {
    const {user_session} = req.query;

    if (user_session.length !== 10) {
        return next(createHttpError(400, `Session (${user_session}) must be the length of 10!`));
    }

    checkSessionUtils.checkUserSession(user_session)
        .then(result => res.send(result))
        .catch(err => next(createHttpError(400, err)));
});

// Check the existence of user and owner sessions
router.post("/check/owner", (req, res, next) => {
    const {user_session, owner_session} = req.body;

    if (user_session.length !== 10) {
        return next(createHttpError(400, `Session (${user_session}) must be the length of 10!`));
    }

    if (owner_session.length !== 10) {
        return next(createHttpError(400, `Session (${owner_session}) must be the length of 10!`));
    }

    checkSessionUtils.checkOwnerSession(user_session, owner_session)
        .then(result => res.send(result))
        .catch(err => next(createHttpError(400, err)));
})

// Owner starts a session
router.post("/start", (req, res, next) => {
    const {user_session, owner_session} = req.body;

    if (user_session.length !== 10 || owner_session.length !== 10) {
        return next(createHttpError(400, `Session (${user_session.length !== 10 ? user_session : owner_session}) must be the length of 10!`));
    }

    sessionService.startSession(user_session, owner_session)
        .then(() => res.send("Session started"))
        .catch(err => next(createHttpError(400, err)))
});

// Owner stop a session
router.post("/stop", (req, res, next) => {
    const {user_session, owner_session} = req.body;

    if (user_session.length !== 10 || owner_session.length !== 10) {
        return next(createHttpError(400, `Session (${user_session.length !== 10 ? user_session : owner_session}) must be the length of 10!`));
    }

    sessionService.stopSession(user_session, owner_session)
        .then(() => res.send("Session stopped"))
        .catch(err => next(createHttpError(400, err)))
});


module.exports = router;
