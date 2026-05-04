# K-Theme WordPress Block Theme — Brainstorming Spec

> **Date**: 2026-05-04
> **Status**: 🟢 APPROVED

---

## 1. WHO — 누구를 위한 것인가?

### Primary User (테마 구매자)
- 한국 소상공인 · 스타트업 · 교회 · 공공기관 · IT기업
- 워드프레스 기본 에디터(Gutenberg)로 컨텐츠를 수정하고 싶은 **비개발자**
- "설치하면 바로 예쁜 사이트" + "필요한 부분만 에디터에서 수정" 원하는 사람

### Secondary User (테마 제작자 = 우리)
- 기존 디자인카피(`d:\AI_workspace\디자인카피_v2`)에 있는 **20+개 업종별 HTML 디자인**을 자산으로 활용
- 하나의 테마 프레임워크에 여러 스타일팩(Starter Templates)을 원클릭 임포트하는 구조

---

## 2. WHAT — 무엇을 만드는가?

### 핵심 제품
**WordPress Block Theme (FSE 기반)** — Tailwind CSS + shadcn/ui 디자인 시스템

### 구조 개요

```
ktheme-starter/                    ← WordPress Block Theme Root
├── style.css                      ← WP Theme 메타데이터
├── theme.json                     ← 글로벌 디자인 토큰 (색상, 폰트, 간격)
├── functions.php                  ← Tailwind CSS 로딩 + 커스텀 블록 등록
├── templates/                     ← FSE 템플릿
│   ├── index.html                 ← 기본 템플릿
│   ├── front-page.html            ← 프론트페이지
│   ├── single.html                ← 싱글 포스트
│   ├── page.html                  ← 페이지
│   ├── archive.html               ← 아카이브
│   └── 404.html
├── parts/                         ← 테마 파츠 (공용 요소)
│   ├── header.html                ← 헤더 (네비게이션)
│   ├── footer.html                ← 푸터
│   ├── sidebar.html               ← 사이드바
│   └── floating-buttons.html      ← 카카오 상담 + 스크롤탑
├── patterns/                      ← 블록 패턴 (재사용 섹션)
│   ├── hero-01.php                ← 히어로 패턴 #1
│   ├── hero-02.php
│   ├── about-01.php
│   ├── services-grid-01.php
│   ├── stats-counter-01.php
│   ├── news-grid-01.php
│   ├── gallery-01.php
│   ├── cta-banner-01.php
│   ├── contact-01.php
│   └── ... (업종별 패턴)
├── assets/
│   ├── css/
│   │   ├── tailwind.css           ← Tailwind 소스 (빌드 입력)
│   │   └── style.css              ← 빌드된 최종 CSS
│   ├── js/
│   │   ├── gsap-init.js           ← GSAP ScrollTrigger 초기화
│   │   ├── mobile-menu.js         ← 모바일 메뉴
│   │   └── theme.js               ← 테마 유틸리티
│   ├── fonts/                     ← Pretendard (로컬)
│   └── images/
│       └── starter-packs/         ← 업종별 데모 이미지
├── starter-packs/                 ← 원클릭 임포트 데이터
│   ├── corporate/
│   │   ├── content.xml            ← WXR 임포트 데이터
│   │   ├── theme.json             ← 스타일팩 오버라이드
│   │   └── preview.jpg
│   ├── church/
│   ├── it-company/
│   ├── welfare/
│   └── ... (각 디자인카피에서 추출)
├── inc/
│   ├── blocks/                    ← 커스텀 블록
│   ├── customizer/                ← 커스터마이저 추가 옵션
│   └── starter-pack-importer.php  ← 스타일팩 임포트 로직
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── node_modules/
```

---

## 3. WHY — 왜 이것이 필요한가?

### 기존 문제점
1. **디자인카피 HTML 20+개가 개별 파일**로 흩어져 있음 → 재사용·관리 불가
2. 한국 시장 워드프레스 테마는 대부분 **클래식 테마** → FSE 미지원, 커스터마이저 한계
3. Tailwind + shadcn 스타일의 모던한 한국 워드프레스 테마가 **존재하지 않음**

### 핵심 가치
- **디자인 자산 통합**: 20+개 HTML → 재사용 가능한 블록 패턴 라이브러리
- **비개발자 친화**: Gutenberg 에디터에서 드래그&드롭으로 수정
- **원클릭 데모 임포트**: "교회", "기업", "IT", "복지" 등 업종별 스타터팩
- **모바일 퍼스트**: 모든 패턴이 반응형
- **한국 특화**: Pretendard 폰트, 카카오 상담, 사업자 정보, 한/영 다국어

---

## 4. 아키텍처 핵심 결정

### 4.1 테마 파츠 vs 블록 패턴 — 역할 분담

| 구분 | 테마 파츠 (parts/) | 블록 패턴 (patterns/) |
|------|-------------------|-----------------------|
| **역할** | 모든 페이지에 공통으로 들어가는 공용 요소 | 페이지마다 선택적으로 배치하는 섹션 |
| **편집 방식** | 사이트 에디터에서 전역 수정 | 각 페이지 에디터에서 개별 수정 |
| **예시** | Header, Footer, Floating Buttons | Hero, About, Services, Gallery, CTA |
| **사용자 수정** | 로고·메뉴·연락처 등 1회 세팅 | 텍스트·이미지·순서 자유 변경 |

### 4.2 Tailwind CSS 전략

```
빌드 파이프라인:
  tailwind.css (소스) → PostCSS → style.css (빌드 결과)

content 스캔 대상:
  - templates/**/*.html
  - parts/**/*.html
  - patterns/**/*.php
  - inc/**/*.php
  - assets/js/**/*.js
```

**핵심 원칙:**
- 테마 구조(Header/Footer/Patterns)는 **Tailwind 유틸리티 클래스**로 스타일링
- 사용자가 에디터에서 추가하는 콘텐츠는 **WordPress 글로벌 스타일 + theme.json** 활용
- Tailwind Preflight는 에디터 충돌 방지를 위해 **스코핑** 적용

### 4.3 theme.json 설계 (shadcn 스타일)

```json
{
  "version": 3,
  "settings": {
    "color": {
      "palette": [
        { "slug": "background", "color": "#ffffff", "name": "Background" },
        { "slug": "foreground", "color": "#09090b", "name": "Foreground" },
        { "slug": "primary", "color": "#18181b", "name": "Primary" },
        { "slug": "primary-foreground", "color": "#fafafa", "name": "Primary FG" },
        { "slug": "secondary", "color": "#f4f4f5", "name": "Secondary" },
        { "slug": "muted", "color": "#f4f4f5", "name": "Muted" },
        { "slug": "accent", "color": "#f4f4f5", "name": "Accent" },
        { "slug": "border", "color": "#e4e4e7", "name": "Border" },
        { "slug": "ring", "color": "#18181b", "name": "Ring" }
      ]
    },
    "typography": {
      "fontFamilies": [
        {
          "fontFamily": "'Pretendard', -apple-system, sans-serif",
          "slug": "pretendard",
          "name": "Pretendard"
        }
      ]
    },
    "layout": {
      "contentSize": "768px",
      "wideSize": "1280px"
    }
  }
}
```

### 4.4 기존 HTML 디자인 → 블록 패턴 변환 전략

```
디자인카피 HTML               →   블록 패턴
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sample-corporate/hero         →   patterns/hero-corporate-01.php
church-homepage-v2/hero       →   patterns/hero-church-01.php
church-homepage-v2/news       →   patterns/news-grid-church-01.php
it-company-homepage/saas      →   patterns/hero-saas-01.php
lh-homepage/about             →   patterns/about-public-01.php
kdi-school/academics          →   patterns/services-education-01.php
... (20+개 HTML × 평균 5섹션 = 100+개 패턴)
```

각 패턴은:
1. **PHP 파일** (patterns/ 디렉토리)
2. **패턴 헤더 주석**: Title, Slug, Categories, Keywords
3. **Tailwind 클래스 기반 마크업**
4. **편집 가능한 영역**: wp:paragraph, wp:heading, wp:image 등 코어 블록 활용

### 4.5 스타터팩 임포트 시스템

```
사용자 경험:
  1. 테마 설치 → 대시보드에 "K-Theme 스타터팩" 메뉴
  2. 업종 선택 (기업/교회/IT/복지/교육...)
  3. 프리뷰 확인
  4. "적용" 클릭 → theme.json 색상 오버라이드 + 데모 콘텐츠 임포트
  5. 에디터에서 텍스트/이미지만 교체하면 완성

임포트 내용:
  - theme.json 스타일 오버라이드 (색상 팔레트)
  - 데모 페이지 (프론트페이지 + 서브페이지)
  - 데모 이미지
  - 네비게이션 메뉴 구조
```

---

## 5. 기술 결정 사항

### 확정
| 항목 | 결정 | 이유 |
|------|------|------|
| 테마 타입 | Block Theme (FSE) | Gutenberg 에디터 완전 활용 |
| CSS 프레임워크 | Tailwind CSS v4 | 유틸리티 퍼스트 + JIT + 작은 번들 |
| 디자인 시스템 | shadcn/ui 토큰 | 모던 + semantic naming + 다크모드 대비 |
| 폰트 | Pretendard (로컬 호스팅) | 한국어 최적화 + CDN 의존 제거 |
| 아이콘 | Lucide Icons | 기존 HTML과 동일 + 경량 |
| 빌드 도구 | @wordpress/scripts + PostCSS | WP 표준 빌드 파이프라인 |
| 애니메이션 | GSAP ScrollTrigger | 기존 HTML에서 검증된 효과 |
| 다국어 | theme.json + 번역 파일 (.po) | WP 표준 i18n |

### 미결정 (논의 필요)
| 항목 | 옵션 A | 옵션 B | 의견 |
|------|--------|--------|------|
| 다크모드 | theme.json 듀얼 팔레트 | JS 토글 + CSS 변수 | A 권장 (WP 표준) |
| 스타터팩 임포트 | 자체 구현 | 기존 플러그인 활용 (OCDI) | B가 빠르지만 A가 제어력 높음 |
| 커스텀 블록 수 | 최소 (코어 블록 + 패턴 위주) | 필요시 커스텀 블록 추가 | A 권장 (유지보수) |
| GSAP 로딩 | 모든 페이지 | 필요한 페이지만 | B 권장 (성능) |

---

## 6. 성공 기준

- [ ] **데모 사이트 5개**: 기업, 교회, IT, 교육, 복지 업종별 데모
- [ ] **패턴 50+개**: 기존 HTML에서 추출한 재사용 가능 패턴
- [ ] **에디터 호환성**: 모든 패턴이 Gutenberg에서 정상 편집 가능
- [ ] **모바일 대응**: 모든 패턴 반응형 (320px ~ 1440px)
- [ ] **Core Web Vitals**: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] **원클릭 임포트**: 업종 선택 → 30초 내 데모 사이트 완성
- [ ] **문서화**: 사용자 가이드 + 개발자 문서

---

## 7. 제약사항 & Scope 제한

### In Scope
- Block Theme 기본 프레임워크
- 테마 파츠: Header, Footer, Floating
- 블록 패턴: 기존 HTML 변환 (Phase 1: 5개 업종)
- 스타터팩 임포트 시스템
- 모바일 반응형
- 빌드 파이프라인 (Tailwind + PostCSS)

### Out of Scope (Phase 2+)
- WooCommerce 통합
- 다크모드 (Phase 1은 라이트모드 전용)
- 사용자 대시보드 커스텀 플러그인
- WPML/Polylang 풀 통합 (Phase 1은 한국어만)
- 테마 마켓플레이스 등록 절차
