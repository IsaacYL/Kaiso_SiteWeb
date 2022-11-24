import * as THREE from "three";
import {
    THREEx
} from "threex.domevents"
import gsap from "gsap";
import {
    AmbientLight,
    DirectionalLight,
    DirectionalLightShadow,
    HemisphereLight,
    Int8Attribute,
    Vector3
} from "three";
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {
    clips,
    mixer,
    model,
    cameraRotationInit
} from './Loader_Perso_01.js'

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

//Varible d'animation
let clock = new THREE.Clock();
let allAction;

let cameraRotationDiff;

export default function onClick(event) {

    event.preventDefault();

    mouse.x = (event.offsetX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.offsetY / window.innerHeight) * 2 + 1;
    console.log("X : ", mouse.x);
    console.log("Y : ", mouse.y);

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    const Perso = intersects.find(intersect => intersect.object.name.toLowerCase() === "куб");
    console.dir(intersects);

    let haut, bas;
    let start, previousTimeStamp;
    let done = false;
    let arrayLength = 0;

    if (Perso) {
        camera.zoom = 1;
        /*------------Animation du haut-----------------*/
        haut = clips.filter(function (clip) {
            return clip.name.includes("Haut");
        });

        haut.forEach(function (clip) {
            mixer.clipAction(clip).reset();
            mixer.clipAction(clip).clampWhenFinished = true;
            mixer.clipAction(clip).loop = THREE.LoopOnce;
            return mixer.clipAction(clip).play();
        });

        mixer.addEventListener('finished', function (e) {
            arrayLength += 1;
            if (arrayLength >= haut.length) {
                console.log("Les animations du haut sont finies");

                /*------------Animation du bas-----------------*/
                bas = clips.filter(function (clip) {
                    return clip.name.includes("tourne");
                });

                bas.forEach(function (clip) {
                    return mixer.clipAction(clip).play();
                });
            };
        });

        //Affiche la croix
        document.querySelector('#test').style.visibility = 'visible';

    } else {
        console.error("no clickable object");
    };



    /*--------------------------------Fonction qui ecoule le temps------------------------------------*/
    function step(timestamp) {
        if (start === undefined) {
            start = timestamp;

            /*let pos1 = new THREE.Vector3();

            Perso.object.localToWorld(pos1);
            camera.lookAt(pos1);*/
            const cameraRotationPerso = camera.rotation;
            cameraRotationDiff = cameraRotationInit - cameraRotationPerso;

            //camera.lookAt(0, -2, 3);
        };

        const elapsed = timestamp - start;

        if (previousTimeStamp !== timestamp) {
            const count = Math.min(0.1 * elapsed);
            if (Perso) {
                if (mixer) mixer.update(clock.getDelta());
                if (!done) {
                    window.requestAnimationFrame(step);
                    let pos = new THREE.Vector3();
                    
                    let finAnimation = 3900;
                    let passeSousLeSol = 2200;
                    if (elapsed < 300) {
                        camera.rotation = cameraRotationInit + (cameraRotationDiff * easeInQuart(elapsed / 300));
                    } if(elapsed > 300 && elapsed < finAnimation) {
                        Perso.object.localToWorld(pos);
                        camera.lookAt(pos);
                    }

                    if (elapsed > passeSousLeSol && elapsed < finAnimation - 700) {
                        camera.position.y -= 0.1;
                    }
                    if(elapsed > 3000 && elapsed < finAnimation - 500){
                        camera.zoom += 0.16;
                        camera.updateProjectionMatrix();
                    }
                } else {
                    done = true;
                };
            };
        };
    };

    /*--------------------------------Bouton CSS back------------------------------------*/
    document.querySelector('#test').addEventListener('click', function (event) {
        clips.forEach(function (clip) {
            mixer.stopAllAction();
            camera.zoom = 1;
            camera.updateProjectionMatrix();
        });
        count === time;

        //Cache la croix
        document.querySelector('#test').style.visibility = 'hidden';
        camera.position.set(7, 4, -7); /*X, Y, Z*/
        camera.lookAt(0, -2, 3);
        camera.zoom = 1;
    });


    window.requestAnimationFrame(step);
};

window.addEventListener('click', onClick, false);


function easeInQuart(x) {
    return x * x * x * x;
}