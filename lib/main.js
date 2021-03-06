import Game from './game';

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let gamePaused = false;
let musicPaused = true;
const game = new Game(canvas);
let music = new Audio('assets/backgroundmusic.mp3');




  let startHandler = function(){
    music.loop = true;
    music.volume = 0.3;
    music.play();
    game.loadAvatar(ctx);
    game.loadComputer(ctx);
    game.counter = game.refreshTime;
    let timer = setInterval(game.refreshTimer.bind(game, ctx), 1000);
    setInterval(game.avatar.updateBreath, 250);
    setInterval(game.computer.updateBreath, 250);
    document.getElementById("gameover").addEventListener("click", function(e) {
      clearInterval(timer);
      music.pause();
      $("#Pause").click();
      $("#myCanvas").hide();
      $("#GameOverPage").show();
      $("#Stop").hide();
      $("#PauseMusic").hide();
      $("#score").html(`Your Score :  ${game.score}`);
    });


    let savedGame = setInterval(game.animate.bind(game, ctx, canvas), 1);
    document.addEventListener("keydown", game.keyDown, false);
    document.addEventListener("keyup", game.keyUp, false);
    let pause = document.getElementById("Pause");
    pause.addEventListener("click", function(e) {
        if (!gamePaused) {
          savedGame = clearInterval(savedGame);
          gamePaused = true;
          musicPaused = true;
          pause.value = "Resume Game";
        } else if (gamePaused) {
          savedGame = setInterval(game.animate.bind(game, ctx, canvas), 5);
          gamePaused = false;
          musicPaused = false;
          pause.value = "Pause Game";
        }
    });
    let PauseMusic = document.getElementById("PauseMusic");
    PauseMusic.addEventListener("click", function(e) {
      if (!musicPaused) {
        music.play();
        musicPaused = true;
        PauseMusic.value = "Pause Music";
      } else {
        music.pause();
        musicPaused = false;
        PauseMusic.value = "Resume Music";
      }
    });
};
  document.getElementById("Start").addEventListener("click", startHandler);

  document.getElementById("Restart").addEventListener("click", function() {
    document.location.reload();
  });

  let buttons = document.getElementsByTagName('input');
  for (var i = 0; i < buttons.length; ++i) {
    buttons[i].addEventListener("mouseover", game.playAudio, false);
  }


document.getElementById("Stop").addEventListener("click", function() {
    document.location.reload();
});
