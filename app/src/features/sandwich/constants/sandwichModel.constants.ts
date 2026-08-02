import { ISandwichIngredientsObj } from '@features/sandwich/interface/sandwich.interface';
import { model3DPath } from '@shared/constants/3dModelPath.constants';
import { useGLTF } from '@react-three/drei';

const modelPath = model3DPath.sandwich;
/**
 * 샌드 위치 재료 경로 배열
 */
export const sandwichIngredients: ISandwichIngredientsObj = {
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
    src: modelPath.egg,
    price: 1,
    icon: '🍳',
  },
  shrimp: {
    src: modelPath.shrimp,
    price: 3,
    icon: '🍤',
  },
};

// 재료 추가 시 Suspense 로 인한 깜빡임 방지를 위해 모델 전체 프리로드
Object.values(sandwichIngredients).forEach((ingredient) => {
  useGLTF.preload(ingredient.src);
});
