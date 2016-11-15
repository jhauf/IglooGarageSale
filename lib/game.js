export default function Game() {


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let avatarWidth = 170;
let avatarHeight = 160;
let avatarX = (canvas.width-avatarWidth)/2;
let avatarY = canvas.height - avatarHeight;
let computerWidth = 170;
let computerHeight = 160;
let computerX = (canvas.width-computerWidth)/2;
let computerY = 25;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let spawnRate = Math.random() * (10000 - 4000 + 1) + 4000;
let spawnRateofDecent = (Math.random() * (0.007 - 0.004) + 0.004);
let lastSpawn = -1;
let objects = [];
let startTime = Date.now();
let move = false;
let score = 0;
let losses = 0;

let img1 = new Image();
img1.src = "book.png";

let img2 = new Image();
img2.src = "cup.png";

let img3 = new Image();
img3.src = "plushie.png";

let img4 = new Image();
img4.src = "coat.png";

let images = [img1, img2, img3, img4];


function spawnRandomObject(){
  let object = {
    x: computerX,
    y: 120,
    image: images[Math.floor(Math.random()*images.length)]
  };
  objects.push(object);
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
  ctx.fillText("Losses: "+losses, 70, 20);
}


function animate(){
  let time = Date.now();
  if (time > (lastSpawn + spawnRate)) {
    lastSpawn = time;
    spawnRandomObject();
  }
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width, canvas.heigth);
  for (var i = 0; i < objects.length; i++) {
    let object = objects[i];
    if(object.y + spawnRateofDecent > canvas.height-100) {
      if(object.x > avatarX && object.x < avatarX + avatarWidth) {
        console.log("winner");
        score++;
      }
      else {
        losses++;
        if (losses >= 3) {
          alert("GAME OVER");
          document.location.reload();
        }
      }
    }
    object.y += spawnRateofDecent;
    ctx.drawImage(object.image, object.x, object.y, 100, 100);
  }
}


document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    } else if (e.keyCode === 37) {
        leftPressed = true;
    } else if (e.keyCode === 38) {
        upPressed = true;
    }
}
function keyUp(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    } else if (e.keyCode === 37) {
        leftPressed = false;
    } else if (e.keyCode === 38) {
        upPressed = false;
    }
}
function moved() {
  if (Math.random() < .015) {
    move = true;
  }
}


let avatarImg = new Image();
function loadAvatar () {
  avatarImg.onload = function(){
    ctx.drawImage(avatarImg, avatarX, avatarY, avatarWidth, avatarHeight);
  };
  avatarImg.src = 'avatar.png';
}

let computerImg = new Image();
function loadComputer () {
  computerImg.onload = function(){
    ctx.drawImage(computerImg, computerX, computerY, computerWidth, computerHeight);
  };
  computerImg.src = 'computer.png';
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatarImg, avatarX, avatarY, avatarWidth, avatarHeight);
    ctx.drawImage(computerImg, computerX, computerY, computerWidth, computerHeight);
    animate();
    moved();
    drawScore();


    if (rightPressed && avatarX < canvas.width-avatarWidth) {
      avatarX += 20;
    } else if (leftPressed && avatarX > 0) {
      avatarX -= 20;
    } else if (upPressed) {
      avatarY -= 10;
    }

    let posOrNeg = Math.random() > .5 ? -1 : 1;
    if (move) {
      move = false;
      if ((posOrNeg === 1 && computerX < canvas.width - computerWidth) || (posOrNeg === -1 && computerX > computerWidth)) {
        computerX += ( .3 * Math.random() * canvas.width) * posOrNeg;
      }
    }
}


setInterval(draw, 10);
loadComputer();
loadAvatar();

}
