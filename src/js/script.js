import * as THREE from "three";
import {THREEx} from "threex.domevents"
import {AmbientLight, DirectionalLight, DirectionalLightShadow, HemisphereLight, Int8Attribute,} from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {animate, init} from './Init.js';
import loaderApp from './Loader_Appartement.js';
import loaderPerso01 from './Loader_Perso_01.js'
import loaderPerso02 from './Loader_Perso_02.js'
import onclick from './onclick_Perso_01.js';
import onclick from './onclick_Perso_02.js';


//Variable d'initialisation
var scene, camera;

init();

loaderApp();
loaderPerso01();
loaderPerso02();

animate();