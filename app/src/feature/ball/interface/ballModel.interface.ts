// =============================================================================
// File    : ballModel.interface.ts
// Class   :
// Purpose : ballModel.interface.ts 인터페이스
// Date    : 2024.06
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import * as THREE from 'three';

/** 볼 모델 컴포넌트 인터페이스  */
export interface IBallModel {
  scale: number;
  vec?: THREE.Vector3;
  r?: typeof THREE.MathUtils.randFloatSpread;
}
