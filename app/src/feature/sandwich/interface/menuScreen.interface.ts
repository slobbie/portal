// =============================================================================
// File    : menuScreen.interface.ts
// Class   :
// Purpose : menuScreen.interface.ts 인터페이스
// Date    : 2024.06
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

/** 메뉴 스크린 컴포넌트 인터페이스 */
export interface IMenuScreen {
  addMenuCallback: (name: string, pPrice: number) => void;
}
