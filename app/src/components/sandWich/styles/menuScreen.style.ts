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
  /* width: 330px; */
  /* min-height: 212px; */
  height: auto;
  overflow: hidden;
`;

export const buttonBox = css`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const button = css`
  width: 50px;
  height: 50px;
  border: 1px solid #333;
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const buttonItem = css`
  display: flex;
  flex-direction: column;
`;
