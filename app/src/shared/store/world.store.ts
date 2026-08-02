import { create } from 'zustand';

/**
 * 월드 전역 상태
 * - isCharacterMove: KeyInfo 버튼이 키보드 상태를 직접 변경할 때 Floor 리렌더 트리거용
 * - isPortal: 포탈 진입 여부
 */
interface WorldState {
  isCharacterMove: boolean;
  isPortal: boolean;
  /** 마우스 호버 중인 포탈 id (없으면 null) — 상호작용 미리보기용 */
  hoveredPortalId: string | null;
  toggleCharacterMove: () => void;
  setPortal: (value: boolean) => void;
  setHoveredPortal: (id: string | null) => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  isCharacterMove: false,
  isPortal: false,
  hoveredPortalId: null,
  toggleCharacterMove: () =>
    set((state) => ({ isCharacterMove: !state.isCharacterMove })),
  setPortal: (value) => set({ isPortal: value }),
  setHoveredPortal: (id) => set({ hoveredPortalId: id }),
}));
