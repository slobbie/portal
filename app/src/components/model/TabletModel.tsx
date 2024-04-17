// =============================================================================
// File    :  TabletModel.tsx
// Class   :
// Purpose :  TabletModel
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import * as THREE from 'three';
import { Html, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { GLTF } from 'three-stdlib';
import * as Styles from '@components/sandWich/styles/menuScreen.style';

type TTabletModelGLTFResult = GLTF & {
  nodes: {
    ['Cube008']: THREE.Mesh;
    ['Cube008_1']: THREE.Mesh;
    ['Cube008_2']: THREE.Mesh;
  };
  materials: {
    ['matte.001']: THREE.Material;
    ['aluminium']: THREE.Material;
    ['FLOOR']: THREE.Material;
  };
};

interface ITabletModel {
  children: React.ReactNode;
  groupProps: JSX.IntrinsicElements['group'];
}

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const TabletModel = ({ children, groupProps }: ITabletModel) => {
  const group = useRef<THREE.Group>(null);
  // Load model
  const { nodes, materials } = useGLTF(
    '/mac-draco.glb'
  ) as TTabletModelGLTFResult;

  return (
    <group ref={group} {...groupProps} dispose={null}>
      <group
        // rotation-x={-0.425}
        position={[0, -0.04, 0.41]}
      >
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes['Cube008'].geometry}
          />
          <mesh
            material={materials['matte.001']}
            geometry={nodes['Cube008_1'].geometry}
          />
          <mesh geometry={nodes['Cube008_2'].geometry}>
            <Html
              className='content'
              style={{
                width: 330,
                height: 212,
                background: '#f0f0f0',
                borderRadius: 3,
                overflowY: 'auto',
                padding: 0,
              }}
              // rotation-x={-Math.PI / 2}
              // rotation-x={THREE.MathUtils.degToRad(-90)}
              rotation-x={THREE.MathUtils.degToRad(-90)}
              rotation-y={THREE.MathUtils.degToRad(0)}
              // rotation-y={THREE.MathUtils.degToRad(30)}
              rotation-z={THREE.MathUtils.degToRad(0)}
              // rotation-z={THREE.MathUtils.degToRad(10)}
              // position={[0, 0.05, -0.09]}
              // position={[-4.66, -4.1, -0.1]}
              position={[-4.3, 0, 0]}
              transform
              // occlude
            >
              <div
                css={Styles.container}
                className='wrapper'
                onPointerDown={(e) => e.stopPropagation()}
              >
                {children}
              </div>
            </Html>
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default TabletModel;
