// =============================================================================
// File    :  Rig.tsx
// Class   :
// Purpose :  Rig
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { easing } from 'maath';

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const Rig = ({ ...props }) => {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
      // if (state.events && typeof state.events.update === 'function') {
      //   state.events.update(); // Raycasts every frame rather than on pointer-move
      // }
      easing.damp3(
        state.camera.position,
        [-state.pointer.x * 2, state.pointer.y + 1.5, 5],
        0.3,
        delta
      ); // Move camera
      state.camera.lookAt(0, 0, 0); // Look at center
    }
  });
  return <group ref={ref} {...props} />;
};

export default Rig;
