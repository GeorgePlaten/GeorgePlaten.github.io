/* MileStones:

BASIC
    DONE: Get game background redering to canvas
    DONE: Get enemies added
    DONE: Get enemies moving
        DONE: Refactor code
    DONE: Get Player to render
    DONE: Get Player to move
        DONE: Disallow player to move off screen
        (weird zogabond painting on top row)
        DONE: Add drowning in top row
    DONE: Add collision detection
    DONE: Add game restart on collision
    DONE: Add game restart on drown
    TODO: Add a Sprite super class
        TODO: refactor code to work with improved class structure
ADVANCED
    Add death modes
        Add water death
        Add collision death
    Add difficulty based on time
    Add score
        For moves made
        For Gems collected
            Random Gem adder
            Gem capture remover
    Allow enemies to travel both ways
    Prevent enemies doubling up on line rows


*/

// General game settings
var Game = {
    // Difficulty: use a multiplier that increases based on time
    // elapsed (first) or score (later).
    difficulty: 1.0
};

var IMGHEAD = 20; // Images seem to have a headspace, don't know why yet.


// Random Integer generator from http://stackoverflow.com/questions/4959975/
// Used because I was repeating myself making random nums
// Note: S/O shows a better method using default op |, but I want to understand
// how it works better before using it.
var randInt = function(min, max) {
    return Math.floor( (Math.random()*(max-min)) + min);
};

// Superclass for Enemy and Player to hold x and y properties.
// Possibly for gems and other items later.
// And drawImage and drawCollisionBox method.
var Sprite = function() {
    this.sprite = '';
    this.speed = 0;
    this.x = 0;
    this.y = 0;
    // cd = Collision Dectection rectangle
    this.cdColor = '';
    // Padding = offset from Sprite border
    this.cdWidth = 0;
    this.cdHeight = 0;
    this.cdLeftPadding = 0;
    this.cdTopPadding = 0;
};

Sprite.prototype.render = function() {
    // the Sprite Image
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // the Collision Box
    var cbcb = document.getElementById('drawCBs'); // collision box check box
    if (cbcb.checked) {
        ctx.beginPath();
        ctx.rect(this.cdx, this.cdy, this.cdWidth, this.cdHeight);
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.cdColor;
        ctx.stroke();
    }
};

Sprite.prototype.updateCB = function() {
    // Update Collision Box
    // lowercase x and y = top-left
    this.cdx = this.x + this.cdLeftPadding;
    this.cdy = this.y + this.cdTopPadding;
    // uppercase x and y = bottom-right
    this.cdX = this.cdx + this.cdWidth;
    this.cdY = this.cdy + this.cdHeight;

};


// Enemies our player must avoid
var Enemy = function() {
    // Delegate Enemy to Sprite
    Sprite.call(this);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // pos/neg speed will give direction. Need to define
    // upper and lower bounds of speed, and random picker.
    // Speed will increase as a difficulty feature.
    // Start with 3 basic speeds for now.
    // what unit will I use: pixels per x(milliseconds)?
    // 600px/1000ms will cross the canvas in one second.
    // This seems to match the video appox (small canvas!)
    // Should I to use the dt multiplier here: 600/1000*dt?
    // TODO: figure out why it's 0.005 and not 5.0
    this.speed = randInt(1,4) / 0.005 * Game.difficulty;

    // will need to randomise off-stage left or right depending
    // on direction. hmmm... the video only shows one direction.
    // So I'll can use a constant value here (for now).
    this.x = -150.0;

    // will need to pick a random row from 1 to 3
    // This will not be changed by the update method.
    // Needs a function to pick 1-3 random and multiply by tile-size
    // Video doesn't care about using same row twice
    this.y = randInt(1,4) * 83 - IMGHEAD;

    // Collision Detection Bounding Box (CDBB):
    // CDBB Color,
    this.cdColor = 'red';
    // CDBB Dimensions,
    this.cdWidth = 90;
    this.cdHeight = 50;
    // CDBB location relative to sprite origin
    this.cdLeftPadding = 5;
    this.cdTopPadding = 85;
};

Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    // The Collision box tracks the x value and width
    this.updateCB();
    // this.cdx = this.x + 5;
    // this.cdX = this.cdx + 90;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Delegate Player to Sprite
    Sprite.call(this);

    // Start position is tile 3,6. Sprite top-left coord is 2*101, 5*83-IMGHEAD
    this.x = 202;
    this.y = 415 - IMGHEAD;
    // Add a sprite, this will be choosable later.
    this.sprite = 'images/char-boy.png';

    // Collision Detection Bounding Box (CDBB):
    // CDBB Color,
    this.cdColor = 'blue';
    // CDBB Dimensions,
    this.cdWidth = 35;
    this.cdHeight = 50;
    // CDBB location relative to sprite origin
    this.cdLeftPadding = 35;
    this.cdTopPadding = 85;
};

Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(deltaX, deltaY) {
    // Use temp newX and newY to test proposed new position is within bounds
    // before making the move
    var newX = this.x + deltaX;
    var newY = this.y + deltaY;

    // Drown: reset the game if player moves to top row of water
    if (newY <= 0 - IMGHEAD) {
        reset();
    }

    // Move
        // Do move if new coordinated remain within the bounds
        // of the canvas. (0>x>404, 0>y>415). Also allow for IMGHEAD.
    if (newX <= 404 && newX >= 0 &&
        newY <= 415 - IMGHEAD && newY >= 0 - IMGHEAD) {
        // Move the sprite
        this.x = newX;
        this.y = newY;
        // Move the collision detection box
    }
    this.updateCB();
};

Player.prototype.handleInput = function(keyName) {
    switch(keyName) {
        case 'left':
            player.update(-101, 0);
            break;
        case 'right':
            player.update(101, 0);
            break;
        case 'up':
            player.update(0, -83);
            break;
        case 'down':
            player.update(0, 83);
            break;
        default:
            break;
    }

};
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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
    // Note there never seems to be more than 3 enemies at a time
// Moved into reset()
// // var allEnemies = [];

var spawnEnemies = function() {
    while (allEnemies.length < 3) {
        allEnemies.push(new Enemy());
    }
    allEnemies = allEnemies.filter(function(enemy) {
        return enemy.x < 650;
    });
};

// Place the player object in a variable called player
// Moved into reset()
// // var player = new Player();

// COLLISION DETECTION
// Loop through allEnemies array and test for collision with
// player.
// TODO: checkColliosions could be on Enemy Class?
var checkCollisions = function() {
    var len = allEnemies.length;
    for (var i = 0; i < len; i++) {
        if (isColliding(allEnemies[i], player)) {
            reset();
            return;
        }
    }
};

// collision test mostly taken from
// https://www.youtube.com/watch?v=ghqD3e37R7E
var isColliding = function(a, b) {
    return !(
                b.cdX < a.cdx ||
                a.cdX < b.cdx ||
                b.cdY < a.cdy ||
                a.cdY < b.cdy
            );
};
