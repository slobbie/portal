# 코드 컨벤션

## 디렉토리 구조 (간소화 FSD)

```
app/src/
├── app/           # 진입점·글로벌 (App.tsx, styles/)
├── widgets/       # 조립 계층 (world — Canvas 오케스트레이션, Character)
│   └── world/     # components/ model/ interface/
├── features/      # 사용자 인터랙션 단위 (도메인 슬라이스)
│   └── <feature>/ # components/ constants/ hooks/ interface/ model/ store/ styles/
├── shared/        # 계층 무관 공용
│   ├── ui/        # 공용 컴포넌트 (컴포넌트별 폴더 + styles/)
│   ├── constants/ # 전역 상수·토큰 (*.constants.ts)
│   ├── hooks/     # 공용 훅 (use*.ts)
│   └── store/     # 계층 교차 zustand 스토어 (*.store.ts)
├── assets/        # 정적 리소스 (icon 등)
└── main.tsx       # vite 진입점
```

### 계층 규칙 (import 방향)

- 상위 → 하위만 허용: `app → widgets → features → shared`
- 같은 계층끼리 직접 import 금지 (공유 필요 시 하위 계층으로 내림)
- 각 도메인 슬라이스는 자기 `model/` 을 소유한다. 별도 `entities/` 계층은 두지 않음 —
  모델이 자기 슬라이스의 hook/store 에 강결합돼 있어 분리 시 import 역방향이 생김.
- 계층 교차 상태(`world.store` 등)는 `shared/store` 에 둔다.

### 상수·토큰 규칙

- 매직 넘버·리터럴 금지. 재사용/도메인 의미가 있는 값은 `shared/constants` 토큰으로 추출.
  - `portal.constants.ts` — 포탈 id·라우트 (`PORTAL_ID`, `PORTAL_ROUTE`, `portalPath`)
  - `scene.constants.ts` — 카메라·물리·인터랙션 토큰 (`CAMERA`, `PHYSICS`, `SHOE`)
- 반복되는 라우트 매칭은 `shared/hooks/usePortalRoute` 훅으로 통일 (`useMatchPortal`, `usePortalParams`).

## Path alias

`tsconfig.json` 의 alias 만 사용한다. 계층 기준으로 정의돼 있다.

| alias | 대상 | 용도 |
| --- | --- | --- |
| `@app/*` | `src/app/*` | 진입점·글로벌 스타일 |
| `@widgets/*` | `src/widgets/*` | 조립 계층 |
| `@features/*` | `src/features/*` | 도메인 슬라이스 |
| `@shared/*` | `src/shared/*` | 공용 코드 |
| `@assets/*` | `src/assets/*` | 정적 리소스 |

## 파일 네이밍

- 컴포넌트: `PascalCase.tsx` (예: `CanvasWorld.tsx`)
- hook: `use` 접두사 camelCase (예: `useSandWichModel.tsx`)
- 스타일: `<대상>.style.ts`
- atom / constants / interface: `<대상>.atom.ts`, `<대상>.constants.ts`, `<대상>.interface.ts`

## 포맷 / 린트

- Prettier 가 포맷의 단일 기준 (`.prettierrc`). `yarn format` 으로 정리, CI 에서 `yarn format:check` 검증.
- ESLint 는 `eslint:recommended` + TS + react-hooks + `import/order` (alias 는 internal 그룹).
- 파일 상단 주석 헤더(작성자/날짜 블록)는 사용하지 않는다. 이력은 git 이 관리한다.

## 커밋 / 브랜치

- 브랜치: `feature/<주제>` → `dev` → `main`
- 커밋 prefix: `[FIX]`, `[UPDATE]` 등 대괄호 태그 사용 (기존 이력 관례 유지)
- `main` push 시 자동 배포, PR 시 lint / format / type / build 검증 (`.github/workflows`)
