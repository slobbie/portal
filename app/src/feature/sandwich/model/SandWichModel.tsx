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
import { useMemo } from 'react';
import { useRoute } from 'wouter';

/**
 * 샌드 위치 3d 모델
 * @returns React.JSX.Element
 */
const SandWichModel = () => {
  const spacing = 0.2;
  // 샌드위치 재료
  const ingredients = useRecoilValue(sandWichState);

  /** 현재 주소 경로  */
  const [isParam] = useRoute('/portal/01');

  /** 포지션 상수 */
  const position = useMemo(() => {
    return isParam ? new Vector3(-0.3, 0, 0) : new Vector3(-0.3, -0.26, -0.4);
  }, [isParam]);

  /** 로테이션 상수  */
  const rotation = useMemo(() => {
    return isParam ? new Euler(0.19, -0.35, 0) : new Euler(0.4, -0.5, 0.1);
  }, [isParam]);

  // 샌드위치 재료 랜더링
  const renderSandWichIngredient = useMemo(() => {
    return ingredients.map((item, index) => {
      /** index 가 0 보다 크고, index가 재료의 총 길이 index보다 작아야하며, 길이가 4 이상이여야함  */
      const isShowPrice =
        index > 0 && index < ingredients.length - 1 && ingredients.length !== 4;
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
