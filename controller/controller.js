require('../model/addModel.js');
require('../model/deleteModel.js');
require('../model/getModel.js');
require('../model/updateModel');

function addQuestion (request, response)
{
    // get parameters
    const questionText  = request.body.questionText;
    const answerOne     = request.body.firstAnswer;
    const answerTwo     = request.body.secondAnswer;
    const answerThree   = request.body.thirdAnswer;
    const answerFour    = request.body.fourthAnswer;
    const correctAnswer = request.body.correctAnswer;

    const parameters = [questionText, answerOne, answerTwo, answerThree, answerFour, correctAnswer];
    console.log(parameters);

    addQuestionToDb(parameters, function(error, result) {
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

    getQuestionFromDb(parameters, function (error, result) {
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