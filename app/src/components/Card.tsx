// =============================================================================
// File    :  Card.tsx
// Class   :
// Purpose :  Card
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

// import React, { useRef, useState } from 'react';
// import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
// import { easing } from 'maath';
// import * as THREE from 'three';

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const Card = ({ ...props }) => {
  // const ref = useRef(null);
  // const [hovered, hover] = useState(false);
  // const pointerOver = (e) => (e.stopPropagation(), hover(true))
  // const pointerOut = () => hover(false)
  // useFrame((_state, delta) => {
  //   easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
  //   easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
  //   easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
  // })
  return (
    <mesh {...props}>
      <RoundedBox
        args={[1, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
        radius={0.05} // Radius of the rounded corners. Default is 0.05
        // smoothness={4} // The number of curve segments. Default is 4
        // bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
        // creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
      >
        <meshPhongMaterial color='#f3f3f3' />
      </RoundedBox>
    </mesh>
  );
};

export default Card;
