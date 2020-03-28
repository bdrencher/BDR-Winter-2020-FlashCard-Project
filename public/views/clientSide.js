localStorage.setItem('idIndex', JSON.stringify(0));
localStorage.setItem('incorrect', JSON.stringify(0));
localStorage.setItem('correct', JSON.stringify(0));
localStorage.setItem('answer', JSON.stringify(5));

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

    $.post('/addQuestion', { data: data })
        .done(function () {
            getListOfQuestions();
        });
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
    // don't do anything if the question has already been answered
    if(JSON.parse(localStorage.getItem('answer') == 0))
    {
        alert("This question has already been answered");
        return;
    }

    let id = null;
    $.get('/getQuestionList', function( data ) {
        const idList = data.ids;

        // retrieve the next question in the list or else start over
        let nextIndex = JSON.parse(localStorage.getItem('idIndex')) + 1;
        if (nextIndex >= idList.length)
        {
            nextIndex = 0;
        }
        localStorage.setItem('idIndex', JSON.stringify(nextIndex));
        id = idList[nextIndex];

    }).done(function() {
        $.get('/getQuestion', {id: id})
        .done(function (data) {
            $('#questionBoxName').prop('innerText', data.question.questionname);
            $('#questionBoxText').prop('innerText', data.question.questiontext);
            $('#answerOneText').prop('innerText', data.question.answeronetext);
            $('#answerTwoText').prop('innerText', data.question.answertwotext);
            $('#answerThreeText').prop('innerText', data.question.answerthreetext);
            $('#answerFourText').prop('innerText', data.question.answerfourtext);
            localStorage.setItem('answer', JSON.stringify(data.question.answer));
        });
    });
}

function submitAnswer()
{
    let correct = JSON.parse(localStorage.getItem('correct'));
    let incorrect = JSON.parse(localStorage.getItem('incorrect'));
    const correctAnswer = localStorage.getItem('answer');
    const selection = $('input[name=radioAnswer]:checked').val();

    if (selection == correctAnswer)
    {
        correct += 1;
        $('#correct').prop('innerText', 'Correct: ' + correct);
        localStorage.setItem('correct', JSON.stringify(correct));
    }
    else
    {
        incorrect += 1;
        $('#incorrect').prop('innerText', 'Incorrect: ' + incorrect);
        localStorage.setItem('incorrect', JSON.stringify(incorrect));
    }

    localStorage.setItem('answer', JSON.stringify(0));
}

function resetScores()
{
    $('#correct').prop('innerText', 'Correct: 0');
    $('#incorrect').prop('innerText', 'Incorrect: 0');
    localStorage.setItem('correct', JSON.stringify(0));
    localStorage.setItem('incorrect', JSON.stringify(0));
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
    // first, remove any options currently present
    $('#questionDropdown').find('option').remove();

    // replace default and add new options
    $('#questionDropdown').append(new Option("Please select a question to delete or edit", null));
    for (let i = 0; i < ids.length; i++)
    {
        $('#questionDropdown').append(new Option(names[i], ids[i]));
    }
}

// get list of questions on page load
$( document ).ready(getListOfQuestions());

function deleteAQuestion()
{
    const id = $('#questionDropdown').val();
    $.ajax({
        url: '/deleteQuestion',
        type: 'DELETE',
        data: {id: id}
    }).done(function() {
        clearUpdateFields();
        getListOfQuestions();
    });
}

function updateAQuestion()
{
    const id          = $('#questionDropdown').val();
    const qName       = $('#updateQuestionName').val();
    const qText       = $('#updateQuestionText').val();
    const answerOne   = $('#updateAnswerOne').val();
    const answerTwo   = $('#updateAnswerTwo').val();
    const answerThree = $('#updateAnswerThree').val();
    const answerFour  = $('#updateAnswerFour').val();
    const correct     = $('input[name=updateCorrectAnswer]:checked').val();
    
    $.ajax({
        url: '/updateQuestion',
        type: 'PUT',
        data: {id: id, name: qName, text: qText, one: answerOne, two: answerTwo, three: answerThree, four: answerFour, correct: correct}
    }).done(function (){
        clearUpdateFields();
        getListOfQuestions();
    });

}

function clearUpdateFields()
{
    $('#updateQuestionName').val('');
    $('#updateQuestionText').val('');
    $('#updateAnswerOne').val('');
    $('#updateAnswerTwo').val('');
    $('#updateAnswerThree').val('');
    $('#updateAnswerFour').val('');
    $('input[name=updateCorrectAnswer]').prop('checked', false);
}