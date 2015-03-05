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

var imgHead = 20; // Images seem to have a headspace, don't know why yet.

// Random Integer generator from http://stackoverflow.com/questions/4959975/
// Used because I was repeating myself making random nums
// Note: S/O shows a better method using default op |, but I want to understand
// how it works better before using it.
var randInt = function(min, max) {
    return Math.floor( (Math.random()*(max-min)) + min);
};


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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

    // will need to pick a random row between 0 and 4 (exclusive)
    // This will not be changed by the update method.
    // Needs a function to pick 1-3 random and multiply by tile-size
    // Video doesn't care about using same row twice
    this.y = randInt(1,4) * 83 - imgHead;

    // Collision Detection Bounding Boxes
    // lower case x and y for top-left, upper case for bottom right
    this.cdx = this.x + 5;
    this.cdX = this.cdx + 90;
    this.cdy = this.y + 85;
    this.cdY = this.cdy + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    this.cdx = this.x + 5;
    this.cdX = this.cdx + 90;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    drawCollisionBox('red', this.cdx, this.cdy, 90, 50);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Start position is tile 3,6. Sprite top-left coord is 2*101, 5*83-imgHead
    this.x = 202;
    this.y = 415 - imgHead;
    // Add a sprite, this will be choosable later.
    this.sprite = 'images/char-boy.png';

    // Collision Detection Bounding Boxes
    // lower case x and y for top-left, upper case for bottom right
    this.cdx = this.x + 35;
    this.cdX = this.cdx + 35;
    this.cdy = this.y + 85;
    this.cdY = this.cdy + 50;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    drawCollisionBox("blue", this.cdx, this.cdy, 35, 50);
};

Player.prototype.update = function(deltaX, deltaY) {
    var newX = this.x + deltaX;
    var newY = this.y + deltaY;

    // Drown
    if (newY <= 0 - imgHead) {
        reset();
    }

    // Move
    if (newX <= 404 && newX >= 0 &&
        newY <= 415 - imgHead && newY >= 0 - imgHead) {
        this.x = newX;
        this.y = newY;
        this.cdx = this.x + 35;
        this.cdX = this.cdx + 35;
        this.cdy = this.y + 85;
        this.cdY = this.cdy + 50;
    }
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

var updateAllEnemies = function() {
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
// mostly taken from
// https://www.youtube.com/watch?v=ghqD3e37R7E
var checkCollisions = function() {
    var len = allEnemies.length;
    for (var i = 0; i < len; i++) {
        if (isColliding(allEnemies[i])) {
            return true;
        }
    }
};

var isColliding = function(e) {
    var p = player;
    return !(   p.cdX < e.cdx ||
                e.cdX < p.cdx ||
                p.cdY < e.cdy ||
                e.cdY < p.cdy
            );
};

// Draw a CD box outline if webpage requests it via checkbox
var drawCollisionBox = function(color, x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    if (drawCBs.checked) {
        ctx.stroke();
    }
};
