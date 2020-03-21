function addAQuestion()
{
    const questionText  = $('#questionTextInput').val();
    const firstAnswer   = $('#firstAnswerInput').val();
    const secondAnswer  = $('#secondAnswerInput').val();
    const thirdAnswer   = $('#thirdAnswerInput').val();
    const fourthAnswer  = $('#fourthAnswerInput').val();
    const correctAnswer = $('input[name=correctAnswer]:checked').val();

    // clear entry fields
    $('#questionTextInput').val('');
    $('#firstAnswerInput').val('');
    $('#secondAnswerInput').val('');
    $('#thirdAnswerInput').val('');
    $('#fourthAnswerInput').val('');
    $('input[name=correctAnswer]').prop('checked', false);

    if (thirdAnswer == undefined)
    {
        thirdAnswer = null;
    }
    
    if (fourthAnswer == undefined)
    {
        fourthAnswer = null;
    }

    const data = {questionText, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, correctAnswer};

    $.post("/addQuestion");
}