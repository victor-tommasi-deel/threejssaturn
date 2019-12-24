import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  TorusGeometry,
  MeshBasicMaterial,
  Mesh,
  AxesHelper,
  SphereGeometry
} from 'three';

const addAxis = (scene) => {
  scene.add(new AxesHelper(5));
};

const createSphere = () => {
  const geometry = new SphereGeometry(4, 30, 30);
  const material = new MeshBasicMaterial({ color: 0x8d5524, wireframe: false });
  const sphere = new Mesh(geometry, material);
  return sphere;
};

const createRing = function(radius, tube, radialSegment, tubularSegment, color) {
  const geometry = new TorusGeometry(radius, tube, radialSegment, tubularSegment);
  const material = new MeshBasicMaterial({ color: color, wireframe: false });
  const ring = new Mesh(geometry, material);
  return ring;
};

const createStaturn = (sphere, rings) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0x000000);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = 20;
  camera.position.y = 2;
  sphere.rotation.z = 1.7;
  scene.add(sphere);
  rings.map((ring) => {
    ring.rotation.x = 1.7;
    ring.rotation.y = 0.5;
    scene.add(ring);
  });
  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return {
    renderer,
    scene,
    camera
  };
};

export { createStaturn, addAxis, createSphere, createRing };
