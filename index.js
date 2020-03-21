require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// files needed
require('./controller/addQuestion.js');
require('./controller/getQuestion.js');
require('./controller/updateQuestion.js');
require('./controller/deleteQuestion.js');

const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const clientPool = new Pool({connectionString: connectionString});

const port = process.env.PORT || 8080;
app.listen(port);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views'); // set up ejs for rendering html pages
app.set('view engine', 'ejs');

// --   Database queries   --
// app.post('/addQuestion', addQuestion());

// app.get('/getQuestion', getQuestion());

// app.put('/updateQuestion', updateQuestion);

// app.delete('/deleteQuestion', deleteQuestion);

/**************************************************
 * TESTS
 * What user information I need for making queries
 * - user id
***************************************************/
// const addTestParameters = ["text for another test question", "one", "two", "three", "four", 3];
// const addQuery = "INSERT INTO questions (questiontext, answeronetext, answertwotext, answerthreetext, answerfourtext, correctanswer) VALUES ($1, $2, $3, $4, $5, $6)";
// clientPool.query(addQuery, addTestParameters, function (error, response){
//     if (error){
//         console.log(error);
//     }
//     else {
//         console.log(response);
//     }
// });

// const retrieveQuery = "SELECT * FROM questions WHERE id = $1";

// const updateQuery = "UPDATE question SET questionText = $1, answerOneText = $2, answerTwoText = $3, answerThreeText = $4, answerFourText = $5, correctAnswer = $6 WHERE id = $7";
 
// const deleteQuery = "DELETE FROM userQuestions WHERE user_id = $1 AND question_id = $2";