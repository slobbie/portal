import { Loader } from '@react-three/drei';
import CanvasWorld from '@src/feature/world/components/CanvasWorld';
import InfoScreen from '@feature/infoScreen/InfoScreen';
import { useEffect } from 'react';
import { service } from '@common/constants/service.constants';

const App = () => {
  useEffect(() => {
    localStorage.setItem(service.storage.currentModelNm, '');
  }, []);

  return (
    <>
      <CanvasWorld />
      <InfoScreen />
      <Loader />
    </>
  );
};

export default App;
