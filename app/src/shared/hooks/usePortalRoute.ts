import { PORTAL_ROUTE, portalPath } from '@shared/constants/portal.constants';
import { useRoute } from 'wouter';

/** 특정 포탈에 진입 중인지 여부 */
export const useMatchPortal = (id: string): boolean => {
  const [matched] = useRoute(portalPath(id));
  return matched;
};

/** 현재 포탈 라우트 매칭 여부 + 포탈 id */
export const usePortalParams = (): { matched: boolean; id?: string } => {
  const [matched, params] = useRoute(PORTAL_ROUTE);
  return { matched, id: params?.id };
};
