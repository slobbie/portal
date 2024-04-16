// =============================================================================
// File    :  ColorPicker.tsx
// Class   :
// Purpose :  ColorPicker
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { HexColorPicker } from 'react-colorful';

interface IColorPicker {
  label?: string;
  color: string;
  onChange?: (newColor: string) => void;
}

/**
 * 컬러 픽커 컴포넌트
 * @returns React.JSX.Element
 */
const ColorPicker = ({ label, color, onChange }: IColorPicker) => {
  return (
    <div>
      <HexColorPicker className='picker' color={color} onChange={onChange} />
      <h1>{label}</h1>
    </div>
  );
};

export default ColorPicker;
