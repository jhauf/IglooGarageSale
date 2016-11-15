export default function Game() {


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 20;
let x = (Math.random() * canvas.width) - ballRadius;
let y = 0;
let dx = Math.random();
let dy = 2;
let avatarWidth = 170;
let avatarHeight = 160;
let avatarX = (canvas.width-avatarWidth)/2;
let rightPressed = false;
let leftPressed = false;
let spawnRate = 6000;
let spawnRateofDecent = 0.005;
let lastSpawn = -1;
let objects = [];
let startTime = Date.now();

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
    x: Math.random() * (canvas.width - 30) + 15,
    y: 0,
    image: images[Math.floor(Math.random()*images.length)]
  };
  objects.push(object);
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
    object.y += spawnRateofDecent;
    ctx.drawImage(object.image, object.x, object.y, 100, 100);
  }
}




document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    }
    else if(e.keyCode === 37) {
        leftPressed = true;
    }
}
function keyUp(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode === 37) {
        leftPressed = false;
    }
}


let avatarImg = new Image();
function loadAvatar () {
  avatarImg.onload = function(){
    ctx.drawImage(avatarImg, avatarX, canvas.height - avatarHeight, avatarWidth, avatarHeight);
  };
  avatarImg.src = 'avatar.png';
}




function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatarImg, avatarX, canvas.height - avatarHeight, avatarWidth, avatarHeight);
    drawBall();
    animate();
    if(y + dy > canvas.height-ballRadius) {
      if(x > avatarX && x < avatarX + avatarWidth) {
        dy = -dy;
      }
      else {
        alert("GAME OVER");
        document.location.reload();
      }
    }

    if(rightPressed) {
        avatarX += 7;
    }
    else if(leftPressed) {
        avatarX -= 7;
    }

    x += dx;
    y += dy;
}


setInterval(draw, 10);
loadAvatar("avatar");

}
