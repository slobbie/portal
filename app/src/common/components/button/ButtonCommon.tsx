// =============================================================================
// File    :  ButtonCommon.tsx
// Class   :
// Purpose :  ButtonCommon
// Date    :  2024.03
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================
import * as buttonStyle from '@common/components/button/styles/buttonCommon';
import React, { ButtonHTMLAttributes, Ref, forwardRef } from 'react';

export type buttonSize = 'S' | 'M' | 'L';
export type Variant = 'primaryStyle' | 'outlineStyle';

export interface IButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart' | 'style'
  > {
  /**
   * 정의된 버튼 사이즈
   */
  size?: buttonSize;
  /**
   *  버튼 안에 들어올 컨텐츠
   */
  children?: React.ReactNode | string;
  /**
   *  버튼 html type
   */
  htmlType?: 'button' | 'reset' | 'submit';
}

/**
 *
 * @property { IButtonProps }
 * @returns React.JSX.Element
 */
const ButtonCommon = forwardRef(function ButtonCommon(
  props: IButtonProps,
  forwardRef: Ref<HTMLButtonElement>
) {
  const { size = 'M', htmlType, children, ...rest } = props;

  return (
    <button
      css={buttonStyle.buttonCommonStyle(size)}
      ref={forwardRef}
      type={htmlType}
      {...rest}
    >
      {children}
    </button>
  );
});

export default ButtonCommon;
