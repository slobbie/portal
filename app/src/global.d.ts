import { ThreeElement } from '@react-three/fiber';
import { geometry } from 'maath';

// maath 의 RoundedPlaneGeometry 를 R3F 커스텀 엘리먼트로 등록 (extend 는 PortalFrame 에서 수행)
declare module '@react-three/fiber' {
  interface ThreeElements {
    roundedPlaneGeometry: ThreeElement<typeof geometry.RoundedPlaneGeometry>;
  }
}
