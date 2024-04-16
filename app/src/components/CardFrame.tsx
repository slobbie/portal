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
import { useSetRecoilState } from 'recoil';
import { currentModelName } from '@src/atom/model.atom';
import { RigidBody } from '@react-three/rapier';

extend(geometry);

interface ICardFrame {
  id: string;
  name: string;
  author: string;
  bg: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
  groupProps: JSX.IntrinsicElements['group'];
}
/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
function CardFrame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  groupProps,
}: ICardFrame) {
  const portal = useRef<PortalMaterialType>(null);
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/item/:id');
  const [hovered, hover] = useState(false);
  const setCurrentModelName = useSetRecoilState(currentModelName);
  useCursor(hovered);

  useFrame((_state, dt) => {
    if (portal.current) {
      easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt);
    }
  });

  // TODO: 상태 관리로 관리 하면 됨
  const isPortal = useRef<boolean>(false);

  const onRouter = () => {
    // e.stopPropagation();
    setCurrentModelName(id);
    setLocation('/item/' + id);
    isPortal.current = true;
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
        fontSize={0.04}
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
          if (!isPortal.current) {
            onRouter();
          }
        }}
      >
        <mesh
          name={id}
          onClick={onRouter}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
        >
          <roundedPlaneGeometry args={[width, height, 0.1]} />
          <MeshPortalMaterial
            ref={portal}
            events={params?.id === id}
            side={THREE.DoubleSide}
          >
            <color attach='background' args={[bg]} />
            {children}
          </MeshPortalMaterial>
        </mesh>
      </RigidBody>
    </group>
  );
}

export default CardFrame;
