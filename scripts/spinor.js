class Spinor_t{
    constructor(real=0.0, complex=0.0){
        this.real = real;
        this.complex = complex;
    }

    FromAngle(angle){
        var spinor = newSpinor();
        spinor.real = Math.cos(angle);
        spinor.complex = Math.sin(angle);
        return spinor;
    }

    FromValue(value){
        var spinor = newSpinor();
        spinor.real = Math.cos(value);
        spinor.complex = Math.sin(value);
        return spinor;
    }

    Scale(s){
        var spinor = new Spinor(this.real, this.complex);
        spinor.real *= s;
        spinor.complex *= s;
        return spinor;
    }

    ScaleInPlace(s){
        this.real *= s;
        this.complex *= s;
        return this;
    }

    Add(other){
        var spinor = new Spinor(this.real, this.complex);
        spinor.real += other.x;
        spinor.complex += other.y;
        return spinor;
    }

    AddInPlace(other){
        this.real += other.x;
        this.complex += other.y;
        return this;
    }

    Sub(other){
        var spinor = new Spinor(this.real, this.complex);
        spinor.real -= other.x;
        spinor.complex -= other.y;
        return spinor;
    }

    SubInPlace(other){
        this.real -= other.x;
        this.complex -= other.y;
        return this;
    }

    Invert(){
        var invert = new Spinor_t(this.real, -this.complex);
        return invert.ScaleInPlace(invert.GetLengthSquared());
    }
    
    InvertInPlace(){
        this.complex *= - 1.0;
        return this.ScaleInPlace(this.GetLengthSquared());
    }

    Length(){
        return Math.sqrt(this.real * this.real + this.complex * this.complex);
    }

    LengthSquared(){
        return (this.real * this.real + this.complex * this.complex);
    }

    Multiply(other){
        var copy = new Spinor_t(this.real, this.complex);
        copy.real = this.real * other.real - this.complex;
        copy.complex = this.real * other.complex + this.complex * other.real;
        return copy
    }

    MultiplyInPlace(other){
        var tmpReal = this.real * other.real - this.complex;
        var tmpComplex= this.real * other.complex + this.complex * other.real;
        this.real = tmpReal;
        this.complex = tmpComplex;
        return this;
    }

    Normalize(){
        var l = this.Length();
        return new Spinor_t(this.real / l, this.complex / l);
    }

    NormalizeInPlace(){
        var l = this.Length();
        this.real /= l;
        this.complex /= l;
        return this;
    }

    Angle(){
        return Math.atan2(this.complex, this.real) * 2.0;
    }

    LinearInterpolate(destination, t){
        var interpolated = new Spinor_t;
        this.Scale(interpolated, 1-t);
        var second = this.Scale(destination, t);
        interpolated.AddInPlace(second);
        return interpolated.NormalizeInPlace();
    }
}
/*
Method GetAdd:Spinor(other:Spinor)
Return Spinor.Create(real + other.real, complex + other.complex)
End Method

Method GetLength:Float()
Return Sqr(real * real + complex * complex)
End Method

Method GetLengthSquared:Float()
Return (real * real + complex * complex)
End Method

Method GetMultiply:Spinor(other:Spinor)
Return Spinor.Create(real * other.real – complex * other.complex, real * other.complex + complex * other.real)
End Method

Method GetNormalized:Spinor()
Local length:Float = GetLength()
Return Spinor.Create(real / length, complex / length)
End Method

Method GetAngle:Float()
Return ATan2(complex, real) * 2
End Method

Function Lerp:Spinor(startVal:Spinor, endVal:Spinor, t:Float)
Return startVal.GetScale(1 – t).GetAdd(endVal.GetScale(t)).GetNormalized()
End Function

Function Slerp:Spinor(from:Spinor, dest:Spinor, t:Float)
Local tr:Float
Local tc:Float
Local omega:Float, cosom:Float, sinom:Float, scale0:Float, scale1:Float

‘calc cosine
cosom = from.real * dest.real + from.complex * dest.complex

‘adjust signs
If (cosom < 0) Then cosom = -cosom tc = -dest.complex tr = -dest.real Else tc = dest.complex tr = dest.real End If ' coefficients If (1 - cosom) > 0.001 Then ‘threshold, use linear interp if too close
omega = ACos(cosom)
sinom = Sin(omega)
scale0 = Sin((1 – t) * omega) / sinom
scale1 = Sin(t * omega) / sinom
Else
scale0 = 1 – t
scale1 = t
End If

‘ calc final
Local res:Spinor = Spinor.Create(0, 0)
res.complex = scale0 * from.complex + scale1 * tc
res.real = scale0 * from.real + scale1 * tr
Return res
End Function

End Type
[/blitzmax2]
*/