import Game from './game';

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let gamePaused = false;
const game = new Game(canvas);



document.getElementById("Start").addEventListener("click", function(){
    game.loadAvatar(ctx);
    game.loadComputer(ctx);
    game.counter = game.refreshTime;
    setInterval(game.refreshTimer.bind(game, ctx), 1000);
    let savedGame = setInterval(game.animate.bind(game, ctx, canvas), 5);
    document.addEventListener("keydown", game.keyDown, false);
    document.addEventListener("keyup", game.keyUp, false);
    let pause = document.getElementById("Pause");
    pause.addEventListener("click", function(e) {
        if (!gamePaused) {
          savedGame = clearInterval(savedGame);
          gamePaused = true;
          pause.value = "Resume Game";
        } else if (gamePaused) {
          savedGame = setInterval(game.animate.bind(game, ctx, canvas), 5);
          gamePaused = false;
          pause.value = "Pause Game";
        }
    });
});



document.getElementById("Stop").addEventListener("click", function(){
    document.location.reload();
});
