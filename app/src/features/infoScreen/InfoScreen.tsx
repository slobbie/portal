import * as Styles from '@features/infoScreen/styles/infoScreen.style';
import { useWorldStore } from '@shared/store/world.store';
import logoIcon from '@assets/icon/logo.png';
import { service } from '@shared/constants/service.constants';
import { usePortalParams } from '@shared/hooks/usePortalRoute';
import { useLocation } from 'wouter';

/**
 * 화면 설명 컴포넌트
 * @returns React.JSX.Element
 */
const InfoScreen = () => {
  const { matched: isParams } = usePortalParams();
  const [, setLocation] = useLocation();
  /** 포탈 상태 set 함수  */
  const setPortal = useWorldStore((state) => state.setPortal);

  /** 뒤로가기 이벤트  */
  const goBackRouterHandler = () => {
    localStorage.setItem(service.storage.currentModelNm, '');
    setPortal(false);
    setLocation('/');
  };

  return (
    <div css={Styles.Content}>
      <div css={Styles.Logo}>
        <img src={logoIcon} alt='logo' />
      </div>
      <a css={Styles.AboutText}>Creative by Slobbie</a>
      <a
        style={{
          position: 'absolute',
          top: 40,
          left: 40,
          fontSize: '13px',
          cursor: 'pointer',
        }}
        onClick={goBackRouterHandler}
      >
        {isParams ? '< 뒤로가기' : '캐릭터를 포탈속으로 이동시키세요.'}
      </a>
    </div>
  );
};

export default InfoScreen;
