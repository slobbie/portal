// =============================================================================
// File    :  SandWichContent.tsx
// Class   :
// Purpose :  SandWichContent
// Date    :  2024.07
// Author  :  JHS
// History :
// =============================================================================
// Copyright (C) 2024 JHS All rights reserved.
// =============================================================================

import { Text } from '@react-three/drei';
import SandWichModel from '@feature/sandwich/model/SandWichModel';
import TabletModel from '@feature/sandwich/model/TabletModel';
import MenuScreen from '@feature/sandwich/components/MenuScreen';
import useSandWichModel from '@feature/sandwich/hooks/useSandWichModel';
import { useRecoilState } from 'recoil';
import { isOrderState } from '@feature/sandwich/atom/sandWich.atom';
import PlateModel from '@feature/sandwich/model/PlateModel';
import MilkModel from '@feature/sandwich/model/MilkModel';
import MugModel from '@feature/sandwich/model/MugModel';
import TableModel from '@feature/sandwich/model/TableModel';
import { useMemo } from 'react';
import { Euler } from 'three';

interface ISandWichContent {
  isMenuScreen: boolean;
  sandWichTotalPriceState: number;
}

/**
 *
 * @param
 * @property { string } propsName 설명
 * @returns React.JSX.Element
 */
const SandWichContent = ({
  isMenuScreen,
  sandWichTotalPriceState,
}: ISandWichContent) => {
  const sandWichController = useSandWichModel();
  const [isOrder, setIsOrder] = useRecoilState(isOrderState);

  /** 주문 완료 핸들러 */
  const orderHandler = () => {
    setIsOrder(() => {
      return true;
    });
  };

  const groupRotation = useMemo(() => {
    return isOrder ? new Euler(0.2, 0, 0) : new Euler(0, 0, 0);
  }, [isOrder]);

  return (
    <>
      <group rotation={groupRotation}>
        <SandWichModel />
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
            총금액: $ {sandWichTotalPriceState}
          </Text>
          <TabletModel
            groupProps={{
              scale: 0.24,
              position: [0, -1.6, 0],
            }}
          >
            <MenuScreen
              orderHandlerCallback={orderHandler}
              addMenuCallback={sandWichController.addSandWichIngredient}
            />
          </TabletModel>
        </>
      )}
    </>
  );
};

export default SandWichContent;
