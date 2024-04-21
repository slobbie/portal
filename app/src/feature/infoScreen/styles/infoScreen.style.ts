// =============================================================================
// File    : infoScreen.style.ts
// Class   :
// Purpose : infoScreen.style.ts 스타일
// Date    : 2024.04
// Author  : JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { css } from '@emotion/react';

export const Content = css`
  position: 'absolute';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const AboutText = css`
  position: absolute;
  bottom: 46px;
  left: 90px;
  font-size: 13px;
`;

export const KeyBoardInfoContent = css`
  position: absolute;
  bottom: 40px;
  right: 40px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const KeyBoardItem = css`
  border-radius: 10px;
  border: 1px solid #333;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArrowIcon = (rotate: string, press: boolean) => {
  return css`
    width: 80%;
    height: 80%;
    transform: rotate(${rotate});
    opacity: ${press ? 0.2 : 1};
  `;
};

export const KeyBoardBottomBox = css`
  display: flex;
  width: auto;
`;

export const Logo = css`
  position: absolute;
  bottom: 40px;
  left: 40px;
  width: 40px;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  font-style: oblique;

  img {
    width: 40px;
    height: 40px;
  }
`;
