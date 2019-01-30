class Active_t extends Object_t{
    constructor(type, x, y, z){
        var elem = document.createElement('div');
        
        elem.style.position = 'absolute';
        elem.style.display = 'inline-block';
        elem.style.zIndex = 99;

        document.getElementById('GameContainer').appendChild(elem);

        super(type, x, y, z, elem);
        
        this.velocity = new SAT.Vector(0,0);
        this.force = new SAT.Vector(0,12);
        this.prevPosition = new SAT.Vector(0,0);
        this.acceleration = new SAT.Vector(0,0);
        this.tmpPosition = new SAT.Vector(0,0,0);
        this.mass = 0.1;

        this.grounded = false;
        this.energy = 100;
        this.damage = 0;
        this.jump_counter = 0;
    }

    Init(){

    }

    Update(){
        /*
        oldx = x - velocity * Time; 
        acceleration = force/mass; // based on f=ma
        Time = getTimer() - startTime;
        
        x += x - oldx + a * Time * Time;
        */
    }

    Collide(other){
        var aData = this.entity;
        var bData = other.entity;
        if (aData instanceof SAT.Circle) {
          if (bData instanceof SAT.Circle) {
            collided = SAT.testCircleCircle(aData, bData, this.response);
          } else {
            collided = SAT.testCirclePolygon(aData, bData, this.response);
          }
        } else {
          if (bData instanceof SAT.Circle) {
            collided = SAT.testPolygonCircle(aData, bData, this.response);
          } else {
            collided = SAT.testPolygonPolygon(aData, bData, this.response);
          }
        }
        if (collided) {
          a.respondToCollision(b, this.response);
        }
    }

    Accelerate(dt, gravity, wind){
      if(!this.grounded)
      {
        this.force.add(gravity); 
      }
      else this.velocity.y = 0;

      this.force.add(wind);
      
      
        //this.tmpPosition.add(this.velocity, this.force);
        //var length = this.tmpPosition.length();
        //this.acceleration.normalized(this.tmpPosition);
        this.acceleration = this.force;
        this.acceleration.scale(this.mass);
        this.acceleration.scale( dt * dt);
        return this.acceleration;
    }


    Jump(){
        //this.jump_counter;
       this.elem.style.left = this.position.x +'px';
       this.elem.style.top = this.position.y +'px';
    }
}
