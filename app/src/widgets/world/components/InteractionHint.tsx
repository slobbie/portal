import { Fragment } from 'react';
import { useWorldStore } from '@shared/store/world.store';
import { usePortalParams } from '@shared/hooks/usePortalRoute';
import {
  OVERVIEW_HINT,
  PORTAL_HINTS,
} from '@shared/constants/portal.constants';
import * as Styles from '@widgets/world/components/styles/interactionHint.style';

/**
 * 컨텍스트별 상호작용 안내 pill
 * - 포탈 안: 해당 포탈 조작 안내
 * - 포탈 밖 + 포탈 호버: 해당 포탈 미리보기
 * - 그 외: 오버뷰 이동 안내
 * @returns React.JSX.Element
 */
const InteractionHint = () => {
  const { id: portalId } = usePortalParams();
  const hoveredPortalId = useWorldStore((state) => state.hoveredPortalId);

  const actions =
    (portalId ? PORTAL_HINTS[portalId] : undefined) ??
    (hoveredPortalId ? PORTAL_HINTS[hoveredPortalId] : undefined) ??
    OVERVIEW_HINT;

  return (
    <div css={Styles.hint}>
      {actions.map((action, index) => (
        <Fragment key={action}>
          {index > 0 && <span css={Styles.separator}>·</span>}
          <span css={Styles.action}>{action}</span>
        </Fragment>
      ))}
    </div>
  );
};

export default InteractionHint;
