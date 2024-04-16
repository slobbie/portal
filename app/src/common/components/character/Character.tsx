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

enum keyControls {
  forward = 'forward',
  back = 'backward',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

type TCharacterGLTFResult = GLTF & {
  nodes: {
    ['Root']: THREE.Mesh;
    ['Cube004']: THREE.SkinnedMesh;
    ['Cube004_1']: THREE.SkinnedMesh;
    ['Cube004_2']: THREE.SkinnedMesh;
    ['Cube004_3']: THREE.SkinnedMesh;
    ['Cube004_4']: THREE.SkinnedMesh;
  };
  materials: {
    ['Skin']: THREE.Material;
    ['DarkGrey']: THREE.Material;
    ['Pants']: THREE.Material;
    ['Black']: THREE.Material;
  };
};

/**
 * 캐릭터 컴포넌트
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const Character = ({ ...props }) => {
  const ref = useRef<THREE.Group>(null);
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
  /** 현재 실행 되는 애니메이션 이름 상태 */
  const [animationState, setAnimationState] = useState('Idle');

  const { nodes, materials, animations } = useGLTF(
    '/Character_Soldier.gltf'
  ) as TCharacterGLTFResult;
  const { actions } = useAnimations(animations, ref);

  /** 키 눌렸는지 여부 */
  const isKeyPressed = useMemo(
    () => rightPressed || leftPressed || forwardPressed || backPressed,
    [rightPressed, leftPressed, forwardPressed, backPressed]
  );

  useEffect(() => {
    if (isKeyPressed) {
      setAnimationState('Run');
    } else {
      setAnimationState('Idle');
    }
  }, [isKeyPressed]);

  useEffect(() => {
    actions[animationState]?.reset().fadeIn(0.2).play();
    return () => {
      actions[animationState]?.fadeOut(0.2);
    };
  }, [actions, animationState]);

  return (
    <group {...props} dispose={null} ref={ref}>
      <group name='Scene'>
        <group name='CharacterArmature'>
          <primitive object={nodes.Root} />
          <group name='Body_1'>
            <skinnedMesh
              name='Cube004'
              geometry={nodes.Cube004.geometry}
              material={materials.Skin}
              skeleton={nodes.Cube004.skeleton}
              castShadow
            />
            <skinnedMesh
              name='Cube004_1'
              geometry={nodes.Cube004_1.geometry}
              material={materials.DarkGrey}
              skeleton={nodes.Cube004_1.skeleton}
              castShadow
            />
            <skinnedMesh
              name='Cube004_2'
              geometry={nodes.Cube004_2.geometry}
              material={materials.Pants}
              skeleton={nodes.Cube004_2.skeleton}
              castShadow
            />
            <skinnedMesh
              name='Cube004_3'
              geometry={nodes.Cube004_3.geometry}
              // material={playerColorMaterial}
              skeleton={nodes.Cube004_3.skeleton}
              castShadow
            />
            <skinnedMesh
              name='Cube004_4'
              geometry={nodes.Cube004_4.geometry}
              material={materials.Black}
              skeleton={nodes.Cube004_4.skeleton}
              castShadow
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/Character_Soldier.gltf');

export default Character;
