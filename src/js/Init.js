import * as THREE from "three";
import {THREEx} from "threex.domevents"
import {AmbientLight, DirectionalLight, DirectionalLightShadow, HemisphereLight, Int8Attribute,} from "three";
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export var cameraRotationInit;

export function init(){
    canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({canvas});

    //renderer = new THREE.WebGLRenderer(); /*Renderer*/
    renderer.shadowMap.enabled = true;

    renderer.setSize(window.innerWidth, window.innerHeight); /*Taille du rendu*/
    renderer.setClearColor(0xB4BCC9); //Background color

    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    //console.log(scene);
/*---------------------------------------------Creation d'un plane / sol--------------------------------------------------*/
    const planeGeometry = new THREE.PlaneGeometry(300, 300);
    const planeMaterial = new THREE.MeshStandardMaterial({color : 0xA3ABB7});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    plane.receiveShadow = true;


/*-----------------------------------------------Paramètre de la caméra---------------------------------------------*/
    camera =  new THREE.PerspectiveCamera(
        50, /*Angle de vu*/
        window.innerWidth/ window.innerHeight, /*Taille de la fenetre*/
        0.1, /*Plus proche de ce que l'on voit*/
        100 /*Plus loin de ce que l'on voit*/
    );

    

/*-----------------------------------------------Possibilité de bouger dans l'espace---------------------------------*/
    //const orbit = new OrbitControls(camera, renderer.domElement);


/*-----------------------------------------------Creation de brume---------------------------------------------------*/
    //scene.fog = new THREE.Fog(0xA3ABB7, 0, 90);

/*-----------------------------------------------Mettre les axes visibles--------------------------------------------*/
    const axesHelper = new THREE.AxesHelper(5); /*Lenght of the axe*/
    scene.add(axesHelper);

/*-----------------------------------------------Creation d'une lumière ----------------------------------------------*/
    const ambientlight = new THREE.AmbientLight(0XFFFFFF, 0.3);
    scene.add(ambientlight);

    const light = new THREE.DirectionalLight(0XFFFFFF, 1.0);
    light.position.set(30, 50, 30);
    light.target.position.set(0, 0, 0);

    //Frustum Light
    light.shadow.camera.top = 8;
    light.shadow.camera.right = 8;
    light.shadow.camera.bottom = -8;
    light.shadow.camera.left = -8;
    light.shadow.camera.near = 50;
    light.shadow.camera.far = 70;

    scene.add(light);
    scene.add(light.target);

    light.castShadow = true;

    const dLightHelper = new THREE.DirectionalLightHelper(light, 5);
    scene.add(dLightHelper);

    const dLightShadowHelper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(dLightShadowHelper);

/*------------------------------------------------Position de la camera + Update--------------------------------------*/
    camera.position.set(10, 7, -7); /*X, Y, Z*/
    camera.lookAt(0 , -2, 1);
    cameraRotationInit = camera.rotation;
    
    //orbit.update();
};

export function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

};
