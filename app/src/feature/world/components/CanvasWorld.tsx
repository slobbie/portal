// =============================================================================
// File    :  CanvasWorld.tsx
// Class   :
// Purpose :  CanvasWorld
// Date    :  2024.04
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { Canvas } from '@react-three/fiber';
import '@src/App.css';
import {
  ContactShadows,
  Html,
  KeyboardControls,
  Text,
} from '@react-three/drei';
import PortalFrame from '@src/feature/world/components/PortalFrame';
import CameraController from '@src/common/components/camera/CameraController';
import SandWichModel from '@src/feature/sandwich/model/SandWichModel';
import useSandWichModel from '@src/feature/sandwich/hooks/useSandWichModel';
import TabletModel from '@src/feature/sandwich/model/TabletModel';
import MenuScreen from '@src/feature/sandwich/components/MenuScreen';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRoute } from 'wouter';
import ShoeModel from '@src/feature/shoe/model/ShoeModel';
import ColorPicker from '@common/components/colorPicker/ColorPicker';
import {
  shoeCurrentPartsName,
  shoeModelColorState,
} from '@src/feature/shoe/atom/shoeModel.atom';
import { Physics } from '@react-three/rapier';
import Floor from '@src/feature/world/components/Floor';
import * as THREE from 'three';
import { sandWichTotalPrice } from '@src/feature/sandwich/atom/sandWich.atom';
import KeyInfo from '@src/feature/world/components/KeyInfo';
import BallModel from '@src/feature/ball/model/BallModel';
import PointerRigidBody from '@feature/ball/components/PointerRigidBody';
import { service } from '@src/common/constants/service.constants';

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const CanvasWorld = () => {
  const [param] = useRoute('/portal/:id');
  const sandWichController = useSandWichModel();
  /** 샌드위치 총합산 가격 */
  const sandWichTotalPriceState = useRecoilValue(sandWichTotalPrice);
  /** 현재 선택된 모델 이름 */
  const [currentModelNm, setCurrentModelNm] = useState('');
  /**
   * 선택된 신발 모델 파트 이름
   */
  const currentShoePartsNm = useRecoilValue(shoeCurrentPartsName);

  /** 신발 모델 컬러 상태  */
  const [shoeColorState, setShoeColorState] =
    useRecoilState(shoeModelColorState);

  /** 초기 선택 모델 상태 set */
  useEffect(() => {
    const currentModelNm = localStorage.getItem(
      service.storage.currentModelNm
    ) as string;
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
    return currentModelNm === '01';
  }, [currentModelNm]);

  /** 모델 컬러 픽커 노출 여부  */
  const isColorPicker = useMemo(() => {
    return currentModelNm === '02';
  }, [currentModelNm]);

  /** 신발 모델 컬러 변경 이벤트  */
  const onChangeShoePartsColor = (newColor: string) => {
    setShoeColorState((prevState) => {
      return {
        ...prevState,
        [currentShoePartsNm]: newColor,
      };
    });
  };

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
    if (currentModelNm !== '01') {
      sandWichController.resetSandWichModel();
    }
  }, [currentModelNm]);

  /** 기능에 따른 카메라 z position 변경 */
  const wordCameraPosition = useMemo(() => {
    return (curModelNm: string) => {
      switch (curModelNm) {
        case '03':
          return 13;
        default:
          return 3;
      }
    };
  }, []);

  /** 볼 생성 배열  */
  const balls = useMemo(() => {
    return [...Array(50)].map(() => ({
      scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)],
    }));
  }, []);

  return (
    <KeyboardControls map={keyMap}>
      <Canvas
        shadows
        camera={{ fov: 75, position: [0, 1.5, 4] }}
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
              id='01'
              name={`pick\n`}
              author='SandWich Maker'
              bg='#e4cdac'
              groupProps={{
                position: [-1.3, 0, 0],
                rotation: [0, 0, 0],
              }}
            >
              <SandWichModel />
              {isMenuScreen && (
                <>
                  <Text
                    color='black'
                    fontSize={1}
                    scale={0.2}
                    fontWeight='bold'
                    position={[1.7, 2, 0]}
                  >
                    총금액: $ {sandWichTotalPriceState}
                  </Text>
                  <TabletModel
                    groupProps={{
                      scale: 0.3,
                      position: [2.5, -0.3, 0],
                    }}
                  >
                    <MenuScreen
                      addMenuCallback={sandWichController.addSandWichIngredient}
                    />
                  </TabletModel>
                </>
              )}
            </PortalFrame>
            <PortalFrame
              id='02'
              name={`color\n`}
              author='Custom Shoe'
              bg='#fff'
              groupProps={{
                position: [0, 0, 0],
                rotation: [0, 0, 0],
              }}
            >
              <ShoeModel />
              {isColorPicker && (
                <Html position={[1.5, 1.5, 0]}>
                  <ColorPicker
                    label={currentShoePartsNm}
                    color={shoeColorState[currentShoePartsNm]}
                    onChange={onChangeShoePartsColor}
                  />
                </Html>
              )}
              <ContactShadows
                position={[0, -0.8, 0]}
                opacity={0.8}
                scale={10}
                blur={1.5}
                far={0.8}
              />
            </PortalFrame>
            <PortalFrame
              id='03'
              name={`ball\n`}
              author='Enjoy'
              bg='#fff'
              groupProps={{
                position: [1.3, 0, 0],
                rotation: [0, 0, 0],
              }}
            >
              <ambientLight intensity={1} />
              <spotLight
                position={[20, 20, 25]}
                penumbra={1}
                angle={0.2}
                color='white'
                castShadow
                shadow-mapSize={[512, 512]}
              />
              <directionalLight position={[0, 5, -4]} intensity={4} />
              <Physics gravity={[0, 0, 0]} interpolate>
                <PointerRigidBody />
                {balls.map((props, i) => (
                  <BallModel key={i} {...props} />
                ))}
              </Physics>
            </PortalFrame>
            <Floor />
            <CameraController
              zPosition={wordCameraPosition(currentModelNm)}
              position={new THREE.Vector3(0, 0, 3.6)}
            />
          </Physics>
        </Suspense>
      </Canvas>
      {!param && <KeyInfo />}
    </KeyboardControls>
  );
};

export default CanvasWorld;
