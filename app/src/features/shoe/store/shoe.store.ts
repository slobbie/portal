import { create } from 'zustand';

/** 신발 모델 파츠 컬러 인터페이스 */
export interface IShoeModelColorState {
  [key: string]: string;
  laces: string;
  mesh: string;
  caps: string;
  inner: string;
  sole: string;
  stripes: string;
  band: string;
  patch: string;
}

interface ShoeState {
  /** 파츠별 컬러 */
  colors: IShoeModelColorState;
  /** 현재 선택된 파츠 이름 */
  currentParts: string;
  /** 특정 파츠 컬러 변경 */
  setPartColor: (part: string, color: string) => void;
  /** 현재 파츠 이름 설정 */
  setCurrentParts: (name: string) => void;
}

export const useShoeStore = create<ShoeState>((set) => ({
  colors: {
    laces: '#fff',
    mesh: '#fff',
    caps: '#fff',
    inner: '#fff',
    sole: '#fff',
    stripes: '#fff',
    band: '#fff',
    patch: '#fff',
  },
  currentParts: '',
  setPartColor: (part, color) =>
    set((state) => ({ colors: { ...state.colors, [part]: color } })),
  setCurrentParts: (name) => set({ currentParts: name }),
}));
