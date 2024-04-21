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
import { useRecoilValue } from 'recoil';
import { isCharacterMove } from '@src/atom/model.atom';

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
  const move = 0.1;
  const speedValue = 0.8;

  /** 키보드 키 눌린 여부 */
  const isKeyPressed = useMemo(
    () => rightPressed || leftPressed || forwardPressed || backPressed,
    [rightPressed, leftPressed, forwardPressed, backPressed]
  );

  const isMovement = useRecoilValue(isCharacterMove);

  useEffect(() => {}, [isMovement]);

  /** 캐릭터 움직임 프레임 애니메이션 */
  useFrame(() => {
    if (characterRef.current && rigidBodyRef.current) {
      const impulse = { x: 0, y: 0, z: 0 };
      const linvel = rigidBodyRef.current.linvel();
      if (rightPressed && linvel.x < speedValue) {
        impulse.x += move;
      } else if (leftPressed && linvel.x > -speedValue) {
        impulse.x -= move;
      } else if (forwardPressed && linvel.z > -speedValue) {
        impulse.z -= move;
      } else if (backPressed && linvel.z < speedValue) {
        impulse.z += move;
      }
      rigidBodyRef.current.applyImpulse(impulse, true);

      // TODO: y 포지션 일 경우 캐릭터가 좌우로 흔들리는 이슈
      if (isKeyPressed) {
        const angle = Math.atan2(linvel.x, linvel.z);
        characterRef.current.rotation.y = angle;
      }
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
        <group ref={characterRef} position={[0, -1, 1]} scale={0.003}>
          <Character />
        </group>
      </RigidBody>
      <RigidBody type='fixed'>
        <Box position={[0, -1, 0]} args={[1000, 0, 1000]}>
          <meshStandardMaterial color={'#f0f0f0'} />
        </Box>
      </RigidBody>
    </group>
  );
};

export default Floor;
