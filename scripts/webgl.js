
let vertexShader = ` 
  void main() {
    gl_Position = vec4( position, 1.0 );
  }
`

let fragmentShader = `
  uniform vec2 u_resolution;
  uniform float u_time;
  float ratio;

  float circle(vec2 center, float radius, float thickness) {
    vec2 delta = vec2(gl_FragCoord.x / u_resolution.x, (gl_FragCoord.y / u_resolution.y) * ratio)  - center;
    float l = length(delta);
    if( radius - thickness <= l && l <= radius + thickness )return 1.0;
    return 0.0;
  }

  void main() {
    ratio = u_resolution.y / u_resolution.x;
    float c = circle(vec2(0.5, 0.5), 0.333, 0.01);
    vec3 color = vec3(1.0, c, c);
    gl_FragColor=vec4(color, 1.0);
  }
`
var container;
var camera, scene, renderer;
var uniforms;

function glInit() {
    container = document.getElementById( 'content' );

    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

    uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() },
        u_mouse: { type: "v2", value: new THREE.Vector2() }
    };

    var material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    } );

    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    container.appendChild( renderer.domElement );

    onWindowResize();
    window.addEventListener( 'resize', onWindowResize, false );

    document.onmousemove = function(e){
      uniforms.u_mouse.value.x = e.pageX
      uniforms.u_mouse.value.y = e.pageY
    }
}

function onWindowResize( event ) {
    var parent = document.getElementById('content');
    renderer.setSize( parent.offsetWidth, parent.offsetHeight );
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
    console.log("WIDTH : "+uniforms.u_resolution.value.x);
    console.log("HEIGHT : "+uniforms.u_resolution.value.y);
}

function glAnimate() {
    requestAnimationFrame( glAnimate );
    glRender();
}

function glRender() {
    uniforms.u_time.value += 0.05;
    renderer.render( scene, camera );
}