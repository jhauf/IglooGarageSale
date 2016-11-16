/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.getElementById("Start").addEventListener("click", function () {
	    (0, _game2.default)();
	});
	
	document.getElementById("Stop").addEventListener("click", function () {
	    document.location.reload();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Game;
	function Game() {
	
	  var canvas = document.getElementById("myCanvas");
	  var ctx = canvas.getContext("2d");
	  var avatarWidth = 170;
	  var avatarHeight = 160;
	  var avatarX = (canvas.width - avatarWidth) / 2;
	  var avatarY = canvas.height - avatarHeight;
	  var computerWidth = 170;
	  var computerHeight = 160;
	  var computerX = (canvas.width - computerWidth) / 2;
	  var computerY = 25;
	  var rightPressed = false;
	  var leftPressed = false;
	  var upPressed = false;
	  var spawnRate = Math.random() * (10000 - 4000 + 1) + 4000;
	  var spawnRateofDecent = Math.random() * (0.007 - 0.004) + 0.004;
	  var lastSpawn = -1;
	  var objects = [];
	  var startTime = Date.now();
	  var move = false;
	  var score = 0;
	  var losses = 0;
	  var currentCountDown = createCountDown(20000);
	  var level = 0;
	
	  var img1 = new Image();
	  img1.src = "book.png";
	
	  var img2 = new Image();
	  img2.src = "cup.png";
	
	  var img3 = new Image();
	  img3.src = "plushie.png";
	
	  var img4 = new Image();
	  img4.src = "coat.png";
	
	  var images = [img1, img2, img3, img4];
	
	  function spawnRandomObject() {
	    var object = {
	      x: computerX,
	      y: 120,
	      image: images[Math.floor(Math.random() * images.length)]
	    };
	    objects.push(object);
	  }
	
	  function drawScore() {
	    ctx.font = "26px Arial";
	    ctx.fillStyle = "black";
	    ctx.fillText(score, 160, 643);
	    ctx.fillText("Losses: " + losses, 70, 20);
	  }
	
	  function drawTimer() {
	    ctx.font = "26px Arial";
	    ctx.fillStyle = "black";
	    var countDownValue = currentCountDown();
	    if (countDownValue > -30 && countDownValue < 0) {
	      level += 1;
	    }
	    ctx.fillText(Math.round(countDownValue / 1000), 367, 675);
	  }
	
	  function animate() {
	    var newArray = [];
	    var time = Date.now();
	    if (time > lastSpawn + spawnRate) {
	      lastSpawn = time;
	      spawnRandomObject();
	    }
	    requestAnimationFrame(animate);
	    ctx.clearRect(0, 0, canvas.width, canvas.heigth);
	    for (var i = 0; i < objects.length; i++) {
	      var object = objects[i];
	      object.y += spawnRateofDecent;
	      ctx.beginPath();
	      ctx.drawImage(object.image, object.x, object.y, 80, 80);
	      if (560 < object.y && object.y < 570) {
	        if (object.x > avatarX && object.x < avatarX + avatarWidth) {
	          score++;
	        } else {
	          losses++;
	          if (losses >= 3) {
	            alert("GAME OVER");
	            document.location.reload();
	          }
	        }
	      } else {
	        newArray.push(object);
	      }
	    }
	    objects = newArray;
	  }
	
	  function createCountDown(timeRemaining) {
	    var start = Date.now();
	    return function () {
	      return timeRemaining - (Date.now() - start);
	    };
	  }
	
	  document.addEventListener("keydown", keyDown, false);
	  document.addEventListener("keyup", keyUp, false);
	
	  function keyDown(e) {
	    if (e.keyCode === 39) {
	      rightPressed = true;
	    } else if (e.keyCode === 37) {
	      leftPressed = true;
	    } else if (e.keyCode === 38) {
	      upPressed = true;
	    }
	  }
	  function keyUp(e) {
	    if (e.keyCode === 39) {
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
	
	  var avatarImg = new Image();
	  function loadAvatar() {
	    avatarImg.onload = function () {
	      ctx.drawImage(avatarImg, avatarX, avatarY, avatarWidth, avatarHeight);
	    };
	    avatarImg.src = 'avatar.png';
	  }
	
	  var computerImg = new Image();
	  function loadComputer() {
	    computerImg.onload = function () {
	      ctx.drawImage(computerImg, computerX, computerY, computerWidth, computerHeight);
	    };
	    computerImg.src = 'computer.png';
	  }
	
	  function draw() {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    drawScore();
	    drawTimer();
	    ctx.fillText(level, 367, 642);
	    ctx.drawImage(avatarImg, avatarX, avatarY, avatarWidth, avatarHeight);
	    ctx.drawImage(computerImg, computerX, computerY, computerWidth, computerHeight);
	    animate();
	    moved();
	
	    if (rightPressed && avatarX < canvas.width - avatarWidth) {
	      avatarX += 20;
	    } else if (leftPressed && avatarX > 0) {
	      avatarX -= 20;
	    } else if (upPressed && avatarY === canvas.height - avatarHeight) {
	      avatarY -= 130;
	    } else if (avatarY < canvas.height - avatarHeight) {
	      avatarY += 5;
	    }
	
	    var posOrNeg = Math.random() > .5 ? -1 : 1;
	    if (move) {
	      move = false;
	      if (posOrNeg === 1 && computerX < canvas.width - computerWidth - 20 || posOrNeg === -1 && computerX > computerWidth) {
	        computerX += .3 * Math.random() * canvas.width * posOrNeg;
	      }
	    }
	  }
	
	  setInterval(draw, 10);
	  loadComputer();
	  loadAvatar();
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map