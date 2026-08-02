import { Mesh, SkinnedMesh, Material } from 'three';
import { GLTF } from 'three-stdlib';
import { ThreeElements } from '@react-three/fiber';

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
  groupProps?: ThreeElements['group'];
}
