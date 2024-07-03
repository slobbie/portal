// =============================================================================
// File    : menuScreen.style.ts
// Class   :
// Purpose : menuScreen.style.ts 스타일
// Date    : 2024.04
// Author  : JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { css } from '@emotion/react';

export const container = css`
  padding: 10px;
  height: auto;
  overflow: hidden;
`;

export const buttonBox = css`
  display: grid;
  width: 100%;
  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  row-gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  /* align-content: center; */
  /* width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly; */
`;

export const button = css`
  width: 64px;
  height: 50px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const orderBtnBox = css`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 24px;
`;
