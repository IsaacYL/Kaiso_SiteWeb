import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

var gltfPlayer, model, allAction;

const assetLoader = new GLTFLoader();
let mixer;

/*-----------------------------------------------Importer un element 3D---------------------------------------------*/
const URL = new URL('../assets/Appartement.glb', import.meta.url); //Import le fichier 3D de l'appartement

assetLoader.load(URL.href, function(gltf) {
    const model = gltf.scene;
    gltfPlayer = gltf;
    scene.add(model);
    model.position.set(0, 0, 0);

/*--------------------------------------------------------Animation-------------------------------------------------*/
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;


    //Play all animations------------------------------------------------------
    clips.forEach(function(clip){
        allAction = mixer.clipAction(clip);
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

function onClick( event ){

    event.preventDefault();

    mouse.x = ( event.offsetX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.offsetY / window.innerHeight ) * 2 + 1;
    console.log("X : ", mouse.x);
    console.log("Y : ", mouse.y);

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects(scene.children);

    const tableBasse = intersects.find(intersect => intersect.object.name.toLowerCase() == "table_basse");

    if(tableBasse){
        console.dir(tableBasse);
        mixer = new THREE.AnimationMixer(model);

        //Play all animations------------------------------------------------------
        clips.forEach(function(clip){
            allAction = mixer.clipAction(clip);
            allAction.setLoop(THREE.LoopOnce);
            allAction.play(); 
        });
    }
}