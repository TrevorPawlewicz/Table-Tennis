//
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 0;

window.onload = function(){
    console.log("window loaded -- javascript!");

    canvas = document.getElementById('gameCanvas'); // index.html
    canvasContext = canvas.getContext('2d');
    drawEverything();
}


function drawEverything(){
    canvasContext.fillStyle = 'black';
    //                     x, y, width,        height
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // shape order determines the Z axis
}
