require('../model/addModel.js');

function addQuestion (data)
{
    // get parameters
    const questionText  = data.questionText;
    const answerOne     = data.firstAnswer;
    const answerTwo     = data.secondAnswer;
    const answerThree   = data.thirdAnswer;
    const answerFour    = data.fourthAnswer;
    const correctAnswer = data.correctAnswer;

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