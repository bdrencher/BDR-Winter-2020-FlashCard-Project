function addAQuestion()
{
    const questionText  = $('#questionTextInput').val();
    const firstAnswer   = $('#firstAnswerInput').val();
    const secondAnswer  = $('#secondAnswerInput').val();
    const thirdAnswer   = $('#thirdAnswerInput').val();
    const fourthAnswer  = $('#fourthAnswerInput').val();
    const correctAnswer = $('input[name=correctAnswer]:checked').val();

    if (thirdAnswer == undefined)
    {
        thirdAnswer = null;
    }
    
    if (fourthAnswer == undefined)
    {
        fourthAnswer = null;
    }

    const data = {questionText, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, correctAnswer};
    console.log(data);
}

function deleteAQuestion()
{
    $.delete('/deleteQuestion');
}

function updateAQuestion()
{
    $.put('/updateQuestion');
}