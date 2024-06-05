// =============================================================================
// File    :  SandWichModel.tsx
// Class   :
// Purpose :  SandWichModel
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import { Vector3, Euler } from 'three';
import { useRecoilValue } from 'recoil';
import SandWichIngredient from '@src/feature/sandwich/components/SandWichIngredient';
import { sandWichState } from '@src/feature/sandwich/atom/sandWich.atom';
import { currentModelName } from '@src/common/atom/model.atom';
import { useMemo } from 'react';

/**
 * 샌드 위치 3d 모델
 * @returns React.JSX.Element
 */
const SandWichModel = () => {
  const spacing = 0.2;
  // 샌드위치 재료
  const ingredients = useRecoilValue(sandWichState);
  // 현재 선택된 모델이름
  const currentModelNm = useRecoilValue(currentModelName);
  /** 현재 선택된 모델 여부 */
  const isCurrentModel = currentModelNm === '01';

  /** 포지션 상수 */
  const position = useMemo(() => {
    return isCurrentModel
      ? new Vector3(-0.3, 0, 0)
      : new Vector3(-0.3, -0.26, -0.4);
  }, [isCurrentModel]);

  /** 로테이션 상수  */
  const rotation = useMemo(() => {
    return isCurrentModel
      ? new Euler(0.19, -0.35, 0)
      : new Euler(0.4, -0.5, 0.1);
  }, [isCurrentModel]);

  // 샌드위치 재료 랜더링
  const renderSandWichIngredient = useMemo(() => {
    return ingredients.map((item, index) => {
      const isShowPrice = index > 0 && index < ingredients.length - 1;
      return (
        <SandWichIngredient
          key={item.id}
          ingredient={item}
          showPrice={isShowPrice}
          positionsY={index * spacing}
        />
      );
    });
  }, [ingredients]);

  return (
    <group position={position} rotation={rotation}>
      {renderSandWichIngredient}
    </group>
  );
};

export default SandWichModel;
