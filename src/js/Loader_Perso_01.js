import * as THREE from "three";
import {THREEx} from "threex.domevents"
import {AmbientLight, DirectionalLight, DirectionalLightShadow, HemisphereLight, Int8Attribute,} from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export let clips;
export let allAction;
export var mixer;
export let model;


export default function loaderPerso01(){
const assetLoader = new GLTFLoader();

/*-----------------------------------------------Importer un element 3D---------------------------------------------*/
const THREEURL = new URL('../assets/Perso_01.glb', import.meta.url); //Import le fichier 3D de l'appartement

//*-----------------------------------------------Importation du model de l'appart-----------------------------------------*/
assetLoader.load(THREEURL.href, function(gltf) {
    model = gltf.scene;
    //console.log(gltf);
    scene.add(model);
    model.position.set(0, 0, 0);

/*--------------------------------------------------------Animation de l'appartement---------------------------------------*/
    mixer = new THREE.AnimationMixer(model);
    clips = gltf.animations;

    //Shadow on all objects----------------------------------------------------
    gltf.scene.traverse( function( node ) {
        if ( node.isMesh ) { 
            node.castShadow = true;
        }} );

}, undefined, function(error) {
    console.error(error);
});
};