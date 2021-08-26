const express = require('express');
const router = express.Router();
const createHttpError = require('http-errors');
const commentService = require('../service/commentService');

router.post("/", (req, res, next) => {
    const {user_session, comment, question_id} = req.body;

    commentService.postComment(user_session, comment, question_id)
        .then(() => res.send("Comment posted!"))
        .catch(err => next(createHttpError(400, err)))
})


module.exports = router;
