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
import { sandWichIngredients } from '@src/constants/sandWich.constants';
import { RecoilRoot } from 'recoil';
import * as Styles from '@components/sandWich/styles/menuScreen.style';

interface IMenuScreen {
  addMenuCallback: (name: string, pPrice: number) => void;
}

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const MenuScreen = ({ addMenuCallback }: IMenuScreen) => {
  const filerBread = Object.keys(sandWichIngredients).filter((item) => {
    return item !== 'bread';
  });
  return (
    <RecoilRoot>
      <div css={Styles.buttonBox}>
        {filerBread.map((item) => {
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
        })}
      </div>
    </RecoilRoot>
  );
};

export default MenuScreen;
