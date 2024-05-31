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
import { v4 as uuidv4 } from 'uuid';

export const sandWichState = atom({
  key: 'sandWichState',
  default: [
    {
      id: uuidv4(),
      name: 'bread',
    },
    {
      id: uuidv4(),
      name: 'lettuce',
    },
    {
      id: uuidv4(),
      name: 'bacon',
    },
    {
      id: uuidv4(),
      name: 'bread',
    },
  ],
});

/** 샌드위치 가격 합산 상태 */
export const sandWichTotalPrice = atom({
  key: 'sandWichTotalPrice',
  default: 4,
});
