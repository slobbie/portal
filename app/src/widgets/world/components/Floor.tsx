import { useMemo, useRef } from 'react';
import { Group } from 'three';
import Character from '@widgets/world/model/Character';
import { useWorldStore } from '@shared/store/world.store';
import { keyControls } from '@widgets/world/interface/keyboardControls.interface';
import { PHYSICS } from '@shared/constants/scene.constants';
import { Box, useKeyboardControls } from '@react-three/drei';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

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

  /** 키보드 키 눌린 여부 */
  const isKeyPressed = useMemo(
    () => isRightPressed || isLeftPressed || isForwardPressed || isBackPressed,
    [isRightPressed, isLeftPressed, isForwardPressed, isBackPressed]
  );
  // KeyInfo 버튼이 키보드 상태를 직접 변경하므로, 리렌더를 유발해 변경된 키 상태를 반영
  useWorldStore((state) => state.isCharacterMove);

  /** 캐릭터 움직임 프레임 애니메이션 */
  useFrame(() => {
    if (!characterRef.current || !rigidBodyRef.current || !isKeyPressed) {
      return;
    }
    // 입력 방향 벡터
    let dx = 0;
    let dz = 0;
    if (isRightPressed) dx += 1;
    if (isLeftPressed) dx -= 1;
    if (isForwardPressed) dz -= 1;
    if (isBackPressed) dz += 1;

    const length = Math.hypot(dx, dz);
    if (length === 0) {
      return;
    }

    // 방향 정규화 후 목표 속도 지정 → 전방향 동일 속도(대각선 가속 없음),
    // setLinvel 이라 프레임률·질량 무관. y 속도(중력)는 유지.
    const speed = PHYSICS.characterSpeed;
    const vx = (dx / length) * speed;
    const vz = (dz / length) * speed;
    const current = rigidBodyRef.current.linvel();
    rigidBodyRef.current.setLinvel({ x: vx, y: current.y, z: vz }, true);
    characterRef.current.rotation.y = Math.atan2(vx, vz);
  });

  return (
    <group>
      <RigidBody
        ref={rigidBodyRef}
        enabledRotations={[false, false, false]}
        linearDamping={PHYSICS.characterLinearDamping}
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
