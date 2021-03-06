var CAMERA,RENDERER,SCENE
var WIDTH = 900, HEIGTH = 600

function createScene(){
  RENDERER = new THREE.WebGLRenderer();
  RENDERER.setSize( WIDTH, HEIGTH );
  document.getElementById("container").appendChild( RENDERER.domElement );
  CAMERA = createCamera()
  
  SCENE = new THREE.Scene();
  
  //var light = new THREE.PointLight( 0xFFFF00 );
  //light.position.set( 90, -80, 100);
  //light.intensity=3
  //SCENE.add( light );

  // axis
  SCENE.add(createLine(0, 0, 0, 1000, 0, 0, 0xff0000));
  SCENE.add(createLine(0, 0, 0, 0, 1000, 0, 0x00ff00));
  SCENE.add(createLine(0, 0, 0, 0, 0, 1000, 0x0000ff));
  
  addGrid(SCENE, 100, 0xCCCCCC)
}

function createCamera(){
  var camera = new THREE.PerspectiveCamera(
    35,             // Field of view
    WIDTH / HEIGTH,      // Aspect ratio
    0.1,            // Near plane
    10000           // Far plane
  );
  camera.position.set( WORLD.X, -WORLD.Y*2, WORLD.Y*2 );
  camera.up.set( 0, 0, 1 );
  camera.lookAt( new THREE.Vector3(WORLD.X/2,WORLD.Y/2,-WORLD.Y/4) );
  return camera;
}

function render(world){
  var threeObjs = []
  for (var i in world.species){
    var s = world.species[i]
    for (var j in s.creatures){
      var c = s.creatures[j]
      for (var k in c.cells){
        var cell = c.cells[k]
        var threeObj = createCube(cell.x, cell.y, cell.z, s.color)
        threeObjs.push( threeObj )
        SCENE.add( threeObj )
      }
    }
  }

  RENDERER.render( SCENE, CAMERA )

  for (var i in threeObjs){
    SCENE.remove( threeObjs[i] )
  }
}

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

// save memory
var MaterialCache = {}
function getCachedMaterial(color){
  var key = color.getHexString();
  if (!(key in MaterialCache)){
    // MaterialCache[key] = new THREE.MeshLambertMaterial( { color: color } );
    // var mat = new THREE.LineBasicMaterial( { color: color } );
    var mat = new THREE.MeshBasicMaterial( { color: color } );
    // mat.needsUpdate = true
    MaterialCache[key] = mat
  }
  return MaterialCache[key]
}

function createCube(i,j,k,color){
  LOGGER.debug("creating cube at "+i+","+j+","+k+" - "+color)
  var geometry = new THREE.CubeGeometry( 1, 1, 1 );

  // http://www.aerotwist.com/tutorials/getting-started-with-three-js/
  //geometry.dynamic = true;
  //geometry.verticesNeedUpdate = true;
  //geometry.normalsNeedUpdate = true;
  //geometry.uvsNeedUpdate = true;

  var mesh = new THREE.Mesh( geometry, getCachedMaterial(color) );
  mesh.translateX(i)
  mesh.translateY(j)
  mesh.translateZ(k)
  return mesh;
}

function randomColor() {
  return getColorFromHue(Math.random())
}

function getColorFromHue(hue){
    var c = new THREE.Color();
    c.setHSL(hue,1,.45)
    return c
}
