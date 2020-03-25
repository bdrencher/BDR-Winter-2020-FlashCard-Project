const model = require('../model/model.js');

module.exports = {
    addQuestion: addQuestion,
    getQuestion: getQuestion,
    getQuestionList: getQuestionList,
    updateQuestion: updateQuestion,
    deleteQuestion: deleteQuestion
}

function addQuestion (request, response)
{
    // get parameters
    const data = JSON.parse(request.body.data);
    const questionText  = data.questionText;
    const answerOne     = data.firstAnswer;
    const answerTwo     = data.secondAnswer;
    const answerThree   = data.thirdAnswer;
    const answerFour    = data.fourthAnswer;
    const correctAnswer = data.correctAnswer;

    const parameters = [questionText, answerOne, answerTwo, answerThree, answerFour, correctAnswer];
    console.log(parameters);

    model.addQuestionToDb(parameters, function(error, result) {
        if (error || result == null)
        {
            console.log("Error adding question to the database");
            response.status(500).json({success: false, data: error});
        }
        else
        {
            response.status(200).json({success: true});
        }
    });
}

function getQuestion (request, response)
{
    const questionId = request.body.id;

    const parameters = [questionId];

    model.getQuestionFromDb(parameters, function (error, result) {
        if (error || result == null)
        {
            console.log("Error getting question from the database:");
            response.status(500).json({success: false, data: error});
        }
        else
        {
            response.status(200).json({success: true});
        }
    });
}

function getQuestionList(request, response)
{
    // const userId = request.body.userId; - need this later
    // const parameters = [userId]; - need this later

    model.getQuestionListFromDb(function(error, result) { // later on need to pass userId in
        if(error || result == null)
        {
            console.log("Error getting data from the database:");
            response.status(500).json({success: false, data: error});
        }
        else
        {
            console.log("result from controller level");
            let rows = result.rows;
            let idList = [];
            
            for (let i = 0; i < rows.length; i++)
            {
                idList.push(rows[i].id);
            }
            console.log(idList);

            response.status(200).json({success: true, data: idList});
        }
    });
}

function updateQuestion(request, response)
{
    // do nothing for now
}

function deleteQuestion(request, response)
{
    // do nothing for now
}