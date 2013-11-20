

function createLine(x1,y1,z1,x2,y2,z2,color){
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(x1,y1,z1));
  geometry.vertices.push(new THREE.Vector3(x2,y2,z2));
  return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: color }))
}

function addGrid(scene, size, color){
  for (var i=0;i<size;i++){
    scene.add(createLine(i,0,0,i,100,0,color));
    scene.add(createLine(0,i,0,100,i,0,color));
  }
}

function createCell(i,j,k,color){
  var geometry = new THREE.CubeGeometry( 1, 1, 1 );
  //var material = new THREE.MeshLambertMaterial( { color: color } );
  var material = new THREE.LineBasicMaterial( { color: color } );
  var mesh = new THREE.Mesh( geometry, material );
  mesh.translateX(i)
  mesh.translateY(j)
  mesh.translateZ(k)
  return mesh;
}

function createCamera(){
  var camera = new THREE.PerspectiveCamera(
    35,             // Field of view
    800 / 600,      // Aspect ratio
    0.1,            // Near plane
    10000           // Far plane
  );
  camera.position.set( 90, -80, 60 );
  camera.up.set( 0, 0, 1 );
  camera.lookAt( new THREE.Vector3(25,50,0) );
  return camera;
}

var CAMERA,RENDERER,SCENE
function createScene(){
  RENDERER = new THREE.WebGLRenderer();
  RENDERER.setSize( 1200, 800 );
  document.getElementById("container").appendChild( RENDERER.domElement );
  CAMERA = createCamera()
  
  SCENE = new THREE.Scene();
  
  var light = new THREE.PointLight( 0xFFFF00 );
  light.position.set( 90, -80, 100);
  SCENE.add( light );

  // axis
  SCENE.add(createLine(0, 0, 0, 1000, 0, 0, 0xff0000));
  SCENE.add(createLine(0, 0, 0, 0, 1000, 0, 0x00ff00));
  SCENE.add(createLine(0, 0, 0, 0, 0, 1000, 0x0000ff));
  
  addGrid(SCENE, 100, 0xCCCCCC)
}

function render(){
  RENDERER.render( SCENE, CAMERA )
}

function randomColor() {
  return getColorFromHue(Math.random())
}

function getColorFromHue(hue){
    var c = new THREE.Color();
    c.setHSL(hue,1,.45)
    return c
}