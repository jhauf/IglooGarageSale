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
	
	document.getElementById("Start").addEventListener("click", function () {
	    var game = new _game2.default(canvas);
	    game.loadAvatar(ctx);
	    game.loadComputer(ctx);
	    setInterval(game.animate.bind(game, ctx, canvas), 5);
	    document.addEventListener("keydown", game.keyDown, false);
	    document.addEventListener("keyup", game.keyUp, false);
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(canvas) {
	    _classCallCheck(this, Game);
	
	    this.avatar = new _avatar2.default((canvas.width - 170) / 2, canvas.height - 160, 170, 160);
	    this.computer = new _computer2.default((canvas.width - 170) / 2, 25, 170, 160);
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
	    this.spawnRateofDecent = Math.random() * (0.03 - 0.02) + 0.02;
	    this.lastSpawn = -1;
	    this.objects = [];
	    this.startTime = Date.now();
	    this.score = 0;
	    this.losses = 0;
	  }
	
	  _createClass(Game, [{
	    key: "animate",
	    value: function animate(ctx, canvas) {
	      var newArray = [];
	      var that = this;
	      var time = Date.now();
	      if (time > this.lastSpawn + this.spawnRate) {
	        this.lastSpawn = time;
	        this.objects.push(new _item2.default(this.computer.computerX, 120, this.images));
	      }
	      requestAnimationFrame(this.animate.bind(this, ctx, canvas));
	      ctx.clearRect(0, 0, canvas.width, canvas.height);
	      ctx.beginPath();
	      this.drawScore(ctx);
	      ctx.drawImage(this.avatarImg, this.avatar.avatarX, this.avatar.avatarY, this.avatar.avatarWidth, this.avatar.avatarHeight);
	      ctx.drawImage(this.computerImg, this.computer.computerX, this.computer.computerY, this.computer.computerWidth, this.computer.computerHeight);
	      ctx.closePath();
	      this.moveAvatar(canvas);
	      this.moveComputer(canvas);
	      for (var i = 0; i < this.objects.length; i++) {
	        var object = this.objects[i];
	        object.y += this.spawnRateofDecent;
	        ctx.beginPath();
	        ctx.drawImage(object.image, object.x, object.y, 80, 80);
	        ctx.closePath();
	        if (560 < object.y && object.y < 570) {
	          if (object.x > that.avatar.avatarX && object.x < that.avatar.avatarX + that.avatar.avatarWidth) {
	            that.score++;
	          } else {
	            that.losses++;
	            if (that.losses >= 3) {
	              alert("GAME OVER");
	              document.location.reload();
	            }
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
	      } else if (e.keyCode === 38) {
	        this.upPressed = true;
	      }
	    }
	  }, {
	    key: "keyUp",
	    value: function keyUp(e) {
	      if (e.keyCode === 39) {
	        this.rightPressed = false;
	      } else if (e.keyCode === 37) {
	        this.leftPressed = false;
	      } else if (e.keyCode === 38) {
	        this.upPressed = false;
	      }
	    }
	  }, {
	    key: "moveAvatar",
	    value: function moveAvatar(canvas) {
	      if (this.rightPressed && this.avatar.avatarX < canvas.width - this.avatar.avatarWidth) {
	        this.avatar.avatarX += .19;
	      } else if (this.leftPressed && this.avatar.avatarX > 0) {
	        this.avatar.avatarX -= .19;
	      } else if (this.upPressed && this.avatar.avatarY === canvas.height - this.avatar.avatarHeight) {
	        this.avatar.avatarY -= .19;
	      } else if (this.avatar.avatarY < canvas.height - this.avatar.avatarHeight) {
	        this.avatar.avatarY += 0.11;
	      }
	    }
	  }, {
	    key: "moveComputer",
	    value: function moveComputer(canvas) {
	      var posOrNeg = Math.random() > .5 ? -1 : 1;
	      if (Math.random() < .0002) {
	        this.move = false;
	        if (posOrNeg === 1 && this.computer.computerX < canvas.width - this.computer.computerWidth - 20 || posOrNeg === -1 && this.computer.computerX > this.computer.computerWidth) {
	          this.computer.computerX += .4 * Math.random() * canvas.width * posOrNeg;
	        }
	      }
	    }
	  }, {
	    key: "drawScore",
	    value: function drawScore(ctx) {
	      ctx.font = "26px Arial";
	      ctx.fillStyle = "black";
	      ctx.fillText(this.score, 160, 643);
	      ctx.fillText("Losses: " + this.losses, 70, 20);
	    }
	  }]);
	
	  return Game;
	}();
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map