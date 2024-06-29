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

import { useEffect, useMemo, useRef } from 'react';
import { Group } from 'three';
import { Box, useKeyboardControls } from '@react-three/drei';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import Character from '@src/feature/world/model/Character';
import { useFrame } from '@react-three/fiber';
import { useRecoilValue } from 'recoil';
import { isCharacterMove } from '@src/common/atom/model.atom';
import { keyControls } from '@feature/world/interface/keyboardControls.interface';

/**
 * 공간 컴포넌트
 * @returns React.JSX.Element
 */
const Floor = () => {
  /** 오른쪽 화살표키 활성화 여부 */
  const isRightPressed = useKeyboardControls<keyControls>(
    (state) => state.right
  );
  /** 왼쪽 화살표키 활성화 여부 */
  const isLeftPressed = useKeyboardControls<keyControls>((state) => state.left);
  /** 위쪽 화살표키 활성화 여부 */
  const isForwardPressed = useKeyboardControls<keyControls>(
    (state) => state.forward
  );
  /** 아랫쪽 화살표키 활성화 여부 */
  const isBackPressed = useKeyboardControls<keyControls>(
    (state) => state.backward
  );

  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const characterRef = useRef<Group>(null);

  /** 움직임 정도 상수  */
  const move = 0.028;

  /** 움직임 속도 상수  */
  const speedValue = 0.8;

  /** 키보드 키 눌린 여부 */
  const isKeyPressed = useMemo(
    () => isRightPressed || isLeftPressed || isForwardPressed || isBackPressed,
    [isRightPressed, isLeftPressed, isForwardPressed, isBackPressed]
  );
  /** 화면의 키 컨트롤로 인한 캐릭터 움직임 여부  */
  const isMovement = useRecoilValue(isCharacterMove);

  /** 화살표키 활성화 감지 이펙트 */
  useEffect(() => {}, [isMovement]);

  /** 캐릭터 움직임 프레임 애니메이션 */
  useFrame(() => {
    if (characterRef.current && rigidBodyRef.current && isKeyPressed) {
      const impulse = { x: 0, y: 0, z: 0 };
      if (isRightPressed) {
        impulse.x += move;
      }
      if (isLeftPressed) {
        impulse.x -= move;
      }
      if (isForwardPressed) {
        impulse.z -= move;
      }
      if (isBackPressed && impulse.z < speedValue) {
        impulse.z += move;
      }
      if (isKeyPressed) {
        const angle = Math.atan2(impulse.x, impulse.z);
        characterRef.current.rotation.y = angle;
      }
      rigidBodyRef.current.applyImpulse(impulse, true);
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
