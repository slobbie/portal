/** 포탈 식별자 (라우트 :id 및 localStorage currentModelNm 값과 동일) */
export const PORTAL_ID = Object.freeze({
  sandwich: '01',
  shoe: '02',
  ball: '03',
});

export type PortalId = (typeof PORTAL_ID)[keyof typeof PORTAL_ID];

/** 포탈 라우트 패턴 (wouter) */
export const PORTAL_ROUTE = '/portal/:id';

/** 특정 포탈 경로 생성 */
export const portalPath = (id: string) => `/portal/${id}`;

/** 포탈별 상호작용 안내 (미리보기 + 진입 후 힌트) */
export const PORTAL_HINTS: Record<string, string[]> = {
  [PORTAL_ID.sandwich]: ['재료 추가·제거', '주문하기'],
  [PORTAL_ID.shoe]: ['드래그로 회전', '파츠 컬러 변경'],
  [PORTAL_ID.ball]: ['마우스로 공 튀기기'],
};

/** 포탈 밖 오버뷰 기본 안내 */
export const OVERVIEW_HINT: string[] = [
  '방향키 or 버튼클릭으로 이동해 포탈에 들어가 보세요',
];
