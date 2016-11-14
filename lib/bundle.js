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
	
	var _game = __webpack_require__(2);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _game2.default)();

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Game;
	function Game() {
	
	    var canvas = document.getElementById("myCanvas");
	    var ctx = canvas.getContext("2d");
	    var ballRadius = 20;
	    var x = Math.random() * canvas.width - ballRadius;
	    var y = 0;
	    var dx = Math.random();
	    var dy = 2;
	    var avatarWidth = 170;
	    var avatarHeight = 160;
	    var avatarX = (canvas.width - avatarWidth) / 2;
	    var rightPressed = false;
	    var leftPressed = false;
	
	    document.addEventListener("keydown", keyDown, false);
	    document.addEventListener("keyup", keyUp, false);
	
	    function keyDown(e) {
	        if (e.keyCode === 39) {
	            rightPressed = true;
	        } else if (e.keyCode === 37) {
	            leftPressed = true;
	        }
	    }
	    function keyUp(e) {
	        if (e.keyCode === 39) {
	            rightPressed = false;
	        } else if (e.keyCode === 37) {
	            leftPressed = false;
	        }
	    }
	
	    var avatarImg = new Image();
	    function loadAvatar() {
	        avatarImg.onload = function () {
	            ctx.drawImage(avatarImg, avatarX, canvas.height - avatarHeight, avatarWidth, avatarHeight);
	        };
	        avatarImg.src = 'avatar.png';
	    }
	
	    function drawBall() {
	        ctx.beginPath();
	        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	        ctx.fillStyle = "red";
	        ctx.fill();
	        ctx.closePath();
	    }
	
	    function draw() {
	        ctx.clearRect(0, 0, canvas.width, canvas.height);
	        ctx.drawImage(avatarImg, avatarX, canvas.height - avatarHeight, avatarWidth, avatarHeight);
	        drawBall();
	        if (y + dy > canvas.height - ballRadius) {
	            if (x > avatarX && x < avatarX + avatarWidth) {
	                dy = -dy;
	            } else {
	                alert("GAME OVER");
	                document.location.reload();
	            }
	        }
	
	        if (rightPressed) {
	            avatarX += 7;
	        } else if (leftPressed) {
	            avatarX -= 7;
	        }
	
	        x += dx;
	        y += dy;
	    }
	
	    loadAvatar("avatar");
	    setInterval(draw, 10);
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map