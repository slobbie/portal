// =============================================================================
// File    :  useSandWichModel.tsx
// Class   :
// Purpose :  useSandWichModel
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { sandWichState, sandWichTotalPrice } from '@src/atom/sandWich.atom';
import { IIngredient } from '@src/interface/sandWich.interface';
import { useSetRecoilState } from 'recoil';

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const useSandWichModel = () => {
  // const total = 5;
  const setSandWich = useSetRecoilState(sandWichState);
  const setSandWichPrice = useSetRecoilState(sandWichTotalPrice);

  /**
   * 샌드위치 재료 추가 함수
   * @param ingredient
   */
  const addSandWichIngredient = (newIngredient: string, pPrice: number) => {
    setSandWichPrice((prev) => {
      return prev + pPrice;
    });
    setSandWich((sandWich) => {
      // 새로운 재료를 추가할 위치를 정의합니다. (현재는 두 번째 빵 사이에 추가합니다.)
      const insertIndex = sandWich.length - 1;

      // 현재 샌드위치 상태를 복제하여 새로운 배열을 생성합니다.
      const newSandWich = [...sandWich];

      // 샌드위치에 새로운 재료를 추가합니다.
      newSandWich.splice(insertIndex, 0, {
        id: sandWich.length, // 새로운 재료의 ID는 현재 샌드위치 배열의 길이로 설정합니다.
        name: newIngredient,
      });

      // 변경된 샌드위치 배열을 반환합니다.
      return newSandWich;
    });
  };

  /**
   * 샌드위치 재료 항목 제거 함수
   * @param ingredient
   */
  const removeSandIngredient = (ingredient: IIngredient, pPrice: number) => {
    setSandWichPrice((prev) => {
      if (prev - pPrice < 0) {
        return 0;
      }
      return prev - pPrice;
    });
    setSandWich((prevItem) => {
      const newSandWich = [...prevItem];

      const removeIngredient = newSandWich.filter((item) => {
        return item.id !== ingredient.id;
      });

      return removeIngredient;
    });
  };

  /** 샌드위치 모델 초기화 함수  */
  const resetSandWichModel = () => {
    setSandWich(() => {
      return [
        {
          id: 0,
          name: 'bread',
        },
        {
          id: 1,
          name: 'lettuce',
        },
        {
          id: 2,
          name: 'bacon',
        },
        {
          id: 3,
          name: 'bread',
        },
      ];
    });
  };

  return {
    addSandWichIngredient,
    removeSandIngredient,
    resetSandWichModel,
  };
};

export default useSandWichModel;
