import { css } from '@emotion/react';

/** 패널 뒤 컬러 글로우 — 유리가 프로스트할 색을 제공(글래스 효과 가시화) */
export const glow = css`
  position: fixed;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  z-index: 9;
  width: 300px;
  height: 400px;
  pointer-events: none;
  filter: blur(44px);
  opacity: 0.75;
  background:
    radial-gradient(
      circle at 28% 18%,
      rgba(10, 132, 255, 0.55),
      transparent 60%
    ),
    radial-gradient(
      circle at 82% 68%,
      rgba(255, 55, 150, 0.45),
      transparent 55%
    ),
    radial-gradient(circle at 50% 92%, rgba(94, 92, 230, 0.5), transparent 60%);
`;

/** iOS 리퀴드 글래스 톤 */
export const panel = css`
  position: fixed;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  z-index: 10;
  width: 244px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.32),
    rgba(255, 255, 255, 0.12)
  );
  backdrop-filter: blur(28px) saturate(200%);
  -webkit-backdrop-filter: blur(28px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 26px;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    inset 0 -1px 2px rgba(0, 0, 0, 0.05);
  user-select: none;
`;

export const title = css`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  letter-spacing: -0.01em;
  padding-left: 2px;
`;

export const partList = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const partItem = (selected: boolean) => css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 14px;
  cursor: pointer;

  background: ${
    selected ? 'rgba(255, 255, 255, 0.72)' : 'rgba(255, 255, 255, 0.32)'
  };
  border: 1px solid
    ${selected ? 'rgba(10, 132, 255, 0.9)' : 'rgba(255, 255, 255, 0.45)'};
  box-shadow: ${
    selected
      ? '0 4px 14px rgba(10, 132, 255, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
      : 'inset 0 1px 0 rgba(255, 255, 255, 0.5)'
  };
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.12s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.55);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const swatch = (color: string) => css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${color};
  border: 2px solid rgba(255, 255, 255, 0.85);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.12),
    0 1px 3px rgba(0, 0, 0, 0.18);
  flex-shrink: 0;
`;

export const partLabel = css`
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  text-transform: capitalize;
`;

export const pickerBox = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding-top: 2px;

  .react-colorful {
    width: 100%;
    height: 132px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.16),
      inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  }

  .react-colorful__saturation {
    border-radius: 0;
  }

  .react-colorful__hue {
    height: 18px;
  }

  .react-colorful__pointer {
    width: 18px;
    height: 18px;
  }
`;

export const selectedLabel = css`
  font-size: 13px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.82);
  text-transform: capitalize;
  text-align: center;
  letter-spacing: -0.01em;
`;
