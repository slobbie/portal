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
import { Group } from 'three';
import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import animationConfig from '@src/common/constants/animation.constants';
import {
  ICharacter,
  TCharacterGLTFResult,
} from '@feature/world/interface/character.interface';
import { keyControls } from '@feature/world/interface/keyboardControls.interface';
import { model3DPath } from '@src/common/constants/3dModelPath.constants';

/**
 * 캐릭터 컴포넌트
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const Character = (groupProps: ICharacter) => {
  /** 캐릭터 ref */
  const characterRef = useRef<Group>(null);
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
    model3DPath.character
  ) as TCharacterGLTFResult;

  /** 현재 실행 되는 애니메이션 이름 상태 */
  const [animationState, setAnimationState] = useState('Stand');

  const { actions } = useAnimations(animations, characterRef);

  /** 키 눌렸는지 여부 */
  const isKeyPressed = useMemo(
    () => rightPressed || leftPressed || forwardPressed || backPressed,
    [rightPressed, leftPressed, forwardPressed, backPressed]
  );

  /** 키 입력에 따른 모션 상태 변경 */
  useEffect(() => {
    if (isKeyPressed) {
      setAnimationState(animationConfig.walk);
    } else {
      setAnimationState(animationConfig.stand);
    }
  }, [isKeyPressed]);

  /** 키 입력에 따른 캐릭터 모션 조정 */
  useEffect(() => {
    actions[animationState]?.reset().fadeIn(0.2).play();
    return () => {
      actions[animationState]?.fadeOut(0.2);
    };
  }, [actions, animationState]);

  return (
    <group ref={characterRef} {...groupProps} dispose={null}>
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

useGLTF.preload(model3DPath.character);

export default Character;
