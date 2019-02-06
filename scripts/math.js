const DEGTORAD = 0.0174532925;
const RADTODEG = 57.295779513082323;
const PI = 3.14;

var ID = function (){
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};