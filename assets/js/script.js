$(document).ready(function () {
    $('#start-game-button').click(function () {
        $('#start-page').addClass('hide');
        $('#game-page').removeClass('hide');
    });

    $('#how-to-play-button').click(function () {
        $('#start-page').removeClass('hide');
        $('#game-page').addClass('hide');
    });
});