# Portal 개선 계획

> 2026-07-29 코드 리뷰 기반. 진행 순서: Phase 1 → 2 → 3.
> 각 Phase는 별도 브랜치로 작업 후 PR.

---

## 목표

1. 사용자에게 보이는 버그 제거 (모델 경로, 깜빡임, 컬러 픽커)
2. 동작하지 않는 CI/CD 복구 및 검증 파이프라인 추가
3. 코드 컨벤션 통일로 유지보수성 확보

---

## Phase 1 — 버그 수정 (`feature/bugfix`)

### 🔴 Critical

- [x] **재료 모델 경로 오류** — `src/feature/sandwich/constants/sandWichModel.constants.ts:66,71`
  - egg, shrimp 둘 다 `modelPath.ketchup`을 참조. 올바른 모델 경로로 교체.
- [x] **CSS 무효값** — `src/feature/infoScreen/styles/infoScreen.style.ts:15`
  - `position: 'absolute'` → 따옴표 제거.
- [x] **잘못된 선택자** — `src/common/styles/globalStyle.tsx:147`
  - `root {` 블록 제거 (141줄 `#root`와 병합).

### 🟠 사용자 체감 버그

- [x] **샌드위치 추가 시 깜빡임**
  - 재료 모델 전체 `useGLTF.preload` + Text3D 폰트 프리로드 (suspend 자체 제거)
  - `sandWichTotalPrice` recoil 구독을 CanvasWorld → SandWichContent로 이동 (씬 전체 리렌더 차단)
- [x] **컬러 픽커가 카메라 따라 이동** — `src/feature/world/components/CanvasWorld.tsx:190`
  - drei `<Html position={[1.5,1.5,0]}>` 제거, ColorPicker를 Canvas 밖 DOM 오버레이(`position: fixed`)로 이동.
  - 노출 조건 `currentModelNm === '02'` 유지, recoil 상태 공유 그대로 동작.

### 🟡 로직/성능

- [x] `Floor.tsx:65` — useFrame 내 매 프레임 impulse 객체 생성 → ref 재사용
- [x] `Floor.tsx:75` — 전진 속도 무제한 (후진만 제한) → 대칭 제한 추가
- [x] `PointerRigidBody.tsx:29`, `BallModel.tsx:32`, `CanvasWorld.tsx:238` — 렌더마다 `new Vector3()` → useMemo/useRef
- [x] `CameraController.tsx:33` — useEffect 의존성 배열 누락 → 추가
- [x] `Floor.tsx:60`, `KeyInfo.tsx:50` — 빈 useEffect 제거
- [x] `KeyInfo.tsx:46` — 키보드 상태 직접 변이 제거
- [x] `ShoeModel.tsx:56` — cursor cleanup 누락 (언마운트 시 복원)
- [x] `InfoScreen.tsx:42` — `href='#'` + onClick에 preventDefault 없음
- [x] `App.tsx:13` — localStorage null 미처리 → `?? ''`
- [x] `useSandWichModel.tsx:110`, `SandWichModel.tsx:74` — 의존성 배열 누락
- [ ] `CanvasWorld.tsx:229` — 배열 index key → 고유 id (보류: 정적 배열이라 현행 유지)
- [x] `Character.tsx:28` — props 타입/스프레드 불일치 정리

---

## Phase 2 — CI/CD 복구 (`feature/ci-fix`)

- [x] **워크플로우 위치 이전** — `app/.github/workflows/build.yml` → 루트 `.github/workflows/`
  - GitHub은 저장소 루트 `.github/`만 인식. 현재 워크플로우는 아예 실행되지 않음.
- [x] **working-directory 지정** — `defaults: run: working-directory: app`
- [x] **트리거 수정** — PR close 전체 → merge된 경우만
  - `if: github.event.pull_request.merged == true` 또는 `on: push: branches: [main]`
- [x] **검증 잡 추가** — PR 대상 `yarn lint` + `tsc --noEmit` 잡 (배포와 분리)
- [x] **배포 방식 단일화** — deploy-action vs package.json `gh-pages` 스크립트 중복 제거
- [x] **의존성 정리** — `@emotion/babel-plugin`, `gh-pages` → devDependencies
- [x] `vite.config.ts:19` — visualizer `open: true` dev 전용으로 게이트

---

## Phase 3 — 컨벤션 정리 (`feature/convention`)

- [x] **path alias 통일** — `@src/`, `@feature/`, `@common/` 혼용 → 단일 규칙 결정 후 전체 적용
- [x] **스타일 파일 네이밍 통일** — `*.style.ts`로 통일 (`buttonCommon.ts` 등 리네임)
- [ ] **네이밍 통일** — `SandWich`/`sandWich` 표기 정리 (보류 항목 참고)
- [x] **파일 헤더 보일러플레이트 제거** — 전 파일 중복 주석 삭제 (git history가 대체)
- [x] **ESLint 룰 보강** — import 순서(import/order), 네이밍 컨벤션 룰 추가
- [x] **Prettier 도입** — 설정 파일 추가, lint 스크립트에 format check 연동
- [x] **디렉토리 구조 문서화** — feature 구조(atom/components/constants/hooks/interface/model) README에 명시

---

## Phase 4 — FSD 구조 전환 (`feature/fsd`)

> 동작 불변, 구조만 이동. React 업그레이드(Phase 5)보다 먼저 진행해 diff 분리.

### 목표 구조 (간소화 FSD)

```
app/src/
├── app/        # 진입점, 글로벌 스타일, 프로바이더 (현 App.tsx, main.tsx, common/styles)
├── widgets/    # 조립 계층 (현 feature/world — CanvasWorld, Floor, PortalFrame, KeyInfo)
├── features/   # 사용자 인터랙션 (현 feature/sandwich, shoe, ball, infoScreen)
├── entities/   # 도메인 3D 모델 (Character, ShoeModel, BallModel, 샌드위치 모델류)
└── shared/     # 공용 (현 common/ — ui, lib, config, assets)
```

### 규칙

- import 방향은 상위 → 하위만 허용: `app → widgets → features → entities → shared`
- 같은 계층끼리 직접 import 금지 (필요하면 하위 계층으로 내리기)
- path alias 를 계층 기준으로 재정의: `@app/*`, `@widgets/*`, `@features/*`, `@entities/*`, `@shared/*`

### 작업 항목

- [ ] 디렉토리 이동 + alias 재정의 (tsconfig paths, eslint import/order pathGroups 갱신)
- [ ] 계층 위반 import 정리 (예: widgets 의 CanvasWorld 가 features 상태를 직접 구독하는 부분 검토)
- [ ] `sandWich` → `sandwich` 파일/식별자 표기 통일 (이동하는 김에 함께 처리)
- [ ] CONVENTIONS.md 구조 문서 갱신
- [ ] 검증: lint / tsc / build + 수동 플레이 (3개 포탈 전 기능)

---

## Phase 5 — React 19 + R3F 세트 업그레이드 (`feature/react19`)

> Recoil 이 아카이브된 상태(peer deps React 18까지)라 상태관리 교체가 선행 조건.
> R3F 생태계는 React 버전 강결합 — 단독 업그레이드 불가, 세트로 진행.

### 5-1. Recoil → zustand 교체 (React 18 상태에서 먼저)

atom 6개 → 스토어 3개:

| 현재 recoil atom | zustand 스토어 |
| --- | --- |
| `sandWichState`, `sandWichTotalPrice`, `isOrderState` | `useSandwichStore` (add/remove/reset 액션 포함 — `useSandWichModel` 훅 로직 흡수 후 훅 제거) |
| `shoeModelColorState`, `shoeCurrentPartsName` | `useShoeStore` |
| `isCharacterMove`, `isPortal` | `useWorldStore` |

- [ ] 스토어 3개 작성 + 컴포넌트 구독 교체 (셀렉터 구독으로 불필요 리렌더 축소)
- [ ] `KeyInfo` 키보드 상태 직접 변이 트릭을 스토어 액션으로 정리 (보류 항목 해소)
- [ ] recoil 의존성 제거
- [ ] 수동 회귀: 샌드위치 추가/제거/주문, 신발 컬러, 캐릭터 이동

### 5-2. React 19 + R3F 생태계 메이저 업그레이드

| 패키지 | 현재 | 목표 |
| --- | --- | --- |
| react / react-dom | 18.2 | 19.x |
| @react-three/fiber | 8.16 | 9.x |
| @react-three/drei | 9.105 | 10.x |
| @react-three/rapier | 1.3 | 2.x |
| @react-spring/three | 9.7 | 10.x |
| three | 0.163 | R3F 9 권장 버전으로 동반 상향 |

- [ ] `ecctrl` 사용처 확인 — 미사용이면 업그레이드 전에 제거 (leva 도 동일 확인)
- [ ] React 19 / R3F 9 마이그레이션: `useFrame` 의 `mouse` → `pointer` (PointerRigidBody), 이벤트 시스템 변경 대응
- [ ] drei 10 API 변경 확인: `Html`, `Text3D`, `CameraControls`, `KeyboardControls`, `Gltf`, `ContactShadows`
- [ ] rapier 2 물리 API 변경 대응 + 캐릭터 이동/볼 물리 재튜닝
- [ ] @types/react 19 대응, tsc 전체 통과
- [ ] 수동 회귀: 3개 포탈 전 기능 + 물리 동작 (제일 리스크 큰 구간)

### 리스크 메모

- 자동 테스트 없음 → 검증은 수동 플레이 전수. 예상 규모 2~3일.
- rapier 1→2 가 가장 예측 어려움. 물리 파라미터 (impulse, damping) 재튜닝 가능성.
- 5-1 과 5-2 는 커밋 분리 — zustand 교체가 깨지면 물리 탓인지 상태 탓인지 구분 안 됨.

---

## 진행 현황

| Phase | 브랜치 | 상태 |
| --- | --- | --- |
| 1. 버그 수정 | `feature/bugfix` | ✅ 완료 |
| 2. CI/CD 복구 | `feature/ci-fix` | ✅ 완료 |
| 3. 컨벤션 정리 | `feature/convention` | ✅ 완료 |
| 4. FSD 구조 전환 | `feature/fsd` | ✅ 완료 (미커밋) |
| 5-1. Recoil → zustand | `feature/zustand` | ✅ 완료 (미커밋) |
| 5-2. React 19 세트 업글 | `feature/react19` | ✅ 코드 완료 (미커밋, 런타임 검증 대기) |

---

## 보류 항목

- `sandWich` vs `sandwich` 표기 통일 → **Phase 4 에서 처리**
- `KeyInfo.tsx` 키보드 상태 직접 변이 → **Phase 5-1 에서 처리**
- `CanvasWorld.tsx` ball 배열 index key — 배열이 정적이라 실질 문제 없음. 현행 유지.
