import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//scene==container
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(5, 1, 3, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xffd700 });
//mesh=geo+material
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0x000000)
pointLight.position.set(5, 5, 5)
const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);


const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);

}
Array(200).fill().forEach(addStar);


const spaceTexture = new THREE.TextureLoader().load('download.jpg');
scene.background = spaceTexture;


//moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moonNormalMap = new THREE.TextureLoader().load('moon_nm.jpg');

const moon = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormalMap
}));
moon.position.z = 30;
moon.position.setX(-10);
scene.add(moon);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    jeff.rotation.y += 0.01;
    jeff.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;

}
document.body.onscroll = moveCamera;


function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;


    controls.update();

    renderer.render(scene, camera);
}

animate();