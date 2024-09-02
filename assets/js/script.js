// The Game Object
let game = {
    cards: [],
    round: 0,
    currentCard: 0,
    previousCard: 0,
    gameStatus: "active"
};

/**
 * Wait for the DOM to finish loading before running the game
 * Get the button elements and add event listeners to them
 */
$(document).ready(function () {
    //Displays game page when start game button clicked
    $('#start-game-button').click(function () {
        $('#start-page').addClass('hide');
        $('#game-page').removeClass('hide');
        newGame();
    });
    //Displays the start page when the how to play button is clicked
    $('#how-to-play-button').click(function () {
        $('#start-page').removeClass('hide');
        $('#game-page').addClass('hide');
    });
    //Restarts the game when the reset game button in the modal is clicked
    $('#modal-reset-game-button').click(function () {
        newGame();
    });
    //Submits the user guess as higher when the higher button is clicked
    $('#higher-button').click(function () {
        game.userGuess = "higher"
        checkRound();
        checkGuess("higher");
    });
    //Submits the user guess as lower when the higher button is clicked
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

    for (let i = 1; i < 5; i++) {
        $(`#card-${i}`).text("?").css('background-color', '#78ceeb');
    }

    while (game.cards.length < 5) {
        let card = ((Math.floor(Math.random() * 16)));
        if (!game.cards.includes(card)) {
            game.cards.push(card)
            console.log(game.cards);
        };
    };

    $('#card-0').text(game.cards[0]);
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
    switch (game.round) {
        case 1:
            game.currentCard = game.cards[1]
            game.previousCard = game.cards[0]
            break;
        case 2:
            game.currentCard = game.cards[2]
            game.previousCard = game.cards[1]
            break;
        case 3:
            game.currentCard = game.cards[3]
            game.previousCard = game.cards[2]
            break;
        case 4:
            game.currentCard = game.cards[4]
            game.previousCard = game.cards[3]
            break;
    }
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
                    $(`#card-${game.round}`).text(game.currentCard).css('background-color', 'limegreen');
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
                $(`#card-${game.round}`).text(game.currentCard).css('background-color', 'red');;
                game.gameStatus = "inactive";
            };
        } else if (userGuess === 'lower') {
            if (game.currentCard < game.previousCard) {
                if (game.round < 4) {
                    $("#results-box").text(`Correct! Round ${game.round} complete, guess again!`);
                    $(`#card-${game.round}`).text(game.currentCard).css('background-color', 'limegreen');;
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
                $(`#card-${game.round}`).text(game.currentCard).css('background-color', 'red');;
                game.gameStatus = "inactive";
            };
        };
    } else {
        $("#results-box").text(`Press Reset Game to Play Again`);
    }
}