import { Vector3 } from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BallCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';

/**
 * 충돌 포인터 컴포넌트
 * @returns React.JSX.Element
 */
const PointerRigidBody = () => {
  const ref = useRef<RapierRigidBody>(null);

  /** 프레임마다 재사용하는 작업용 벡터 (매 렌더 할당 방지) */
  const vecRef = useRef(new Vector3());

  useFrame(({ pointer, viewport }) => {
    const vec = vecRef.current;
    vec.lerp(
      {
        x: (pointer.x * viewport.width) / 1.2,
        y: (pointer.y * viewport.height) / 1.2,
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
