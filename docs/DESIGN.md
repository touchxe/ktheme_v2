# DESIGN.md — ModuTheme Design System

이 파일은 프로젝트의 디자인 토큰과 스타일링 규칙에 대한 **single source of truth**입니다.
`AGENTS.md`가 "어떻게 빌드할지"라면 이 파일은 "어떻게 보일지"를 정의합니다.

**기반**: VoltAgent/awesome-design-md의 Linear.app/DESIGN.md를 참조해 커스텀
**적용 대상**: 모든 UI 컴포넌트, 페이지, 랜딩, 대시보드
**강제 방법**: `.cursor/rules/010-design-system.mdc`가 `alwaysApply: true`로 UI 파일에서 자동 참조

---

## 1. Visual Theme

**테마 이름**: Modern SaaS Productivity
**분위기**: refined minimalism, functional, trust-building
**참조**: Linear의 information density + Vercel의 Geist 폰트 선명함
**금기**: 과도한 그라디언트, 플레이풀한 일러스트, 브루탈리즘

핵심 원칙:
- 정보 밀도 > 여백 과잉
- 단색 섹션 구분 > 그라디언트 블러
- 시스템 폰트 거부 → 커스텀 타이포그래피로 정체성 확립
- 인터랙션은 subtle, 절대 튀지 않게

---

## 2. Color Palette

### Brand
| Token | Hex | Role |
|---|---|---|
| `--color-brand-primary` | `#5E6AD2` | Primary actions, links, focus ring |
| `--color-brand-hover` | `#7170FF` | Hover state for primary |
| `--color-brand-subtle` | `#F4F5FB` | Brand tint backgrounds |

### Surface (Light)
| Token | Hex | Role |
|---|---|---|
| `--bg-page` | `#FFFFFF` | 기본 페이지 배경 |
| `--bg-subtle` | `#FAFBFC` | 섹션 구분용 아주 옅은 회색 |
| `--bg-card` | `#FFFFFF` | 카드 / 모달 / 패널 |
| `--bg-elevated` | `#FFFFFF` with shadow | 드롭다운, 툴팁 |
| `--bg-nav` | `rgba(255,255,255,0.85)` + `backdrop-filter: blur(12px)` | 상단 네비게이션 |

### Surface (Dark)
| Token | Hex | Role |
|---|---|---|
| `--bg-page` | `#08090A` | 기본 페이지 배경 |
| `--bg-subtle` | `#0F1011` | 섹션 구분 |
| `--bg-card` | `#131416` | 카드 |
| `--bg-elevated` | `#1C1D1F` | 드롭다운 |

### Text
| Token | Hex (Light) | Hex (Dark) | Role |
|---|---|---|---|
| `--text-primary` | `#0E0E10` | `#F7F8F8` | 본문, 제목 |
| `--text-secondary` | `#3C3E44` | `#B4B5B8` | 보조 정보 |
| `--text-tertiary` | `#6B6F76` | `#8A8D93` | 힌트, 라벨 |
| `--text-on-brand` | `#FFFFFF` | `#FFFFFF` | brand 배경 위 텍스트 |

### Semantic
| Token | Hex | Role |
|---|---|---|
| `--color-success` | `#4CB782` | 성공 / 완료 |
| `--color-warning` | `#F2994A` | 주의 |
| `--color-danger` | `#F7425D` | 에러 / 삭제 |
| `--color-info` | `#0081F1` | 정보 알림 |

### Border
| Token | Hex (Light) | Hex (Dark) |
|---|---|---|
| `--border-default` | `#EBEEF2` | `#26272B` |
| `--border-strong` | `#D8DBE0` | `#393A3E` |
| `--border-focus` | `--color-brand-primary` | `--color-brand-primary` |

---

## 3. Typography

### Font Families
```css
--font-display: 'Inter Display', 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Menlo, Monaco, monospace;
```

> **주의**: AI Slop 금기 목록에 Inter가 포함되어 있으나, Linear는 Inter를 매우 타이트하게 커스텀(letter-spacing, font-feature-settings)해 사용합니다. 아래 규격을 그대로 따를 것.

### Scale

| Name | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| Display XL | 72px | 600 | 1.05 | -0.04em | 랜딩 히어로 |
| Display L | 56px | 600 | 1.08 | -0.03em | 주요 히어로 |
| Display M | 44px | 600 | 1.10 | -0.025em | 섹션 타이틀 |
| H1 | 32px | 600 | 1.20 | -0.02em | 페이지 제목 |
| H2 | 24px | 600 | 1.25 | -0.015em | 서브섹션 |
| H3 | 20px | 600 | 1.35 | -0.01em | 카드 타이틀 |
| H4 | 17px | 600 | 1.40 | 0 | 컴포넌트 타이틀 |
| Body L | 17px | 400 | 1.55 | -0.005em | 본문 largeb |
| Body M | 15px | 400 | 1.50 | -0.005em | 기본 본문 |
| Body S | 13px | 400 | 1.50 | 0 | 보조 텍스트 |
| Label | 12px | 500 | 1.40 | 0.02em / uppercase | 라벨, 메타 |
| Code | 13px | 400 | 1.60 | 0 | 인라인 코드 |

### Feature Settings
```css
body {
  font-feature-settings: 'ss01', 'ss02', 'cv01', 'cv03';
}
```

---

## 4. Component Stylings

### Button

**Primary**
```css
background: var(--color-brand-primary);
color: var(--text-on-brand);
padding: 0 16px;
height: 36px;
border-radius: 6px;
font-size: 14px;
font-weight: 500;
transition: background 0.12s ease;
/* hover */
background: var(--color-brand-hover);
/* active */
transform: translateY(1px);
```

**Secondary**
```css
background: var(--bg-card);
color: var(--text-primary);
border: 1px solid var(--border-default);
padding: 0 16px;
height: 36px;
border-radius: 6px;
/* hover */
border-color: var(--border-strong);
background: var(--bg-subtle);
```

**Ghost**
```css
background: transparent;
color: var(--text-secondary);
height: 36px;
padding: 0 12px;
border-radius: 6px;
/* hover */
background: var(--bg-subtle);
color: var(--text-primary);
```

Sizes: `sm`(28px), `md`(36px, default), `lg`(40px)

### Input
```css
background: var(--bg-card);
border: 1px solid var(--border-default);
height: 36px;
padding: 0 12px;
border-radius: 6px;
font-size: 14px;
transition: border-color 0.12s ease;
/* focus */
border-color: var(--color-brand-primary);
outline: none;
box-shadow: 0 0 0 3px rgba(94, 106, 210, 0.12);
```

### Card
```css
background: var(--bg-card);
border: 1px solid var(--border-default);
border-radius: 8px;
padding: 20px;
/* hover (if interactive) */
border-color: var(--border-strong);
transform: translateY(-1px);
box-shadow: var(--shadow-card-hover);
```

### Badge / Chip
```css
display: inline-flex;
align-items: center;
height: 22px;
padding: 0 8px;
border-radius: 4px;
font-size: 12px;
font-weight: 500;
background: var(--bg-subtle);
color: var(--text-secondary);
border: 1px solid var(--border-default);
```

### Nav
```css
height: 52px;
padding: 0 24px;
background: var(--bg-nav);
backdrop-filter: blur(12px);
border-bottom: 1px solid var(--border-default);
position: sticky;
top: 0;
z-index: 100;
```

---

## 5. Layout

### Grid
- 최대 폭: 1200px (content), 1440px (wide dashboard)
- 컬럼 갭: 24px (desktop), 16px (tablet), 12px (mobile)
- 섹션 상하 패딩: 96px desktop, 64px tablet, 48px mobile
- 좌우 패딩: 40px desktop, 24px tablet, 16px mobile

### Spacing Scale (4px 기준)
```
xs = 4px     sm = 8px     md = 12px
lg = 16px    xl = 24px    2xl = 32px
3xl = 48px   4xl = 64px   5xl = 96px
```

### Breakpoints
```
sm: 640px    md: 768px    lg: 1024px
xl: 1280px   2xl: 1536px
```

---

## 6. Depth & Elevation

### Border Radius
| Token | Value | Use |
|---|---|---|
| `--radius-xs` | 4px | Badge, chip |
| `--radius-sm` | 6px | Button, input |
| `--radius-md` | 8px | Card |
| `--radius-lg` | 12px | Modal |
| `--radius-xl` | 16px | Hero card |
| `--radius-full` | 9999px | Avatar, pill |

### Shadow
| Token | Value | Use |
|---|---|---|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.04)` | Subtle hover |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Card hover |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)` | Dropdown |
| `--shadow-lg` | `0 16px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.05)` | Modal |
| `--shadow-focus` | `0 0 0 3px rgba(94,106,210,0.12)` | Focus ring |

**중요**: drop-shadow는 플랫 디자인에서 필수 아닌 보완. 기본은 border로 계층 구분, shadow는 hover나 overlay에서만 사용.

---

## 7. Do's and Don'ts

### ✅ Do
- Border로 계층 구분 (subtle, 1px)
- 텍스트 계층은 color + weight로 표현
- 인터랙션은 0.12-0.2s로 짧고 명확하게
- 아이콘은 1.5px stroke (lucide 기본)
- 데이터 밀도를 높여 정보를 압축

### ❌ Don't (AI Slop 블랙리스트)

다음 패턴은 절대 사용하지 말 것. gstack `/design-review`의 AI Slop 검출기가 걸러낸다.

- **3-column feature grid** (icon-in-colored-circle + bold title + 2-line description × 3)
  - 가장 인식 가능한 AI 레이아웃. 완전 금지.
- **Purple/violet/indigo gradient backgrounds**
  - 특히 대각선 그라디언트는 즉각 refresh 유발.
- **Generic hero copy**: "Welcome to [X]", "Unlock the power of...", "Streamline your..."
- **Bento grid 남용**: 12칸 이상의 bento는 의미 없음.
- **Over-rounded corners**: 16px 초과 radius는 특정 의도 없으면 금지.
- **Stock illustrations**: undraw.co 등의 지퍼 일러스트 일체 금지.
- **Unnecessary icons in buttons**: primary CTA에 아이콘 붙이지 말 것.
- **Centered everything**: 데스크톱에서 모든 것이 중앙 정렬된 레이아웃은 mobile-first 실수.

---

## 8. Responsive

### Mobile (< 768px)
- Nav: 햄버거 메뉴로 전환, height 48px
- Hero: 28-36px 제목, 16px body
- 섹션 패딩: 48px 상하
- Grid: 1 column 강제
- Button: full-width 고려 (CTA는)

### Tablet (768-1024px)
- 대부분 데스크톱 레이아웃 유지, 패딩만 축소
- Grid 2 columns

### Desktop (≥ 1024px)
- 풀 레이아웃, 1200px max-width

---

## 9. Agent Prompt Guide

AI 에이전트가 이 디자인 시스템에 맞는 UI를 생성할 때 사용할 프롬프트 예시:

### 히어로 섹션
```
Create a hero section on var(--bg-page). Headline at Display L (56px,
weight 600, line-height 1.08, letter-spacing -0.03em) in var(--text-primary).
Max 2 lines. Sub-copy at Body L (17px, line-height 1.55) in var(--text-secondary),
max 560px width. Two buttons horizontally: Primary (36px height, 16px padding,
var(--color-brand-primary) background) and Secondary. Do NOT use gradient
backgrounds. Do NOT use generic copy like "Welcome to" or "Unlock".
```

### 카드 그리드
```
Card grid with 3 columns desktop, 2 tablet, 1 mobile. Each card:
var(--bg-card), 1px var(--border-default), 8px radius, 20px padding.
Title at H3 (20px, weight 600) in var(--text-primary). Body at Body M
(15px, line-height 1.50) in var(--text-secondary). Hover: border becomes
var(--border-strong), translateY(-1px), shadow-sm.
Do NOT place icons in colored circles above titles (this is AI Slop).
Instead: use 16px lucide icon in var(--text-tertiary) inline with metadata,
or omit icons entirely.
```

### 대시보드 테이블
```
Dense table at 13px body, 36px row height, 1px var(--border-default)
between rows. Header sticky, var(--bg-subtle) background, Label style
(12px, weight 500, uppercase, letter-spacing 0.02em). Cell padding 12px
horizontal, vertical centered. Hover: var(--bg-subtle).
Zebra striping: NO. Dense information beats decoration.
```

### Form
```
Label at Label style (12px, weight 500), 8px margin below.
Input: 36px height, 12px horizontal padding, 1px var(--border-default),
6px radius. Focus: var(--color-brand-primary) border + 3px 12% opacity
brand shadow ring. Error: var(--color-danger) border + helper text below.
Submit button as Primary (36px). Never use all-caps labels.
```

---

## 참조

- 원본: [VoltAgent/awesome-design-md — Linear](https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/linear)
- 포맷: Google Stitch DESIGN.md 규약
- 유지보수: 이 파일 수정 시 `tailwind.config.ts`의 `theme.extend` 동기화 필수
