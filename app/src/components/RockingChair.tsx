// =============================================================================
// File    :  RockingChairModel.tsx
// Class   :
// Purpose :  RockingChairModel
// Date    :  2024.03
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type TRockingChairModelGLTFResult = GLTF & {
  nodes: {
    ['Kolton_Rocking_Chair_FABRIC_0']: THREE.Mesh;
    ['Kolton_Rocking_Chair_WOOD_0']: THREE.Mesh;
    ['Plane001_FLOOR_0']: THREE.Mesh;
  };
  materials: {
    ['FABRIC']: THREE.Material;
    ['WOOD']: THREE.Material;
    ['FLOOR']: THREE.Material;
  };
};

/**
 * RockingChairModel 3d 모델
 * @param JSX.IntrinsicElements ['group']
 * @returns EmotionJSX.Element
 */
const RockingChairModel = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF(
    '/rockingChair.gltf'
  ) as TRockingChairModelGLTFResult;

  return (
    <group {...props} dispose={null} position={[0, -0.3, -0.4]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Kolton_Rocking_Chair_FABRIC_0.geometry}
              material={materials.FABRIC}
            >
              <meshPhysicalMaterial color='green' />
            </mesh>
            <mesh
              geometry={nodes.Kolton_Rocking_Chair_WOOD_0.geometry}
              material={materials.WOOD}
            />
          </group>
          <mesh
            geometry={nodes.Plane001_FLOOR_0.geometry}
            material={materials.FLOOR}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/rockingChair.gltf');

export default RockingChairModel;
