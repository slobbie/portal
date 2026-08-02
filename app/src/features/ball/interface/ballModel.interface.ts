import { Vector3, MathUtils } from 'three';

/** 볼 모델 컴포넌트 인터페이스  */
export interface IBallModel {
  scale: number;
  vec?: Vector3;
  r?: typeof MathUtils.randFloatSpread;
}
