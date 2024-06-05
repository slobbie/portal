import { Loader } from '@react-three/drei';
import CanvasWorld from '@src/feature/world/components/CanvasWorld';
import InfoScreen from '@feature/infoScreen/InfoScreen';

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

  return (
    <>
      <CanvasWorld />
      <InfoScreen />
      <Loader />
    </>
  );
}

export default App;
