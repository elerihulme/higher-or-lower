let game = {
    cards: [],
    round: 0,
    currentCard: 0,
    previousCard: 0,
};

$(document).ready(function () {
    $('#start-game-button').click(function () {
        $('#start-page').addClass('hide');
        $('#game-page').removeClass('hide');
        newGame();
    });

    $('#how-to-play-button').click(function () {
        $('#start-page').removeClass('hide');
        $('#game-page').addClass('hide');
    });

    $('#reset-game-button').click(function () {
        newGame();
    });

    $('#higher-button').click(function () {
        game.userGuess = "higher"
        checkRound();
        checkGuess("higher");

    });

    $('#lower-button').click(function () {
        game.userGuess = "lower"
        checkRound();
        checkGuess("lower");

    });

    $('#play-again-button').click(function () {
        $('#start-page').addClass('hide');
        $('#game-page').removeClass('hide');
        newGame();
    });
});

function newGame() {
    game.cards = [];
    game.round = 0;

    while (game.cards.length < 5) {
        let card = ((Math.floor(Math.random() * 16)));
        if (!game.cards.includes(card)) {
            game.cards.push(card)
        };
        console.log(game.cards);
    };

    $('#card0').text(game.cards[0]);
    increaseRound();
};

function increaseRound() {
    game.round++
    $("#round-number").text(game.round);
};

function checkRound() {
    if (game.round === 1) {
        game.currentCard = game.cards[1]
        game.previousCard = game.cards[0]
    } else if (game.round === 2) {
        game.currentCard = game.cards[2]
        game.previousCard = game.cards[1]
    } else if (game.round === 3) {
        game.currentCard = game.cards[3]
        game.previousCard = game.cards[2]
    } else if (game.round === 4) {
        game.currentCard = game.cards[4]
        game.previousCard = game.cards[3]
    } else {
        console.log('game round invalid')
    };
}

function checkGuess(userGuess) {
    if (userGuess === 'higher') {
        if (game.currentCard > game.previousCard) {
            if (game.round < 4) {
                $("#results-box").text(`Correct! Round ${game.round} complete, guess again!`);
                $(`#card${game.round}`).text(game.currentCard);
            } else if (game.round === 4) {
                $('#results-page').removeClass('hide');
                $('#game-page').addClass('hide');
                $('#results-page-message').text('Congratulations You Won ALl the Rounds!');
            } else {
                $("#results-box").text("Game over! You've completed all rounds.");
            }
        } else {
            $("#results-box").text("Incorrect! Press the 'Reset Game' to play again!");
            $(`#card${game.round}`).text(game.currentCard);
        };
    } else if (userGuess === 'lower') {
        if (game.currentCard < game.previousCard) {
            if (game.round < 4) {
                $("#results-box").text(`Correct! Round ${game.round} complete, guess again!`);
                $(`#card${game.round}`).text(game.currentCard);
            } else if (game.round === 4) {
                $('#results-page').removeClass('hide');
                $('#game-page').addClass('hide');
                $('#results-page-message').text('Congratulations You Won ALl the Rounds!');
            } else {
                $("#results-box").text("Game over! You've completed all rounds.");
            }
        } else {
            $("#results-box").text("Incorrect! Press the 'Reset Game' to play again!");
            $(`#card${game.round}`).text(game.currentCard);
        };
    };

}