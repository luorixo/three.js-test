import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
let model;

const loader = new GLTFLoader();
// const controls = new THREE.OrbitControls(camera, renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

loader.load( './retro_pc/scene.gltf', function (gltf) {
    model = gltf.scene;
    scene.add(model);

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    controls.target.copy(center);

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scenes; // Array<THREE.Scene>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
}, undefined, function ( error ) {
	console.error( error );
});

const light = new THREE.AmbientLight( 0x666666 ); // soft white light
scene.add(light);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 12 );
scene.add(directionalLight);

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
    
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    model.rotation.y += 0.005;
    controls.update();
	renderer.render( scene, camera );
}

if (WebGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate();
} else {
    const warning = WEBGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}