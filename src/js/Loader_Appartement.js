import * as THREE from "three";
import {THREEx} from "threex.domevents"
import {AmbientLight, DirectionalLight, DirectionalLightShadow, HemisphereLight, Int8Attribute,} from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function loaderApp(){
const assetLoader = new GLTFLoader();

/*-----------------------------------------------Importer un element 3D---------------------------------------------*/
const THREEURL = new URL('../assets/Appartement.glb', import.meta.url); //Import le fichier 3D de l'appartement

//*-----------------------------------------------Importation du model de l'appart-----------------------------------------*/
assetLoader.load(THREEURL.href, function(gltf) {
    const model = gltf.scene;
    //console.log(gltf);
    scene.add(model);
    model.position.set(0, 0, 0);

    //Shadow on all objects----------------------------------------------------
    gltf.scene.traverse( function( node ) {
        if ( node.isMesh ) { 
            node.castShadow = true;
        }} );

}, undefined, function(error) {
    console.error(error);
});

};