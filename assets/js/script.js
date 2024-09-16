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
    //Displays game page and starts a new game when start game button clicked
    $('#start-game-button').click(function () {
        $('#start-page').addClass('hide');
        $('#game-page').removeClass('hide');
        newGame();
    });
    //Restarts the game when the reset game button in the modal is clicked
    $('#modal-reset-game-button').click(function () {
        newGame();
    });
    //Submits the user guess as higher when the higher button is clicked
    $('#higher-button').click(function () {
        checkRound();
        checkGuess("higher");
    });
    //Submits the user guess as lower when the higher button is clicked
    $('#lower-button').click(function () {
        checkRound();
        checkGuess("lower");
    });
    //Displays the game page and starts a new game when play again button is clicked
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
    //set the key value pairs of the game object to their inital values
    game.cards = [];
    game.round = 0;
    game.gameStatus = "active";
    //give starting instruction to the user and ensure higher and lower buttons are enabled
    $('#results-box').text('Press Higher or Lower to submit your guess!');
    $("#higher-button").removeAttr("disabled", "disabled").addClass("game-button-hover");
    $("#lower-button").removeAttr("disabled", "disabled").addClass("game-button-hover");
    //set all the cards to the value of ?
    for (let i = 1; i < 5; i++) {
        $(`#card-${i}`).text("?").css('background-color', '#78ceeb');
    }
    //generate 5 random numbers between 0 and 15, avoiding duplicates, adding them to the cards array 
    while (game.cards.length < 5) {
        let card = ((Math.floor(Math.random() * 16)));
        if (!game.cards.includes(card)) {
            game.cards.push(card);
        }
    }
    //set the value of the first card to the value of first number in the game cards array
    $('#card-0').text(game.cards[0]);
    increaseRound();
}

/**
 * Gets the current round number from the DOM and increases it by one 
 */
function increaseRound() {
    game.round++;
    $("#round-number").text(game.round);
}

/**
 * Checks the round and assigns the current and previous cards that need to be compared accordingly
 */
function checkRound() {
    switch (game.round) {
        case 1:
            game.currentCard = game.cards[1];
            game.previousCard = game.cards[0];
            break;
        case 2:
            game.currentCard = game.cards[2];
            game.previousCard = game.cards[1];
            break;
        case 3:
            game.currentCard = game.cards[3];
            game.previousCard = game.cards[2];
            break;
        case 4:
            game.currentCard = game.cards[4];
            game.previousCard = game.cards[3];
            break;
    }
}

/**
 * Checks whether the user guessed correctly
 */
function checkGuess(userGuess) {
    //decides whether the user is able to make a guess or not, depending on if the game is active or inactive
    if (game.gameStatus === 'active') {
        //activates different code depending on whether the user guessed higher or lower 
        if (userGuess === 'higher') {
            //checks if the current card is greater than the previous card and therefore if the player was right or wrong
            if (game.currentCard > game.previousCard) {
                //checks the round number to decide whether the player is moving to the next round or has completed the game
                if (game.round < 4) {
                    //changes the card to green and lets you know you completed the round and increases the round number to show the start of the next round
                    $("#results-box").text(`Correct! Round ${game.round} complete, guess again!`);
                    $(`#card-${game.round}`).text(game.currentCard).css('background-color', 'limegreen');
                    increaseRound();
                } else if (game.round === 4) {
                    //takes the user to the results pages congratulating them
                    $('#results-page').removeClass('hide');
                    $('#game-page').addClass('hide');
                } else {
                    $("#results-box").text("Invalid Round Press Reset Game");
                }
            } else {
                /*changes the card to red and tells the user their guess was incorrect, changes the game status to inactive 
                to prevent further guess and disables the higher and lower buttons*/
                $("#results-box").text("Incorrect! Press the 'Reset Game' to play again!");
                $(`#card-${game.round}`).text(game.currentCard).css('background-color', 'red');
                game.gameStatus = "inactive";
                $("#higher-button").attr("disabled", "disabled").removeClass("game-button-hover");
                $("#lower-button").attr("disabled", "disabled").removeClass("game-button-hover");
            }
        } else if (userGuess === 'lower') {
            //checks if the current card is less than the previous card and therefore if the player was right or wrong
            if (game.currentCard < game.previousCard) {
                //checks the round number to decide whether the player is moving to the next round or has completed the game
                if (game.round < 4) {
                    //changes the card to green and lets you know you completed the round and increases the round number to show the start of the next round
                    $("#results-box").text(`Correct! Round ${game.round} complete, guess again!`);
                    $(`#card-${game.round}`).text(game.currentCard).css('background-color', 'limegreen');
                    increaseRound();
                } else if (game.round === 4) {
                    //takes the user to the results pages congratulating them
                    $('#results-page').removeClass('hide');
                    $('#game-page').addClass('hide');
                } else {
                    $("#results-box").text("Invalid Round Press Reset Game");
                }
            } else {
                //changes the card to red and tells the user their guess was incorrect, changes the game status to inactive 
                /*to prevent further guess and disables the higher and lower buttons*/
                $("#results-box").text("Incorrect! Press the 'Reset Game' to play again!");
                $(`#card-${game.round}`).text(game.currentCard).css('background-color', 'red');
                game.gameStatus = "inactive";
                $("#higher-button").attr("disabled", "disabled").removeClass("game-button-hover");
                $("#lower-button").attr("disabled", "disabled").removeClass("game-button-hover");
            }
        } else {
            $("#results-box").text("Select either the higher or lower button to submit your guess");
        }
    } else {
        $("#results-box").text(`Press Reset Game to Play Again`);
    }
}