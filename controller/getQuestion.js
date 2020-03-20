require('../model/getModel.js');

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