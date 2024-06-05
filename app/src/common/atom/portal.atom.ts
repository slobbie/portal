// =============================================================================
// File    : portal.atom.ts
// Class   :
// Purpose : portal.atom.ts
// Date    : 2024.04
// Author  : JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import { atom } from 'recoil';

/** 포탈 여부 상태 */
export const isPortal = atom({
  key: 'isPortal',
  default: false,
});
