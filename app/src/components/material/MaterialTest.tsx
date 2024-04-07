// =============================================================================
// File    :  MaterialTest.tsx
// Class   :
// Purpose :  MaterialTest
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import {
  MeshWobbleMaterial,
  // useTexture,
} from '@react-three/drei';
import { useControls } from 'leva';

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const MaterialTest = () => {
  const {
    roughness,
    metalness,
    clearcoat,
    clearcoatRoughness,
    transmission,
    thickness,
    ior,
  } = useControls({
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 },
    transmission: { value: 0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 0, max: 2.333, step: 0.01 },
  });
  return (
    <>
      <mesh scale={0.3} position={[0, 1, -2]}>
        <axesHelper args={[5]} />
        <torusKnotGeometry />
        <meshPhysicalMaterial
          transparent={true}
          depthTest={true}
          opacity={1}
          depthWrite={true}
          visible={true}
          metalness={metalness}
          roughness={roughness}
          color='0xffffff'
          emissive={0x00000}
          clearcoat={clearcoat}
          clearcoatRoughness={clearcoatRoughness}
          transmission={transmission}
          thickness={thickness}
          ior={ior}
        />
      </mesh>
      <mesh scale={0.5} position={[0, 1, -1]}>
        <torusGeometry />
        <MeshWobbleMaterial factor={1} speed={1} />
      </mesh>
      {/* <mesh scale={0.3} position={[0, 1, -1]}>
        <axesHelper args={[5]} />
        <torusKnotGeometry />
        <meshMatcapMaterial matcap={matcap} />
      </mesh> */}
      {/* <mesh scale={0.3} position={[0, 1, 0]}>
        <axesHelper args={[5]} />
        <torusKnotGeometry />
        <meshStandardMaterial wireframe={true} color='tomato' />
      </mesh>

      <mesh scale={0.3} position={[0, 1, 1]}>
        <axesHelper args={[5]} />
        <torusKnotGeometry />
        <meshLambertMaterial color='tomato' />
      </mesh>

      <mesh scale={0.3} position={[0, 1, 2]}>
        <axesHelper args={[5]} />
        <torusKnotGeometry />
        <meshNormalMaterial />
      </mesh>

      <mesh scale={0.3} position={[0, 1, 3]}>
        <axesHelper args={[5]} />
        <torusKnotGeometry />
        <meshPhysicalMaterial color='blue' roughness={0} thickness={1} />
      </mesh>

      <mesh scale={0.3} position={[0, 1, 4]}>
        <axesHelper args={[5]} />
        <torusKnotGeometry />
        <meshPhysicalMaterial color='blue' roughness={0.5} thickness={1} />
      </mesh> */}
    </>
  );
};

export default MaterialTest;
