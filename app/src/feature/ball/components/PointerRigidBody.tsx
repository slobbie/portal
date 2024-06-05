// =============================================================================
// File    :  PointerRigidBody.tsx
// Class   :
// Purpose :  PointerRigidBody
// Date    :  2024.06
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { BallCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import { useRoute } from 'wouter';

/**
 * 충돌 포인터 컴포넌트
 * @returns React.JSX.Element
 */
const PointerRigidBody = () => {
  const [param] = useRoute('/portal/03');

  const ref = useRef<RapierRigidBody>(null);

  const x = useRef(0);
  const y = useRef(0);

  const vec = new THREE.Vector3();

  const handleMouseMove = (e: MouseEvent) => {
    x.current = e.clientX;
    y.current = e.clientY;
  };

  useEffect(() => {
    if (param) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [param]);

  useFrame(({ mouse, viewport }) => {
    vec.lerp(
      {
        x: (mouse.x * viewport.width) / 1.2,
        y: (mouse.y * viewport.height) / 1.2,
        z: 0,
      },
      0.2
    );

    ref.current?.setNextKinematicTranslation(vec);
  });
  return (
    <RigidBody
      position={[100, 100, 100]}
      type='kinematicPosition'
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
};

export default PointerRigidBody;
