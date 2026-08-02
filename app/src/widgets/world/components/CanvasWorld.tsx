import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import PortalFrame from '@widgets/world/components/PortalFrame';
import CameraController from '@shared/ui/camera/CameraController';
import { useSandwichStore } from '@features/sandwich/store/sandwich.store';
import ShoePanel from '@features/shoe/components/ShoePanel';
import OrderReceipt from '@features/sandwich/components/OrderReceipt';
import InteractionHint from '@widgets/world/components/InteractionHint';
import Floor from '@widgets/world/components/Floor';
import { Vector3 } from 'three';
import KeyInfo from '@widgets/world/components/KeyInfo';
import BallThumbnail from '@features/ball/components/BallThumbnail';
import { service } from '@shared/constants/service.constants';
import { PORTAL_ID } from '@shared/constants/portal.constants';
import { CAMERA } from '@shared/constants/scene.constants';
import { usePortalParams } from '@shared/hooks/usePortalRoute';
import { Physics } from '@react-three/rapier';
import { ContactShadows, KeyboardControls, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const ShoeModel = lazy(() => import('@features/shoe/model/ShoeModel'));
const BallExperience = lazy(
  () => import('@features/ball/components/BallExperience')
);
const SandwichContent = lazy(
  () => import('@features/sandwich/components/SandwichContent')
);

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const CanvasWorld = () => {
  const { matched: param, id: portalId } = usePortalParams();
  const resetSandwichModel = useSandwichStore((state) => state.reset);
  /** 현재 선택된 모델 이름 */
  const [currentModelNm, setCurrentModelNm] = useState('');
  /** 주문 상태 */
  const isOrder = useSandwichStore((state) => state.isOrder);

  /** 초기 선택 모델 상태 set */
  useEffect(() => {
    const currentModelNm =
      localStorage.getItem(service.storage.currentModelNm) ?? '';
    setCurrentModelNm(currentModelNm);
  }, [param]);

  useEffect(() => {
    if (!param) {
      localStorage.setItem(service.storage.currentModelNm, '');
      setCurrentModelNm('');
    }
  }, [param]);

  /** 샌드위치 메이커 스크린 노출 여부  */
  const isMenuScreen = useMemo(() => {
    return currentModelNm === PORTAL_ID.sandwich;
  }, [currentModelNm]);

  /** 신발 파츠 패널 노출 여부  */
  const isColorPicker = useMemo(() => {
    return currentModelNm === PORTAL_ID.shoe;
  }, [currentModelNm]);

  /** 공 포탈 진입 후에만 전체 물리 씬을 실행한다. */
  const isBallPortal = portalId === PORTAL_ID.ball;

  /** 키보드컨트롤 맵핑 */
  const keyMap = useMemo(
    () => [
      { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
      { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
      { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
      { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
      { name: 'jump', keys: ['Space'] },
    ],
    []
  );

  /** 샌드위치 모델 초기화 이펙트  */
  useEffect(() => {
    if (currentModelNm !== PORTAL_ID.sandwich) {
      resetSandwichModel();
    }
  }, [currentModelNm, resetSandwichModel]);

  /** 기능에 따른 카메라 z position 변경 */
  const wordCameraPosition = useMemo(() => {
    return (curModelNm: string) => {
      switch (curModelNm) {
        case PORTAL_ID.sandwich:
          return isOrder
            ? CAMERA.zDistance.sandwichOrdered
            : CAMERA.zDistance.sandwich;
        case PORTAL_ID.ball:
          return CAMERA.zDistance.ball;
        default:
          return CAMERA.zDistance.default;
      }
    };
  }, [isOrder]);

  /** 카메라 기준 position */
  const cameraPosition = useMemo(
    () => new Vector3(...CAMERA.overviewPosition),
    []
  );

  return (
    <KeyboardControls map={keyMap}>
      <Canvas
        shadows
        camera={{ fov: CAMERA.fov, position: CAMERA.initialPosition }}
        eventSource={document.getElementById('root')!}
        eventPrefix='client'
      >
        <ambientLight intensity={3} />
        <Suspense>
          <Physics>
            <group position={[0, 1.9, 0]} rotation={[0, 0, 0]}>
              <Text color='black' fontSize={1} scale={0.2} fontWeight='bold'>
                PORTAL
              </Text>
            </group>
            <PortalFrame
              id={PORTAL_ID.sandwich}
              name={`pick\n`}
              author='Sandwich Maker'
              bg='#e4cdac'
              groupProps={{
                position: [-1.3, 0, 0],
                rotation: [0, 0, 0],
              }}
            >
              <SandwichContent isMenuScreen={isMenuScreen} />
            </PortalFrame>
            <PortalFrame
              id={PORTAL_ID.shoe}
              name={`color\n`}
              author='Custom Shoe'
              bg='#fff'
              groupProps={{
                position: [0, 0, 0],
                rotation: [0, 0, 0],
              }}
            >
              <Suspense>
                <ShoeModel />
              </Suspense>
              <ContactShadows
                position={[0, -0.8, 0]}
                opacity={0.8}
                scale={10}
                blur={1.5}
                far={0.8}
              />
            </PortalFrame>
            <PortalFrame
              id={PORTAL_ID.ball}
              name={`ball\n`}
              author='Enjoy'
              bg='#fff'
              groupProps={{
                position: [1.3, 0, 0],
                rotation: [0, 0, 0],
              }}
            >
              {isBallPortal ? (
                <Suspense fallback={null}>
                  <BallExperience />
                </Suspense>
              ) : (
                <BallThumbnail />
              )}
            </PortalFrame>
            <Floor />
            <CameraController
              zPosition={wordCameraPosition(currentModelNm)}
              position={cameraPosition}
              disableRotate={isColorPicker || (isMenuScreen && isOrder)}
            />
          </Physics>
        </Suspense>
      </Canvas>
      {isColorPicker && <ShoePanel />}
      {isMenuScreen && isOrder && <OrderReceipt />}
      {!param && <KeyInfo />}
      <InteractionHint />
    </KeyboardControls>
  );
};

export default CanvasWorld;
