// =============================================================================
// File    : tabletModel.interface.ts
// Class   :
// Purpose : tabletModel.interface.ts 인터페이스
// Date    : 2024.06
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import { Mesh, Material } from 'three';
import { GLTF } from 'three-stdlib';

/** 테블릿 모델 3d 인터페이스 */
export type TTabletModelGLTFResult = GLTF & {
  nodes: {
    ['Cube008']: Mesh;
    ['Cube008_1']: Mesh;
    ['Cube008_2']: Mesh;
  };
  materials: {
    ['matte.001']: Material;
    ['aluminium']: Material;
    ['FLOOR']: Material;
  };
};

/** 테블릿 모델 컴포넌트 인터페이스 */
export interface ITabletModel {
  children: React.ReactNode;
  groupProps: JSX.IntrinsicElements['group'];
}
