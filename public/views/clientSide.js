function validateInput()
{

}

function addAQuestion()
{
    const questionText  = $('#questionTextInput').val();
    const firstAnswer   = $('#firstAnswerInput').val();
    const secondAnswer  = $('#secondAnswerInput').val();
    const thirdAnswer   = $('#thirdAnswerInput').val();
    const fourthAnswer  = $('#fourthAnswerInput').val();
    const correctAnswer = $('input[name=correctAnswer]:checked').val();

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

    const data = JSON.stringify({questionText, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, correctAnswer});

    $.post('/addQuestion', { data: data });
}

function getAQuestion()
{
    $.get('/getQuestion');
}

function getListOfQuestions()
{
    let questionList = [];
    $.get('/getQuestionList', function( data ) {

        questionList = JSON.parse(data);
        console.log("returned from DB to Client, data is:");
        console.log(questionList);
    });
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