// =============================================================================
// File    : shoeModel.interface.ts
// Class   :
// Purpose : shoeModel.interface.ts 인터페이스
// Date    : 2024.06
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import { GLTF } from 'three-stdlib';
import { Mesh, Material } from 'three';

/** 신발 모델 인터페이스 */
export type shoeModelGLTFResult = GLTF & {
  nodes: {
    ['shoe']: Mesh;
    ['shoe_1']: Mesh;
    ['shoe_2']: Mesh;
    ['shoe_3']: Mesh;
    ['shoe_4']: Mesh;
    ['shoe_5']: Mesh;
    ['shoe_6']: Mesh;
    ['shoe_7']: Mesh;
  };
  materials: {
    ['laces']: Material;
    ['mesh']: Material;
    ['caps']: Material;
    ['inner']: Material;
    ['sole']: Material;
    ['stripes']: Material;
    ['band']: Material;
    ['patch']: Material;
  };
};
