import { Canvas, extend } from '@react-three/fiber';
import './App.css';
import {
  CameraControls,
  // Gltf,
  // Html,
  // MeshPortalMaterial,
  OrbitControls,
  // useGLTF,
} from '@react-three/drei';
// import Rig from './Rig';
// import Carousel from './components/Carousel';
import CardFrame from './components/CardFrame';
import CustomCamera from './components/CustomCamera';
// import RockingChairModel from './components/RockingChair';
import { geometry } from 'maath';
import SandWichModel from './components/model/SandWichModel';
import useSandWichModel from './hooks/useSandWichModel';
import TabletModel from './components/model/TabletModel';
import MenuScreen from './components/sandWich/MenuScreen';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentModelName } from './atom/model.atom';
import { useEffect, useMemo } from 'react';
import { useRoute } from 'wouter';
// import MaterialTest from './components/material/MaterialTest';
extend(geometry);
// roughness 거칠기 1아 거칠기 최대
// metalness 금속성  1 로 될수록 금속에 가까워짐
// clearcoat 매시 표면 코딩 1 일 수록 최대
// clearcoatRoughness 매사 표면 코딩 거칠기

// 유리 효과
// transparent={true}
// transmission 투명도 1이될수록 완전 투명
// thickness 유리의 두깨 0 과 10
// ior 굴절  1 과 2.333 사이 값을 권장 함

// maxDistance , minDistance 로 줌 제한 걸수 있음

function App() {
  // const matcap = useTexture('/matcap.jpg');
  const [param] = useRoute('/item/:id');
  const sandWichController = useSandWichModel();
  const currentModelNm = useRecoilValue(currentModelName);

  const resetCurrentModelName = useSetRecoilState(currentModelName);

  useEffect(() => {
    if (!param) {
      resetCurrentModelName('');
    }
  }, [param, resetCurrentModelName]);

  /** 샌드위치 메이커 스크린 노출 여부  */
  const isMenuScreen = useMemo(() => {
    return currentModelNm === '01';
  }, [currentModelNm]);

  return (
    <>
      <Canvas
        camera={{ fov: 75, position: [0, 1.5, 4] }}
        // camera={{ fov: 75, near: 10, far: 200, position: [0, 1.5, 4] }}
        eventSource={document.getElementById('root')!}
        eventPrefix='client'
      >
        <CameraControls />
        <OrbitControls />
        {/* <gridHelper />
        <ambientLight intensity={3} />
        <directionalLight intensity={3} /> */}
        {/* <color attach='background' args={['tomato']} /> */}
        <CardFrame
          id='01'
          name={`pick\n`}
          author='SandWich Maker'
          bg='#e4cdac'
          groupProps={{
            position: [-1.15, 0, 0],
            rotation: [0, 0.5, 0],
          }}
        >
          <SandWichModel />
          {isMenuScreen && (
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
          )}
        </CardFrame>
        {/* <group>
          <mesh name='01'>
            <roundedPlaneGeometry args={[1, 1.61803398875, 0.1]} />
            <MeshPortalMaterial>
              <RockingChairModel scale={0.008} />
            </MeshPortalMaterial>
          </mesh>
          <mesh name='01' position={[0, 0, -0.001]}>
            <roundedPlaneGeometry args={[1 + 0.05, 1.61803398875 + 0.05, 0.12]} />
            <meshBasicMaterial color='black' />
          </mesh>
        </group> */}

        {/* <RockingChairModel scale={0.008} /> */}
        {/* <CardFrame id='02' name='tea' author='Omar Faruq Tawsif'> */}
        {/* <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} /> */}
        {/* </CardFrame> */}
        {/* <CardFrame
          id='03'
          name='still'
          author='Omar Faruq Tawsif'
          bg='#d1d1ca'
          position={[1.15, 0, 0]}
          rotation={[0, -0.5, 0]}
        > */}
        {/* <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} /> */}
        {/* </CardFrame> */}
        <CustomCamera />
        {/* <fog attach='fog' args={['#a79', 8.5, 12]} />
        <ScrollControls horizontal={false} pages={4} infinite>
          <Rig rotation={[0, 0, 0]}>
            <axesHelper args={[5]} />
            <Carousel />
          </Rig>
        </ScrollControls> */}
      </Canvas>
      {/* <button
        onClick={() => {
          sandWichController.addSandWichIngredient('tomato');
        }}
      >
        버튼
      </button> */}
    </>
  );
}

export default App;
