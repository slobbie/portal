import { extend, ReactThreeFiber } from 'react-three-fiber';
import { geometry } from 'maath';

extend(geometry);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedPlaneGeometry: ReactThreeFiber.Object3DNode<
        geometry,
        typeof geometry
      >;
    }
  }
}
