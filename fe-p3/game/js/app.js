/* MileStones:

BASIC TODO:
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
    DONE: Add a Sprite super class
        DONE: refactor code to work with improved class structure
    DONE: Make collision detection a method of Player
ADVANCED TODO:
    DONE: Add death modes (just a console.log() for now)
        DONE: Add water death
        DONE: Add collision death
        DONE: Add lives counter
            DONE: Show with hearts graphics
    DONE: Add score
        DONE: For moves made
            DONE: Add graphics
    DONE: Add Bonus spawner
        DONE: Add Bonus values and rarity / frequency
        DONE: Add random location
            DONE: Reject player's location
        DONE: Add timer for spawn and despawn (seems erratic)
        DONE: Gem capture remover
    DONE: Add intensity based on bonuses captured
    Allow enemies to travel both ways
    Prevent enemies doubling up on line rows


*/

// General game settings
var game = {
    // Difficulty: use a multiplier that increases based on time
    // elapsed (first) or score (later).
    score: 0,
    topScore: 0,
    intensity: 0.5
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
};

Sprite.prototype.renderCB = function() {
    // the Collision Box
    ctx.beginPath();
    ctx.rect(this.cdx, this.cdy, this.cdWidth, this.cdHeight);
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.cdColor;
    ctx.stroke();
};

Sprite.prototype.move = function(dx, dy) {
    this.x += dx;
    this.y += dy;
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
    // Speed will increase as an intensity feature.
    // Start with 3 basic speeds for now.
    // what unit will I use: pixels per x(milliseconds)?
    // 600px/1000ms will cross the canvas in one second.
    // This seems to match the video appox (small canvas!)
    // Should I to use the dt multiplier here: 600/1000*dt?
    // TODO: figure out why it's 0.005 and not 5.0
    this.speed = randInt(1,4) / 0.005 * game.intensity;

    // will need to randomise off-stage left or right depending
    // on direction. hmmm... the video only shows one direction.
    // So I'll can use a constant value here (for now).
    this.x = -150.0;

    // will need to pick a random row from 1 to 3
    // This will not be changed by the update method.
    // Needs a function to pick 1-3 random and multiply by tile-size
    // Video doesn't care about using same row twice
    this.y= randInt(1,4) * 83 - IMGHEAD;

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
    // this.x += (this.speed * dt);
    this.move(this.speed * dt, 0);
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
    this.startX = 202;
    this.startY = 415 - IMGHEAD;

    // Current position
    this.x = this.startX;
    this.y = this.startY;
    // Add a sprite, this will be choosable later.
    this.sprite = 'images/char-boy.png';

    this.speed = 15; // pixels/millsecond

    // Collision Detection Bounding Box (CDBB):
    // CDBB Color,
    this.cdColor = 'blue';
    // CDBB Dimensions,
    this.cdWidth = 35;
    this.cdHeight = 50;
    // CDBB location relative to sprite origin
    this.cdLeftPadding = 35;
    this.cdTopPadding = 85;

    // An object of sprites that are being collided with
    this.isCollidingWith = {
        enemy: false,
        bonus: false
    };

    // a lives counter, start with 3, lose one for every death
    // later gain some as bonuses,
    this.lives = 3;
};

Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.reset = function() {
    this.x = this.startX;
    this.y = this.startY;
};

Player.prototype.jump = function(dx, dy) {
    // Use temp newX and newY to test proposed new position is within bounds
    // before making the move
    var newX = this.x + dx;
    var newY = this.y + dy;

    // Drown: reset the game if player moves to top row of water
    if (newY <= 0 - IMGHEAD) {
        this.deathBy('drowning');
        this.reset();
        return;
    }

    // Move
        // Do move if proposed coordinates remain within the bounds
        // of the play area. (0>x>404, 0>y>415). Also allow for IMGHEAD.
    if (newX <= 404 &&
        newX >= 0 &&
        newY <= 415 - IMGHEAD &&
        newY >= 0 - IMGHEAD) {
        // Move the sprite
        this.move(dx, dy);
        // only score on road tiles
        if (newY <= 249 - IMGHEAD) {
            this.score(10);
        }
    }
};

Player.prototype.update = function() {
    // Update the collision detection box
    this.updateCB();
    // this.move(this.speed * dt, this.speed * dt);
    this.checkCollisions();

};

Player.prototype.score = function(score) {
    game.score += score;
};

Player.prototype.checkCollisions = function() {
    var len = allEnemies.length;
    for (var i = 0; i < len; i++) {
        this.isCollidingWith.enemy = isColliding(this, allEnemies[i]);
        if (this.isCollidingWith.enemy) {
            this.deathBy('enemy');
            game.intensity = 0.5;
            return;
        }
    }

    this.isCollidingWith.bonus = isColliding(this, bonus);
    if (this.isCollidingWith.bonus) {
        this.isCollidingWith.bonus = false;
        console.log("bonus!");
        this.score(bonus.value);
        bonus.y += 1000;
        bonus.cdy += 1000;
        game.intensity += 0.1;
        // if (bonus.sprite === 'images/Key.png') {
        //     console.log("up, up, down, down, left, right, left, right, B, A")
        // }
        return;
    }
};

var eegg = {
    kcode: [],
    seq: [],
    check: function() {
        if (this.seq === this.kcode) {
            Player.sprite = 'images/char-horn-girl.png';
        }
    }
};


Player.prototype.handleInput = function(keyName) {
    switch(keyName) {
        case 'left':
            player.jump(-101, 0);
            break;
        case 'right':
            player.jump(101, 0);
            break;
        case 'up':
            player.jump(0, -83);
            break;
        case 'down':
            player.jump(0, 83);
            break;
        default:
            break;
    }

};

Player.prototype.deathBy = function(cause) {
    this.lives--;

    switch(cause) {
        case 'enemy':
            console.log("Bug bite!");
            break;
        case 'drowning':
            console.log("glugugug");
            break;
        default:
            break;
    }

    this.reset();

    if (!this.lives) {
        console.log('See you in a milli... seconds....');
        if (game.score > game.topScore) {
            game.topScore = game.score;
        }
        game.score = 0;
        init();
    }
};

var Hearts = function() {
    Sprite.call(this);

    this.sprite = 'images/Heart.png';
    this.x = 10;
    this.y = 50;
    // image dims: 101 x 171
};

Hearts.prototype = Object.create(Sprite.prototype);
Hearts.prototype.constructor = Hearts;

Hearts.prototype.update = function() {
    var offset = 0;
    for (var i = player.lives; i>0; i--) {
        ctx.drawImage(  Resources.get(this.sprite),
                        this.x + offset, this.y, 20, 35);
        offset += 20;
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        66: 'b'
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
// Moved into init()
// // var player = new Player();

// COLLISION DETECTION
// Loop through allEnemies array and test for collision with
// player.
// DONE: moved to player as method


var isColliding = function(caller, tester) {
    return !(
                caller.cdX < tester.cdx ||
                tester.cdX < caller.cdx ||
                caller.cdY < tester.cdy ||
                tester.cdY < caller.cdy
            );
};

drawScoreBoard = function() {
    // Current Score
    var s = game.score.toString();
    ctx.font = '16px "Press Start 2P"';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'black';
    ctx.fillText(s.toUpperCase(), 495, 80, 200);
    ctx.fillStyle = 'gold';
    ctx.fillText(s.toUpperCase(), 493, 78, 200);

    // Top Score
    var ts = game.topScore.toString();
    if (game.score > game.topScore) {
        ts = game.score.toString();
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(ts.toUpperCase(), 258, 80, 200);
    ctx.fillStyle = 'gold';
    ctx.fillText(ts.toUpperCase(), 256, 78, 200);
};

var bonuses = [
    {image: 'images/Gem Green.png', value: 50, frequency: 1.0},
    {image: 'images/Gem Blue.png', value: 200, frequency: 0.2},
    {image: 'images/Gem Orange.png', value: 100, frequency: 0.5},
    {image: 'images/Heart.png', value: 50, frequency: 0.1},
    {image: 'images/Key.png', value: 50, frequency: 0.05}
];

var Bonus = function() {
    Sprite.call(this);

    var getRandBonus = function() {
        return bonuses[randInt(0,5)];
    };

    var randBonus = getRandBonus();
    var rand = Math.random();

    while (randBonus.frequency < rand) {
        randBonus = getRandBonus();
    }

    this.sprite = randBonus.image;
    this.value  = randBonus.value;

    this.x = -500;
    this.y = -500;
    this.cdColor = 'yellow';
    // Padding = offset from Sprite border
    this.cdWidth = 75;
    this.cdHeight = 60;
    this.cdLeftPadding = 12;
    this.cdTopPadding = 80;

    this.updateCB();
};

Bonus.prototype = Object.create(Sprite.prototype);
Bonus.prototype.constructor = Bonus;

Bonus.prototype.locate = function() {
    var newX;
    var newY;
    var genNewLoc = function() {
        newX = randInt(0,5) * 101;
        newY = randInt(1,4) * 83 - IMGHEAD;
    };
    var newLoc = genNewLoc();

    // Check not on player tile
    while (newX === player.x && newY === player.y) {
        genNewLoc();
    }

    this.x = newX;
    this.y = newY;

    this.updateCB();

};

Bonus.prototype.render = function() {
    // the Sprite Image with custom width and height
    ctx.drawImage(  Resources.get(this.sprite),
                    this.x + 15, this.y + 50,
                    70, 90);
};


var spawnBonuses = function() {
    if (bonus.x === -500) {
        bonus.locate();
    } else {
        bonus = new Bonus();
    }
};


