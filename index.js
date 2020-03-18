require('dotenv').config();

const express = require('express');
const app = express();

const connectionString = process.env.DATABASE_URL;
const { Pool } = require('pg');
const clientPool = new Pool({connectionString: connectionString});

const port = process.env.PORT || 8080;
app.listen(port);

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views'); // set up ejs for rendering html pages
app.set('view engine', 'ejs');

// --   Database queries   --
app.post('/addQuestion', addQuestion);

app.get('/getQuestion', getQuestion);

// app.put('/updateQuestion', updateQuestion);

// app.delete('/deleteQuestion', deleteQuestion);

// --   query call back definitions   --

/************************************
 * ADD QUESTION
 ************************************/
function addQuestion (request, response)
{
    // get parameters
    const questionText  = request.query.questionText;
    const answerOne     = request.query.firstAnswer;
    const answerTwo     = request.query.secondAnswer;
    const answerThree   = request.query.thirdAnswer;
    const answerFour    = request.query.fourthAnswer;
    const correctAnswer = request.query.correctAnswer;

    const parameters = [questionText, answerOne, answerTwo, answerThree, answerFour, correctAnswer];

    addQuestionToDb(parameters, function(error, result) {
        if (error || result == null)
        {
            console.log("Error adding question to the database");
            response.status(500).json({success: false, data: error});
        }
        else
        {
            response.status(200).json({success: true, data: result});
        }
    });
}

function addQuestionToDb(parameters, callback)
{
    console.log("adding question to DB")
    console.log(parameters);

    const sql = "INSERT INTO questions (questiontext, answeronetext, answertwotext, answerthreetext, answerfourtext, correctanswer) VALUES ($1, $2, $3, $4, $5, $6)";

    clientPool.query(sql, parameters, function(error, result) {
        if (error)
        {
            console.log("error in query: ");
            console.log(error);
            callback(error, null);
        } 
        else 
        {
            callback(null, result);
        }


    });
}
// ---- END ADD QUESTION FUNCTIONS --------

/**************************************
 * GET QUESTION
 **************************************/
function getQuestion (request, response)
{
    const questionId = request.query.id;

    const parameters = [questionId];

    getQuestionFromDb(parameters, function (error, result) {
        if (error || result == null)
        {
            console.log("Error getting question from the database:");
            response.status(500).json({success: false, data: error});
        }
        else
        {
            response.status(200).json({success: true, data: result});
        }
    });
}

function getQuestionFromDb(parameters, callback)
{
    console.log("Retrieving question data with ID: ");
    console.log(parameters);
    
    const sql = "SELECT * FROM questions WHERE id = $1";

    clientPool.query(sql, parameters, function (error, result) {
        if (error)
        {
            console.log("an error has occured retrieving the question:");
            console.log(error);
            callback(error, null);
        }
        else
        {
            callback(null, result);
        }
    });
}

/**************************************************
 * UPDATE QUESTION
 **************************************************/
// function updateQuestion (request, response)
// {
//     const 
// }

// function deleteQuestion (request, response)
// {

// }

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