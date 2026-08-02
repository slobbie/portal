import { Suspense, useRef } from 'react';
import { Vector3, MathUtils } from 'three';
import { IBallModel } from '@features/ball/interface/ballModel.interface';
import { model3DPath } from '@shared/constants/3dModelPath.constants';
import {
  BallCollider,
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { Gltf, useGLTF } from '@react-three/drei';

/**
 * 볼 모델
 * @property { number } scale object 크기
 * @property { THREE.Vector3 } vec 백터
 * @property { THREE.MathUtils.randFloatSpread } scale object 크기
 * @returns React.JSX.Element
 */
const BallModel = ({ scale }: IBallModel) => {
  const ballModelRigidBodyRef = useRef<RapierRigidBody>(null);
  const randFloatSpread = MathUtils.randFloatSpread;

  /** 프레임마다 재사용하는 작업용 벡터 (매 렌더 할당 방지) */
  const vecRef = useRef(new Vector3());

  useFrame((_state, delta) => {
    if (ballModelRigidBodyRef.current) {
      delta = Math.min(0.1, delta);
      ballModelRigidBodyRef.current.applyImpulse(
        vecRef.current
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
