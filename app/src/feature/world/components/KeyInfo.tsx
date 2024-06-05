// =============================================================================
// File    :  KeyInfo.tsx
// Class   :
// Purpose :  KeyInfo
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import * as keyStyles from '@feature/infoScreen/styles/infoScreen.style';
import Arrow from '@assets/icon/arrow.png';
import { useKeyboardControls } from '@react-three/drei';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isCharacterMove } from '@src/common/atom/model.atom';
import Space from '@src/common/components/space/Space';
import { keyControls } from '@feature/world/interface/keyboardControls.interface';
import { TDirection } from '@feature/world/interface/keyInfo.interface';

/**
 * 키보드 모양 버튼 그룹 컴포넌트
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const KeyInfo = () => {
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
  const [, get] = useKeyboardControls<keyControls>();

  /** 캐릭터 클릭 움직임 상태 */
  const [isMovement, setIsMovement] = useRecoilState(isCharacterMove);

  /** 캐릭터 클릭으로 움직임 제어 함수 */
  const characterMoveController = (direction: TDirection) => {
    get()[direction] = !get()[direction];
    setIsMovement((prev) => !prev);
  };

  useEffect(() => {}, [isMovement]);

  return (
    <div css={keyStyles.KeyBoardInfoContent}>
      <div
        css={keyStyles.KeyBoardItem}
        onClick={() => characterMoveController('forward')}
        onTouchStart={() => characterMoveController('forward')}
        onTouchEnd={() => characterMoveController('forward')}
      >
        <img src={Arrow} css={keyStyles.ArrowIcon('180deg', forwardPressed)} />
      </div>
      <Space bottom={5} />
      <div css={keyStyles.KeyBoardBottomBox}>
        <div
          css={keyStyles.KeyBoardItem}
          onClick={() => characterMoveController('left')}
          onTouchStart={() => characterMoveController('left')}
          onTouchEnd={() => characterMoveController('left')}
        >
          <img src={Arrow} css={keyStyles.ArrowIcon('90deg', leftPressed)} />
        </div>
        <Space right={5} />
        <div
          css={keyStyles.KeyBoardItem}
          onClick={() => characterMoveController('backward')}
          onTouchStart={() => characterMoveController('backward')}
          onTouchEnd={() => characterMoveController('backward')}
        >
          <img src={Arrow} css={keyStyles.ArrowIcon('0deg', backPressed)} />
        </div>
        <Space right={5} />
        <div
          css={keyStyles.KeyBoardItem}
          onClick={() => characterMoveController('right')}
          onTouchStart={() => characterMoveController('right')}
          onTouchEnd={() => characterMoveController('right')}
        >
          <img src={Arrow} css={keyStyles.ArrowIcon('270deg', rightPressed)} />
        </div>
      </div>
    </div>
  );
};

export default KeyInfo;
