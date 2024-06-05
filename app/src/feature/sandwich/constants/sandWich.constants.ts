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

/**
 * 샌드 위치 재료 배열
 */
export const sandWichIngredients: ISandWichIngredientsObj = {
  bread: {
    src: '/sandWichModel/Bread_Slice_Bread_0.glb',
    price: 0.5,
    icon: '🍞',
  },
  lettuce: {
    src: '/sandWichModel/Lettuce_Slice_Lettuce_0.glb',
    price: 0.5,
    icon: '🥬',
  },
  mushroom: {
    src: '/sandWichModel/Mushroom_Slice_Mushroom_0.glb',
    price: 1,
    icon: '🍄',
  },
  tomato: {
    src: '/sandWichModel/Tomato_Slice_Tomato_0.glb',
    price: 0.5,
    icon: '🍅',
  },
  cheese: {
    src: '/sandWichModel/Cheese_Slice_Cheese_0.glb',
    price: 1,
    icon: '🧀',
  },
  chicken: {
    src: '/sandWichModel/Chicken_Slice_Chicken_0.glb',
    price: 2,
    icon: '🍗',
  },
  sausage: {
    src: '/sandWichModel/Sausage_Slice_Sausage_0.glb',
    price: 1.5,
    icon: '🌭',
  },
  salami: {
    src: '/sandWichModel/Salami_Slice_Salami_0.glb',
    price: 1.5,
    icon: '🍖',
  },
  bacon: {
    src: '/sandWichModel/Bacon_Slice_Bacon_0.glb',
    price: 1.5,
    icon: '🥓',
  },
  patty: {
    src: '/sandWichModel/Patty_Slice_Patty_0.glb',
    price: 2,
    icon: '🥩',
  },
  ketchup: {
    src: '/sandWichModel/Ketchup_Slice_Ketchup_0.glb',
    price: 2,
    icon: '🥫',
  },
};
