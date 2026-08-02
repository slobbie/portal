import { useMemo } from 'react';
import { useSandwichStore } from '@features/sandwich/store/sandwich.store';
import { sandwichIngredients } from '@features/sandwich/constants/sandwichModel.constants';
import * as Styles from '@features/sandwich/components/styles/orderReceipt.style';

/**
 * 주문 완료 계산서 UI
 * @returns React.JSX.Element
 */
const OrderReceipt = () => {
  const sandwich = useSandwichStore((state) => state.sandwich);

  /** 재료명별 수량 집계 */
  const rows = useMemo(() => {
    const counts = new Map<string, number>();
    sandwich.forEach((item) => {
      counts.set(item.name, (counts.get(item.name) ?? 0) + 1);
    });
    return [...counts.entries()].map(([name, qty]) => {
      const unit = sandwichIngredients[name]?.price ?? 0;
      return { name, qty, lineTotal: unit * qty };
    });
  }, [sandwich]);

  /** 라인 합계 = 총액 (영수증 자체 정합성) */
  const totalPrice = useMemo(
    () => rows.reduce((sum, row) => sum + row.lineTotal, 0),
    [rows]
  );

  return (
    <div css={Styles.receipt}>
      <div css={Styles.header}>RECEIPT</div>
      <div css={Styles.subHeader}>SLOBBIE SANDWICH</div>

      <hr css={Styles.divider} />

      {rows.map((row) => (
        <div css={Styles.row} key={row.name}>
          <span>
            <span css={Styles.itemName}>{row.name}</span>
            <span css={Styles.itemQty}>x{row.qty}</span>
          </span>
          <span>${row.lineTotal.toFixed(2)}</span>
        </div>
      ))}

      <hr css={Styles.divider} />

      <div css={Styles.totalRow}>
        <span>TOTAL</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <div css={Styles.thanks}>THANK YOU!</div>
    </div>
  );
};

export default OrderReceipt;
