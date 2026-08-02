import SandwichModel from '@features/sandwich/model/SandwichModel';
import TabletModel from '@features/sandwich/model/TabletModel';
import MenuScreen from '@features/sandwich/components/MenuScreen';
import { useSandwichStore } from '@features/sandwich/store/sandwich.store';
import PlateModel from '@features/sandwich/model/PlateModel';
import MilkModel from '@features/sandwich/model/MilkModel';
import MugModel from '@features/sandwich/model/MugModel';
import TableModel from '@features/sandwich/model/TableModel';
import { useMemo } from 'react';
import { Euler } from 'three';
import { Text } from '@react-three/drei';

interface ISandwichContent {
  isMenuScreen: boolean;
}

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const SandwichContent = ({ isMenuScreen }: ISandwichContent) => {
  const addIngredient = useSandwichStore((state) => state.addIngredient);
  const isOrder = useSandwichStore((state) => state.isOrder);
  const setIsOrder = useSandwichStore((state) => state.setIsOrder);
  /** 샌드위치 총합산 가격 */
  const sandwichTotalPriceState = useSandwichStore((state) => state.totalPrice);

  /** 주문 완료 핸들러 */
  const orderHandler = () => {
    setIsOrder(true);
  };

  const groupRotation = useMemo(() => {
    return isOrder ? new Euler(0.2, 0, 0) : new Euler(0, 0, 0);
  }, [isOrder]);

  return (
    <>
      <group rotation={groupRotation}>
        <SandwichModel />
        <PlateModel />
        <MilkModel />
        <MugModel />
        <TableModel />
      </group>
      {isMenuScreen && !isOrder && (
        <>
          <Text
            color='black'
            fontSize={1}
            scale={0.2}
            fontWeight='bold'
            position={[0, 0, 0]}
          >
            총금액: $ {sandwichTotalPriceState}
          </Text>
          <TabletModel
            groupProps={{
              scale: 0.24,
              position: [0, -1.6, 0],
            }}
          >
            <MenuScreen
              orderHandlerCallback={orderHandler}
              addMenuCallback={addIngredient}
            />
          </TabletModel>
        </>
      )}
    </>
  );
};

export default SandwichContent;
