// =============================================================================
// File    :  EmojiModel.tsx
// Class   :
// Purpose :  EmojiModel
// Date    :  2024.06
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import {
  BallCollider,
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Gltf } from '@react-three/drei';

interface IEmojiModel {
  scale: number;
  vec?: THREE.Vector3;
  r?: typeof THREE.MathUtils.randFloatSpread;
}

/**
 *
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const BallModel = ({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
}: IEmojiModel) => {
  const api = useRef<RapierRigidBody>(null);

  useFrame((_state, delta) => {
    if (api.current) {
      delta = Math.min(0.1, delta);
      api.current.applyImpulse(
        vec
          .copy(api.current.translation())
          .normalize()
          .multiply({
            x: -50 * delta * scale,
            y: -150 * delta * scale,
            z: -50 * delta * scale,
          }),
        false
      );
    }
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <Suspense>
        <Gltf castShadow receiveShadow src={'/ball/voltorb.glb'} scale={40} />
      </Suspense>
    </RigidBody>
  );
};

export default BallModel;
