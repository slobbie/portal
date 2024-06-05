// =============================================================================
// File    :  CardFrame.tsx
// Class   :
// Purpose :  CardFrame
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import {
  useCursor,
  MeshPortalMaterial,
  Text,
  PortalMaterialType,
} from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import { easing, geometry } from 'maath';
import { useRecoilState } from 'recoil';
import { RigidBody } from '@react-three/rapier';
import { isPortal } from '@src/common/atom/portal.atom';
import { IPortalFrame } from '@src/feature/world/interface/portalFrame.interface';
import { service } from '@src/common/constants/service.constants';

extend(geometry);

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
  const portalRef = useRef<PortalMaterialType>(null);
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/portal/:id');
  const [frameHovered, setFrameHovered] = useState(false);
  /** 포털 여부 상태 */
  const [isPortalToggle, setIsPortalToggle] = useRecoilState(isPortal);
  /** 현재 프레임 */
  useCursor(frameHovered);

  useFrame((_state, dt) => {
    if (portalRef.current) {
      easing.damp(
        portalRef.current,
        'blend',
        params?.id === id ? 1 : 0,
        0.2,
        dt
      );
    }
  });
  /** 라우트 이벤트 핸들러 */
  const onRouter = () => {
    // e.stopPropagation();
    localStorage.setItem(service.storage.currentModelNm, id);
    setLocation('/portal/' + id);
    setIsPortalToggle(true);
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
        linearDamping={12}
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
          onPointerOver={() => setFrameHovered(true)}
          onPointerOut={() => setFrameHovered(false)}
        >
          <roundedPlaneGeometry args={[width, height, 0.1]} />
          <MeshPortalMaterial
            ref={portalRef}
            events={params?.id === id}
            side={THREE.DoubleSide}
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
