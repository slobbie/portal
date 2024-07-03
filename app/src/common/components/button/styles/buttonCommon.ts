// =============================================================================
// File    : buttonCommon.ts
// Class   :
// Purpose : buttonCommon.ts 스타일
// Date    : 2024.03
// Author  : JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { css } from '@emotion/react';
import { theme } from '@src/common/styles/theme';

// const fontSizeL = css`
//   ${theme.fonts.button_L};
// `;

const fontSizeM = css`
  ${theme.fonts.button_M};
`;

const fontSizeS = css`
  ${theme.fonts.button_S};
`;

export const sizeSets = {
  S: {
    fontSize: fontSizeS,
    width: '25%',
    height: '50px',
  },
  M: {
    fontSize: fontSizeM,
    width: '45%',
    height: '50px',
  },
  L: {
    fontSize: fontSizeM,
    width: '100%',
    height: '50px',
  },
};

const commonStyle = () => {
  return css`
    outline: none;
    /* display: inline-flex; */
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    font-family: inherit;
    background-color: ${theme.colors.bg_f0f0f0};
    color: ${theme.colors.text_333};
    /* border: none; */
    font-weight: 600;
    border: 1px solid ${theme.colors.text_333};
    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 0.7;
    }
    &:disabled {
      filter: grayscale(15%);
      opacity: 0.6;
      background-color: ${theme.colors.bg_23232a};
      color: ${theme.colors.text_fff};
      border: none;
      &:hover {
        opacity: 0.7;
      }
    }
    transition: 0.1s background ease-in, 0.1s color ease-in;
    &:focus-visible {
      box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
    }
  `;
};

type TButtonSize = 'S' | 'M' | 'L';

const ButtonStyles = (size: TButtonSize) => {
  return css`
    width: ${sizeSets[size].width};
    height: ${sizeSets[size].height};
    font-size: ${sizeSets[size].fontSize};
    border-radius: 5px;
  `;
};

export const buttonCommonStyle = (size: TButtonSize) => {
  return css`
    ${commonStyle()}
    ${ButtonStyles(size)}
  `;
};
