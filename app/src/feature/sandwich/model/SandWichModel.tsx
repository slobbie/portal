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

import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import SandWichIngredient from '@src/feature/sandwich/model/SandWichIngredient';
import {
  isOrderState,
  sandWichState,
} from '@src/feature/sandwich/atom/sandWich.atom';
import { useRoute } from 'wouter';
import { SpringValue, a, useSpring } from '@react-spring/three';
import {
  IGroupAnimation,
  TVectorPosition,
} from '@feature/sandwich/interface/modelPosition.interface';

/**
 * 샌드 위치 3d 모델
 * @returns React.JSX.Element
 */
const SandWichModel = () => {
  const isOrder = useRecoilValue(isOrderState);
  /** 재료 사이 공백 */
  const spacing = useMemo(() => {
    return isOrder ? 0.05 : 0.2;
  }, [isOrder]);
  // 샌드위치 재료
  const ingredients = useRecoilValue(sandWichState);

  /** 현재 주소 경로  */
  const [isParam] = useRoute('/portal/01');

  /** 주문 완료시 position */
  const completeOrderPosition = useMemo(() => {
    return isOrder ? [-0.1, 0, 0] : [-0.1, 0.6, 0];
  }, [isOrder]);

  /** 주문 완료시 position */
  const completeOrderRotation = useMemo(() => {
    return isOrder ? [0.3, 0.35, 0] : [0.5, -0.35, 0];
  }, [isOrder]);

  /** 포지션과 로테이션 상수 */
  const { position, rotation } = useSpring<IGroupAnimation>({
    position: isParam ? completeOrderPosition : [-0.3, -0.26, -0.4],
    rotation: isParam ? completeOrderRotation : [0.4, -0.5, 0.1],
    config: { tension: 170, friction: 26 },
  });

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
  }, [ingredients, isOrder]);

  return (
    <a.group
      position={position as SpringValue<TVectorPosition>}
      rotation={rotation}
    >
      {renderSandWichIngredient}
    </a.group>
  );
};

export default SandWichModel;
