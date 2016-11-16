import Game from './game';

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

document.getElementById("Start").addEventListener("click", function(){
    const game = new Game(canvas);
    game.loadAvatar(ctx);
    game.loadComputer(ctx);
    setInterval(game.draw.bind(game, ctx, canvas), 10);
    document.addEventListener("keydown", game.keyDown, false);
    document.addEventListener("keyup", game.keyUp, false);
});



document.getElementById("Stop").addEventListener("click", function(){
    document.location.reload();
});
