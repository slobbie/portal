import { Group, Vector3 } from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  IShoeModelColorState,
  useShoeStore,
} from '@features/shoe/store/shoe.store';
import { shoeModelGLTFResult } from '@features/shoe/interface/shoeModel.interface';
import { model3DPath } from '@shared/constants/3dModelPath.constants';
import { SHOE } from '@shared/constants/scene.constants';
import { PORTAL_ID } from '@shared/constants/portal.constants';
import { useMatchPortal } from '@shared/hooks/usePortalRoute';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

/**
 * 신발 모델 컴포넌트
 * @returns React.JSX.Element
 */
const ShoeModel = () => {
  const groupRef = useRef<Group>(null);
  const { nodes, materials } = useGLTF(
    model3DPath.shoe
  ) as unknown as shoeModelGLTFResult;
  /** 신발 파츠 컬러 */
  const shoeColorState: IShoeModelColorState = useShoeStore(
    (state) => state.colors
  );
  /** 현재 주소 경로  */
  const isParam = useMatchPortal(PORTAL_ID.shoe);
  /** 신발 모델 호버 된 파츠 */
  const [hovered, setHovered] = useState<string>('');
  /**
   * 선택한 모델 차트 이름 저장 함수
   */
  const setCurrentShoePartsNm = useShoeStore((state) => state.setCurrentParts);

  /** 드래그 회전 상태 (회전판) */
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const targetRotationY = useRef(0);

  /** 드래그로 신발을 좌우 회전 (마우스를 누른 채 이동할 때만) */
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPointerX.current;
      lastPointerX.current = e.clientX;
      targetRotationY.current += dx * SHOE.dragSensitivity;
    };
    const handleUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, []);

  /** 신발 위에서 드래그 시작 */
  const handleDragStart = (e: ThreeEvent<PointerEvent>) => {
    isDragging.current = true;
    lastPointerX.current = e.clientX;
  };

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      // 드래그로 누적된 Y 회전으로 부드럽게 보간
      groupRef.current.rotation.y +=
        (targetRotationY.current - groupRef.current.rotation.y) * 0.1;
      // 약간의 고정 기울기 유지
      groupRef.current.rotation.x = SHOE.tiltX;
      groupRef.current.rotation.z = SHOE.tiltZ;
      // 은은한 상하 float 유지
      groupRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    }
  });

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${shoeColorState[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="#fff-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    if (hovered.length > 0) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
        cursor
      )}'), auto`;
      return () => {
        document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
          auto
        )}'), auto`;
      };
    }
    // hover 해제 및 언마운트 시 커서 원복
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered, shoeColorState]);

  /** 선택한 신발 파츠 이름 저장 함수  */
  const setPartsName = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.object.name) {
      setCurrentShoePartsNm(e.object.name);
    }
  };

  /**
   * 신발 차트 호버 이벤트
   */
  const shoeHoveredEvent = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (e.object.name) {
      setHovered(e.object.name);
    }
  };

  /** 포지션 상수 */
  const position = useMemo(() => {
    return isParam ? new Vector3(0, 0, 0) : new Vector3(0.1, 0, -4);
  }, [isParam]);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={shoeHoveredEvent}
      onPointerOut={(e) => e.intersections.length === 0 && setHovered('')}
      // onPointerMissed={() => setCurrentShoePartsNm('')}
      onPointerDown={handleDragStart}
      onClick={setPartsName}
    >
      <ambientLight intensity={5} />
      <mesh
        name='laces'
        receiveShadow
        castShadow
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={shoeColorState.laces}
      />
      <mesh
        name='mesh'
        receiveShadow
        castShadow
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={shoeColorState.mesh}
      />
      <mesh
        name='caps'
        receiveShadow
        castShadow
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={shoeColorState.caps}
      />
      <mesh
        name='inner'
        receiveShadow
        castShadow
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={shoeColorState.inner}
      />
      <mesh
        name='sole'
        receiveShadow
        castShadow
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={shoeColorState.sole}
      />
      <mesh
        name='stripes'
        receiveShadow
        castShadow
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={shoeColorState.stripes}
      />
      <mesh
        name='band'
        receiveShadow
        castShadow
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={shoeColorState.band}
      />
      <mesh
        name='patch'
        receiveShadow
        castShadow
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={shoeColorState.patch}
      />
    </group>
  );
};

useGLTF.preload(model3DPath.shoe);

export default ShoeModel;
