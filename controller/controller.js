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
    const questionName  = data.questionName;
    const questionText  = data.questionText;
    const answerOne     = data.firstAnswer;
    const answerTwo     = data.secondAnswer;
    const answerThree   = data.thirdAnswer;
    const answerFour    = data.fourthAnswer;
    const correctAnswer = data.correctAnswer;

    const parameters = [questionName, questionText, answerOne, answerTwo, answerThree, answerFour, correctAnswer];
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
    console.log("inside controller getQuestion");
    const questionId = request.query.id;
    console.log("question id is:", questionId);
    const parameters = [questionId];
    console.log("parameters are:", parameters)

    model.getQuestionFromDb(parameters, function (error, result) {
        if (error || result == null)
        {
            console.log("Error getting question from the database:");
            response.status(500).json({success: false, data: error});
        }
        else
        {
            let question = result.rows[0];
            response.status(200).json({success: true, question: question});
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
            let nameList = [];
            let idList = [];
            
            for (let i = 0; i < rows.length; i++)
            {
                idList.push(rows[i].id);
                nameList.push(rows[i].questionname);
            }
            console.log(idList);
            console.log(nameList);

            response.status(200).json({success: true, ids: idList, names: nameList});
        }
    });
}

function updateQuestion(request, response)
{
    const questionData = request.body;

    const parameters = [questionData.name, questionData.text, questionData.one, questionData.two, questionData.three, questionData.four, questionData.correct, questionData.id];

    model.updateQuestionInDb(parameters, function(error, result)
    {
        if(error || result == null)
        {
            console.log("The update question DB return resulted in an error.")
            console.log(error);
            response.status(500).json({success: false, data: error});
        }
        else
        {
            console.log("The data was successfully updated")
            response.status(200);
        }
    });
}

function deleteQuestion(request, response)
{
    const id = [request.body.id];
    console.log("id requested for deletion", id);

    model.deleteQuestionFromDb(id, function(error, result) {
        if (error || result == null)
        {
            console.log("An error occured while getting the response back from DB");
            response.status(500).json({success: false, data: error});
        }
        else
        {
            console.log("The question was successfully deleted");
            response.status(500);
        }
    });
}