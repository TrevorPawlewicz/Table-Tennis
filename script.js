//
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

//-----------------------------------------------------------------------------
window.onload = function(){
    console.log("window loaded -- javascript!");

    canvas = document.getElementById('gameCanvas'); // index.html
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function(){
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', function(event){
        var mousePos = calculateMousePos(event);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2); // center pointer to paddle
    });
}
//-----------------------------------------------------------------------------
function ballReset() {
    // center ball in middle of screen
    ballX = canvas.width/2;
    ballY = canvas.height/2;

    ballSpeedX = - ballSpeedX;
};

function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    }
}

function moveEverything() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    // left paddle hit or miss
    if (ballX > canvas.width) {
        if ((ballY > paddle2Y) && (ballY < paddle2Y + PADDLE_HEIGHT)) {
            ballSpeedX = - ballSpeedX;
        } else {
            ballReset();
        }
    }
    // right paddle hit or miss
    if (ballX < 0) {
        if ((ballY > paddle1Y) && (ballY < paddle1Y + PADDLE_HEIGHT)) {
            ballSpeedX = - ballSpeedX;
        } else {
            ballReset();
        }
    }
    if ((ballY > canvas.height) || (ballY < 0)) {
        ballSpeedY = - ballSpeedY;
    }
};

function drawEverything(){
    // shape order determines the Z axis (first is background, last is front)
    //-----------------------------------------------------------------------
    //        x, y, width,        height,         color
    colorRect(0, 0, canvas.width, canvas.height, 'black'); // canvas
    colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white'); // left paddle
    colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white'); // right paddle
    colorCircle(ballX, ballY, 10, 'white'); // draw circle
};

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
};

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
};
