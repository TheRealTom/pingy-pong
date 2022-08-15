let speedY;
let speedX;

// Change the ball acceleration values to change or break the game :)
let accelerationX = 1.0;
let accelerationY = 1.0;
let accelerationOnTouch = 1.0;

let scoreLeft = 0;
let scoreRight = 0;
let scoreTop = 0;
let scoreBottom = 0;

// verticalPlayer
let verticalPlayerHeight = 100;
let verticalPlayerWidth = 25;

// horizontalPlayer
let horizontalPlayerWidth = 140;
let horizontalPlayerHeight = 40;

let ballWidth = 50;

let speedOfPlayerLeft = 0;
let speedOfPlayerRight = 0;
let speedOfPlayerTop = 0;
let speedOfPlayerBottom = 0;

let positionOfLeftPlayer = window.innerHeight;
let positionOfRightPlayer = window.innerHeight;
let positionOfTopPlayer = Math.floor(window.innerWidth/2);
let positionOfBottomPlayer = Math.floor(window.innerWidth/2);

let xAxisSpeedOfBall = 0;
let yAxisSpeedOfBall = 0;

let positionOfBallTop = 200;
let positionOfBallRight = 650;

let keys = {};


// Starts new round
function startRound() {
    positionOfBallTop = Math.floor(window.innerHeight/2);
    positionOfBallRight = Math.floor(window.innerWidth/2);
    positionOfLeftPlayer = Math.floor(window.innerHeight);
    positionOfRightPlayer = Math.floor(window.innerHeight);
    positionOfTopPlayer = Math.floor(window.innerWidth/2);
    positionOfBottomPlayer = Math.floor(window.innerWidth/2);
    speedY = 15;
    speedX = 20;
    
    if (Math.random() < 0.5){
        var side = 1;
    } else {
        var side = -1;
    }

    xAxisSpeedOfBall = side * (Math.random() * 6 + 3)
    yAxisSpeedOfBall = side * (Math.random() * 6 + 3)

    document.getElementById('scoreLeft').innerHTML = scoreLeft;
    document.getElementById('scoreRight').innerHTML = scoreRight;
    document.getElementById('scoreTop').innerHTML = scoreBottom;
    document.getElementById('scoreBottom').innerHTML = scoreTop;
}

// Pressed key
document.addEventListener('keydown', (e) => {
    console.log(e.key)
    keys[e.key] = true;
})

// No longer holding the key
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
})

// Do everyframe
window.setInterval(function show() {
    // determine new position of players
    this._changePositionValues();
    this._replaceNegativeValuesAndZero();

    // move with ball
    positionOfBallTop += yAxisSpeedOfBall;
    positionOfBallRight += xAxisSpeedOfBall;

    // check if the player is not out of frame
    this._correctPositionOfPlayers();

    // determine or increase speed on hit
    this._isGoalOrIncreaseSpeedOnHit();
    
    // change positions of objects
    this._changePositionsOfObjects();

    // plays music over and over and over... again
    document.getElementById("audioSound").play();
}, 1000/60)

////////////////////
// PRIVATE FUNCTIONS
////////////////////
function _changePositionValues() {
    // LEFT player
    if (keys["ArrowDown"]){
        positionOfLeftPlayer += speedY
    }
    if (keys["ArrowUp"]) {
        positionOfLeftPlayer += -speedY
    };

    // RIGHT player
    if (keys["S"] || keys["s"]){
        positionOfRightPlayer += speedY
    }
    if (keys["W"] || keys["w"]) {
        positionOfRightPlayer += -speedY
    };
    
    // TOP player
    if (keys["5"]) {
        positionOfTopPlayer += -speedX
    };
    if (keys["6"]){
        positionOfTopPlayer += speedX
    }
    
    // BOTTOM player
    if (keys["I"] || keys["i"]) {
        positionOfBottomPlayer += -speedX
    };
    if (keys["O"] || keys["o"]){
        positionOfBottomPlayer += speedX
    }
}

// One player moves with every player
function _oneForAll() {
    if (keys["ArrowDown"] || keys["O"] || keys["o"] || keys["S"] || keys["s"] || keys["6"]){
        positionOfLeftPlayer += speedY
        positionOfRightPlayer += speedY
        positionOfTopPlayer += speedX
        positionOfBottomPlayer += speedX
    }
    if (keys["ArrowUp"] || keys["W"] || keys["w"] || keys["5"] || keys["I"] || keys["i"]) {
        positionOfLeftPlayer += -speedY
        positionOfRightPlayer += -speedY
        positionOfTopPlayer += -speedX
        positionOfBottomPlayer += -speedX

    };
}

// Corrects negative values and zero to one
function _replaceNegativeValuesAndZero() {
    if (positionOfLeftPlayer <= 1){
        positionOfLeftPlayer = 1;
    }

    if (positionOfRightPlayer <= 1){
        positionOfRightPlayer = 1;
    }
    
    if (positionOfTopPlayer <= 1){
        positionOfTopPlayer = 1;
    }

    if (positionOfBottomPlayer <= 1){
        positionOfBottomPlayer = 1;
    }
}

// Corrects max and min values so player cannot go above or under max and min position
function _correctPositionOfPlayers() {
    //left up
    if (positionOfLeftPlayer >= window.innerHeight - verticalPlayerHeight){
        positionOfLeftPlayer = window.innerHeight - verticalPlayerHeight;
    }
    //right up
    if (positionOfRightPlayer >= window.innerHeight - verticalPlayerHeight){
        positionOfRightPlayer = window.innerHeight - verticalPlayerHeight;
    }

    //top rightside
    if (positionOfTopPlayer >= window.innerWidth - verticalPlayerHeight){
        positionOfTopPlayer = window.innerWidth - verticalPlayerHeight;
    }
    //top leftside
    if (positionOfTopPlayer <= verticalPlayerHeight){
        positionOfTopPlayer = verticalPlayerHeight;
    }

    //bottom rightside
    if (positionOfBottomPlayer >= window.innerWidth - verticalPlayerHeight){
        positionOfBottomPlayer = window.innerWidth - verticalPlayerHeight;
    }

    //bottom leftside
    if (positionOfBottomPlayer <= verticalPlayerHeight){
        positionOfBottomPlayer = verticalPlayerHeight;
    }
}

// Determins if there is a goal or hit
function _isGoalOrIncreaseSpeedOnHit() {
    if (positionOfBallTop <= horizontalPlayerHeight){
        if (window.innerWidth - positionOfBallRight > positionOfTopPlayer - 20
        && window.innerWidth - positionOfBallRight < positionOfTopPlayer + horizontalPlayerWidth + 20)
        {
            yAxisSpeedOfBall = -yAxisSpeedOfBall*accelerationOnTouch;
            speedX = speedX*accelerationX;
            speedY = speedY*accelerationY;
        } else {
            scoreLeft++;
            scoreRight++;
            scoreBottom++;
            startRound();
        }
    }
    if (positionOfBallTop >= window.innerHeight - verticalPlayerHeight){
        if (window.innerWidth - positionOfBallRight > positionOfBottomPlayer - 20
        && window.innerWidth - positionOfBallRight < positionOfBottomPlayer + horizontalPlayerWidth + 20)
        {
            yAxisSpeedOfBall = -yAxisSpeedOfBall*accelerationOnTouch;
            speedX = speedX*accelerationX;
            speedY = speedY*accelerationY;
        } else {
            scoreLeft++;
            scoreRight++;
            scoreTop++;
            startRound();
        }
    }

    if (positionOfBallRight <= verticalPlayerWidth){
        if (positionOfBallTop > positionOfLeftPlayer-20
        && positionOfBallTop < positionOfLeftPlayer + verticalPlayerHeight + 20)
        {
            xAxisSpeedOfBall = -xAxisSpeedOfBall*accelerationOnTouch;
            speedX = speedX*accelerationX;
            speedY = speedY*accelerationY;
        } else {
            scoreLeft++;
            scoreTop++;
            scoreBottom++;
            startRound();
        }
    }

    if (positionOfBallRight >= window.innerWidth - verticalPlayerWidth - ballWidth){
        if (positionOfBallTop > positionOfRightPlayer-15
        && positionOfBallTop < positionOfRightPlayer + verticalPlayerHeight + 15)
        {
            xAxisSpeedOfBall = -xAxisSpeedOfBall*accelerationOnTouch;
            speedX = speedX*accelerationX;
            speedY = speedY*accelerationY;
        } else {
            scoreRight++;
            scoreTop++;
            scoreBottom++;
            startRound();
        }
    }
}

// Change the positions of the object on window
function _changePositionsOfObjects() {
    document.getElementById('player1').style.top = positionOfLeftPlayer + 'px';
    document.getElementById('player2').style.top = positionOfRightPlayer + 'px';
    document.getElementById('player3').style.left = positionOfTopPlayer + 'px';
    document.getElementById('player4').style.left = positionOfBottomPlayer + 'px';

    document.getElementById('ball').style.top = positionOfBallTop + 'px';
    document.getElementById('ball').style.right = positionOfBallRight + 'px';
}