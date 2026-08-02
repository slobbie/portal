import { css } from '@emotion/react';

/** 영수증 종이 카드 (상단 중앙) */
export const receipt = css`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 248px;
  padding: 18px 20px 22px;

  background: #fdfdfb;
  border-radius: 4px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.18),
    0 2px 6px rgba(0, 0, 0, 0.08);
  font-family: 'Courier New', ui-monospace, monospace;
  color: #1a1a1a;
  user-select: none;

  animation: receiptIn 0.35s ease;

  @keyframes receiptIn {
    from {
      opacity: 0;
      transform: translate(-50%, -12px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

export const header = css`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.15em;
`;

export const subHeader = css`
  text-align: center;
  font-size: 10px;
  color: #888;
  margin-top: 2px;
  letter-spacing: 0.05em;
`;

export const divider = css`
  border: none;
  border-top: 1px dashed #bbb;
  margin: 12px 0;
`;

export const row = css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 12px;
  line-height: 1.9;
`;

export const itemName = css`
  text-transform: capitalize;
`;

export const itemQty = css`
  color: #999;
  margin-left: 4px;
`;

export const totalRow = css`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
`;

export const thanks = css`
  text-align: center;
  font-size: 10px;
  color: #888;
  margin-top: 14px;
  letter-spacing: 0.08em;
`;
