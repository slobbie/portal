import CanvasWorld from '@widgets/world/components/CanvasWorld';
import InfoScreen from '@features/infoScreen/InfoScreen';
import { useCallback, useEffect, useState } from 'react';
import { service } from '@shared/constants/service.constants';
import { PORTAL_ID } from '@shared/constants/portal.constants';
import { Loader } from '@react-three/drei';

const App = () => {
  /** 모델 이름 상태 */
  const [currentModelNm, setCurrentModelNm] = useState('');

  /** 현재 선택된 모델 타입 */
  const getCurrentModelNm = useCallback(() => {
    const modelNm = localStorage.getItem(service.storage.currentModelNm) ?? '';
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
      {currentModelNm !== PORTAL_ID.sandwich && <Loader />}
    </>
  );
};

export default App;
