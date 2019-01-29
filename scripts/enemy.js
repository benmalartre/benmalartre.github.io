
var ENEMY_COUNTER = 0
var ENEMY_UNIQUE_ID = 0

class Enemy_t extends Active_t{
    constructor(x, y, z){
        super(OBJECT_TYPE.OBJECT_ENEMY, x, y, z, ENEMY_UNIQUE_ID);
        ENEMY_UNIQUE_ID += 1;
        ENEMY_COUNTER += 1;
        this.elem.style.width = Math.random(64)+32+'px';
        this.elem.style.height = Math.random(64)+32+'px';
        this.elem.style.color = "white";
        this.elem.style.background = GetColorString(GetRandomColor());
        this.elem.innerHTML = "Enemy"+this.id;
        this.elem.style.top = x+'px';
        this.elem.style.left = y+'px';

        this.energy = 100;
        this.hungry = Math.random() * 100;
        this.dangerous = Math.random() * 100;
        this.damage = 0;
        this.jump_counter = 0;

        this.position.x = Math.random()*250;
        this.position.y = Math.random()*250;
        this.velocity.x = Math.random()-2;
        this.velocity.y = Math.random()-2;
    }

    Init(){
        this.position.set(Math.random() * 250, Math.random() * 250, Math.random() * 100);
    }

    Wander(){
        var dt = 0.0001;
        this.Accelerate();
        this.velocity.iadd(this.acceleration);
        this.position.iadd(this.velocity);

        /*
        this.tmpPosition = glMatrix.vec3.scale(this.tmpPosition, this.velocity, dt);
        this.prevPosition = glMatrix.vec3.sub(this.prevPosition, this.position, this.tmpPosition);
        this.acceleration = glMatrix.vec3.divide(this.acceleration, this.force, this.mass);
        this.tmpPosition = glMatrix.vec3.scale(this.tmpPosition, this.acceleration, dt * dt);
        this.acceleration = glMatrix.vec3.add(this.acceleration, this.prevPosition, this.tmpPosition);
        this.position = glMatrix.vec3.add(this.position, this.position, this.acceleration);
        */
         /*
        oldx = x - velocity * Time; 
        acceleration = force/mass; // based on f=ma
        Time = getTimer() - startTime;
        
        x += x - oldx + a * Time * Time;
        */
        //glMatrix.vec3.add(this.position, this.position, this.velocity);
        //this.position[0] += this.velocity[0] * 0.1;

        //this.elem.style.left = this.x +'px';
        //this.elem.style.top = this.y +'px';
        


        //this.elem.style.transform = 'translateY('+this.y+')';
        //this.elem.style.transform = 'rotate('+(Math.random()*10-5)+'deg)';
    }

    Update(){
        //this.Wander();
        this.elem.style.transform = 'translate('+this.position.x+'px, '+this.position.y+'px)';
        if(this.collide)
            this.elem.style.background = 'red';//GetColorString(GetRandomColor());
        else
            this.elem.style.background = 'green';//GetColorString(GetRandomColor());
    }
}

