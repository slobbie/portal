// =============================================================================
// File    : sandWich.interface.ts
// Class   :
// Purpose : sandWich.interface.ts 인터페이스
// Date    : 2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

/**
 * 샌드위치 재료 배열 인터페이스
 */
export interface ISandWichIngredients {
  src: string;
  price: number;
  icon: string;
}

/**
 * 샌드 위치 재료 인터페이스
 */
export interface IIngredient {
  id: string;
  name: string;
  price?: number;
}

/**
 * 샌드위치 재료 컴포넌트 인터페이스
 */
export interface ISandWichIngredient {
  ingredient: IIngredient;
  showPrice: boolean;
  positionsY: number;
}

/** 샌드위치 모델 인터페이스 */
export interface ISandWichIngredientsObj {
  [key: string]: ISandWichIngredients;
  bread: ISandWichIngredients;
  lettuce: ISandWichIngredients;
  mushroom: ISandWichIngredients;
  tomato: ISandWichIngredients;
  cheese: ISandWichIngredients;
  chicken: ISandWichIngredients;
  sausage: ISandWichIngredients;
  salami: ISandWichIngredients;
  bacon: ISandWichIngredients;
  patty: ISandWichIngredients;
  ketchup: ISandWichIngredients;
}
