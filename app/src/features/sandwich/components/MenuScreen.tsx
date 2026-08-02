import ButtonCommon from '@shared/ui/button/ButtonCommon';
import { sandwichIngredients } from '@features/sandwich/constants/sandwichModel.constants';
import * as Styles from '@features/sandwich/components/styles/menuScreen.style';
import { useMemo } from 'react';
import { IMenuScreen } from '@features/sandwich/interface/menuScreen.interface';

/**
 * 샌드위치 메뉴 화면 컴포넌트
 * @property { (name: string, pPrice: number) => void } addMenuCallback 메뉴 추가 콜백 이벤트
 * @returns React.JSX.Element
 */
const MenuScreen = ({ addMenuCallback, orderHandlerCallback }: IMenuScreen) => {
  // 빵을 제외한 요소 반환
  const filerBread = Object.keys(sandwichIngredients).filter((item) => {
    return item !== 'bread';
  });

  // 메뉴 버튼 랜더링
  const renderMenuButton = useMemo(() => {
    return filerBread.map((item) => {
      return (
        <div key={item} css={Styles.button}>
          <ButtonCommon
            size='L'
            onClick={() => {
              addMenuCallback(item, sandwichIngredients[item].price);
            }}
          >
            $
            {sandwichIngredients[item].price +
              ' ' +
              sandwichIngredients[item].icon}
          </ButtonCommon>
        </div>
      );
    });
  }, [addMenuCallback, filerBread]);

  /** 주문 완료 */

  return (
    <>
      <div>
        <div css={Styles.buttonBox}>{renderMenuButton}</div>
      </div>
      <div css={Styles.orderBtnBox}>
        <ButtonCommon onClick={orderHandlerCallback}>주문하기</ButtonCommon>
      </div>
    </>
  );
};

export default MenuScreen;
