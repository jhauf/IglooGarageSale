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

loadAvatar("avatar");
setInterval(draw, 10);
}
