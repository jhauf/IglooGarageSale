import Game from './game';

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let gamePaused = false;
let musicPaused = true;
const game = new Game(canvas);
var music = new Audio('backgroundmusic.mp3');


document.getElementById("Start").addEventListener("click", function(){
    music.play();
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
          music.pause();
          musicPaused = true;
          pause.value = "Resume Game";
        } else if (gamePaused) {
          savedGame = setInterval(game.animate.bind(game, ctx, canvas), 5);
          gamePaused = false;
          music.play();
          musicPaused = false;
          pause.value = "Pause Game";
        }
    });
    document.getElementById("PauseMusic").addEventListener("click", function(e) {
      debugger
      if (!musicPaused) {
        music.play();
        musicPaused = true;
      } else {
        music.pause();
        musicPaused = false;
      }
    });


});



document.getElementById("Stop").addEventListener("click", function(){
    document.location.reload();
});
