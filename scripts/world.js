// Alias a few things in SAT.js to make the code shorter
var V = function (x, y) { return new SAT.Vector(x, y); };
var P = function (pos, points) { return new SAT.Polygon(pos, points); };
var C = function (pos, r) { return new SAT.Circle(pos, r); };
var B = function (pos, w, h) { return new SAT.Box(pos, w, h); };

var GRAVITY = new SAT.Vector(0,9.7);
class World_t{
    constructor(objects, loopCount=1){
        this.objects = objects;
        this.response = new SAT.Response(); // Response reused for collisions
        this.loopCount = loopCount;
        this.hero = null;
        this.entities = new Array();
        this.obstacles = new Array();
        this.ground = null;

        for(var i=0; i<this.objects.length; i++){
            var type = this.objects[i].cls;
            if(type == OBJECT_TYPE.OBJECT_PLAYER){
                this.objects[i].entity = new SAT.Circle(this.objects[i].position, 32);
                this.hero = this.objects[i];
            }
                
            else if(type == OBJECT_TYPE.OBJECT_ENEMY)
            {
                this.objects[i].entity = new SAT.Circle(this.objects[i].position, 64);
                this.entities.push(this.objects[i]);
            }
            else if(type == OBJECT_TYPE.OBJECT_GROUND)
            {
                this.ground = this.objects[i];
            }
            else if(type == OBJECT_TYPE.OBJECT_OBSTACLE)
            {
                this.objects[i].entity = new SAT.Polygon(this.objects[i].position, this.objects[i].points);
                this.obstacles.push(this.objects[i]);
            }
            
        }
    };

    Collide(){
        this.ground.Collide(this.hero, GRAVITY);
        //collided = SAT.testCirclePolygon(this.hero.entity, this, this.response);
        /*
        for (var i = 0; i < this.loopCount; i++) {
            // Naively check for collision between all pairs of entities 
            // E.g if there are 4 entities: (0, 1), (0, 2), (0, 3), (1, 2), (1, 3), (2, 3)
            for (var aCount = 0; aCount < this.entities.length; aCount++) {
                var a = this.entities[aCount];
                for (var bCount = 0; bCount < this.entities.length; bCount++) {
                    if(aCount == bCount) continue;

                    var b = this.entities[bCount];
                    this.response.clear();
                    var collided;
                    var aData = a.entity;
                    var bData = b.entity;
                    if (aData instanceof SAT.Circle) {
                        if (bData instanceof SAT.Circle) {
                            collided = SAT.testCircleCircle(aData, bData, this.response);
                        } else {
                            collided = SAT.testCirclePolygon(aData, bData, this.response);
                        }
                    } 
                    else {
                        if (bData instanceof SAT.Circle) {
                            collided = SAT.testPolygonCircle(aData, bData, this.response);
                        } 
                        else {
                            collided = SAT.testPolygonPolygon(aData, bData, this.response);
                        }
                    }
                    a.collide = collided;
                    if (collided) {
                        console.log("COLLISION!!!");
                        //a.respondToCollision(b, this.response);
                    }
                }
            }
        }
        */
    }
}



