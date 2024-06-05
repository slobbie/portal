// =============================================================================
// File    : cardFrame.interface.ts
// Class   :
// Purpose : cardFrame.interface.ts 인터페이스
// Date    : 2024.06
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

/** 카드 프레임 컴포넌트 인터페이스 */
export interface IPortalFrame {
  id: string;
  name: string;
  author: string;
  bg: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
  groupProps: JSX.IntrinsicElements['group'];
}
