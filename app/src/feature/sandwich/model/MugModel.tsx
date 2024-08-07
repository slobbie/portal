import { Suspense } from 'react';
import { animated, useSpring } from '@react-spring/three';
import { Gltf } from '@react-three/drei';
import { model3DPath } from '@src/common/constants/3dModelPath.constants';
import { useRecoilValue } from 'recoil';
import { isOrderState } from '@feature/sandwich/atom/sandWich.atom';
import { IModelPosition } from '@feature/sandwich/interface/modelPosition.interface';

/** 머그컵 모델 컴포넌트 */
const MugModel = () => {
  const isOrder = useRecoilValue(isOrderState);

  const { x, y, z, scale } = useSpring<IModelPosition>({
    x: isOrder ? -1.3 : 0,
    y: isOrder ? 0.2 : -0.2,
    z: isOrder ? 0.7 : 0,
    scale: isOrder ? 0.4 : 0,
    config: {
      mass: 1,
      tension: isOrder ? 120 : 0,
      friction: isOrder ? 16 : 0,
    },
  });

  const { rotation } = useSpring<IModelPosition>({
    rotation: isOrder ? [0, 0.1, 0] : [0, 0, 0],
    config: {
      mass: 1,
      tension: isOrder ? 150 : 0,
      friction: isOrder ? 18 : 0,
    },
    delay: 700,
  });

  return (
    <Suspense>
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
      <animated.group
        scale={scale}
        rotation={rotation}
        position-x={x}
        position-y={y}
        position-z={z}
      >
        <Gltf src={model3DPath.mug} />
      </animated.group>
    </Suspense>
  );
};

export default MugModel;
