// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function chooseSubject() {
    let currentSubject = $('#katakana_subject').text()
    let subject = ''
    do {
        subject = subjects[getRandomInt(0, subjects.length)]
    } while (subject === currentSubject);

    $('#katakana_subject').text(subject)
    localStorage.setItem('katakana_subject', subject)
}

let subjects;

$(function() {
    if (localStorage.getItem('katakana_subject') !== null) {
        $('#katakana_subject').text(localStorage.getItem('katakana_subject'))
    }

    $.ajax({
        url: "js/katakana_words.txt",
        dataType: "text",
        success: function(fileContents) {
            let words = fileContents.split('\n')
            subjects = words.filter(w => w !== '');
        }
    });
})
