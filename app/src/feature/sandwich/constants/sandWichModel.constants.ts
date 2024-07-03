// =============================================================================
// File    : sandWich.constants.ts
// Class   :
// Purpose : sandWich.constants.ts
// Date    : 2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { ISandWichIngredientsObj } from '@feature/sandwich/interface/sandWich.interface';
import { model3DPath } from '@src/common/constants/3dModelPath.constants';

const modelPath = model3DPath.sandwich;
/**
 * 샌드 위치 재료 경로 배열
 */
export const sandWichIngredients: ISandWichIngredientsObj = {
  bread: {
    src: modelPath.bread,
    price: 0.5,
    icon: '🍞',
  },
  lettuce: {
    src: modelPath.lettuce,
    price: 0.5,
    icon: '🥬',
  },
  tomato: {
    src: modelPath.tomato,
    price: 0.5,
    icon: '🍅',
  },
  cheese: {
    src: modelPath.cheese,
    price: 1,
    icon: '🧀',
  },
  chicken: {
    src: modelPath.chicken,
    price: 2,
    icon: '🍗',
  },
  sausage: {
    src: modelPath.sausage,
    price: 1.5,
    icon: '🌭',
  },
  bacon: {
    src: modelPath.bacon,
    price: 1.5,
    icon: '🥓',
  },
  patty: {
    src: modelPath.patty,
    price: 2,
    icon: '🥩',
  },
  ketchup: {
    src: modelPath.ketchup,
    price: 2,
    icon: '🥫',
  },
  egg: {
    src: modelPath.ketchup,
    price: 1,
    icon: '🍳',
  },
  shrimp: {
    src: modelPath.ketchup,
    price: 3,
    icon: '🍤',
  },
};
