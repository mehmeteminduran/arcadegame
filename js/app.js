let maxSpeed = 400,
	canvasHeight = 606,
	canvasWidth = 505,
	numRows = 6,
	numCols = 5,
	columnWidth = 101,
	rowHeight = 83,
	playerXStart = 202.5,
    playerYStart = 383;
    
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Common {
	constructor(x, y, speed, sprite) {
		// Variables applied to each of our instances go here,
		// we've provided one for you to get started
		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = sprite;
    }
    
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

class Enemy extends Common {
	constructor(x, y, speed) {
		super(x, y, speed, 'images/enemy-bug.png');
    }
    
	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks 
	update(dt) {
		this.x += this.speed * dt;
		if (this.x > canvasWidth) {
			this.x = -100;
			this.getRandomSpeed();
		}
		this.checkCollision();
    }
    
	getRandomSpeed() {
		this.speed = 100 + Math.floor(Math.random() * (maxSpeed - 99));
    };
    
	checkCollision() {
		const playerWidth = 50,
			playerHeight = 60,
			enemyWidth = 60,
			enemyHeight = 50;
		if (player.x < this.x + enemyWidth && player.x + playerWidth > this.x && player.y < this.y + enemyHeight && playerHeight + player.y > this.y) {
			console.log('collision');
			player.reset();
		}
	}
}

class Player extends Common {
	constructor(x, y, speed) {
		super(x, y, speed, 'images/char-pink-girl.png');
    }
    
    update() {}
    
	handleInput(key) {
		switch (key) {
			case 'left':
				if (this.x > columnWidth) {
					this.x -= columnWidth;
				}
				break;
			case 'up':
				if (this.y < 0) {
					alert('*** CONGRATULATIONS ***');
					player.reset();
				} else {
					this.y -= rowHeight;
				}
				break;
			case 'down':
				if (this.y + rowHeight <= 450) this.y += rowHeight;
				break;
			case 'right':
				if (this.x + columnWidth <= canvasWidth) {
					this.x += columnWidth;
				}
				break;
		}
    }
    
	reset() {
		this.x = playerXStart;
		this.y = playerYStart;
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(0, 60, 50), new Enemy(170, 140, 90), new Enemy(80, 225, 50), new Enemy(250, 60, 60), new Enemy(310, 140, 70)];
// Canvas position of created enemies and player x, y, movement 
let player = new Player(playerXStart, playerYStart, 50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});