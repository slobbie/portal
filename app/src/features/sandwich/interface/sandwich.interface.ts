/**
 * 샌드위치 재료 배열 인터페이스
 */
export interface ISandwichIngredients {
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
export interface ISandwichIngredient {
  ingredient: IIngredient;
  showPrice: boolean;
  positionsY: number;
}

/** 샌드위치 모델 인터페이스 */
export interface ISandwichIngredientsObj {
  [key: string]: ISandwichIngredients;
  bread: ISandwichIngredients;
  lettuce: ISandwichIngredients;
  tomato: ISandwichIngredients;
  cheese: ISandwichIngredients;
  chicken: ISandwichIngredients;
  sausage: ISandwichIngredients;
  bacon: ISandwichIngredients;
  patty: ISandwichIngredients;
  ketchup: ISandwichIngredients;
  egg: ISandwichIngredients;
}
