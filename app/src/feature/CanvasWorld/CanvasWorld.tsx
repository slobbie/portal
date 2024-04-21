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

import { Canvas, extend } from '@react-three/fiber';
import '@src/App.css';
import {
  // Box,
  // CameraControls,
  // Center,
  ContactShadows,
  // Gltf,
  Html,
  KeyboardControls,
  // Line,
  // Gltf,
  // Html,
  // MeshPortalMaterial,
  // PointerLockControls,
  Text,
  // useGLTF,
} from '@react-three/drei';
// import Rig from './Rig';
// import Carousel from './components/Carousel';
import CardFrame from '@components/CardFrame';
import CustomCamera from '@components/CustomCamera';
// import RockingChairModel from './components/RockingChair';
import { geometry } from 'maath';
import SandWichModel from '@components/model/SandWichModel';
import useSandWichModel from '@hooks/useSandWichModel';
import TabletModel from '@components/model/TabletModel';
import MenuScreen from '@components/sandWich/MenuScreen';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentModelName } from '@atom/model.atom';
import { Suspense, useEffect, useMemo } from 'react';
import { useRoute } from 'wouter';
import ShoeModel from '@components/model/ShoeModel';
import ColorPicker from '@common/components/colorPicker/ColorPicker';
import {
  shoeCurrentPartsName,
  shoeModelColorState,
} from '@atom/shoeModel.atom';
import { Physics } from '@react-three/rapier';
import Floor from '@common/components/floor/Floor';
import * as THREE from 'three';
import { sandWichTotalPrice } from '@src/atom/sandWich.atom';
// import MaterialTest from './components/material/MaterialTest';
extend(geometry);

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const CanvasWorld = () => {
  const [param] = useRoute('/item/:id');
  const sandWichController = useSandWichModel();
  const currentModelNm = useRecoilValue(currentModelName);
  /** 샌드위치 총합산 가격 */
  const sandWichTotalPriceState = useRecoilValue(sandWichTotalPrice);

  const resetCurrentModelName = useSetRecoilState(currentModelName);

  /**
   * 선택된 신발 모델 차트 이름 저
   */
  const currentShoePartsNm = useRecoilValue(shoeCurrentPartsName);

  /** 신발 모델 컬러 상태  */
  const [shoeColorState, setShoeColorState] =
    useRecoilState(shoeModelColorState);

  useEffect(() => {
    if (!param) {
      resetCurrentModelName('');
    }
  }, [param, resetCurrentModelName]);

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
  }, [currentModelNm, sandWichController]);

  return (
    <KeyboardControls map={keyMap}>
      <Canvas
        shadows
        camera={{ fov: 75, position: [0, 1.5, 4] }}
        // camera={{ fov: 75, near: 10, far: 200, position: [0, 1.5, 4] }}
        eventSource={document.getElementById('root')!}
        eventPrefix='client'
      >
        {/* <OrbitControls /> */}
        <ambientLight intensity={3} />
        {/* <CameraControls />
  <OrbitControls /> */}
        {/* <gridHelper />
  <ambientLight intensity={3} />
  <directionalLight intensity={3} /> */}
        {/* <color attach='background' args={['tomato']} /> */}

        <Suspense>
          <Physics>
            <group
              // position={[-0.5, 1.3, 0]}
              position={[0, 1.9, 0]}
              // rotation={[0, 0, -0.1]}
              rotation={[0, 0, 0]}
            >
              {/* <axesHelper args={[10]} /> */}
              {/* <Text3D size={0.2} font={'/Poppins_Bold.json'}>
        Play Ground
        <meshStandardMaterial color={'#000'} />
      </Text3D> */}
              <Text color='black' fontSize={1} scale={0.2} fontWeight='bold'>
                PORTAL
              </Text>
            </group>

            <CardFrame
              id='01'
              name={`pick\n`}
              author='SandWich Maker'
              bg='#e4cdac'
              groupProps={{
                position: [-1.3, 0, 0],
                // position: [-1.5, 0, 0],
                // rotation: [0, 0.5, 0],
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
            </CardFrame>
            <CardFrame
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
            </CardFrame>
            {/* <Suspense>
    <Physics> */}
            {/* <Controller> */}
            {/* <Character /> */}
            {/* </Controller> */}
            {/* <Ground />
        <PointerLockControls /> */}
            {/* <Ground /> */}
            <Floor />
            {/* </Physics> */}
            {/* </Suspense> */}
            {/* <CustomCamera /> */}
            <CustomCamera position={new THREE.Vector3(0, 0, 3.6)} />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
};

export default CanvasWorld;
