const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const sessionRoute = require("./routes/sessionRoute");
const questionRoute = require("./routes/questionRoute");
const commentRoute = require("./routes/commentRoute");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", (req, res, next) => {
    res.send("<h1>Welcome to Express!</h1>");
});
app.use("/session", sessionRoute);
app.use("/question", questionRoute);
app.use("/comment", commentRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, "404, URL Not Found!"));
});

// error handler
app.use(function (err, req, res, next) {
    console.error(`${err.statusCode || 500}: ${err.message}`);
    res.status(err.statusCode || 500).send(err.message || "Unexpected Error!");
});

module.exports = app;
