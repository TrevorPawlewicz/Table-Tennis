//
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

//-----------------------------------------------------------------------------
window.onload = function(){
    initGame();
} //---------------------------------------------------------------------------

function initGame() {
    canvas = document.getElementById('gameCanvas'); // index.html
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function(){
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove', function(event){
        var mousePos = calculateMousePos(event);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2); // center pointer to paddle
    });
};

function handleMouseClick(event) {
    if (showingWinScreen){
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
};

function ballReset() {
    // center ball in middle of screen
    ballX = canvas.width/2;
    ballY = canvas.height/2;

    ballSpeedX = - ballSpeedX;

    //scoring:
    if ((player1Score >= WINNING_SCORE) || (player2Score >= WINNING_SCORE)) {

        showingWinScreen = true;
    }
}; //--------------------------------------------------------------------------

function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    }
}; //--------------------------------------------------------------------------

// left paddle movement
function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2); // center ball hit

    // ignore chasing ball while its outside a 35 px area of center
    if (paddle2YCenter < (ballY - 35)) {
        paddle2Y += 6;
    } else if (paddle2YCenter > (ballY + 35)) {
        paddle2Y -= 6;
    }
};

function moveEverything() {

    if (showingWinScreen) {
        return;
    }

    computerMovement(); // move left paddle func call

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // left paddle hit or miss
    if (ballX > canvas.width) {
        if ((ballY > paddle2Y) && (ballY < paddle2Y + PADDLE_HEIGHT)) {
            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35; // 1/3 of the speed
            ballSpeedX = - ballSpeedX;
        } else {
            player1Score++;
            ballReset();
        }
    }
    // right paddle hit or miss
    if (ballX < 0) {
        if ((ballY > paddle1Y) && (ballY < paddle1Y + PADDLE_HEIGHT)) {
            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35; // 1/3 of the speed
            ballSpeedX = - ballSpeedX;
        } else {
            player2Score++;
            ballReset();
        }
    }
    // top or bottom canvas area border
    if ((ballY > canvas.height) || (ballY < 0)) {
        ballSpeedY = - ballSpeedY;
    }
}; //--------------------------------------------------------------------------

function drawNet() {
    for (var i = 0; i < canvas.height; i += 40) {
        colorRect((canvas.width / 2) - 1, i, 2, 20, "white");
    }
};

function drawEverything(){
    // shape order determines the Z axis (first is background, last is front)
    //-----------------------------------------------------------------------
    //        x, y, width,        height,         color
    colorRect(0, 0, canvas.width, canvas.height, 'black'); // canvas

    canvasContext.font = 'normal 50pt Audiowide';

    if (showingWinScreen) {
        canvasContext.fillStyle = "white";

        if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText("Left Player Won!", 80, 200);
        } else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Right Player Won!", 80, 200);
        } else {
            canvasContext.fillText("TIE", 350, 200);
        }

        canvasContext.fillText("Click to Continue", 80, 500);
        return;
    }

    drawNet(); // seperate function

    colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white'); // left paddle
    colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white'); // right paddle
    colorCircle(ballX, ballY, 10, 'white'); // draw circle

    canvasContext.fillText(player1Score, 160, 60);
    canvasContext.fillText(player2Score, 570, 60);
}; //--------------------------------------------------------------------------

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}; //--------------------------------------------------------------------------

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}; //--------------------------------------------------------------------------

console.log("js loaded!");
