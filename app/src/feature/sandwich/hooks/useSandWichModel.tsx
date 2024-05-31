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

import {
  sandWichState,
  sandWichTotalPrice,
} from '@src/feature/sandwich/atom/sandWich.atom';
import { IIngredient } from '@src/feature/sandwich/interface/sandWich.interface';
import { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

/**
 * 샌드위치 모델 제어 hook
 * @returns addSandWichIngredient
 * @returns removeSandIngredient
 * @returns resetSandWichModel
 */
const useSandWichModel = () => {
  const [sandWich, setSandWich] = useRecoilState(sandWichState);
  const setSandWichPrice = useSetRecoilState(sandWichTotalPrice);

  /**
   * 샌드위치 재료 추가 함수
   * @param ingredient
   */
  const addSandWichIngredient = (newIngredient: string, pPrice: number) => {
    if (sandWich.length < 10) {
      // 샌드 위치 총 가격 추가
      setSandWichPrice((prevPrice) => {
        return prevPrice + pPrice;
      });
      // 새로운 샌드위치 요소 추가 작업
      setSandWich((prevSandWich) => {
        const insertIndex = prevSandWich.length - 1;
        const newSandWich = [...prevSandWich];
        newSandWich.splice(insertIndex, 0, {
          id: uuidv4(),
          name: newIngredient,
        });
        return newSandWich;
      });
    }
  };

  /**
   * 샌드위치 재료 항목 제거 함수
   * @param ingredient
   */
  const removeSandIngredient = (ingredient: IIngredient, pPrice: number) => {
    if (sandWich.length > 4) {
      setSandWichPrice((prev) => {
        if (prev - pPrice < 0) {
          return 0;
        }
        return prev - pPrice;
      });
      setSandWich((prevItem) => {
        const newSandWich = [...prevItem];

        const removeIngredient = newSandWich.filter((item) => {
          if (item.name === 'bread') {
            return item;
          } else {
            return item.id !== ingredient.id;
          }
        });

        return removeIngredient;
      });
    }
  };

  /** 샌드위치 모델 초기화 함수  */
  const resetSandWichModel = useCallback(() => {
    setSandWich(() => {
      return [
        {
          id: uuidv4(),
          name: 'bread',
        },
        {
          id: uuidv4(),
          name: 'lettuce',
        },
        {
          id: uuidv4(),
          name: 'bacon',
        },
        {
          id: uuidv4(),
          name: 'bread',
        },
      ];
    });
  }, [setSandWich]);

  return {
    addSandWichIngredient,
    removeSandIngredient,
    resetSandWichModel,
  };
};

export default useSandWichModel;
