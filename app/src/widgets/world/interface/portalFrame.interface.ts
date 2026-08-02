import { ReactNode } from 'react';
import { ThreeElements } from '@react-three/fiber';

/** 카드 프레임 컴포넌트 인터페이스 */
export interface IPortalFrame {
  id: string;
  name: string;
  author: string;
  bg: string;
  width?: number;
  height?: number;
  children: ReactNode;
  groupProps: ThreeElements['group'];
}
