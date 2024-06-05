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
import * as THREE from 'three';

/** 신발 모델 인터페이스 */
export type shoeModelGLTFResult = GLTF & {
  nodes: {
    ['shoe']: THREE.Mesh;
    ['shoe_1']: THREE.Mesh;
    ['shoe_2']: THREE.Mesh;
    ['shoe_3']: THREE.Mesh;
    ['shoe_4']: THREE.Mesh;
    ['shoe_5']: THREE.Mesh;
    ['shoe_6']: THREE.Mesh;
    ['shoe_7']: THREE.Mesh;
  };
  materials: {
    ['laces']: THREE.Material;
    ['mesh']: THREE.Material;
    ['caps']: THREE.Material;
    ['inner']: THREE.Material;
    ['sole']: THREE.Material;
    ['stripes']: THREE.Material;
    ['band']: THREE.Material;
    ['patch']: THREE.Material;
  };
};
