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
	var music = new Audio('assets/backgroundmusic.mp3');
	
	var startHandler = function startHandler() {
	  music.loop = true;
	  music.volume = 0.3;
	  music.play();
	  game.loadAvatar(ctx);
	  game.loadComputer(ctx);
	  game.counter = game.refreshTime;
	  var timer = setInterval(game.refreshTimer.bind(game, ctx), 1000);
	  setInterval(game.avatar.updateBreath, 250);
	  setInterval(game.computer.updateBreath, 250);
	  document.getElementById("gameover").addEventListener("click", function (e) {
	    clearInterval(timer);
	    music.pause();
	    $("#Pause").click();
	    $("#myCanvas").hide();
	    $("#GameOverPage").show();
	    $("#Stop").hide();
	    $("#PauseMusic").hide();
	    $("#score").html("Your Score :  " + game.score);
	  });
	
	  var savedGame = setInterval(game.animate.bind(game, ctx, canvas), 1);
	  document.addEventListener("keydown", game.keyDown, false);
	  document.addEventListener("keyup", game.keyUp, false);
	  var pause = document.getElementById("Pause");
	  pause.addEventListener("click", function (e) {
	    if (!gamePaused) {
	      savedGame = clearInterval(savedGame);
	      gamePaused = true;
	      musicPaused = true;
	      pause.value = "Resume Game";
	    } else if (gamePaused) {
	      savedGame = setInterval(game.animate.bind(game, ctx, canvas), 5);
	      gamePaused = false;
	      musicPaused = false;
	      pause.value = "Pause Game";
	    }
	  });
	  var PauseMusic = document.getElementById("PauseMusic");
	  PauseMusic.addEventListener("click", function (e) {
	    if (!musicPaused) {
	      music.play();
	      musicPaused = true;
	      PauseMusic.value = "Pause Music";
	    } else {
	      music.pause();
	      musicPaused = false;
	      PauseMusic.value = "Resume Music";
	    }
	  });
	};
	document.getElementById("Start").addEventListener("click", startHandler);
	
	document.getElementById("Restart").addEventListener("click", function () {
	  document.location.reload();
	});
	
	var buttons = document.getElementsByTagName('input');
	for (var i = 0; i < buttons.length; ++i) {
	  buttons[i].addEventListener("mouseover", game.playAudio, false);
	}
	
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
	
	    this.avatar = new _avatar2.default((canvas.width - 170) / 2, canvas.height - 175, 170, 167);
	    this.computer = new _computer2.default((canvas.width - 170) / 2, 2, 170, 175);
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
	    this.score = 0;
	    this.spawnRate = 1950;
	    this.spawnRateofDecent = 1;
	    this.lastSpawn = -1;
	    this.objects = [];
	    this.startTime = Date.now();
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
	
	  _createClass(Game, [{
	    key: "playAudio",
	    value: function playAudio() {
	      var click = document.getElementById("audioImagePlay");
	      click.play();
	    }
	  }, {
	    key: "playCatch",
	    value: function playCatch() {
	      var caught = new Audio('assets/swoosh.mp3');
	      caught.play();
	    }
	  }, {
	    key: "playFall",
	    value: function playFall() {
	      var drop = new Audio('assets/drop.mp3');
	      drop.play();
	    }
	  }, {
	    key: "playPiano",
	    value: function playPiano() {
	      var piano = new Audio('assets/piano.mp3');
	      piano.volume = 0.1;
	      piano.play();
	    }
	  }, {
	    key: "drawTimer",
	    value: function drawTimer(ctx) {
	      ctx.font = "28px Bangers";
	      ctx.fillStyle = "black";
	      ctx.fillText("Timer: " + Math.round(this.counter), 520, 700);
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
	      ctx.fillText("Level:  " + this.level, 385, 700);
	      this.drawScore(ctx);
	      this.drawTimer(ctx);
	      ctx.drawImage(this.avatarImg, this.avatar.avatarX, this.avatar.avatarY + this.avatar.breathAmt, this.avatar.avatarWidth, this.avatar.avatarHeight - this.avatar.breathAmt);
	      ctx.drawImage(this.computerImg, this.computer.computerX, this.computer.computerY + this.computer.breathAmt, this.computer.computerWidth, this.computer.computerHeight - this.computer.breathAmt);
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
	              this.playFall();
	              setTimeout(function () {
	                $('#gameover').click();
	              }, 200);
	            } else {
	              that.playCatch();
	              that.score++;
	            }
	          } else {
	            newArray.push(object);
	          }
	        } else if (object.y > 635 && object.constructor.name === "Item") {
	          this.losses++;
	          this.playFall();
	          if (that.losses >= 3) {
	            setTimeout(function () {
	              $('#gameover').click();
	            }, 200);
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
	        ctx.drawImage(that.avatarImg, that.avatar.avatarX, that.avatar.avatarY + that.avatar.breathAmt, that.avatar.avatarWidth, that.avatar.avatarHeight - that.avatar.breathAmt);
	      };
	      this.avatarImg.src = 'assets/avatar.png';
	    }
	  }, {
	    key: "loadComputer",
	    value: function loadComputer(ctx) {
	      var that = this;
	      this.computerImg.onload = function () {
	        ctx.drawImage(that.computerImg, that.computer.computerX, that.computer.computerY + that.computer.breathAmt, that.computer.computerWidth, that.computer.computerHeight - that.computer.breathAmt);
	      };
	      this.computerImg.src = 'assets/computer.png';
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
	        this.avatar.avatarX += 5;
	      } else if (this.leftPressed && this.avatar.avatarX > 7) {
	        this.avatar.avatarX -= 5;
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
	      ctx.fillText("Score:  " + this.score, 230, 700);
	      ctx.fillText("Drops:  " + this.losses, 68, 700);
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Avatar = function () {
	  function Avatar(avatarX, avatarY, avatarWidth, avatarHeight) {
	    _classCallCheck(this, Avatar);
	
	    this.avatarX = avatarX;
	    this.avatarY = avatarY;
	    this.avatarWidth = avatarWidth;
	    this.avatarHeight = avatarHeight;
	    this.breathInc = 1.25;
	    this.breathDir = 1;
	    this.breathAmt = 0;
	    this.breathMax = 1.25;
	    this.updateBreath = this.updateBreath.bind(this);
	  }
	
	  _createClass(Avatar, [{
	    key: "updateBreath",
	    value: function updateBreath() {
	      if (this.breathDir === 1) {
	        this.breathAmt -= this.breathInc;
	        if (this.breathAmt < -this.breathMax) {
	          this.breathDir = -1;
	        }
	      } else {
	        this.breathAmt += this.breathInc;
	        if (this.breathAmt > this.breathMax) {
	          this.breathDir = 1;
	        }
	      }
	    }
	  }]);
	
	  return Avatar;
	}();
	
	module.exports = Avatar;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Computer = function () {
	  function Computer(computerX, computerY, computerWidth, computerHeight) {
	    _classCallCheck(this, Computer);
	
	    this.computerX = computerX;
	    this.computerY = computerY;
	    this.computerWidth = computerWidth;
	    this.computerHeight = computerHeight;
	    this.breathInc = .5;
	    this.breathDir = 1;
	    this.breathAmt = 0;
	    this.breathMax = 3;
	    this.updateBreath = this.updateBreath.bind(this);
	  }
	
	  _createClass(Computer, [{
	    key: "updateBreath",
	    value: function updateBreath() {
	      if (this.breathDir === 1) {
	        this.breathAmt -= this.breathInc;
	        if (this.breathAmt < -this.breathMax) {
	          this.breathDir = -1;
	        }
	      } else {
	        this.breathAmt += this.breathInc;
	        if (this.breathAmt > this.breathMax) {
	          this.breathDir = 1;
	        }
	      }
	    }
	  }]);
	
	  return Computer;
	}();
	
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