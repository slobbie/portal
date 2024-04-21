// =============================================================================
// File    :  Character.tsx
// Class   :
// Purpose :  Character
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import animationConfig from '@src/constants/animation.constants';

enum keyControls {
  forward = 'forward',
  back = 'backward',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

type TCharacterGLTFResult = GLTF & {
  nodes: {
    ['mixamorig6Hips']: THREE.Mesh;
    ['Ch09']: THREE.SkinnedMesh;
  };
  materials: {
    ['Ch09_body']: THREE.Material;
  };
};

/**
 * 캐릭터 컴포넌트
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const Character = ({ ...props }) => {
  const characterRef = useRef<THREE.Group>(null);
  /** 오른쪽 화살표 키 */
  const rightPressed = useKeyboardControls<keyControls>((state) => state.right);
  /** 왼쪽 화살표 키 */
  const leftPressed = useKeyboardControls<keyControls>((state) => state.left);
  /** 위쪽 화살표 키 */
  const forwardPressed = useKeyboardControls<keyControls>(
    (state) => state.forward
  );
  /** 아랫쪽 화살표 키 */
  const backPressed = useKeyboardControls<keyControls>(
    (state) => state.backward
  );

  const { nodes, materials, animations } = useGLTF(
    'people/people.glb'
  ) as TCharacterGLTFResult;

  /** 현재 실행 되는 애니메이션 이름 상태 */
  const [animationState, setAnimationState] = useState('Stand');

  const { actions } = useAnimations(animations, characterRef);

  /** 키 눌렸는지 여부 */
  const isKeyPressed = useMemo(
    () => rightPressed || leftPressed || forwardPressed || backPressed,
    [rightPressed, leftPressed, forwardPressed, backPressed]
  );

  useEffect(() => {
    if (isKeyPressed) {
      setAnimationState(animationConfig.walk);
    } else {
      setAnimationState(animationConfig.stand);
    }
  }, [isKeyPressed]);

  useEffect(() => {
    actions[animationState]?.reset().fadeIn(0.2).play();
    return () => {
      actions[animationState]?.fadeOut(0.2);
    };
  }, [actions, animationState]);

  return (
    <group ref={characterRef} {...props} dispose={null}>
      <group name='AuxScene'>
        <group>
          <ambientLight intensity={2} />
          <primitive object={nodes.mixamorig6Hips} />
          <skinnedMesh
            name='Ch09'
            geometry={nodes.Ch09.geometry}
            material={materials.Ch09_body}
            skeleton={nodes.Ch09.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('people/people.glb');

export default Character;
