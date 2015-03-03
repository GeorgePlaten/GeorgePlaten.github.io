// General game settings
var Game = {
    difficulty: 1.0 // use a multiplier that increases based on time
                    // elapesed (first) or score (later).
};

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
    //
    this.speed = randInt(1,3) / 5.0 * Game.difficulty;

    // will need to randomise off-stage left or right depending
    // on direction. hmmm... the video only shows one direction.
    // So I'll can use a constant value here (for now).
    this.x = -50.0;

    // will need to pick a random row between 0 and 4 (exclusive)
    // This will not be changed by the update method.
    // Needs a function to pick 1-3 random and multiply by tile-size
    // Video doesn't care about using same row twice
    this.y = randInt(1,3) * 101;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Start position is tile 3,6. Sprite top-left coord is 2*101, 5*83
    this.x = 202;
    this.y = 415;
    // Add a sprite, this will be choosable later.
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {

};

Player.prototype.handleInput = function() {

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
// Place the player object in a variable called player



