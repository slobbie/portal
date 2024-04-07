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

import { sandWichIngredients } from '@src/constants/sandWich.constants';
import { RecoilRoot } from 'recoil';

interface IMenuScreen {
  addMenuCallback: (name: string) => void;
}

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const MenuScreen = ({ addMenuCallback }: IMenuScreen) => {
  return (
    <RecoilRoot>
      <div>
        {Object.keys(sandWichIngredients).map((item) => {
          return (
            <button
              key={item}
              onClick={() => {
                addMenuCallback(item);
              }}
            >
              {sandWichIngredients[item].icon}
            </button>
          );
        })}
      </div>
    </RecoilRoot>
  );
};

export default MenuScreen;
