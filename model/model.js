module.exports = {
    addQuestionToDb: addQuestionToDb,
    deleteQuestionFromDb: deleteQuestionFromDb,
    getQuestionFromDb: getQuestionFromDb,
    getQuestionListFromDb: getQuestionListFromDb,
    updateQuestionInDb: updateQuestionInDb
}

const { Pool } = require("pg");

const db_url = process.env.DATABASE_URL;

const pool = new Pool({connectionString: db_url});

function addQuestionToDb(parameters, callback)
{
    console.log("adding question to DB")

    const sql = "INSERT INTO questions (questionName, questiontext, answeronetext, answertwotext, answerthreetext, answerfourtext, answer) VALUES ($1, $2, $3, $4, $5, $6, $7)";

    pool.query(sql, parameters, function(error, result) {
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

function deleteQuestionFromDb(parameters, callback)
{
    console.log("Entering delete question from DB");
    const sql = "DELETE FROM questions WHERE id = $1";

    pool.query(sql, parameters, function (error, result) {
        if (error)
        {
            console.log("An error occured while deleting a question");
            console.log(error);
            callback(error, null);
        }
        else
        {
            callback(null, result);
        }
    })
}

function getQuestionFromDb(parameters, callback)
{
    console.log("Retrieving question data with ID: ");
    console.log(parameters);
    
    const sql = "SELECT questionname, questiontext, answeronetext, answertwotext, answerthreetext, answerfourtext, answer FROM questions WHERE id = $1";

    pool.query(sql, parameters, function (error, result) {
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

function getQuestionListFromDb(callback) // later on I'll need the userId to be passed in
{
    console.log("getting list of questions");

    const sql = "SELECT id, questionname FROM questions";
    /**************************************
     *  later on I'll want to extact question id's based on the user's id
     * 
     * const sql = "SELECT question_id FROM usrequestions WHERE user_id = $1";
     * '$1' will be the user id passed into the function via the parameters variable
     * 
     * pool.query(sql, parameters, function(error, result)
     * {
     *     if (error)
     *     {
     *         console.log("An error has occured: ");
     *         console.log(error);
     *         callback(error, null);
     *     }
     *     else
     *     {
     *         callback(null, result);
     *     }
     * });
     **************************************/

    pool.query(sql, function (error, result)
    {
        if (error)
        {
            console.log("An error has occured: ");
            console.log(error);
            callback(error, null);
        }
        else
        {
            callback(null, result);
        }
    });
}

function updateQuestionInDb(parameters, callback)
{
    console.log("entering update Question in DB");
    const sql = "UPDATE question SET questionname = $1, questionText = $2, answerOneText = $3, answerTwoText = $4, answerThreeText = $5, answerFourText = $6, answer = $7 WHERE id = $8"

    pool.query(sql, parameters, function(error, result){
        if (error)
        {
            console.log("An error occured while attempting to update a question");
            console.log(error);
            callback(error, null);
        }
        else
        {
            callback(null, result);
        }
    });
}