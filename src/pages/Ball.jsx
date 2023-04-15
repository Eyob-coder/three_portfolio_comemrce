import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

function Ball() {
  const canvasRef = useRef();

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Sphere setup
    const geometry = new THREE.SphereGeometry(3 ,64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: "#00ff83",
      roughness: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Light setup
    const light = new THREE.PointLight(0Xffffff, 1, 100);
    light.position.set(30, 10, 10);
    light.intensity = 1.25;
    scene.add(light);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 20;
    scene.add(camera);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(2);

    // Orbit controls setup
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

    // Resize listener setup
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
    });

    // Animation loop setup
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    // Timeline animation setup
    const tl = gsap.timeline({ defaults: { duration: 1} });
    tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1});
    tl.fromTo('nav', {y: '-100%'}, {y: '0%'});
    tl.fromTo(".title", {opacity: 0}, {opacity: 1});

    // Mouse animation color setup
    let mouseDown = false;
    let rgb = [];

    window.addEventListener('mousedown', () => (mouseDown = true));
    window.addEventListener('mouseup', () => (mouseDown = false));

    window.addEventListener('mousemove', (e) => {
      if (mouseDown){
        rgb = [
          Math.round((e.pageX / sizes.width) * 255)
        ];
      }
    });
  }, []);

  return <canvas ref={canvasRef} className="webgl" />;
}

export default Ball;
