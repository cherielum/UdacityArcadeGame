// Enemies our player must avoid
// var means written PRE-ES6


var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55; //center
    this.speed = speed;
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
        this.x += this.speed * dt;
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

class Hero {
    constructor() {
        this.sprite = 'images/char-cat-girl.png';
        this.step = 101; //engine.js from drawn board
        this.jump = 83; //engine.js from drawn board
        this.startX = (this.step * 2);
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY; //note: THIS. order matters
        this.victory = false;
    }

    update() {
        //Check collision here
            for(let enemy of allEnemies) {

                // did player x and y collide w/ enemy?
                if(this.y === enemy.y &&
                    (enemy.x + enemy.step >
                        this.x && enemy.x <
                        this.x + this.step)) {
                    this.reset();
                    // alert('Collide!');
                }
            }

                //Did player x and y reach final tile?
                if(this.y === 55) {
                    console.log('Win!');
                    this.victory = true;
                }
                // console.log(this.y);
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
    //reset hero
    reset() {
        //set x and y to starting x and y
        this.y = this.startY;
        this.X = this.startX;
    }
}

//update position
const player = new Hero();
//(location x, location y, speed)
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 400);
const bug3 = new Enemy((-101*2.5), 83, 300);
const bug4 = new Enemy((-101*2.5), 166, 100);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3,bug4);
console.log(allEnemies);

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

