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
import * as Styles from '@src/feature/sandwich/components/styles/menuScreen.style';
import {
  ITabletModel,
  TTabletModelGLTFResult,
} from '@feature/sandwich/interface/tabletModel.interface';

/**
 * 테블릿 모델 인터페이스
 * @property { string } children 설명
 * @property { string } groupProps there js group  내재 props
 * @returns React.JSX.Element
 */
const TabletModel = ({ children, groupProps }: ITabletModel) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    '/mac-draco.glb'
  ) as TTabletModelGLTFResult;

  return (
    <group ref={group} {...groupProps} dispose={null}>
      <group position={[0, -0.04, 0.41]}>
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
              rotation-x={THREE.MathUtils.degToRad(-90)}
              rotation-y={THREE.MathUtils.degToRad(0)}
              rotation-z={THREE.MathUtils.degToRad(0)}
              position={[-4.3, 0, 0]}
              transform
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
