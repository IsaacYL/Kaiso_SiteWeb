import * as THREE from "three";
import {AmbientLight, DirectionalLight, DirectionalLightShadow, HemisphereLight,} from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const AppartementURL = new URL('../assets/Appartement.glb', import.meta.url); //Import le fichier 3D de l'appartement
const Perso01URL = new URL('../assets/Perso_01.glb', import.meta.url); // Import le fichier 3D du perso 01
const Perso02URL = new URL('../assets/Perso_02.glb', import.meta.url); // Import le fichier 3D du perso 02

const renderer = new THREE.WebGLRenderer(); /*Renderer*/

renderer.shadowMap.enabled = true; //Active les ombres

renderer.setSize(window.innerWidth, window.innerHeight); /*Taille du rendu*/

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();


/*Intersect*/
var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100;
var raycaster;

/*-----------------------------------------------Paramètre de la caméra---------------------------------------------*/
const camera =  new THREE.PerspectiveCamera(
    75, /*Angle de vu*/
    window.innerWidth/ window.innerHeight, /*Taille de la fenetre*/
    0.1, /*Plus proche de ce que l'on voit*/
    1000 /*Plus loin de ce que l'on voit*/
);

/*-----------------------------------------------Possibilité de bouger dans l'espace---------------------------------*/
const orbit = new OrbitControls(camera, renderer.domElement);


/*-----------------------------------------------Creation de brume---------------------------------------------------*/
scene.fog = new THREE.Fog(0xFFFFFF, 0, 70);

/*-----------------------------------------------Mettre les axes visibles--------------------------------------------*/
const axesHelper = new THREE.AxesHelper(5); /*Lenght of the axe*/
scene.add(axesHelper);

/*-----------------------------------------------Creation d'une lumière ----------------------------------------------*/
const ambientlight = new THREE.AmbientLight(0XFFFFFF, 0.3);
scene.add(ambientlight);

const light = new THREE.DirectionalLight(0XFFFFFF, 1.0);
light.position.set(-30, 50, 0);
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
//dLightHelper.position.x = 500;

const dLightHelper = new THREE.DirectionalLightHelper(light, 5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(light.shadow.camera);
scene.add(dLightShadowHelper);
//dLightShadowHelper.parent.updateMatrixWorld();
//dLightShadowHelper.update();

/*------------------------------------------------Position de la camera + Update--------------------------------------*/
camera.position.set(-10, 2, 5); /*X, Y, Z*/

orbit.update();

/*---------------------------------------------Creation d'un bloc------------------------------------------------------*/
/*const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({color : 0xEBBD14});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 3, -2);
scene.add(box);
box.castShadow = true;*/

/*---------------------------------------------Creation d'un plane------------------------------------------------------*/
const planeGeometry = new THREE.PlaneGeometry(300, 300);
const planeMaterial = new THREE.MeshStandardMaterial({color : 0xFFFFFF});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);
plane.receiveShadow = true;



/*-----------------------------------------------Importation du model de l'appart-----------------------------------------*/
const assetLoader = new GLTFLoader();
assetLoader.load(AppartementURL.href, function(gltf) {
    const modelAppartement = gltf.scene;
    scene.add(modelAppartement);
    modelAppartement.position.set(0, 0, 0);

/*--------------------------------------------------------Animation de l'appartement---------------------------------------*/
    mixerAppartement = new THREE.AnimationMixer(modelAppartement);
    const clips = gltf.animations;

    /*----------------------------------Action canapé--------------------------------------*/
    //const clip = THREE.AnimationClip.findByName(clips, 'CanapeAction');
    //const action = Appartementmixer.clipAction(clip);
    //action.play();
    /*
    const steevehaut = THREE.animation.includes"haut"

    clips.forEach({
        const allAction = mixerSteeve.clipAction(clip);
        allAction.play();
    })
    */

    //Play all animations------------------------------------------------------
    clips.forEach(function(clip){
        const allAction = mixerAppartement.clipAction(clip);
        allAction.setLoop(THREE.LoopOnce);
        allAction.play(); 
    });


    //Shadow on all objects----------------------------------------------------
    gltf.scene.traverse( function( node ) {
        if ( node.isMesh ) { 
            node.castShadow = true;
        }} );

}, undefined, function(error) {
    console.error(error);
});

let mixerAppartement;


/*-----------------------------------------------Importation du model du perso 01-----------------------------------------*/
const assetLoaderPerso01 = new GLTFLoader();
assetLoaderPerso01.load(Perso01URL.href, function(gltfPerso01) {
    const modelPerso01 = gltfPerso01.scene;
    scene.add(modelPerso01);
    modelPerso01.position.set(0, 0, 0);

/*--------------------------------------------------------Animation du perso 01-------------------------------------------*/
    mixerPerso01 = new THREE.AnimationMixer(modelPerso01);
    const clipsPerso01 = gltfPerso01.animations;

    //Play all animations------------------------------------------------------
    clipsPerso01.forEach(function(clipPerso01){
        const allAction = mixerPerso01.clipAction(clipPerso01);
        allAction.setLoop(THREE.LoopOnce);
        allAction.play(); 
    });


    //Shadow on all objects----------------------------------------------------
    gltfPerso01.scene.traverse( function( node ) {
        if ( node.isMesh ) { 
            node.castShadow = true;
        }} );

}, undefined, function(error) {
    console.error(error);
});

let mixerPerso01;


/*--------------------------------------------------Faire une clock----------------------------------------------------*/
const clock = new THREE.Clock();


/*-------------------------------Creation d'une loop pour refresh la cam chaque frame-----------------------------------*/
/*function onClick() {
                
    if (intersects[0].object.name == 'Scene') {

        mixerPerso01 = new THREE.AnimationMixer( modelPerso01 );
        actionPerso01 = mixerPerso01.clipAction( gltfPerso01.animations[ 1 ] );
        actionPerso01.play();
        

};
};*/



function loop(time) {
    
        if(mixerAppartement){
            mixerAppartement.update(clock.getDelta()); //Update l'animation
            //mixerPerso01.update(clock.getDelta());
        renderer.render(scene, camera);
        };
    };

/*-----------------------------------------------Render de la loop------------------------------------------------------*/
//renderer.domElement.addEventListener('click', onClick, false);
renderer.setClearColor(0xA3A3A3); //Background colo
renderer.setAnimationLoop(loop);



/*raycaster = new THREE.Raycaster();
document.addEventListener( 'mousedown', onDocumentMouseDown, false ); 

function onDocumentMouseDown( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }



  function render() 
  {
    // find intersections
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {
      if ( INTERSECTED != intersects[ 0 ].object ) {
        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        INTERSECTED = intersects[ 0 ].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex( 0xff0000 );
         console.log(intersects.length);
      }
    } else {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = null;
    }
    renderer.render( scene, camera );
    renderer.setAnimationLoop(loop);

  }*/