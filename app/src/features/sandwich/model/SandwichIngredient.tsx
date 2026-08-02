import { useSandwichStore } from '@features/sandwich/store/sandwich.store';
import { ISandwichIngredient } from '@features/sandwich/interface/sandwich.interface';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { sandwichIngredients } from '@features/sandwich/constants/sandwichModel.constants';
import { model3DPath } from '@shared/constants/3dModelPath.constants';
import { useMatchPortal } from '@shared/hooks/usePortalRoute';
import { PORTAL_ID } from '@shared/constants/portal.constants';
import { Gltf, Text3D } from '@react-three/drei';

/**
 * 샌드위치 재료 컴포넌트
 * @property { ISandwichIngredient } ingredient 샌드위치 재료 객체
 * @property { boolean } showPrice 가격 표시 여부
 * @property { number } positionsY 추가 하는 재료 position y 값
 * @returns React.JSX.Element
 */
const SandwichIngredient = ({
  ingredient,
  showPrice,
  positionsY,
}: ISandwichIngredient) => {
  const isOrder = useSandwichStore((state) => state.isOrder);
  /** 샌드위치 재료 제거 액션 */
  const removeIngredient = useSandwichStore((state) => state.removeIngredient);
  /** 현재 선택된 모델 이름 */
  const param = useMatchPortal(PORTAL_ID.sandwich);
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
    <group position={[0, positionsY, -0.3]}>
      {showPrice && !isOrder && param && (
        <Suspense>
          <group
            position-y={-0.25}
            onClick={(e) => {
              e.stopPropagation();
              removeIngredient(
                ingredient,
                sandwichIngredients[ingredient.name].price
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
              ${sandwichIngredients[ingredient.name].price.toFixed(2)}
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
          src={sandwichIngredients[ingredient.name].src}
          scale={[ingredientScale, modelYPosition, ingredientScale]}
          position-y={-0.2}
        />
      </Suspense>
    </group>
  );
};

export default SandwichIngredient;
