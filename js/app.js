// Enemies our player must avoid
// var means written PRE-ES6

class Hero {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.step = 101; //engine.js from drawn board
        this.jump = 83; //engine.js from drawn board
        this.startX = (this.step * 2);
        this.startY = (this.jump * 5) - 20;
        this.x = this.startX;
        this.y = this.startY; //note: THIS. order matters
    }

    // Draw hero sprite on current x and y coordinate positions
    render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Update hero's x and y property
     *
     * @param {string} input - Directions to travel
     */

     handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > 0){
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
               if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }

    }
}


var Enemy = function() {
    this.x = 0;
    this.y = 65; //center
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required METHOD for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is not passed boundary
    if(this.x < this.boundary) {
        // Move forward
        // Increment x by speed * dt
        this.x += 200 * dt;
    }
    else {
        // Reset pos to start
        this.x = this.resetPos;
    }

};

// Draw the enemy on the screen, required METHOD for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//update position
const player = new Hero();
const bug1 = new Enemy();
const allEnemies = [];
allEnemies.push(bug1);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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