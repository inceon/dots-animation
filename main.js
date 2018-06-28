let scene = new THREE.Scene();

let renderer = new THREE.WebGLRenderer( { alpha: true });
renderer.setClearColor( 0x000000, 0 );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 6000);
camera.position.z = 1500;

let controls = new THREE.OrbitControls( camera );

let texture = (new THREE.TextureLoader).load("img/particle.png");
let material = new THREE.PointCloudMaterial({
  size: 25,
  vertexColors: THREE.VertexColors,
  map: texture,
  transparent: true,
  alphaTest: 0.11
});

let geometry = new THREE.Geometry();

for (let i = 0; i < imgCoords.length; i++) {
  geometry.vertices.push(new THREE.Vector3(imgCoords[i].x, imgCoords[i].y, Math.random()*70));
  let randColor = Math.random();
  geometry.colors.push(new THREE.Color(randColor, randColor + 0.4, randColor + 0.8));
}

let pointCloud = new THREE.PointCloud( geometry, material ); 
scene.add( pointCloud );

function updatePoints(points) {
  console.log(points)
  geometry.vertices.forEach( function(particle, index){
    TweenMax.to(particle, (intervalTime / 1000) - 0.3, {
      x: points[index].x,
      y: points[index].y
    });
  })
}


(function raf() {
  window.requestAnimationFrame(raf);
  time++;

  geometry.vertices.forEach((particle, index) => {
    var dX, dY, dZ;
    dX = Math.cos(Math.sqrt(time) + index/2)/10;
    dY = Math.sin(time/11 + index/2)/10;
    dZ = Math.sin(time/7 + index/2)/3;
    particle.add(new THREE.Vector3(dX, dY, dZ));
  });
  geometry.verticesNeedUpdate = true;

  renderer.render(scene, camera);
})(time = 0);