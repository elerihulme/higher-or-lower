// The Game Object
let game = {
    cards: [],
    round: 0,
    currentCard: 0,
    previousCard: 0,
    gameStatus: "active"
};

// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

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

    $('#modal-reset-game-button').click(function () {
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
        $('#results-page').addClass('hide');
        $('#game-page').removeClass('hide');
        newGame();
    });
});

/**
 * The main game "loop", called when the 'start game' button is pressed
 * and after the 'reset game' and 'play again' buttons have been pressed
 */

function newGame() {
    game.cards = [];
    game.round = 0;
    $('#results-box').text('Press Higher or Lower to submit your guess!');

    for (i = 1; i < 5; i++) {
        $(`#card${i}`).text("?").css('background-color', 'skyblue');
    }

    while (game.cards.length < 5) {
        let card = ((Math.floor(Math.random() * 16)));
        if (!game.cards.includes(card)) {
            game.cards.push(card)
            console.log(game.cards);
        };
    };

    $('#card0').text(game.cards[0]);
    increaseRound();
    game.gameStatus = "active";
};

/**
 * Gets the current round number from the DOM and increases it by one 
 */

function increaseRound() {
    game.round++
    $("#round-number").text(game.round);
};

/**
 * Checks the round and assigns the current and previous cards that need to be compared accordingly
 */
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

/**
 * Checks whether the user guessed correctly
 */

function checkGuess(userGuess) {
    if (game.gameStatus === 'active') {
        if (userGuess === 'higher') {
            if (game.currentCard > game.previousCard) {
                if (game.round < 4) {
                    $("#results-box").text(`Correct! Round ${game.round} complete, guess again!`);
                    $(`#card${game.round}`).text(game.currentCard).css('background-color', 'limegreen');
                    increaseRound();
                } else if (game.round === 4) {
                    $('#results-page').removeClass('hide');
                    $('#game-page').addClass('hide');
                    $('#results-page-message').text('Congratulations You Won All the Rounds!');
                } else {
                    $("#results-box").text("Invalid Round Press Reset Game");
                }
            } else {
                $("#results-box").text("Incorrect! Press the 'Reset Game' to play again!");
                $(`#card${game.round}`).text(game.currentCard).css('background-color', 'red');;
                game.gameStatus = "inactive";
            };
        } else if (userGuess === 'lower') {
            if (game.currentCard < game.previousCard) {
                if (game.round < 4) {
                    $("#results-box").text(`Correct! Round ${game.round} complete, guess again!`);
                    $(`#card${game.round}`).text(game.currentCard).css('background-color', 'limegreen');;
                    increaseRound();
                } else if (game.round === 4) {
                    $('#results-page').removeClass('hide');
                    $('#game-page').addClass('hide');
                    $('#results-page-message').text('Congratulations You Won All the Rounds!');
                } else {
                    $("#results-box").text("Invalid Round Press Reset Game");
                }
            } else {
                $("#results-box").text("Incorrect! Press the 'Reset Game' to play again!");
                $(`#card${game.round}`).text(game.currentCard).css('background-color', 'red');;
                game.gameStatus = "inactive";
            };
        };
    } else {
        $("#results-box").text(`Press Reset Game to Play Again`);
    }
}