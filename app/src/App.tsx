import { Loader } from '@react-three/drei';
import CanvasWorld from '@src/feature/world/components/CanvasWorld';
import InfoScreen from '@feature/infoScreen/InfoScreen';

const App = () => {
  return (
    <>
      <CanvasWorld />
      <InfoScreen />
      <Loader />
    </>
  );
};

export default App;
