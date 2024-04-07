// =============================================================================
// File    :  Carousel.tsx
// Class   :
// Purpose :  Carousel
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import Card from './Card';

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const Carousel = ({ radius = 1.4, count = 3 }) => {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      // url={`/img${Math.floor(i % 10) + 1}_.jpg`}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0.5,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ));
};

export default Carousel;
