const G = 1500.0;
const DT = 0.1;
const CENTER = new SAT.Vector(250,250);

var acceleration = function(pos1, pos2){
    var direction = pos1.sub(pos2);
    var length = direction.length();
    var normal = direction.normalized();
    return normal.mul(G/Math.pow(length, 2));
};

class Integrator_t{
    constructor(objects, type='euler'){
        this.type = type;
        this.objects = [];
        for(var i=0;i<objects.length;i++){
            var cls = objects[i].cls;
            if(cls == OBJECT_TYPE.OBJECT_PLAYER || cls == OBJECT_TYPE.OBJECT_ENEMY)
            {
                this.objects.push(objects[i]);
            }
        }
        this.gravity = new SAT.Vector(0.0,9.7);
        this.wind = new SAT.Vector(0.0,0.0);
    }

    Step(){
        switch(this.type){
            case 'euler':
                for(var i=0;i<this.objects.length;i++)
                {
                    this.objects[i].Accelerate(DT, this.gravity, this.wind);
                    this.objects[i].velocity.add(this.objects[i].acceleration);
                    this.objects[i].position.add(this.objects[i].velocity);
                    this.objects[i].Left();
                    this.objects[i].Update();
                }
                break;

            case 'verlet':
                for(var i=0;i<this.objects.length;i++)
                {
                    //this.objects[i].Accelerate(DT);
                    this.objects[i].velocity.add(this.objects[i].acceleration);
                    this.objects[i].position.add(this.objects[i].velocity);
                    this.objects[i].Update();
                    
                }
                break;
        }
        
    }
}