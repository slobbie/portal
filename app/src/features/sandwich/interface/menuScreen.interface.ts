/** 메뉴 스크린 컴포넌트 인터페이스 */
export interface IMenuScreen {
  addMenuCallback: (name: string, pPrice: number) => void;
  orderHandlerCallback: () => void;
}
