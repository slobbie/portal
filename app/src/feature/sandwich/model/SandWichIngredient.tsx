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
import useSandWichModel from '@src/feature/sandwich/hooks/useSandWichModel';
import { ISandWichIngredient } from '@src/feature/sandwich/interface/sandWich.interface';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { sandWichIngredients } from '@feature/sandwich/constants/sandWichModel.constants';
import { model3DPath } from '@src/common/constants/3dModelPath.constants';
import { useRoute } from 'wouter';
import { useRecoilValue } from 'recoil';
import { isOrderState } from '@feature/sandwich/atom/sandWich.atom';

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
  const isOrder = useRecoilValue(isOrderState);
  /** 샌드위치 모델 컨트롤러 */
  const sandWichController = useSandWichModel();
  /** 현재 선택된 모델 이름 */
  const [param] = useRoute('/portal/01');
  /** 재료 크기 상수 */
  const ingredientScale = 3;
  /** 재료 y 크기 */
  const ingredientScaleY = 5;
  // const ingredientScaleY = 5;

  const [hovered, setHovered] = useState(false);

  /** 재료 모델 y 포지션 */
  const modelYPosition = useMemo(() => {
    return ingredientScaleY + (ingredient.name === 'bread' ? 5 : 0);
  }, [ingredient.name]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [hovered]);

  return (
    <group position-y={positionsY} position={[0, 0, -0.3]}>
      {showPrice && !isOrder && param && (
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
              font={model3DPath.font.poppins}
              scale={0.1}
              bevelSegments={3}
              bevelEnabled
              bevelThickness={0.001}
              position-x={0.42}
            >
              ${sandWichIngredients[ingredient.name].price.toFixed(2)}
            </Text3D>
            <Text3D
              font={model3DPath.font.poppins}
              scale={0.1}
              bevelSegments={3}
              bevelEnabled
              bevelThickness={0.001}
              position-x={0.82}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
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
