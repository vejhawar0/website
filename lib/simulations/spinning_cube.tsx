import * as THREE from 'three';


export async function Cube() {

// 1. Create the Scene
const scene = new THREE.Scene();

// 2. Setup the Camera (Field of View, Aspect Ratio, Near, Far)
const camera = new THREE.PerspectiveCamera(75, 75, 0.1, 1000);
camera.position.z = 5;

// 3. Setup the Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Add a Cube (Geometry + Material = Mesh)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5. Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for some action
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

}
