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
}

function getAQuestion()
{
    $.get('/getQuestion');
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
        let newOption = document.createElement('option');
        newOption.setAttribute('value', ids[1]);
        newOption.setAttribute('innerText', names[i]);
        $('#questionDropdown').append(newOption);
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