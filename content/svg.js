var svg = document.createElement('div');
svg.id = 'svg';

function Tangent(points, index){
  var tx, ty;
  if(index == 0)
  {
    tx = (points[index+1][0]-points[index][0]);
    ty = (points[index+1][1]-points[index][1]);
  }
  else if(index == points.length - 1)
  {
    tx = (points[index][0] - points[index-1][0]);
    ty = (points[index][1] - points[index-1][1]);
  }
  else
  {
    tx = ((points[index][0] - points[index-1][0]) + (points[index+1][0]-points[index][0]))*0.5;
    ty = ((points[index][1] - points[index-1][1]) + (points[index+1][1]-points[index][1]))*0.5;
  }
  return [tx, ty];
}

function Normal(points, index){
  var nx, ny;
  if(index == 0)
  {
    nx = (points[index+1][0]-points[index][0]) * (points[index+1][1]-points[index][1]);
    ny = (points[index+1][1]-points[index][1]) * (points[index+1][0]-points[index][0]);
  }
  else if(index == points.length - 1)
  {
    nx = (points[index][0] - points[index-1][0]) * (points[index][1] - points[index-1][1]);
    ny = (points[index][1] - points[index-1][1]) * (points[index][0] - points[index-1][0]);
  }
  else
  {
    nx = ((points[index][0] - points[index-1][0]) * (points[index+1][1]-points[index][1])); 
    ny = ((points[index][1] - points[index-1][1]) * (points[index+1][0]-points[index][0]));
  }
  return [nx, ny];
}

function Contour(points, offset){
  var array = new SVG.PathArray();
  var n = Normal(points, 0);
  var startX = points[0][0] + n[0]*offset;
  var startY = points[0][1] + n[1]*offset;
  //array.
}

var points = new SVG.Array([ .343,  .669, .119, 0,   0
  , .249, -.626, .130, 0,   0
  , .172,  .334, .111, 0,   0
  , .000,  .000, .000, 1,  -0 ]);

var patharray = new SVG.PathArray([
  ['M', 340, 178]
, ['L', 104, 478]
, ['L', 580, '490']
, ['Z']]);

alert(patharray.toString());
app.content.Mount(svg);

var canvas = SVG('svg').size('100%', '100%')
  , rect = canvas.rect(5, 5)
  , path = canvas.path(patharray.toString())//"M 340,178 104,478 580,490 Z")
  , length = path.length()
  
path.fill('none').stroke({width:12, color: 'rgba(255,128,64,0.5)'}).move(10,10).scale(0.5)
path.animate(3000).rotate(365).loop();

rect.animate(5000, '<>').during(function(pos, morph, eased){
    var m = path.matrixify()
    var p = new SVG.Point(path.pointAt(eased * length)).transform(m)
    rect.move(p.x, p.y)
}).loop(true, true)