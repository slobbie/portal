import { DoubleSide } from 'three';
import { ComponentRef, useRef, useState } from 'react';
import { useWorldStore } from '@shared/store/world.store';
import { IPortalFrame } from '@widgets/world/interface/portalFrame.interface';
import { service } from '@shared/constants/service.constants';
import { usePortalParams } from '@shared/hooks/usePortalRoute';
import { PHYSICS } from '@shared/constants/scene.constants';
import { useFrame, extend } from '@react-three/fiber';
import { useCursor, MeshPortalMaterial, Text } from '@react-three/drei';
import { useLocation } from 'wouter';
import { easing, geometry } from 'maath';
import { RigidBody } from '@react-three/rapier';

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry });

/**
 * 포탈 프레임 컴포넌트
 * @property { string } id
 * @property { string } name 카드 이름
 * @property { string } author 카드 설명
 * @property { string } bg 카드 배경
 * @property { string } width 넓이
 * @property { string } height 높이
 * @property { React.ReactNode } children React.ReactNode
 * @property { string } groupProps JSX.IntrinsicElements['group'] there js group 내재 props
 * @returns React.JSX.Element
 */
const PortalFrame = ({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  groupProps,
}: IPortalFrame) => {
  /** 포탈 프레인 머티리얼 ref */
  const portalRef = useRef<ComponentRef<typeof MeshPortalMaterial>>(null);
  const [, setLocation] = useLocation();
  const { id: portalId } = usePortalParams();
  const [frameHovered, setFrameHovered] = useState(false);
  /** 포털 여부 상태 */
  const isPortalToggle = useWorldStore((state) => state.isPortal);
  const setPortal = useWorldStore((state) => state.setPortal);
  const setHoveredPortal = useWorldStore((state) => state.setHoveredPortal);
  /** 현재 프레임 */
  useCursor(frameHovered);

  useFrame((_state, dt) => {
    if (portalRef.current) {
      easing.damp(portalRef.current, 'blend', portalId === id ? 1 : 0, 0.2, dt);
    }
  });
  /** 라우트 이벤트 핸들러 */
  const onRouter = () => {
    // e.stopPropagation();
    localStorage.setItem(service.storage.currentModelNm, id);
    setLocation('/portal/' + id);
    setPortal(true);
  };

  return (
    <group {...groupProps}>
      <Text
        fontSize={0.3}
        anchorY='top'
        anchorX='left'
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <Text
        fontSize={0.1}
        anchorX='right'
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <Text
        fontSize={0.05}
        anchorX='right'
        position={[0.0, -0.677, 0.01]}
        material-toneMapped={false}
      >
        {author}
      </Text>
      <RigidBody
        type='fixed'
        colliders='trimesh'
        enabledRotations={[false, false, false]}
        linearDamping={PHYSICS.portalLinearDamping}
        lockRotations
        onCollisionEnter={() => {
          if (!isPortalToggle) {
            onRouter();
          }
        }}
      >
        <mesh
          name={id}
          onClick={onRouter}
          onPointerOver={() => {
            setFrameHovered(true);
            setHoveredPortal(id);
          }}
          onPointerOut={() => {
            setFrameHovered(false);
            setHoveredPortal(null);
          }}
        >
          <roundedPlaneGeometry args={[width, height, 0.1]} />
          <MeshPortalMaterial
            ref={portalRef}
            events={portalId === id}
            side={DoubleSide}
            resolution={512}
            blur={0}
            transparent
          >
            <color attach='background' args={[bg]} />
            {children}
          </MeshPortalMaterial>
        </mesh>
      </RigidBody>
    </group>
  );
};

export default PortalFrame;
