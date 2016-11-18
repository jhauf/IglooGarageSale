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
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var gamePaused = false;
	var musicPaused = true;
	var game = new _game2.default(canvas);
	var music = new Audio('backgroundmusic.mp3');
	
	document.getElementById("Start").addEventListener("click", function () {
	  music.play();
	  game.loadAvatar(ctx);
	  game.loadComputer(ctx);
	  game.counter = game.refreshTime;
	  setInterval(game.refreshTimer.bind(game, ctx), 1000);
	  var savedGame = setInterval(game.animate.bind(game, ctx, canvas), 1);
	  document.addEventListener("keydown", game.keyDown, false);
	  document.addEventListener("keyup", game.keyUp, false);
	  var pause = document.getElementById("Pause");
	  pause.addEventListener("click", function (e) {
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
	
	  document.getElementById("PauseMusic").addEventListener("click", function (e) {
	    if (!musicPaused) {
	      music.play();
	      musicPaused = true;
	    } else {
	      music.pause();
	      musicPaused = false;
	    }
	  });
	});
	
	document.getElementById("Stop").addEventListener("click", function () {
	  document.location.reload();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _avatar = __webpack_require__(2);
	
	var _avatar2 = _interopRequireDefault(_avatar);
	
	var _computer = __webpack_require__(3);
	
	var _computer2 = _interopRequireDefault(_computer);
	
	var _item = __webpack_require__(4);
	
	var _item2 = _interopRequireDefault(_item);
	
	var _piano = __webpack_require__(5);
	
	var _piano2 = _interopRequireDefault(_piano);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(canvas, ctx) {
	    _classCallCheck(this, Game);
	
	    this.avatar = new _avatar2.default((canvas.width - 170) / 2, canvas.height - 175, 170, 160);
	    this.computer = new _computer2.default((canvas.width - 170) / 2, 18, 170, 160);
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
	    this.refreshTime = 10;
	    this.failTime = 10;
	    this.drawTimer = this.drawTimer.bind(this);
	    this.level = 1;
	    this.canvas = canvas;
	    this.ctx = ctx;
	  }
	
	  _createClass(Game, [{
	    key: "drawTimer",
	    value: function drawTimer(ctx) {
	      ctx.font = "28px Bangers";
	      ctx.fillStyle = "black";
	      ctx.fillText("Timer: " + Math.round(this.counter), 550, 665);
	    }
	  }, {
	    key: "refreshTimer",
	    value: function refreshTimer() {
	      if (this.counter === 0) {
	        $('#levelup').click();
	        this.counter = this.failTime;
	        this.level++;
	        this.spawnRate /= 1.2;
	        this.spawnRateofDecent *= 1.2;
	        this.losses = 0;
	      } else {
	        this.counter--;
	      }
	    }
	  }, {
	    key: "animate",
	    value: function animate(ctx, canvas) {
	      var newArray = [];
	      var that = this;
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
	        var object = this.objects[i];
	        object.y += this.spawnRateofDecent;
	        ctx.beginPath();
	        if (object.constructor.name === "Piano") {
	          ctx.drawImage(object.image, object.x, object.y, 120, 120);
	        } else {
	          ctx.drawImage(object.image, object.x, object.y, 80, 80);
	        }
	        ctx.closePath();
	        if (object.x > that.avatar.avatarX - 40 && object.x < that.avatar.avatarX + that.avatar.avatarWidth - 35) {
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
	          if (that.losses >= 5) {
	            alert("GAME OVER");
	            document.location.reload();
	          }
	        } else {
	          newArray.push(object);
	        }
	      }
	      this.objects = newArray;
	    }
	  }, {
	    key: "loadAvatar",
	    value: function loadAvatar(ctx) {
	      var that = this;
	      this.avatarImg.onload = function () {
	        ctx.drawImage(that.avatarImg, that.avatar.avatarX, that.avatar.avatarY, that.avatar.avatarWidth, that.avatar.avatarHeight);
	      };
	      this.avatarImg.src = 'avatar.png';
	    }
	  }, {
	    key: "loadComputer",
	    value: function loadComputer(ctx) {
	      var that = this;
	      this.computerImg.onload = function () {
	        ctx.drawImage(that.computerImg, that.computer.computerX, that.computer.computerY, that.computer.computerWidth, that.computer.computerHeight);
	      };
	      this.computerImg.src = 'computer.png';
	    }
	  }, {
	    key: "keyDown",
	    value: function keyDown(e) {
	      if (e.keyCode === 39) {
	        this.rightPressed = true;
	      } else if (e.keyCode === 37) {
	        this.leftPressed = true;
	      }
	    }
	  }, {
	    key: "keyUp",
	    value: function keyUp(e) {
	      if (e.keyCode === 39) {
	        this.rightPressed = false;
	      } else if (e.keyCode === 37) {
	        this.leftPressed = false;
	      }
	    }
	  }, {
	    key: "moveAvatar",
	    value: function moveAvatar(canvas) {
	      if (this.rightPressed && this.avatar.avatarX < canvas.width - this.avatar.avatarWidth - 10) {
	        this.avatar.avatarX += 8;
	      } else if (this.leftPressed && this.avatar.avatarX > 7) {
	        this.avatar.avatarX -= 8;
	      }
	    }
	  }, {
	    key: "moveComputer",
	    value: function moveComputer(canvas, ctx) {
	      var posOrNeg = Math.random() > .5 ? -1 : 1;
	      var time = Date.now();
	      if (time > this.lastSpawn + this.spawnRate) {
	        this.lastSpawn = time;
	        this.move = false;
	        var distance = Math.round(.2 * Math.random() * canvas.width);
	        if (posOrNeg === 1 && this.computer.computerX < canvas.width - this.avatar.avatarWidth - distance || posOrNeg === -1 && this.computer.computerX > distance) {
	          this.computer.computerX += distance * posOrNeg;
	        }
	        if (Math.random() < .2 && this.level > 1) {
	          var piano = new _piano2.default(this.computer.computerX, 120, this.img5);
	          this.objects.push(piano);
	        } else {
	          this.objects.push(new _item2.default(this.computer.computerX, 120, this.images));
	        }
	      }
	    }
	  }, {
	    key: "drawScore",
	    value: function drawScore(ctx) {
	      ctx.font = "28px Bangers";
	      ctx.fillStyle = "black";
	      ctx.fillText("Score:  " + this.score, 230, 665);
	      ctx.fillText("Drops:  " + this.losses, 68, 665);
	    }
	  }]);
	
	  return Game;
	}();
	
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
	
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Avatar = function Avatar(avatarX, avatarY, avatarWidth, avatarHeight) {
	  _classCallCheck(this, Avatar);
	
	  this.avatarX = avatarX;
	  this.avatarY = avatarY;
	  this.avatarWidth = avatarWidth;
	  this.avatarHeight = avatarHeight;
	};
	
	module.exports = Avatar;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Computer = function Computer(computerX, computerY, computerWidth, computerHeight) {
	  _classCallCheck(this, Computer);
	
	  this.computerX = computerX;
	  this.computerY = computerY;
	  this.computerWidth = computerWidth;
	  this.computerHeight = computerHeight;
	};
	
	module.exports = Computer;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Item = function Item(x, y, images) {
	  _classCallCheck(this, Item);
	
	  this.x = x;
	  this.y = y;
	  this.image = images[Math.floor(Math.random() * images.length)];
	};
	
	exports.default = Item;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Piano = function Piano(x, y, img) {
	  _classCallCheck(this, Piano);
	
	  this.x = x;
	  this.y = y;
	  this.image = img;
	};
	
	exports.default = Piano;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map