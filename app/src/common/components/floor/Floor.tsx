// =============================================================================
// File    :  Floor.tsx
// Class   :
// Purpose :  Floor
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import * as THREE from 'three';
import { Box, useKeyboardControls } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import Character from '@common/components/character/Character';
import { useFrame } from '@react-three/fiber';

enum Controls {
  forward = 'forward',
  back = 'backward',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

/**
 * 공간 컴포넌트
 * @returns React.JSX.Element
 */
const Floor = () => {
  const planeRef = useRef<THREE.Mesh>(null);

  const rightPressed = useKeyboardControls<Controls>((state) => state.right);
  const leftPressed = useKeyboardControls<Controls>((state) => state.left);
  const forwardPressed = useKeyboardControls<Controls>(
    (state) => state.forward
  );
  const backPressed = useKeyboardControls<Controls>((state) => state.backward);

  useEffect(() => {
    if (planeRef.current) {
      planeRef.current.rotation.z = THREE.MathUtils.degToRad(10);
    }
  }, []);

  const rigidBodyRef = useRef<RapierRigidBody>(null);

  const characterRef = useRef<THREE.Group>(null);
  const move = 0.005;
  const maxSpeed = 0.09;
  const minSpeed = -0.09;

  const impulse = useRef({ x: 0, y: 0, z: 0 });

  /** 키보드 키 눌린 여부 */
  const isKeyPressed = useMemo(
    () => rightPressed || leftPressed || forwardPressed || backPressed,
    [rightPressed, leftPressed, forwardPressed, backPressed]
  );

  /** 캐릭터 움직임 프레임 애니메이션 */
  useFrame(() => {
    if (characterRef.current && rigidBodyRef.current && isKeyPressed) {
      if (rightPressed && impulse.current.x < maxSpeed) {
        impulse.current.x += move;
        // characterRef.current.position.x += move;
        characterRef.current.rotation.y = THREE.MathUtils.degToRad(90);
      }
      if (leftPressed && impulse.current.x > minSpeed) {
        // characterRef.current.position.x -= move;
        impulse.current.x -= move;
        characterRef.current.rotation.y = THREE.MathUtils.degToRad(-90);
      }
      if (forwardPressed && impulse.current.z > minSpeed) {
        // characterRef.current.position.z -= move;
        impulse.current.z -= move;
        characterRef.current.rotation.y = THREE.MathUtils.degToRad(180);
      }
      if (backPressed && impulse.current.z < maxSpeed) {
        // characterRef.current.position.z += move;
        impulse.current.z += move;
        characterRef.current.rotation.y = THREE.MathUtils.degToRad(0);
      }
      rigidBodyRef.current.applyImpulse(impulse.current, true);
    } else {
      impulse.current = { x: 0, y: 0, z: 0 };
    }
  });

  return (
    <group>
      <RigidBody
        ref={rigidBodyRef}
        enabledRotations={[false, false, false]}
        linearDamping={50}
        lockRotations
      >
        <group
          ref={characterRef}
          position={[0, -1, 1]}
          scale={0.2}
          // position={[0, 0, 1]}
          // scale={0.08}
        >
          <Character />
        </group>
      </RigidBody>
      <RigidBody type='fixed'>
        {/* <Sparkles
          count={100}
          // size={scale as number[]}
          position={[0, 0, 0]}
          scale={[4, 1.5, 4]}
          speed={0.3}
        /> */}
        <Box position={[0, -1, 0]} args={[1000, 0, 1000]}>
          <meshStandardMaterial color={'#f0f0f0'} />
        </Box>
      </RigidBody>
    </group>
  );
};

export default Floor;
