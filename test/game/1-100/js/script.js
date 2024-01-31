function startGame() {
    if (window.confirm("今のゲーム内容をリセットしてゲームを始めますか？")) {
        $('#subject').val('')
        $('ol#players').empty()
        localStorage.clear()

        let numOfPlayers = $('#num_of_players').val()
        localStorage.setItem('num_of_players', numOfPlayers)

        for (let i = 1; i <= numOfPlayers; i++) {
            let id = 'player-' + i
            let player = {
                name: 'プレイヤー' + i,
                card: null,
            }
            addPlayer(id, player)
        }
    }
}

function addPlayer(id, player) {
    $('ol#players').append('<li><input type="text" id="' + id + '" value="' + player.name + '" size="12" onchange="changePlayerName(this.id, this.value)"> <button id="' + id + '" name="' + player.name + '" value="' + player.card + '" onclick="showCard(this.name, this.value)">カードを見る</button></li>')
    savePlayerJson(id, player)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function chooseSubject() {
    let currentSubject = $('#subject').text()
    let subject = ''
    do {
        subject = subjects[getRandomInt(0, subjects.length)]
    } while (subject === currentSubject);

    $('#subject').text(subject)
    localStorage.setItem('subject', subject)
}

function dealCards() {
    let numbers = Array.from({length: 100}, (_, i) => i + 1)
    for (let i = 1; i <= $('#num_of_players').val(); i++) {
        let id = 'player-' + i
        let num = numbers[getRandomInt(0, numbers.length)]
        numbers = numbers.filter(n => n !== num)
        $('button#' + id).val(num)
        savePlayerCard(id, num)
    }
}

function showCard(name, value) {
    if (window.confirm(name + "さんに配られたカードを見ますか？")) {
        window.alert("カードの数字：" + value)
    }
}

function changePlayerName(id, name) {
    $('button#' + id).attr('name', name)
    savePlayerName(id, name)
}

function savePlayerName(id, name) {
    let savedPlayer = getPlayerJson(id)
    if (savedPlayer === null) {
        let player = {
            name: name,
            card: null,
        }
        savePlayerJson(id, player)
    } else {
        savedPlayer.name = name
        savePlayerJson(id, savedPlayer);
    }
}

function savePlayerCard(id, card) {
    let savedPlayer = getPlayerJson(id)
    if (savedPlayer === null) {
        let player = {
            name: "",
            card: card,
        }
        savePlayerJson(id, player)
    } else {
        savedPlayer.card = card
        savePlayerJson(id, savedPlayer);
    }
}

function savePlayerJson(id, player) {
    let jsonString = JSON.stringify(player)
    localStorage.setItem(id, jsonString)
}

function getPlayerJson(id) {
    let player = localStorage.getItem(id)
    if (player === null) {
        return null
    }

    return JSON.parse(player);
}

let subjects;

$(function() {
    if (localStorage.getItem('num_of_players') !== null) {
        $('#num_of_players').val(localStorage.getItem('num_of_players'))
    }

    if (localStorage.getItem('subject') !== null) {
        $('#subject').text(localStorage.getItem('subject'))
    }

    let i = 1
    while (getPlayerJson('player-' + i) !== null) {
        if (i === 1) {
            $('ol#players').empty()
        }
        let player = getPlayerJson('player-' + i)
        addPlayer('player-' + i, player)
        i++
    }

    $.ajax({
        url: "js/subjects.txt",
        dataType: "text",
        success: function(fileContents) {
            let words = fileContents.split('\n')
            subjects = words.filter(w => w !== '');
        }
    });
})
