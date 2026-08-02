const keyControls = {
  forward: 'forward',
  back: 'backward',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

/** 키보드 입력 타입 */
export type keyControls = (typeof keyControls)[keyof typeof keyControls];
