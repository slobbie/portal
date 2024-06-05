// =============================================================================
// File    : model.atom.ts
// Class   :
// Purpose : model.atom.ts
// Date    : 2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { atom } from 'recoil';

/** 현재 선택 된 모델 이름 */
export const currentModelName = atom({
  key: 'currentModelName',
  default: '',
});

/** 현재 선택 된 모델 이름 */
export const isCharacterMove = atom({
  key: 'isCharacterMove',
  default: false,
});
