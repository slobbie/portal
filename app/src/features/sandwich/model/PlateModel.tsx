import { Suspense } from 'react';
import { model3DPath } from '@shared/constants/3dModelPath.constants';
import { useSandwichStore } from '@features/sandwich/store/sandwich.store';
import { IModelPosition } from '@features/sandwich/interface/modelPosition.interface';
import { useSpring, animated } from '@react-spring/three';
import { Gltf } from '@react-three/drei';

/**
 * 접시 모델 컴포넌트
 * @returns React.JSX.Element
 */
const PlateModel = () => {
  const isOrder = useSandwichStore((state) => state.isOrder);

  const { x, y, z, scale } = useSpring<IModelPosition>({
    x: isOrder ? -0.17 : 0,
    y: isOrder ? -0.3 : 0,
    z: isOrder ? -0.4 : 0,
    scale: isOrder ? 3 : 0,
    config: {
      mass: 1,
      tension: isOrder ? 200 : 0,
      friction: isOrder ? 18 : 0,
    },
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
        position-x={x}
        position-y={y}
        position-z={z}
      >
        <Gltf src={model3DPath.plate} />
      </animated.group>
    </Suspense>
  );
};

export default PlateModel;
