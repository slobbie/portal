// =============================================================================
// File    : shoeModel.atom.ts
// Class   :
// Purpose : shoeModel.atom.ts
// Date    : 2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { RecoilState, atom } from 'recoil';

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

/**
 * 3d 신발 모델 컬러 상태
 */
export const shoeModelColorState: RecoilState<IShoeModelColorState> = atom({
  key: 'shoeModelColorState',
  default: {
    laces: '#fff',
    mesh: '#fff',
    caps: '#fff',
    inner: '#fff',
    sole: '#fff',
    stripes: '#fff',
    band: '#fff',
    patch: '#fff',
  },
});

/**
 * 3d 신발 모델 선택된 모델 이름
 */
export const shoeCurrentPartsName = atom({
  key: 'shoeCurrentPartsName',
  default: '',
});
