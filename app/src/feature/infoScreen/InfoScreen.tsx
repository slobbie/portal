// =============================================================================
// File    :  InfoScreen.tsx
// Class   :
// Purpose :  InfoScreen
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import { useLocation, useRoute } from 'wouter';
import * as Styles from '@feature/infoScreen/styles/infoScreen.style';
import Arrow from '@assets/icon/arrow.png';
import { useSetRecoilState } from 'recoil';
import { isPortal } from '@src/atom/portal.atom';

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const InfoScreen = () => {
  const [params] = useRoute('/item/:id');
  const [, setLocation] = useLocation();
  /** 포탈 상태 set 함수  */
  const setPortal = useSetRecoilState(isPortal);

  /** 뒤로가기 이벤트  */
  const goBackRouterHandler = () => {
    setPortal(false);
    setLocation('/');
  };

  return (
    <div css={Styles.Content}>
      <div css={Styles.Logo}>HS</div>
      <a css={Styles.AboutText}>Creative by Slobbie</a>
      <div css={Styles.KeyBoardInfoContent}>
        <div css={Styles.KeyBoardItem}>
          <img src={Arrow} css={Styles.ArrowIcon('180deg')} />
        </div>
        <div css={Styles.KeyBoardBottomBox}>
          <div css={Styles.KeyBoardItem}>
            <img src={Arrow} css={Styles.ArrowIcon('90deg')} />
          </div>
          <div css={Styles.KeyBoardItem}>
            <img src={Arrow} css={Styles.ArrowIcon('0deg')} />
          </div>
          <div css={Styles.KeyBoardItem}>
            <img src={Arrow} css={Styles.ArrowIcon('270deg')} />
          </div>
        </div>
      </div>
      <a
        style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}
        href='#'
        onClick={goBackRouterHandler}
      >
        {params ? '< 뒤로가기' : '캐릭터를 포탈속으로 이동시키세요.'}
      </a>
    </div>
  );
};

export default InfoScreen;
