import { Mesh, Material } from 'three';
import { GLTF } from 'three-stdlib';
import { ThreeElements } from '@react-three/fiber';

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
  groupProps: ThreeElements['group'];
}
