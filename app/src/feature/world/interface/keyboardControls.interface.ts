// =============================================================================
// File    : keyboardControls.interface.ts
// Class   :
// Purpose : keyboardControls.interface.ts 인터페이스
// Date    : 2024.06
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

const keyControls = {
  forward: 'forward',
  back: 'backward',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

/** 키보드 입력 타입 */
export type keyControls = (typeof keyControls)[keyof typeof keyControls];
