let game = {
    cards: [],
    round: 0
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
});

function newGame() {
    game.cards = [];
    game.round = 0;

    while (game.cards.length < 5) {
        let card = ((Math.floor(Math.random() * 16)));
        if (game.cards.includes(card)) {
            console.log(card)
        } else {
            game.cards.push(card)
        };

        console.log(game.cards);
    }

    // add in functionality so that the same number can't appear next to itself

    $('#card1').text(game.cards[0]);
    increaseRound();
};

function increaseRound() {
    game.round++
    $("#round-number").text(game.round);
}