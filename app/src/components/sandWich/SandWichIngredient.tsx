// =============================================================================
// File    :  Ingredient.tsx
// Class   :
// Purpose :  Ingredient
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { Gltf, Text3D } from '@react-three/drei';
import { currentModelName } from '@src/atom/model.atom';
import { sandWichIngredients } from '@src/constants/sandWich.constants';
import useSandWichModel from '@src/hooks/useSandWichModel';
import { ISandWichIngredient } from '@src/interface/sandWich.interface';
import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

/**
 * 샌드위치 재료 컴포넌트
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const SandWichIngredient = ({
  ingredient,
  showPrice,
  ...props
}: ISandWichIngredient) => {
  const sandWichController = useSandWichModel();
  const currentModelNm = useRecoilValue(currentModelName);
  const scale = 3;
  const scale_y = 5;
  return (
    <group {...props} position={[0, 0, -0.3]}>
      {showPrice && currentModelNm === '01' && (
        <Suspense>
          <group
            position-y={-0.25}
            onClick={(e) => {
              e.stopPropagation();
              sandWichController.removeSandIngredient(ingredient);
            }}
          >
            <mesh position-x={0.7} position-y={0.042}>
              <planeGeometry args={[0, 9, 0.16]} />
              <meshStandardMaterial color='#fff' opacity={0.42} transparent />
            </mesh>
            <Text3D
              font={'/Poppins_Bold.json'}
              scale={0.1}
              bevelSegments={3}
              bevelEnabled
              bevelThickness={0.001}
              position-x={0.42}
            >
              ${sandWichIngredients[ingredient.name].price.toFixed(2)}
            </Text3D>
            <Text3D
              font={'/Poppins_Bold.json'}
              scale={0.1}
              bevelSegments={3}
              bevelEnabled
              bevelThickness={0.001}
              position-x={0.82}
            >
              X
              <meshBasicMaterial color='red' />
            </Text3D>
          </group>
        </Suspense>
      )}
      <Gltf
        src={sandWichIngredients[ingredient.name].src}
        scale={scale}
        scale-y={scale_y + (ingredient.name === 'bread' ? 5 : 0)}
        position-y={-0.2}
      />
    </group>
  );
};

export default SandWichIngredient;
