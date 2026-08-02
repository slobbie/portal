import { useEffect } from 'react';
import { useShoeStore } from '@features/shoe/store/shoe.store';
import * as Styles from '@features/shoe/components/styles/shoePanel.style';
import { HexColorPicker } from 'react-colorful';

/** 신발 파츠 목록 (모델 material 이름 기준) */
const SHOE_PARTS = [
  'laces',
  'mesh',
  'caps',
  'inner',
  'sole',
  'stripes',
  'band',
  'patch',
] as const;

/**
 * 신발 파츠 선택 + 컬러 변경 패널
 * @returns React.JSX.Element
 */
const ShoePanel = () => {
  const colors = useShoeStore((state) => state.colors);
  const currentParts = useShoeStore((state) => state.currentParts);
  const setCurrentParts = useShoeStore((state) => state.setCurrentParts);
  const setPartColor = useShoeStore((state) => state.setPartColor);

  /** 최초 진입 시 첫 파츠 자동 선택 */
  useEffect(() => {
    if (!currentParts) {
      setCurrentParts(SHOE_PARTS[0]);
    }
  }, [currentParts, setCurrentParts]);

  const activePart = currentParts || SHOE_PARTS[0];

  return (
    <>
      <div css={Styles.glow} />
      <div css={Styles.panel}>
        <h2 css={Styles.title}>Shoe Parts</h2>

        <div css={Styles.partList}>
          {SHOE_PARTS.map((part) => (
            <div
              key={part}
              css={Styles.partItem(part === activePart)}
              onClick={() => setCurrentParts(part)}
            >
              <span css={Styles.swatch(colors[part])} />
              <span css={Styles.partLabel}>{part}</span>
            </div>
          ))}
        </div>

        <div css={Styles.pickerBox}>
          <span css={Styles.selectedLabel}>{activePart}</span>
          <HexColorPicker
            color={colors[activePart]}
            onChange={(newColor) => setPartColor(activePart, newColor)}
          />
        </div>
      </div>
    </>
  );
};

export default ShoePanel;
