const model = require('../model/model.js');

module.exports = {
    addQuestion: addQuestion,
    getQuestion: getQuestion,
    updateQuestion: updateQuestion,
    deleteQuestion: deleteQuestion
}

function addQuestion (request, response)
{
    // get parameters
    const data = JSON.parse(request.data);
    const questionText  = data.data.questionText;
    const answerOne     = data.data.firstAnswer;
    const answerTwo     = data.data.secondAnswer;
    const answerThree   = data.data.thirdAnswer;
    const answerFour    = data.data.fourthAnswer;
    const correctAnswer = data.data.correctAnswer;

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

function updateQuestion(request, response)
{
    // do nothing for now
}

function deleteQuestion(request, response)
{
    // do nothing for now
}