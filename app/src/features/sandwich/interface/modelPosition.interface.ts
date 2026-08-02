import { Euler } from 'three';

interface IVectorRotation extends Euler {}

export interface IModelPosition {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotation?: IVectorRotation;
  config: {
    mass: number;
    tension: number;
    friction: number;
  };
}

export type TVectorPosition = [number, number, number];

export interface IGroupAnimation {
  position: TVectorPosition;
  rotation: IVectorRotation;
  config: {
    tension: number;
    friction: number;
  };
}
