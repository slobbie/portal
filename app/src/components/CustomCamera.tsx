// =============================================================================
// File    :  CustomCarmera.tsx
// Class   :
// Purpose :  CustomCarmera
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { useEffect } from 'react';
import { CameraControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useRoute } from 'wouter';
import * as THREE from 'three';
/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const CustomCamera = ({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) => {
  const { controls, scene } = useThree();
  const [, params] = useRoute('/item/:id');
  useEffect(() => {
    const active = scene.getObjectByName(params?.id as string);
    if (active && active.parent) {
      // active.parent.localToWorld(position.set(0, 0.5, 0.25));

      active.parent.localToWorld(position.set(0, 0.5, 3));
      active.parent.localToWorld(focus.set(0, 0, -2));
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });
  return (
    <CameraControls
      makeDefault
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}

      // azimuthRotateSpeed={20}
    />
  );
};

export default CustomCamera;
