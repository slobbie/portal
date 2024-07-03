// =============================================================================
// File    :  TableModel.tsx
// Class   :
// Purpose :  TableModel
// Date    :  2024.07
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { isOrderState } from '@feature/sandwich/atom/sandWich.atom';
import { animated, useSpring } from '@react-spring/three';
import { Gltf } from '@react-three/drei';
import { model3DPath } from '@src/common/constants/3dModelPath.constants';
import { IModelPosition } from '@feature/sandwich/interface/modelPosition.interface';

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const TableModel = () => {
  const isOrder = useRecoilValue(isOrderState);

  const { x, y, z, scale } = useSpring<IModelPosition>({
    x: isOrder ? -0.1 : 0,
    y: isOrder ? -3.2 : 0,
    z: isOrder ? -0.96 : 0,
    scale: isOrder ? 0.052 : 0,
    config: {
      mass: 1,
      tension: isOrder ? 120 : 0,
      friction: isOrder ? 16 : 0,
    },
  });

  return (
    <Suspense>
      <ambientLight intensity={1} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color='white'
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[0, 5, -4]} intensity={4} />
      <animated.group
        scale={scale}
        position-x={x}
        position-y={y}
        position-z={z}
      >
        <Gltf src={model3DPath.table} />
      </animated.group>
    </Suspense>
  );
};

export default TableModel;
