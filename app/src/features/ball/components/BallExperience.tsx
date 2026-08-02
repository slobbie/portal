import { lazy, Suspense, useMemo } from 'react';
import PointerRigidBody from '@features/ball/components/PointerRigidBody';
import { Physics } from '@react-three/rapier';

const BallModel = lazy(() => import('@features/ball/model/BallModel'));

/** 공 포탈 진입 후에만 실행되는 전체 물리 인터랙션 */
const BallExperience = () => {
  const balls = useMemo(
    () =>
      Array.from({ length: 50 }, () => ({
        scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)],
      })),
    []
  );

  return (
    <>
      <ambientLight intensity={1} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color='white'
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[0, 5, -4]} intensity={4} />
      <Physics gravity={[0, 0, 0]} interpolate>
        <PointerRigidBody />
        <Suspense fallback={null}>
          {balls.map((props, index) => (
            <BallModel key={index} {...props} />
          ))}
        </Suspense>
      </Physics>
    </>
  );
};

export default BallExperience;
