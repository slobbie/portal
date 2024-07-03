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
import { useRef } from 'react';
import { Group, MathUtils } from 'three';
import { Html, useGLTF } from '@react-three/drei';
import * as Styles from '@src/feature/sandwich/components/styles/menuScreen.style';
import {
  ITabletModel,
  TTabletModelGLTFResult,
} from '@feature/sandwich/interface/tabletModel.interface';
import { model3DPath } from '@src/common/constants/3dModelPath.constants';

/**
 * 테블릿 모델 인터페이스
 * @property { string } children 설명
 * @property { string } groupProps there js group  내재 props
 * @returns React.JSX.Element
 */
const TabletModel = ({ children, groupProps }: ITabletModel) => {
  const group = useRef<Group>(null);

  const { nodes, materials } = useGLTF(
    model3DPath.mac
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
                width: 331,
                height: 218,
                background: '#f0f0f0',
                borderRadius: 3,
                overflowY: 'auto',
                padding: 0,
              }}
              rotation-x={MathUtils.degToRad(-90)}
              rotation-y={MathUtils.degToRad(0)}
              rotation-z={MathUtils.degToRad(0)}
              position={[-5.44, 0, 0]}
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

useGLTF.preload(model3DPath.mac);

export default TabletModel;
