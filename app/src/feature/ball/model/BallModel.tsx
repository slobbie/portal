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
import { Gltf, useGLTF } from '@react-three/drei';
import { IBallModel } from '@feature/ball/interface/ballModel.interface';
import { model3DPath } from '@src/common/constants/3dModelPath.constants';

/**
 * 볼 모델
 * @property { number } scale object 크기
 * @property { THREE.Vector3 } vec 백터
 * @property { THREE.MathUtils.randFloatSpread } scale object 크기
 * @returns React.JSX.Element
 */
const BallModel = ({ vec = new THREE.Vector3(), scale }: IBallModel) => {
  const ballModelRigidBodyRef = useRef<RapierRigidBody>(null);
  const randFloatSpread = THREE.MathUtils.randFloatSpread;

  useFrame((_state, delta) => {
    if (ballModelRigidBodyRef.current) {
      delta = Math.min(0.1, delta);
      ballModelRigidBodyRef.current.applyImpulse(
        vec
          .copy(ballModelRigidBodyRef.current.translation())
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
      position={[
        randFloatSpread(20),
        randFloatSpread(20) - 25,
        randFloatSpread(20) - 10,
      ]}
      ref={ballModelRigidBodyRef}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <Suspense>
        <Gltf castShadow receiveShadow src={model3DPath.ball} scale={40} />
      </Suspense>
    </RigidBody>
  );
};

useGLTF.preload(model3DPath.ball);

export default BallModel;
