const editor = document.getElementById('editor');
const viewer = document.getElementById('viewer');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(viewer.clientWidth, viewer.clientHeight);
viewer.appendChild(renderer.domElement);

const loader = new URDFLoader();
let robot;

editor.addEventListener('input', () => {
  const urdfContent = editor.value;
  if (robot) scene.remove(robot);
  try {
    robot = loader.parse(urdfContent);
    scene.add(robot);
  } catch (error) {
    console.error('Error parsing URDF:', error);
  }
});

camera.position.z = 5;
const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();
