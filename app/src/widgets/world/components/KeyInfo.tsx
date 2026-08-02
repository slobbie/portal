import * as keyStyles from '@features/infoScreen/styles/infoScreen.style';
import Arrow from '@assets/icon/arrow.png';
import { useWorldStore } from '@shared/store/world.store';
import Space from '@shared/ui/space/Space';
import { keyControls } from '@widgets/world/interface/keyboardControls.interface';
import { TDirection } from '@widgets/world/interface/keyInfo.interface';
import { useKeyboardControls } from '@react-three/drei';

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

  /** 캐릭터 클릭 움직임 상태 토글 (Floor 리렌더 트리거) */
  const toggleCharacterMove = useWorldStore(
    (state) => state.toggleCharacterMove
  );

  /** 캐릭터 클릭으로 움직임 제어 함수 */
  const characterMoveController = (direction: TDirection) => {
    get()[direction] = !get()[direction];
    toggleCharacterMove();
  };

  return (
    <div css={keyStyles.KeyBoardInfoContent}>
      <div
        css={keyStyles.KeyBoardItem}
        onMouseDown={() => characterMoveController('forward')}
        onMouseUp={() => characterMoveController('forward')}
        onTouchStart={() => characterMoveController('forward')}
        onTouchEnd={() => characterMoveController('forward')}
      >
        <img
          src={Arrow}
          css={keyStyles.ArrowIcon('180deg', forwardPressed)}
          loading='lazy'
        />
      </div>
      <Space bottom={5} />
      <div css={keyStyles.KeyBoardBottomBox}>
        <div
          css={keyStyles.KeyBoardItem}
          onMouseDown={() => characterMoveController('left')}
          onMouseUp={() => characterMoveController('left')}
          onTouchStart={() => characterMoveController('left')}
          onTouchEnd={() => characterMoveController('left')}
        >
          <img
            src={Arrow}
            css={keyStyles.ArrowIcon('90deg', leftPressed)}
            loading='lazy'
          />
        </div>
        <Space right={5} />
        <div
          css={keyStyles.KeyBoardItem}
          onMouseDown={() => characterMoveController('backward')}
          onMouseUp={() => characterMoveController('backward')}
          onTouchStart={() => characterMoveController('backward')}
          onTouchEnd={() => characterMoveController('backward')}
        >
          <img
            src={Arrow}
            css={keyStyles.ArrowIcon('0deg', backPressed)}
            loading='lazy'
          />
        </div>
        <Space right={5} />
        <div
          css={keyStyles.KeyBoardItem}
          onMouseDown={() => characterMoveController('right')}
          onMouseUp={() => characterMoveController('right')}
          onTouchStart={() => characterMoveController('right')}
          onTouchEnd={() => characterMoveController('right')}
        >
          <img
            src={Arrow}
            css={keyStyles.ArrowIcon('270deg', rightPressed)}
            loading='lazy'
          />
        </div>
      </div>
    </div>
  );
};

export default KeyInfo;
