// =============================================================================
// File    :  MenuScreen.tsx
// Class   :
// Purpose :  MenuScreen
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import ButtonCommon from '@src/common/components/button/ButtonCommon';
import { sandWichIngredients } from '@src/feature/sandwich/constants/sandWich.constants';
import { RecoilRoot } from 'recoil';
import * as Styles from '@src/feature/sandwich/components/styles/menuScreen.style';
import { useMemo } from 'react';

interface IMenuScreen {
  addMenuCallback: (name: string, pPrice: number) => void;
}

/**
 * 샌드위치 메뉴 화면 컴포넌트
 * @property { (name: string, pPrice: number) => void } addMenuCallback 메뉴 추가 콜백 이벤트
 * @returns React.JSX.Element
 */
const MenuScreen = ({ addMenuCallback }: IMenuScreen) => {
  // 빵을 제외한 요소 반환
  const filerBread = Object.keys(sandWichIngredients).filter((item) => {
    return item !== 'bread';
  });
  // 메뉴 버튼 랜더링
  const renderMenuButton = useMemo(() => {
    return filerBread.map((item) => {
      return (
        <div key={item} css={Styles.button}>
          <ButtonCommon
            size='L'
            onClick={() => {
              addMenuCallback(item, sandWichIngredients[item].price);
            }}
          >
            {sandWichIngredients[item].icon}
          </ButtonCommon>
        </div>
      );
    });
  }, [addMenuCallback, filerBread]);

  return (
    <RecoilRoot>
      <div css={Styles.buttonBox}>{renderMenuButton}</div>
    </RecoilRoot>
  );
};

export default MenuScreen;
