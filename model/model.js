module.exports = {
    addQuestionToDb: addQuestionToDb,
    deleteQuestionFromDb: deleteQuestionFromDb,
    getQuestionFromDb: getQuestionFromDb,
    updateQuestionInDb: updateQuestionInDb
}

function addQuestionToDb(parameters, callback)
{
    console.log("adding question to DB")

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

function deleteQuestionFromDb()
{
    // do nothing right now
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

function updateQuestionInDb()
{
    // do nothing for now
}