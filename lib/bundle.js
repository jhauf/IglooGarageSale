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

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _game2.default)();

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
	    ctx.font = "16px Arial";
	    ctx.fillStyle = "#0095DD";
	    ctx.fillText("Score: " + score, 8, 20);
	    ctx.fillText("Losses: " + losses, 70, 20);
	  }
	
	  function animate() {
	    var time = Date.now();
	    if (time > lastSpawn + spawnRate) {
	      lastSpawn = time;
	      spawnRandomObject();
	    }
	    requestAnimationFrame(animate);
	    ctx.clearRect(0, 0, canvas.width, canvas.heigth);
	    for (var i = 0; i < objects.length; i++) {
	      var object = objects[i];
	      if (object.y + spawnRateofDecent > canvas.height - 100) {
	        if (object.x > avatarX && object.x < avatarX + avatarWidth) {
	          console.log("winner");
	          score++;
	        } else {
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
	    ctx.drawImage(avatarImg, avatarX, avatarY, avatarWidth, avatarHeight);
	    ctx.drawImage(computerImg, computerX, computerY, computerWidth, computerHeight);
	    animate();
	    moved();
	    drawScore();
	
	    if (rightPressed && avatarX < canvas.width - avatarWidth) {
	      avatarX += 20;
	    } else if (leftPressed && avatarX > 0) {
	      avatarX -= 20;
	    } else if (upPressed) {
	      avatarY -= 10;
	    }
	
	    var posOrNeg = Math.random() > .5 ? -1 : 1;
	    if (move) {
	      move = false;
	      if (posOrNeg === 1 && computerX < canvas.width - computerWidth || posOrNeg === -1 && computerX > computerWidth) {
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