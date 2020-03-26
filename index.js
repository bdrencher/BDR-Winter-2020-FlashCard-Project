require('dotenv').config();
const controller = require('./controller/controller.js');

const express = require('express');
const app = express();

const favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const pool = new Pool({connectionString: connectionString});

const port = process.env.PORT || 8080;
app.listen(port);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views'); // set up ejs for rendering html pages
app.set('view engine', 'ejs');

// --   Database queries   --
app.post('/addQuestion', function (req, res) {
    controller.addQuestion(req, res);
});

app.get('/getQuestion', function (req, res) {
    console.log("this is testing the GET request for get question");
    controller.getQuestion(req, res);
});

app.get('/getQuestionList', function(req, res) {
    console.log("This is a call to the getQuestionList function");
    controller.getQuestionList(req, res);
});

app.put('/updateQuestion', function (req, res) {
    console.log("teting the PUT request for update question");
    controller.updateQuestion(req, res);
});

app.delete('/deleteQuestion', function (req, res) {
    console.log("testing the DELETE request for delete question");
    controller.deleteQuestion(req, res);
});