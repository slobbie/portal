// =============================================================================
// File    :  CameraController.tsx
// Class   :
// Purpose :  CameraController
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useRoute } from 'wouter';
import * as THREE from 'three';

/**
 * 카메라 컨트롤러
 * @property { number } zPosition camera z position
 * @returns React.JSX.Element
 */
const CameraController = ({
  zPosition = 3,
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) => {
  const { scene } = useThree();
  const [, params] = useRoute('/portal/:id');
  const cameraControlsRef = useRef<CameraControls>(null);
  const maxPolarAngle = Math.PI / 2;

  useEffect(() => {
    const active = scene.getObjectByName(params?.id as string);
    if (active && active.parent) {
      active.parent.localToWorld(position.set(0, 0.5, zPosition));
      active.parent.localToWorld(focus.set(0, 0, -2));
    }

    /** 카메라 시점 조정  */
    cameraControlsRef.current?.setLookAt(
      ...position.toArray(),
      ...focus.toArray(),
      true
    );
  });

  return (
    <CameraControls
      ref={cameraControlsRef}
      makeDefault
      minPolarAngle={0}
      maxPolarAngle={maxPolarAngle}
    />
  );
};

export default CameraController;
