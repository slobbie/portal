// =============================================================================
// File    : sandWich.atom.ts
// Class   :
// Purpose : sandWich.atom.ts
// Date    : 2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { atom } from 'recoil';

export const sandWichState = atom({
  key: 'sandWichState',
  default: [
    {
      id: 0,
      name: 'bread',
    },
    {
      id: 1,
      name: 'lettuce',
    },
    {
      id: 2,
      name: 'bacon',
    },
    {
      id: 3,
      name: 'bread',
    },
  ],
});

/** 샌드위치 가격 합산 상태 */
export const sandWichTotalPrice = atom({
  key: 'sandWichTotalPrice',
  default: 0,
});
