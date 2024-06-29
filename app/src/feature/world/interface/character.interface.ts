// =============================================================================
// File    : character.interface.ts
// Class   :
// Purpose : character.interface.ts 인터페이스
// Date    : 2024.06
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import { Mesh, SkinnedMesh, Material } from 'three';
import { GLTF } from 'three-stdlib';

/** 캐릭터 모델 타입 */
export type TCharacterGLTFResult = GLTF & {
  nodes: {
    ['mixamorig6Hips']: Mesh;
    ['Ch09']: SkinnedMesh;
  };
  materials: {
    ['Ch09_body']: Material;
  };
};

/** 캐릭터 모델 컴포넌트 인터페이스 */
export interface ICharacter {
  groupProps?: JSX.IntrinsicElements['group'];
}
