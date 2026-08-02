import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { usePortalParams } from '@shared/hooks/usePortalRoute';
import { CAMERA } from '@shared/constants/scene.constants';
import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

interface ICameraController {
  zPosition?: number;
  position?: Vector3;
  focus?: Vector3;
  /** 카메라 회전/드래그 잠금 (예: 신발 포탈은 모델만 회전) */
  disableRotate?: boolean;
}

/**
 * 카메라 컨트롤러
 * @property { number } zPosition camera z position
 * @returns React.JSX.Element
 */
const CameraController = ({
  zPosition = 3,
  position,
  focus,
  disableRotate = false,
}: ICameraController) => {
  const { scene } = useThree();
  const { id: portalId } = usePortalParams();
  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    // 매 실행마다 기준 벡터를 새로 복제 — 포탈 좌표가 다음 렌더까지 남지 않도록(exit 리센터 방지)
    const cameraPosition = position ? position.clone() : new Vector3(0, 0, 2);
    const cameraFocus = focus ? focus.clone() : new Vector3(0, 0, 0);

    const active = scene.getObjectByName(portalId as string);
    if (active && active.parent) {
      active.parent.localToWorld(cameraPosition.set(0, 0.5, zPosition));
      active.parent.localToWorld(cameraFocus.set(0, 0, -2));
    }

    /** 카메라 시점 조정  */
    cameraControlsRef.current?.setLookAt(
      ...cameraPosition.toArray(),
      ...cameraFocus.toArray(),
      true
    );
  }, [portalId, zPosition, scene, position, focus]);

  /** 회전 잠금 토글 (camera-controls ACTION: NONE=0, ROTATE=1, TOUCH_ROTATE=32) */
  useEffect(() => {
    const controls = cameraControlsRef.current;
    if (!controls) return;
    controls.mouseButtons.left = disableRotate ? 0 : 1;
    controls.touches.one = disableRotate ? 0 : 32;
  }, [disableRotate]);

  return (
    <CameraControls
      ref={cameraControlsRef}
      makeDefault
      minPolarAngle={CAMERA.minPolarAngle}
      maxPolarAngle={CAMERA.maxPolarAngle}
    />
  );
};

export default CameraController;
