import { css } from '@emotion/react';

/** 하단중앙 글래스 힌트 pill */
export const hint = css`
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 18px;
  max-width: 92vw;
  white-space: nowrap;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.22)
  );
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  box-shadow:
    0 8px 28px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);

  user-select: none;
  pointer-events: none;
  transition: opacity 0.25s ease;
`;

export const separator = css`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.28);
`;

export const action = css`
  font-size: 12.5px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.62);
`;
