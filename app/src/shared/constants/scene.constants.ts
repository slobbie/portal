/** 카메라 관련 토큰 */
export const CAMERA = Object.freeze({
  fov: 75,
  /** Canvas 초기 카메라 위치 */
  initialPosition: [0, 1.5, 4] as [number, number, number],
  /** 포탈 밖 오버뷰 위치 */
  overviewPosition: [0, 0, 3.6] as [number, number, number],
  minPolarAngle: 0,
  maxPolarAngle: Math.PI / 2,
  /** 포탈별 카메라 z 거리 */
  zDistance: {
    sandwich: 3,
    sandwichOrdered: 2.8,
    ball: 13,
    default: 3,
  },
});

/** 물리(rapier) 토큰 */
export const PHYSICS = Object.freeze({
  /** 캐릭터 이동 목표 속도 (units/sec, setLinvel 기준 — 전방향 동일) */
  characterSpeed: 1.6,
  /** 캐릭터 리지드바디 선형 감쇠 (키 뗐을 때 감속) */
  characterLinearDamping: 50,
  /** 포탈 프레임 리지드바디 선형 감쇠 */
  portalLinearDamping: 12,
});

/** 신발 인터랙션 토큰 */
export const SHOE = Object.freeze({
  /** 드래그 회전 감도 */
  dragSensitivity: 0.01,
  /** 고정 기울기 */
  tiltX: 0.1,
  tiltZ: -0.2,
});
