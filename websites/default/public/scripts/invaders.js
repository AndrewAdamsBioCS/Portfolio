window.onload = function () {
	pCanv = document.getElementById("playCanv");
	bCanv = document.getElementById("bulletGenCanv");
	addBCanv = document.getElementById("addBulletCanv");
	pCtx = pCanv.getContext("2d");
	bCtx = bCanv.getContext("2d");
	addBCtx = addBCanv.getContext("2d");

	levelDisplay = document.getElementById("level");
	scoreDisplay = document.getElementById("score");
	bulletDisplay = document.getElementById("bullets");
	levelDisplay.innerHTML += "LEVEL " + level;
	scoreDisplay.innerHTML = score;
	bulletDisplay.innerHTML = bulletStock;

	preImgs = [];
	loadedImgs = {};
	function preloadImg() {
		for (var i = 0; i < arguments.length; i++) {
			preImgs[i] = new Image();
			preImgs[i].key = arguments[i][0];
			preImgs[i].src = arguments[i][1];

			// Store image when loaded
			preImgs[i].onload = function () {
				loadedImgs[this.key] = this;
				if (this.key == 'oven') {
					bCtx.drawImage(loadedImgs['oven'], 0, 0, bCanv.width, bCanv.height);
				}
			}
		}

	}

	preloadImg(['player', 'images/player.png']);
	preloadImg(['enemy', 'images/enemy.png']);
	preloadImg(['bullet', 'images/bullet.png']);
	preloadImg(['oven', 'images/oven.png']);

	createEnemies();

	document.addEventListener("keydown", keyPushDown);
	document.addEventListener("keyup", keyPushUp);

	gameLoop = setInterval(game, 1000 / 15);
	addBulletLoop = setInterval(addBullets, 5000);
}

// Prevent game keys from performing default behavior (e.g. scroll)
window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false)

var playerSize = 2.5;
var enemySize = 2.5;
var bulletSize = 1.5;
var bulletGenSize = 6;

var gs = 20;
var tc = 20;
var px = (tc / 2) - (playerSize / 2);
var py = tc - 2.5;
var pxv = 0;
var pyv = 0;


var leftV = -0.5;
var rightV = 0.5;
var upV = -0.5;
var downV = 0.5;

var bulletStock = 20;
var bullets = [];
var bulletsAdded = false;
var bulletsToAdd = 5;
var addBulletAnimationY = "start";
var shoot = true;

var enemies = [];

var keyMap = {};

var score = 0;
var level = 1;
var gameOver = false;
var highScore = false;

function typeOf(obj) {
	return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}

function createEnemies() {

	// Calculate enemies per row; subtract 2 at extremes
	var perRow = pCanv.width / (enemySize * gs) - 2;
	// Map for random determination of horizontal direction
	var xDir = { 0: leftV, 1: rightV };

	for (var row = 0; row < level; row++) {
		for (var i = 1; i < perRow + 1; i++) {

			let randDir = (Math.floor(Math.random() * 2));
			enemies.push({ x: (i * enemySize), y: row, xv: xDir[randDir], yv: 0 });
		}
	}
}

function addBullets() {
	bulletsAdded = true;
	setTimeout(function () { bulletsAdded = false; addBulletAnimationY = "start"; }, 2000);
}

function fireBullet() {
	if (bulletStock > 0) {
		bullets.push({ x: px, y: py });
		bulletStock--;
		bulletDisplay.innerHTML = bulletStock;
	}
}

function checkStrike(elem1, elem2, size1, size2) {
	var inXRange = false;
	var inYRange = false;

	inXRange = (elem1.x >= elem2.x && elem1.x < (elem2.x + size2))
		|| (elem2.x >= elem1.x && elem2.x < (elem1.x + size1));
	if (inXRange) {
		inYRange = (elem1.y >= elem2.y && elem1.y < (elem2.y + size2))
			|| (elem2.y >= elem1.y && elem2.y < (elem1.y + size1));
	}

	return inXRange && inYRange;
}

function game() {

	// If all enemies destroyed, increase level and add new enemies
	if (enemies.length == 0) {
		level++;
		levelDisplay.innerHTML = "LEVEL " + level;
		createEnemies();
	}

	// Draw background
	pCtx.fillStyle = "black";
	pCtx.fillRect(0, 0, pCanv.width, pCanv.height);

	if (bulletsAdded) {
		// Draw animation background
		addBCtx.fillStyle = "yellow";
		addBCtx.fillRect(0, 0, addBCanv.width, addBCanv.height);

		addBCtx.font = "italic 16px Arial";
		addBCtx.fillStyle = "black";

		let msg = "Ding!";
		let msgWidth = addBCtx.measureText(msg).width;
		addBCtx.fillText(msg, (addBCanv.width / 2) - (msgWidth / 2),
			(addBCanv.height - 16));


		// Draw bullet addition animation
		var leftX = (addBCanv.width / 2) - ((bulletSize * gs * bulletsToAdd) / 2);
		if (addBulletAnimationY == "start") {
			addBulletAnimationY = (addBCanv.height - 16 - (bulletSize * gs));
		}

		for (var i = 0; i < bulletsToAdd; i++) {
			//console.log(i, ": ", leftX, ", ", vertPos);
			addBCtx.drawImage(loadedImgs['bullet'], leftX + (i * bulletSize * gs), addBulletAnimationY,
				bulletSize * gs, bulletSize * gs);
		}

		addBulletAnimationY += -0.5 * gs;
		if (addBulletAnimationY + (bulletSize * gs) < 0) {
			bulletStock += bulletsToAdd;
			bulletDisplay.innerHTML = bulletStock;
			bulletsAdded = false;
			addBCtx.fillStyle = "yellow";
			addBCtx.fillRect(0, 0, addBCanv.width, addBCanv.height);
		}


	}

	// Draw player image
	pCtx.drawImage(loadedImgs['player'], px * gs, py * gs, playerSize * gs, playerSize * gs);

	// Draw enemies
	for (var i = 0; i < enemies.length; i++) {
		pCtx.drawImage(loadedImgs['enemy'], enemies[i].x * gs, enemies[i].y * gs,
			enemySize * gs, enemySize * gs);
	}

	// For each enemy, check if enemy has reached player; if so, end game
	for (var i = 0; i < enemies.length; i++) {
		if (checkStrike({ x: px, y: py }, enemies[i], playerSize, enemySize) && !gameOver) {
			endGame()
			break		
		}
	}

	// Draw bullets
	for (var i = 0; i < bullets.length; i++) {
		pCtx.drawImage(loadedImgs['bullet'], bullets[i].x * gs, bullets[i].y * gs,
			bulletSize * gs, bulletSize * gs);

		// For each enemy, check if bullet is hitting them
		var hit = false;
		for (var j = 0; j < enemies.length && !hit; j++) {
			if (checkStrike(bullets[i], enemies[j], bulletSize, enemySize)) {
				enemies.splice(j, 1);
				bullets.splice(i, 1);
				hit = true;
				score++;
				scoreDisplay.innerHTML = score;
			}
		}

		// If bullet did not hit, update bullet position
		if (!hit) {
			if (bullets[i].y > 0) {
				bullets[i].y += -1;
			} else {
				bullets.splice(i, 1);
			}
		}
	}

	// Handle player's horizontal motion and check bounds
	if (keyMap["ArrowLeft"]) {
		if (px > 0) {
			pxv = leftV;
		} else {
			pxv = 0;
		}
	} else if (keyMap["ArrowRight"]) {
		if (px + playerSize < tc) {
			pxv = rightV;
		} else {
			pxv = 0;
		}
	} else {
		pxv = 0;
	}

	// Handle player's vertical motion and check bounds
	if (keyMap["ArrowUp"]) {
		if (py > 0) {
			pyv = upV;
		} else {
			pyv = 0;
		}
	} else if (keyMap["ArrowDown"]) {
		if (py + playerSize < tc) {
			pyv = downV;
		} else {
			pyv = 0;
		}
	} else {
		pyv = 0;
	}


	// Update player position
	px += pxv;
	py += pyv;

	// Update enemy positions
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].x + enemySize > tc) {
			enemies[i].xv = leftV;
			enemies[i].y += 1;
		}
		if (enemies[i].x < 0) {
			enemies[i].xv = rightV;
			enemies[i].y += 1;
		}

		if (enemies[i].y < tc) {
			enemies[i].x += enemies[i].xv;
		} else {
			enemies.splice(i, 1);
		}

	}
}

function endGame() {
	clearInterval(gameLoop);
	clearInterval(addBulletLoop)
	gameOver = true;

	// Check if new high score record should be added; add record if score is greater than minimum recorded score,
	// or if there are less than 5 records in list and player score is greater than 0
	var min_score = document.getElementById("high-scores-div").getAttribute('data-minScore');
	var record_count = document.getElementById("high-scores-div").getAttribute('data-scoreCount');
	var endGameDisplay = document.getElementById("end-game-div");
	endGameDisplay.style.visibility = 'visible';

	if (score > min_score || (record_count < 5 && score > 0)) {
		var highScoreInput = document.getElementById("high-score-input");
		var playerEndScore = document.getElementById("player_score");
		highScoreInput.style.visibility = "visible";
		playerEndScore.value = score;
		highScore = true;
	} else {
		var gameOverDisplay = document.getElementById("game-over-display");
		gameOverDisplay.style.visibility = "visible";
	}
}

function resetGame() {
	var endGameDisplay = document.getElementById("end-game-div");
	var gameOverDisplay = document.getElementById("game-over-display");
	endGameDisplay.style.visibility = "hidden";
	gameOverDisplay.style.visibility = "hidden";

	// Move player back to starting position
	px = (tc / 2) - (playerSize / 2);
	py = tc - 2.5;

	// Reset variables
	bulletStock = 20;
	bullets = [];
	bulletsAdded = false;
	shoot = true;
	enemies = [];
	score = 0;
	level = 1;
	gameOver = false;

	// Reset displays of game info
	levelDisplay.innerHTML = "LEVEL " + level;
	scoreDisplay.innerHTML = score;
	bulletDisplay.innerHTML = bulletStock;

	// Clear addBCanv if game ended in middle of adding bullets
	addBCtx.fillStyle = "yellow";
	addBCtx.fillRect(0, 0, addBCanv.width, addBCanv.height);

	// Reset enemies
	createEnemies();

	// Reset game loops
	gameLoop = setInterval(game, 1000 / 15);
	addBulletLoop = setInterval(addBullets, 5000);
}

function keyPushDown(evt) {
	keyMap[evt.key] = evt.type == 'keydown';

	if (evt.key == " ") {
		if (shoot && !gameOver) {
			fireBullet();
			shoot = false;
		}
	}

	if (evt.key == "Y" || evt.key == "y") {
		if (gameOver && !highScore) {
			resetGame()
		}
	}


	// TESTING PURPOSES; REMOVE LATER
	if (evt.key == "x") {
		endGame();
	}
}

function keyPushUp(evt) {
	keyMap[evt.key] = evt.type == 'keydown';

	if (evt.key == " ") {
		shoot = true;
	}
}