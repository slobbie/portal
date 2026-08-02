import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from '@features/sandwich/interface/sandwich.interface';
import { create } from 'zustand';

/** 샌드위치 초기 재료 구성 */
const createInitialSandwich = (): IIngredient[] => [
  { id: uuidv4(), name: 'bread' },
  { id: uuidv4(), name: 'lettuce' },
  { id: uuidv4(), name: 'bacon' },
  { id: uuidv4(), name: 'bread' },
];

interface SandwichState {
  /** 재료 배열 */
  sandwich: IIngredient[];
  /** 총 가격 */
  totalPrice: number;
  /** 주문 완료 여부 */
  isOrder: boolean;
  setIsOrder: (value: boolean) => void;
  /** 재료 추가 (최대 9개) */
  addIngredient: (name: string, price: number) => void;
  /** 재료 제거 (최소 4개, bread 는 유지) */
  removeIngredient: (ingredient: IIngredient, price: number) => void;
  /** 초기 상태로 리셋 */
  reset: () => void;
}

export const useSandwichStore = create<SandwichState>((set) => ({
  sandwich: createInitialSandwich(),
  totalPrice: 4,
  isOrder: false,
  setIsOrder: (value) => set({ isOrder: value }),
  addIngredient: (name, price) =>
    set((state) => {
      if (state.sandwich.length >= 9) {
        return state;
      }
      const insertIndex = state.sandwich.length - 1;
      const next = [...state.sandwich];
      next.splice(insertIndex, 0, { id: uuidv4(), name });
      return { sandwich: next, totalPrice: state.totalPrice + price };
    }),
  removeIngredient: (ingredient, price) =>
    set((state) => {
      if (state.sandwich.length <= 4) {
        return state;
      }
      const next = state.sandwich.filter((item) =>
        item.name === 'bread' ? true : item.id !== ingredient.id
      );
      return {
        sandwich: next,
        totalPrice: Math.max(0, state.totalPrice - price),
      };
    }),
  reset: () =>
    set({
      sandwich: createInitialSandwich(),
      totalPrice: 4,
      isOrder: false,
    }),
}));
