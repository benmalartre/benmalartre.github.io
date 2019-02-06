class Point_t{
    constructor(x=0.0, y=0.0, z=0.0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    AddInPlace(other){
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    Add(first, second){
        var p = new Point_t(first.x + second.x, first.y + second.y,first.z + second.z);
        return p;
    }

    SubInPlace(other){
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    Sub(first, second){
        var p = new Point_t(first.x - second.x, first.y - second.y,first.z - second.z);
        return p;
    }
}