const express = require('express');
const router = express.Router();
const createHttpError = require('http-errors');
const questionService = require('../service/questionService');

// Get all questions by user_session
router.get("/getAll", (req, res, next) => {
    const {user_session} = req.query;

    questionService.getAllQuestions(user_session)
        .then(result => res.json(result))
        .catch(err => next(createHttpError(400, err)))
});

// Get a question by user_session and question_id
router.get("/byId", (req, res, next) => {
    const {user_session, question_id} = req.query;

    questionService.getQuestionById(user_session, question_id)
        .then(result => res.json(result))
        .catch(err => next(createHttpError(400, err)))
});


// Users post a question
router.post("/postQuestion", (req, res, next) => {
    const {user_session, question, follow_up_to} = req.body;

    questionService.postQuestion(user_session, question, follow_up_to)
        .then(() => res.send("Question Posted"))
        .catch(err => next(createHttpError(400, err)))
});

// Owners answer a question
router.post("/postAnswer", (req, res, next) => {
    const {user_session, owner_session, question_id, answer} = req.body;

    questionService.answerQuestion(user_session, owner_session, answer, question_id)
        .then(() => res.send("Question Answered!"))
        .catch(err => next(createHttpError(400, err)))

})


module.exports = router;
