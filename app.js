var width = window.innerWidth;
var height = window.innerHeight;

var prevWidth = width;
var prevHeight = height;

var canvas;
var ctx;
var x = width * 0.4;
var y = height * 0.3;
var dragok = false;
var rectWidth = width * 0.2;
var rectHeight = height * 0.2;

/* Draws the rectangle */
function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

/* Clears canvas */
function clear() {
  ctx.clearRect(0, 0, width, height);
}

/* Defines the Canvas dimensions and sets up context */
function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.setAttribute('width',width);  
  canvas.setAttribute('height',height);
  return setInterval(draw, 10);
}


/* Draws the canvas */
function draw() {
  clear();
  ctx.fillStyle = "#FAF7F8";
  rect(0,0,width,height);
  ctx.fillStyle = "#444444";
  rect(x, y, rectWidth, rectHeight);
}

/* Cube Move Listener */
function myMove(e){
  if (dragok){
    x = ((e.pageX - canvas.offsetLeft) - (rectWidth / 2));
    y = ((e.pageY - canvas.offsetTop) - (rectHeight / 2));
  }
}

/* On mouse hold */
function myDown(e){
  if (e.pageX < (x + rectWidth) + canvas.offsetLeft && e.pageX > x +
    canvas.offsetLeft && e.pageY < (y + rectHeight) + canvas.offsetTop &&
    e.pageY > y + canvas.offsetTop){
    x = ((e.pageX - canvas.offsetLeft) - (rectWidth / 2));
    y = ((e.pageY - canvas.offsetTop) - (rectHeight / 2));
    dragok = true;
    canvas.onmousemove = myMove;
  }
}

/* On mouse button release */
function myUp(){
  dragok = false;
  canvas.onmousemove = null;
}

init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;

window.onresize = function(event) {
  width = window.innerWidth
  height = window.innerHeight

  x = (width * (x/prevWidth));
  y = (height * (y/prevHeight));
  rectWidth = width * 0.2;
  rectHeight = height * 0.2;

  prevWidth = width;
  prevHeight = height;

  canvas.setAttribute('width',width);  
  canvas.setAttribute('height',height);

  draw( );
}