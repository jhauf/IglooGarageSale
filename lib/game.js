import Avatar from "./avatar";
import Computer from "./computer";
import Item from "./item";
import Piano from "./piano";

export default class Game {
  constructor(canvas, ctx) {
    this.avatar = new Avatar((canvas.width-170)/2, canvas.height - 175, 170, 160);
    this.computer = new Computer((canvas.width-170)/2, 18, 170, 160);
    this.objects = [];
    this.avatarImg = new Image();
    this.computerImg = new Image();
    this.img1 = new Image();
    this.img2 = new Image();
    this.img3 = new Image();
    this.img4 = new Image();
    this.img5 = new Image();
    this.img1.src = "book.png";
    this.img2.src = "cup.png";
    this.img3.src = "plushie.png";
    this.img4.src = "coat.png";
    this.img5.src = "piano.gif";
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
    this.level = 1;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  drawTimer(ctx) {
     ctx.font = "28px Bangers";
     ctx.fillStyle = "black";
     ctx.fillText("Timer: " + Math.round(this.counter), 550, 665);
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
    ctx.fillText("Level:  " + this.level, 385, 665);
    this.drawScore(ctx);
    this.drawTimer(ctx);
    ctx.drawImage(this.avatarImg, this.avatar.avatarX, this.avatar.avatarY, this.avatar.avatarWidth, this.avatar.avatarHeight);
    ctx.drawImage(this.computerImg, this.computer.computerX, this.computer.computerY, this.computer.computerWidth, this.computer.computerHeight);
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
            alert("GAME OVER");
            document.location.reload();
          } else {
            that.score++;
          }
        } else {
          newArray.push(object);
        }
      } else if (object.y > 635 && object.constructor.name === "Item") {
          this.losses++;
            if (that.losses >= 3) {
              alert("GAME OVER");
              document.location.reload();
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
      ctx.drawImage(that.avatarImg, that.avatar.avatarX, that.avatar.avatarY, that.avatar.avatarWidth, that.avatar.avatarHeight );
    };
    this.avatarImg.src = 'avatar.png';
  }



  loadComputer (ctx) {
    let that = this;
    this.computerImg.onload = function(){
      ctx.drawImage(that.computerImg, that.computer.computerX, that.computer.computerY, that.computer.computerWidth, that.computer.computerHeight);
    };
    this.computerImg.src = 'computer.png';
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
    ctx.fillText("Score:  " + this.score, 230, 665);
    ctx.fillText("Drops:  "+this.losses, 68, 665);
  }
}


// draw(ctx, canvas) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawTimer();
//   ctx.drawImage(this.avatarImg, this.avatar.avatarX, this.avatar.avatarY, this.avatar.avatarWidth, this.avatar.avatarHeight);
//   ctx.drawImage(this.computerImg, this.computer.computerX, this.computer.computerY, this.computer.computerWidth, this.computer.computerHeight);
//   animate();
//   moved();
//



//
// drawScore(ctx) {
//   ctx.font = "26px Arial";
//   ctx.fillStyle = "black";
//   ctx.fillText(score, 160, 643);
//   ctx.fillText("Losses: "+losses, 70, 20);
// }
// }


// let spawnRate = Math.random() * (10000 - 4000 + 1) + 4000;
// let spawnRateofDecent = (Math.random() * (0.007 - 0.004) + 0.004);
// let lastSpawn = -1;
// let objects = [];
// let startTime = Date.now();
// let move = false;
// let score = 0;
// let losses = 0;
// let currentCountDown = createCountDown(20000);
// let level = 0;
//


// function drawTimer() {
//   ctx.font = "26px Arial";
//   ctx.fillStyle = "black";
//   let countDownValue = currentCountDown();
//   if (countDownValue > -30 && countDownValue < 0) {
//     level += 1;
//   }
//   ctx.fillText(Math.round(countDownValue/1000), 367, 675);
// }
//
//
// function animate(){
//   let newArray = [];
//   let time = Date.now();
//   if (time > (lastSpawn + spawnRate)) {
//     lastSpawn = time;
//     spawnRandomObject();
//   }
//   requestAnimationFrame(animate);
//   ctx.clearRect(0,0,canvas.width, canvas.heigth);
//   for (var i = 0; i < objects.length; i++) {
//     let object = objects[i];
//     object.y += spawnRateofDecent;
//     ctx.beginPath();
//     ctx.drawImage(object.image, object.x, object.y, 80, 80);
//     if (560 < object.y && object.y < 570) {
//       if (object.x > avatar.avatarX && object.x < avatar.avatarX + avatar.avatarWidth) {
//         score++;
//       } else {
//         losses++;
//         if (losses >= 3) {
//           alert("GAME OVER");
//           document.location.reload();
//         }
//       }
//     } else {
//         newArray.push(object);
//     }
//   }
//   objects = newArray;
// }
//
// function createCountDown(timeRemaining) {
//     let start = Date.now();
//     return function() {
//        return timeRemaining - (Date.now() - start);
//     };
// }
//


//
//
//
//

// }
