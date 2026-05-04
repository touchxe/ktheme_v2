# K-Theme WordPress Block Theme — Execution Plan

> **Date**: 2026-05-04
> **Spec**: `docs/superpowers/specs/2026-05-04-ktheme-wp-block-theme.md`

## Phase 1: Project Setup (테마 기본 구조 및 빌드 환경)
### Task 1.1: Node.js 및 빌드 환경 설정
- **설명**: `package.json` 생성 및 `@wordpress/scripts`, `tailwindcss`, `postcss`, `autoprefixer` 설치.
- **Verification**: `npm run build` 스크립트 실행 환경 점검.
### Task 1.2: Tailwind & PostCSS 설정
- **설명**: `tailwind.config.js` 및 `postcss.config.js` 생성, content 스캔 대상 지정. `assets/css/tailwind.css` 소스 파일 생성.
- **Verification**: Tailwind 설정 파일 존재 및 문법 오류 확인.
### Task 1.3: 테마 필수 파일 생성
- **설명**: `style.css`(테마 정보), `theme.json`(글로벌 토큰), `index.php`(FSE 폴백), `functions.php`(에셋 및 패턴 등록) 작성.
- **Verification**: WordPress 환경에서 테마가 정상적으로 인식될 수 있는 구조 확인.

## Phase 2: Base Templates & Parts (Gutenberg FSE 구조화)
### Task 2.1: 템플릿 파일 스캐폴딩
- **설명**: `templates/index.html`, `templates/front-page.html` 작성.
- **Verification**: 템플릿 파일 내 코어 블록 마크업 검증.
### Task 2.2: 공용 파츠 (Header/Footer) 생성
- **설명**: `parts/header.html`, `parts/footer.html` 파일 작성 및 Tailwind 유틸리티 클래스 적용.
- **Verification**: WordPress 파츠 구조(`<!-- wp:template-part -->`) 문법 준수 확인.
### Task 2.3: 에셋 연동 (GSAP, Lucide 등)
- **설명**: `assets/js/gsap-init.js`, `assets/js/theme.js` 생성 및 `functions.php`에 로드 스크립트 훅 추가.
- **Verification**: `functions.php` 내 `wp_enqueue_script` / `wp_enqueue_style` 훅 등록 검증.

## Phase 3: Block Patterns Conversion (1st Batch - Corporate)
### Task 3.1: Hero 패턴 생성
- **설명**: `sample-corporate/index.html` 의 Hero 영역을 `patterns/hero-corporate-01.php` 로 변환.
- **Verification**: 패턴 파일 헤더 주석 구조 검증 및 블록 에디터 호환 마크업 확인.
### Task 3.2: Services Grid 패턴 생성
- **설명**: `sample-corporate` 의 Services 영역(4 Icons + Checkerboard)을 패턴화.
- **Verification**: 반응형 Tailwind 클래스 정상 적용 여부 확인.
### Task 3.3: News & Notice 패턴 생성
- **설명**: `sample-corporate` 의 News/Notice 오버레이 영역 패턴화.
- **Verification**: 패턴 파일 생성 및 구조 점검.

## Phase 4: Starter Pack Import MVP
### Task 4.1: Import 로직 스캐폴딩
- **설명**: `inc/starter-pack-importer.php` 파일 생성 및 기본 임포트 훅/함수 구조 작성.
- **Verification**: PHP 문법 에러(Syntax check).
### Task 4.2: Corporate Starter Pack 데이터 준비
- **설명**: `starter-packs/corporate/theme.json` 및 `preview.jpg` 디렉토리/구조 마련.
- **Verification**: 디렉토리 구조 및 필수 파일 유무 검증.
