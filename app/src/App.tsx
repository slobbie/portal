import CanvasWorld from '@src/feature/world/components/CanvasWorld';
import InfoScreen from '@feature/infoScreen/InfoScreen';
import { useCallback, useEffect, useState } from 'react';
import { service } from '@common/constants/service.constants';
import { Loader } from '@react-three/drei';

const App = () => {
  /** 모델 이름 상태 */
  const [currentModelNm, setCurrentModelNm] = useState('');

  /** 현재 선택된 모델 타입 */
  const getCurrentModelNm = useCallback(() => {
    const modelNm = localStorage.getItem(
      service.storage.currentModelNm
    ) as string;
    setCurrentModelNm(modelNm);
  }, []);

  useEffect(() => {
    localStorage.setItem(service.storage.currentModelNm, '');
  }, []);

  useEffect(() => {
    getCurrentModelNm();
  }, [getCurrentModelNm]);

  return (
    <>
      <CanvasWorld />
      <InfoScreen />
      {currentModelNm !== '01' && <Loader />}
    </>
  );
};

export default App;
