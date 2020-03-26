function validateInput()
{

}

function addAQuestion()
{
    const questionName  = $('#questionName').val();
    const questionText  = $('#questionTextInput').val();
    const firstAnswer   = $('#firstAnswerInput').val();
    const secondAnswer  = $('#secondAnswerInput').val();
    const thirdAnswer   = $('#thirdAnswerInput').val();
    const fourthAnswer  = $('#fourthAnswerInput').val();
    const correctAnswer = $('input[name=correctAnswer]:checked').val();

    $('#questionName').val('');
    $('#questionTextInput').val('');
    $('#firstAnswerInput').val('');
    $('#secondAnswerInput').val('');
    $('#thirdAnswerInput').val('');
    $('#fourthAnswerInput').val('');
    $('input[name=correctAnswer]').prop('checked', false) 

    if (thirdAnswer == undefined)
    {
        thirdAnswer = null;
    }
    
    if (fourthAnswer == undefined)
    {
        fourthAnswer = null;
    }

    const data = JSON.stringify({questionName, questionText, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, correctAnswer});

    $.post('/addQuestion', { data: data });
    getListOfQuestions();
}

function populateUpdateFields()
{
    const id = $("#questionDropdown").val();
    $.get('/getQuestion', {id: id})
        .done(function (data) {
            $('#updateQuestionName').val(data.question.questionname);
            $('#updateQuestionText').val(data.question.questiontext);
            $('#updateAnswerOne').val(data.question.answeronetext);
            $('#updateAnswerTwo').val(data.question.answertwotext);
            $('#updateAnswerThree').val(data.question.answerthreetext);
            $('#updateAnswerFour').val(data.question.answerfourtext);
        });
}

function getNextQuestion()
{
    const id = 1; // need to have a session variable to point to next question
    $.get('/getQuestion', {id: id})
        .done(function (data) {
            $('#questionBoxText').prop('innerText', data.question.questiontext);
            $('#answerOneText').prop('innerText', data.question.answeronetext);
            $('#answerTwoText').prop('innerText', data.question.answertwotext);
            $('#answerThreeText').prop('innerText', data.question.answerthreetext);
            $('#answerFourText').prop('innerText', data.question.answerfourtext);
        });
}

function getListOfQuestions()
{
    let idList = [];
    let nameList = [];
    $.get('/getQuestionList', function( data ) {

        idList   = data.ids;
        nameList = data.names;
        populateDropdown(idList, nameList);
    });
}

function populateDropdown(ids, names)
{
    for (let i = 0; i < ids.length; i++)
    {
        $('#questionDropdown').append(new Option(names[i], ids[i]));
    }
}

// get list of questions on page load
$( document ).ready(getListOfQuestions());

function deleteAQuestion()
{
    $.ajax({
        url: '/deleteQuestion',
        type: 'DELETE'
    });
}

function updateAQuestion()
{
    $.ajax({
        url: '/updateQuestion',
        type: 'PUT'
    });
}