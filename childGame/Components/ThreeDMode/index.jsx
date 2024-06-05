// import React, { useEffect, useRef } from 'react';
// import { View, Text } from 'react-native';
// import { GLView } from 'expo-gl';
// import * as THREE from 'three';
// import { Renderer } from 'expo-three';
// import { Asset } from 'expo-asset';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// const ThreeDModel = ({ modelPath }) => {
//   const glViewRef = useRef(null);

//   useEffect(() => {
//     const initThree = async () => {
//       try {
//         const asset = Asset.fromModule(modelPath);
//         await asset.downloadAsync();
//         const uri = asset.localUri || asset.uri;

//         if (glViewRef.current) {
//           const width = glViewRef.current.width;
//           const height = glViewRef.current.height;

//           const renderer = new Renderer({ gl: glViewRef.current.getContext('webgl') });
//           renderer.setSize(width, height);

//           const scene = new THREE.Scene();

//           const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//           camera.position.z = 5;

//           const light = new THREE.AmbientLight(0x404040);
//           scene.add(light);

//           const pointLight = new THREE.PointLight(0xffffff, 1, 100);
//           pointLight.position.set(10, 10, 10);
//           scene.add(pointLight);

//           const objLoader = new OBJLoader();
//           objLoader.load(
//             uri,
//             (object) => {
//               scene.add(object);
//             },
//             (xhr) => {
//               console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
//             },
//             (error) => {
//               console.error('An error happened', error);
//             }
//           );

//           const animate = () => {
//             requestAnimationFrame(animate);
//             scene.traverse((child) => {
//               if (child instanceof THREE.Mesh) {
//                 child.rotation.x += 0.01;
//                 child.rotation.y += 0.01;
//               }
//             });
//             renderer.render(scene, camera);
//             glViewRef.current.endFrameEXP();
//           };

//           animate();
//         }
//       } catch (error) {
//         console.error('Error initializing Three.js', error);
//       }
//     };

//     initThree();
//   }, [modelPath]);

//   return (
//     <GLView
//       style={{ flex: 1 }}
//       onContextCreate={gl => {
//         glViewRef.current = gl;
//       }}
//     />
//   );
// };

// export default ThreeDModel;
