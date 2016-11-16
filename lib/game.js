import Avatar from "./avatar";
import Computer from "./computer";
import Item from "./item";

export default class Game {
  constructor(canvas) {
    this.avatar = new Avatar((canvas.width-170)/2, canvas.height - 160, 170, 160);
    this.computer = new Computer((canvas.width-170)/2, 25, 170, 160);
    this.objects = [];
    this.avatarImg = new Image();
    this.computerImg = new Image();
    this.img1 = new Image();
    this.img2 = new Image();
    this.img3 = new Image();
    this.img4 = new Image();
    this.img1.src = "book.png";
    this.img2.src = "cup.png";
    this.img3.src = "plushie.png";
    this.img4.src = "coat.png";
    this.images = [this.img1, this.img2, this.img3, this.img4];
    this.leftPressed = false;
    this.rightPressed = false;
    this.upPressed = false;
    this.moveAvatar = this.moveAvatar.bind(this);
    this.loadAvatar = this.loadAvatar.bind(this);
    this.loadComputer = this.loadComputer.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.moveComputer = this.moveComputer.bind(this);
    this.animate = this.animate.bind(this);
    this.move = false;
    this.spawnRate = Math.random() * (2400 - 1500) + 1500;
    this.spawnRateofDecent = (Math.random() * (1 - .3) + .3);
    this.lastSpawn = -1;
    this.objects = [];
    this.startTime = Date.now();
    this.score = 0;
    this.losses = 0;
  }

  animate(ctx, canvas) {
    let newArray = [];
    let that = this;
    let time = Date.now();
    if (time > (this.lastSpawn + this.spawnRate)) {
      this.lastSpawn = time;
      this.objects.push(new Item(this.computer.computerX, 120, this.images));
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    this.drawScore(ctx);
    ctx.drawImage(this.avatarImg, this.avatar.avatarX, this.avatar.avatarY, this.avatar.avatarWidth, this.avatar.avatarHeight);
    ctx.drawImage(this.computerImg, this.computer.computerX, this.computer.computerY, this.computer.computerWidth, this.computer.computerHeight);
    ctx.closePath();
    this.moveAvatar(canvas);
    this.moveComputer(canvas);
    for (var i = 0; i < this.objects.length; i++) {
      let object = this.objects[i];
      object.y += this.spawnRateofDecent;
      ctx.beginPath();
      ctx.drawImage(object.image, object.x, object.y, 80, 80);
      ctx.closePath();
      if (560 < object.y && object.y < 570) {
        if (object.x > that.avatar.avatarX && object.x < that.avatar.avatarX + that.avatar.avatarWidth) {
          that.score++;
        }
        } else {
          newArray.push(object);
      }
    }
    this.objects = newArray;
  }
  // } else {
  //   that.losses++;
  //   if (that.losses >= 3) {
  //     alert("GAME OVER");
  //     document.location.reload();
  //   }

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
      } else if (e.keyCode === 38) {
          this.upPressed = true;
      }
  }

  keyUp(e) {
      if(e.keyCode === 39) {
          this.rightPressed = false;
      } else if (e.keyCode === 37) {
          this.leftPressed = false;
      } else if (e.keyCode === 38) {
          this.upPressed = false;
      }
  }

  moveAvatar(canvas) {
    if (this.rightPressed && this.avatar.avatarX < canvas.width-this.avatar.avatarWidth) {
       this.avatar.avatarX += 10;
     } else if (this.leftPressed && this.avatar.avatarX > 0) {
       this.avatar.avatarX -= 10;
     } else if (this.upPressed && this.avatar.avatarY === canvas.height - this.avatar.avatarHeight) {
       this.avatar.avatarY -= 10;
     } else if (this.avatar.avatarY < canvas.height - this.avatar.avatarHeight) {
       this.avatar.avatarY += 5;
     }
  }

  moveComputer(canvas) {
    let posOrNeg = Math.random() > .5 ? -1 : 1;
    if (Math.random() < .005) {
      this.move = false;
      if ((posOrNeg === 1 && this.computer.computerX < canvas.width - this.computer.computerWidth - 20) || (posOrNeg === -1 && this.computer.computerX > this.computer.computerWidth)) {
        this.computer.computerX += ( .5 * Math.random() * canvas.width) * posOrNeg;
      }
    }
  }

  drawScore(ctx) {
    ctx.font = "26px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(this.score, 160, 643);
  }

  // ctx.fillText("Losses: "+this.losses, 70, 20);

}


// draw(ctx, canvas) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawTimer();
//   ctx.fillText(level, 367, 642);
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
