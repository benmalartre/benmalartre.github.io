const TRANSFORM_DIRTY_CLEAN = 0
const TRANSFORM_DIRTY_SRT = 1
const TRANSFORM_DIRTY_MATRIX = 2

class Matrix_t{
    constructor(){
        this.v = Array(3).fill(Array(3));
        this.SetIdentity();
    }

    SetIdentity(){
        for(i=0;i<3;i++){
            for(j=0;j<3;j++){
                if(i==j)this.v[i][j] = 1.0;
                else this.v[i][j] = 0.0;
            }
        }
    }

    Set(m00,m01,m02,m10,m11,m12,m20,m21,m22){
        this.v[0][0] = m00;
        this.v[0][1] = m01;
        this.v[0][2] = m02;
        this.v[1][0] = m10;
        this.v[1][1] = m11;
        this.v[1][2] = m12;
        this.v[2][0] = m20;
        this.v[2][1] = m21;
        this.v[2][2] = m22;
    }

    SetFromOther(other){
        this.v[0][0] = other.v[0][0];
        this.v[0][1] = other.v[0][1];
        this.v[0][2] = other.v[0][2];
        this.v[1][0] = other.v[1][0];
        this.v[1][1] = other.v[1][1];
        this.v[1][2] = other.v[1][2];
        this.v[2][0] = other.v[2][0];
        this.v[2][1] = other.v[2][1];
        this.v[2][2] = other.v[2][2];
    }

    SetTranslate(x,y){
        this.v[0][2] = x;
        this.v[1][2] = y;
    }

    SetRotation(r){
        this.v[0][0] = Math.cos(DEGTORAD * r);
        this.v[0][1] = -Math.sin(DEGTORAD * r);
        this.v[1][0] = Math.sin(DEGTORAD * r);
        this.v[1][1] = Math.cos(DEGTORAD * r);
    }

    SetScale(x,y){
        this.v[0][0] = x;
        this.v[1][1] = y;
    }

    Multiply(other){
        var m = new Matrix4_t();
        m[0][0] = this.v[0][0] * other.v[0][0] + this.v[0][1] * other.v[1][0] + this.v[0][2] * other.v[2][0];
        m[0][1] = this.v[0][0] * other.v[0][1] + this.v[0][1] * other.v[1][1] + this.v[0][2] * other.v[2][1];
        m[0][2] = this.v[0][0] * other.v[0][2] + this.v[0][1] * other.v[1][2] + this.v[0][2] * other.v[2][2];
        
        m[1][0] = this.v[1][0] * other.v[0][0] + this.v[1][1] * other.v[1][0] + this.v[1][2] * other.v[2][0];
        m[1][1] = this.v[1][0] * other.v[0][1] + this.v[1][1] * other.v[1][1] + this.v[1][2] * other.v[2][1];
        m[1][2] = this.v[1][0] * other.v[0][2] + this.v[1][1] * other.v[1][2] + this.v[1][2] * other.v[2][2];
        
        m[2][0] = this.v[2][0] * other.v[0][0] + this.v[2][1] * other.v[1][0] + this.v[2][2] * other.v[2][0];
        m[2][1] = this.v[2][0] * other.v[0][1] + this.v[2][1] * other.v[1][1] + this.v[2][2] * other.v[2][1];
        m[2][2] = this.v[2][0] * other.v[0][2] + this.v[2][1] * other.v[1][2] + this.v[2][2] * other.v[2][2];
        
        return m;
    }

    MultiplyInPlace(other){
        var m00 = this.v[0][0] * other.v[0][0] + this.v[0][1] * other.v[1][0] + this.v[0][2] * other.v[2][0];
        var m01 = this.v[0][0] * other.v[0][1] + this.v[0][1] * other.v[1][1] + this.v[0][2] * other.v[2][1];
        var m02 = this.v[0][0] * other.v[0][2] + this.v[0][1] * other.v[1][2] + this.v[0][2] * other.v[2][2];
        
        var m10 = this.v[1][0] * other.v[0][0] + this.v[1][1] * other.v[1][0] + this.v[1][2] * other.v[2][0];
        var m11 = this.v[1][0] * other.v[0][1] + this.v[1][1] * other.v[1][1] + this.v[1][2] * other.v[2][1];
        var m12 = this.v[1][0] * other.v[0][2] + this.v[1][1] * other.v[1][2] + this.v[1][2] * other.v[2][2];
        
        var m20 = this.v[2][0] * other.v[0][0] + this.v[2][1] * other.v[1][0] + this.v[2][2] * other.v[2][0];
        var m21 = this.v[2][0] * other.v[0][1] + this.v[2][1] * other.v[1][1] + this.v[2][2] * other.v[2][1];
        var m22 = this.v[2][0] * other.v[0][2] + this.v[2][1] * other.v[1][2] + this.v[2][2] * other.v[2][2];
        
        this.Set(m00,m01,m02,m10,m11,m12,m20,m21,m22);
    }

    TransformPoint(point){
        var x = point.x * this.v[0][0] + point.y * this.v[0][1] + 1.0 * this.v[0][2];
        var y = point.x * this.v[1][0] + point.y * this.v[1][1] + 1.0 * this.v[1][2];
        var z = point.x * this.v[2][0] + point.y * this.v[2][1] + 1.0 * this.v[2][2];
        return new SAT.Vector(x, y);
    }

    TransformPointInPlace(point){
        var x = point.x * this.v[0][0] + point.y * this.v[0][1] + point.z * this.v[0][2];
        var y = point.x * this.v[1][0] + point.y * this.v[1][1] + point.z * this.v[1][2];
        var z = point.x * this.v[2][0] + point.y * this.v[2][1] + point.z * this.v[2][2];
        point.x = x;
        point.y = y;
        point.z = z;
    }
}

class Transform_t{
    constructor(x,y,r,sx=1.0,sy=1.0){
        this.position = SAT.Vector(x,y);
        this.rotation = r;
        this.scale = SAT.Vector(sx,sy);
        this.localT = new Matrix_t();
        this.globalT = new Matrix_t();
        this.dirty = TRANSFORM_DIRTY_CLEAN;
    }

    ScaleMatrix(){
        var m = new Matrix_t();
        m.SetScale(this.scale.x, this.scale.y);
        return m;
    }

    RotateMatrix(){
        var m = new Matrix_t();
        m.SetRotation(this.rotation);
        return m;
    }

    TranslateMatrix(){
        var m = new Matrix_t();
        m.SetTranslate(this.position.x, this.position.y);
        return m;
    }

    SetTranslation(x,y){
        this.position.x = x;
        this.position.y = y;
    }

    SetRotation(r){
        this.rotation = r;
    }

    SetScaling(sx, sy){
        this.scale.x = sx;
        this.scale.y = sy;
    }

    Compute(parentTransform=null){
        
        if(this.dirty == TRANSFORM_DIRTY_SRT){
            var S = this.ScaleMatrix();
            var R = this.RotateMatrix();
            var T = this.TranslateMatrix();
            this.localT.SetFromOther(S);
            this.localT.MultiplyInPlace(R);
            this.localT.MultiplyInPlace(T)
        }
        else if(this.dirty == TRANSFORM_DIRTY_SRT){
            this.scale.x = Math.sqrt(this.localT.v[0][0] * this.localT.v[0][0] + this.localT.v[0][1] * this.localT.v[0][1]);
            this.scale.y = Math.sqrt(this.localT.v[1][0] * this.localT.v[1][0] + this.localT.v[1][1] * this.localT.v[1][1]);

            this.position.x = this.localT.v[0][2];
            this.position.y = this.localT.v[1][2];
        }

        this.globalT.SetFromOther(this.localT);
        if(parentTransform != null){
            
            this.globalT.MultiplyInPlace(parentTransform.globalT);
        }

        this.dirty = TRANSFORM_DIRTY_CLEAN;
    }
}

var InterpolateTransform = function(first, second, blend){
    var T = new Transform_t();
    T.position.x = first.position.x * (1-blend) + second.position.x * blend;
    T.position.y = first.position.y * (1-blend) + second.position.y * blend;
    T.rotation = first.rotation * (1-blend) + second.rotation * blend;
    T.scale.x = first.scale.x * (1-blend) + second.scale.x * blend;
    T.scale.y = first.scale.y * (1-blend) + second.scale.y * blend;

    T.dirty = TRANSFORM_DIRTY_SRT;
    T.Compute();
    return T;
}