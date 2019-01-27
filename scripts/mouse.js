// Detect if the browser is IE or not.
// If it is not IE, we assume that the browser is NS.
var IE = document.all?true:false

// If NS -- that is, !IE -- then set up for mouse capture
if (!IE) document.captureEvents(Event.MOUSEMOVE)

// Set-up to use getMouseXY function onMouseMove
document.onmousemove = getMouseXY;

// Temporary variables to hold mouse x-y pos.s
var isDown = false;
var mouseX = 0
var mouseY = 0
var velX = 0;
var velY = 0;

// Main function to retrieve mouse x-y pos.s

function getMouseXY(e) {
  var oldX = mouseX;
  var oldY = mouseY;
    if (IE) { // grab the x-y pos.s if browser is IE
      mouseX = (event.clientX + document.body.scrollLeft)/window.innerWidth
      mouseY = (event.clientY + document.body.scrollTop)/window.innerHeight
    } else {  // grab the x-y pos.s if browser is NS
      mouseX = e.pageX/window.innerWidth;
      mouseY = e.pageY/window.innerHeight;
    }  
    // catch possible negative values in NS4
    if (mouseX < 0){mouseX = 0}
    if (mouseY < 0){mouseY = 0}  

    //document.Show.MouseX.value = tempX
    //document.Show.MouseY.value = tempY
    velX = mouseX - oldX;
    velY = mouseY - oldY;
    return true
}

document.addEventListener('mousedown', function(e) {
    isDown = true;
}, true);

document.addEventListener('mouseup', function() {
  isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
  event.preventDefault();
  if (isDown) {
    var deltaX = event.movementX;
    var deltaY = event.movementY;
    var rect = divOverlay.getBoundingClientRect();
    divOverlay.style.left = rect.x + deltaX + 'px';
    divOverlay.style.top  = rect.x + deltaX + 'px';
  }
}, true);