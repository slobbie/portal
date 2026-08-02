import { useRef } from 'react';
import { Group } from 'three';
import { model3DPath } from '@shared/constants/3dModelPath.constants';
import { Gltf } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const THUMBNAIL = Object.freeze({
  /** 오른쪽 포탈을 바라보는 카메라 시점을 보정해 얼굴을 정면으로 맞춘다. */
  rotationY: -0.29,
  /** 회전 보정 후 왼쪽으로 이동한 모델의 시각적 중심을 카드 중앙에 맞춘다. */
  baseX: 0.09,
  /** 카드 제목과 하단 설명 사이의 안전 영역 중앙 */
  baseY: -0.12,
  floatRange: 0.05,
  scale: 20,
});

/**
 * 포탈 오버뷰에서 사용하는 가벼운 볼 대표 썸네일
 * - 물리 연산 없이 모델 한 개만 렌더링한다.
 * - 모델의 기본 정면이 카메라를 향하도록 회전을 고정한다.
 */
const BallThumbnail = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const elapsedTime = state.clock.getElapsedTime();
    groupRef.current.position.y =
      THUMBNAIL.baseY + Math.sin(elapsedTime / 1.5) * THUMBNAIL.floatRange;
  });

  return (
    <>
      <ambientLight intensity={2.5} />
      <directionalLight position={[2, 3, 4]} intensity={3} />
      <group
        ref={groupRef}
        position={[THUMBNAIL.baseX, THUMBNAIL.baseY, -0.3]}
        rotation={[0, THUMBNAIL.rotationY, 0]}
      >
        <Gltf src={model3DPath.ball} scale={THUMBNAIL.scale} />
      </group>
    </>
  );
};

export default BallThumbnail;
