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
import { sandWichIngredients } from '@src/feature/sandwich/constants/sandWich.constants';
import useSandWichModel from '@src/feature/sandwich/hooks/useSandWichModel';
import { ISandWichIngredient } from '@src/feature/sandwich/interface/sandWich.interface';
import { Suspense, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

/**
 * 샌드위치 재료 컴포넌트
 * @property { ISandWichIngredient } ingredient 샌드위치 재료 객체
 * @property { boolean } showPrice 가격 표시 여부
 * @property { number } positionsY 추가 하는 재료 position y 값
 * @returns React.JSX.Element
 */
const SandWichIngredient = ({
  ingredient,
  showPrice,
  positionsY,
}: ISandWichIngredient) => {
  const sandWichController = useSandWichModel();
  const currentModelNm = useRecoilValue(currentModelName);

  /** 재료 크기 상수 */
  const ingredientScale = 3;
  /** 재료 y 위치 */
  const ingredientScaleY = 5;

  /** 재료 모델 y 포지션 */
  const modelYPosition = useMemo(() => {
    return ingredientScaleY + (ingredient.name === 'bread' ? 5 : 0);
  }, [ingredient.name]);

  return (
    <group position-y={positionsY} position={[0, 0, -0.3]}>
      {showPrice && currentModelNm === '01' && (
        <Suspense>
          <group
            position-y={-0.25}
            onClick={(e) => {
              e.stopPropagation();
              sandWichController.removeSandIngredient(
                ingredient,
                sandWichIngredients[ingredient.name].price
              );
            }}
          >
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
      <Suspense>
        <Gltf
          src={sandWichIngredients[ingredient.name].src}
          scale={ingredientScale}
          scale-y={modelYPosition}
          position-y={-0.2}
        />
      </Suspense>
    </group>
  );
};

export default SandWichIngredient;
