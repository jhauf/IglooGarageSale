import Avatar from "./avatar";
import Computer from "./computer";
import Item from "./item";
import Piano from "./piano";

export default class Game {
  constructor(canvas, ctx) {
    this.avatar = new Avatar((canvas.width-170)/2, canvas.height - 175, 170, 167);
    this.computer = new Computer((canvas.width-170)/2, 2, 170, 175);
    this.objects = [];
    this.avatarImg = new Image();
    this.computerImg = new Image();
    this.img1 = new Image();
    this.img2 = new Image();
    this.img3 = new Image();
    this.img4 = new Image();
    this.img5 = new Image();
    this.img1.src = "assets/book.png";
    this.img2.src = "assets/cup.png";
    this.img3.src = "assets/plushie.png";
    this.img4.src = "assets/coat.png";
    this.img5.src = "assets/piano.gif";
    this.images = [this.img1, this.img2, this.img3, this.img4];
    this.leftPressed = false;
    this.rightPressed = false;
    this.gamePaused = false;
    this.moveAvatar = this.moveAvatar.bind(this);
    this.loadAvatar = this.loadAvatar.bind(this);
    this.loadComputer = this.loadComputer.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.moveComputer = this.moveComputer.bind(this);
    this.animate = this.animate.bind(this);
    this.move = false;
    this.spawnRate = 1950;
    this.spawnRateofDecent = 1;
    this.lastSpawn = -1;
    this.objects = [];
    this.startTime = Date.now();
    this.score = 0;
    this.losses = 0;
    this.refreshTime = 15;
    this.failTime = 16;
    this.drawTimer = this.drawTimer.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.playFall = this.playFall.bind(this);
    this.playCatch = this.playCatch.bind(this);
    this.level = 1;
    this.canvas = canvas;
    this.ctx = ctx;
  }


  playAudio() {
    let click = document.getElementById("audioImagePlay");
    click.play();
  }

  playFall() {
    let drop = new Audio('assets/drop.mp3');
    drop.play();
  }

  playCatch() {
    let caught = new Audio('assets/swoosh.mp3');
    caught.play();
  }

  playPiano() {
    let piano = new Audio('assets/piano.mp3');
    piano.volume = 0.1;
    piano.play();
  }

  drawTimer(ctx) {
     ctx.font = "28px Bangers";
     ctx.fillStyle = "black";
     ctx.fillText("Timer: " + Math.round(this.counter), 520, 675);
  }

  refreshTimer() {
    if (this.counter === 0) {
      $('#levelup').click();
      this.counter = this.failTime;
      this.level++;
      this.spawnRate /= 1.2;
      this.spawnRateofDecent *=1.2;
    } else {
      this.counter--;
    }
  }

  animate(ctx, canvas) {
    let newArray = [];
    let that = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillText("Level:  " + this.level, 385, 675);
    this.drawScore(ctx);
    this.drawTimer(ctx);
    ctx.drawImage(this.avatarImg, this.avatar.avatarX, this.avatar.avatarY + this.avatar.breathAmt, this.avatar.avatarWidth, this.avatar.avatarHeight - this.avatar.breathAmt);
    ctx.drawImage(this.computerImg, this.computer.computerX, this.computer.computerY + this.computer.breathAmt, this.computer.computerWidth, this.computer.computerHeight - this.computer.breathAmt);
    ctx.closePath();
    this.moveAvatar(canvas);
    this.moveComputer(canvas, ctx);
    for (var i = 0; i < this.objects.length; i++) {
      let object = this.objects[i];
      object.y += this.spawnRateofDecent;
      ctx.beginPath();
      if (object.constructor.name === "Piano") {
        ctx.drawImage(object.image, object.x, object.y, 120, 120);
      } else {
        ctx.drawImage(object.image, object.x, object.y, 80, 80);
      }
      ctx.closePath();
      if (object.x > that.avatar.avatarX -40 && object.x < that.avatar.avatarX + that.avatar.avatarWidth - 35) {
        if (550 < object.y && object.y < 635) {
          if (object.constructor.name === "Piano") {
            this.playPiano();
            setTimeout( function() { $('#gameover').click(); }, 200);
          } else {
            that.score++;
            this.playCatch();
          }
        } else {
          newArray.push(object);
        }
      } else if (object.y > 635 && object.constructor.name === "Item") {
          this.losses++;
          this.playFall();
            if (that.losses >= 3) {
              setTimeout( function() { $('#gameover').click(); }, 200);
            }
      } else {
        newArray.push(object);
      }
    }
    this.objects = newArray;
  }


  loadAvatar (ctx) {
    let that = this;
    this.avatarImg.onload = function() {
      ctx.drawImage(that.avatarImg, that.avatar.avatarX, that.avatar.avatarY + that.avatar.breathAmt, that.avatar.avatarWidth, that.avatar.avatarHeight - that.avatar.breathAmt );
    };
    this.avatarImg.src = 'assets/avatar.png';
  }



  loadComputer (ctx) {
    let that = this;
    this.computerImg.onload = function(){
      ctx.drawImage(that.computerImg, that.computer.computerX, that.computer.computerY + that.computer.breathAmt, that.computer.computerWidth, that.computer.computerHeight - that.computer.breathAmt);
    };
    this.computerImg.src = 'assets/computer.png';
  }


  keyDown(e) {
      if(e.keyCode === 39) {
          this.rightPressed = true;
      } else if (e.keyCode === 37) {
          this.leftPressed = true;
      }
  }

  keyUp(e) {
      if(e.keyCode === 39) {
          this.rightPressed = false;
      } else if (e.keyCode === 37) {
          this.leftPressed = false;
      }
  }

  moveAvatar(canvas) {
    if (this.rightPressed && this.avatar.avatarX < canvas.width-this.avatar.avatarWidth - 10) {
       this.avatar.avatarX += 8;
     } else if (this.leftPressed && this.avatar.avatarX > 7) {
       this.avatar.avatarX -= 8;
     }
  }

  moveComputer(canvas, ctx) {
    let posOrNeg = Math.random() > .5 ? -1 : 1;
    let time = Date.now();
    if (time > (this.lastSpawn + this.spawnRate)) {
      this.lastSpawn = time;
      this.move = false;
      let distance = Math.round((.2 * Math.random() * canvas.width));
      if ((posOrNeg === 1 && this.computer.computerX < canvas.width - this.avatar.avatarWidth - distance) ||
      (posOrNeg === -1 && this.computer.computerX > distance)) {
        this.computer.computerX += distance * posOrNeg;
      }
      if (Math.random() < .2 && this.level > 1) {
        let piano = new Piano(this.computer.computerX, 120, this.img5);
        this.objects.push(piano);
      } else {
        this.objects.push(new Item(this.computer.computerX, 120, this.images));
      }
    }
  }

  drawScore(ctx) {
    ctx.font = "28px Bangers";
    ctx.fillStyle = "black";
    ctx.fillText("Score:  " + this.score, 230, 675);
    ctx.fillText("Drops:  "+this.losses, 68, 675);
  }
}
