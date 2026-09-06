# SITE_IA_SLUG_RULES.md — 교회 홈페이지 IA / Slug / 페이지 생성 규칙

이 문서는 가평교회 WordPress 테마 작업 시 메뉴, 페이지, archive, single, contact form 구성을 판단하는 기준 문서입니다.
새 페이지 생성, 메뉴 연결, 템플릿 추가, 콘텐츠 타입 설계 작업 전에 반드시 이 문서를 확인합니다.

## 1. 기본 원칙

- URL slug는 영문 소문자와 하이픈만 사용합니다.
- 한글 slug, 공백, 언더스코어, 숫자 중심 slug는 사용하지 않습니다.
- 1차 메뉴는 방문자가 이해하기 쉬운 교회 용어를 사용하고, slug는 짧고 안정적인 단어를 사용합니다.
- 안내성 콘텐츠는 일반 페이지로 만듭니다.
- 반복적으로 쌓이는 콘텐츠는 archive + single 구조로 만듭니다.
- 신청, 문의, 등록, 요청은 contact form 성격의 폼 페이지로 만듭니다.
- 헤더, 페이지 히어로, 푸터는 공용 템플릿 파트를 사용합니다.
- 페이지 히어로는 `.modu-page-hero`와 공용 hero 스타일을 우선 사용합니다.

## 2. 1차 메뉴 IA

| 1차 메뉴 | 대표 slug | 역할 |
|---|---|---|
| 교회소개 | `/about/` | 교회의 정체성, 비전, 사람, 역사, 위치 안내 |
| 예배 안내 | `/worship/` | 예배 시간, 예배 영상, 주보 안내 |
| 공동체 | `/community/` | 새가족, 소그룹, 다음세대, 청년, 시니어 안내 |
| 양육 | `/training/` | 양육 과정, 새가족 과정, 성경공부, 제자훈련, QT |
| 선교·섬김 | `/mission/` | 국내/해외 통합 선교 안내, 섬김 사역, 후원 안내 |
| 미디어 | `/media/` | 교회소식, 교단소식, 설교, 앨범, 영상, 자료실 |
| 행정 | `/admin-guide/` | 헌금, 증명서, 공간/차량 신청, 문의 |

## 3. 유틸 / 퀵 / 푸터 메뉴 IA

### 헤더 유틸 메뉴

헤더 최상단에 노출하는 짧은 이동 메뉴입니다.

| 메뉴 | slug | 화면 타입 |
|---|---|---|
| 새가족 등록 | `/newcomers/` | page + form |
| 오시는 길 | `/location/` | page |
| 온라인 헌금 | `/giving/` | page |
| 로그인 | `/login/` | account page |
| 회원가입 | `/register/` | account page |

### 헤더 액션 / 퀵 메뉴

헤더 우측 CTA와 주요 빠른 이동에 사용합니다.

| 메뉴 | slug | 화면 타입 |
|---|---|---|
| 검색 | `/?s=` | search |
| 새가족 등록 | `/newcomers/` | page + form |
| 주보 | `/bulletin/` | archive/single 또는 page |
| QT/묵상 | `/qt/` | archive/single 또는 page |
| 문의하기 | `/contact/` | contact form |

### 푸터 메뉴

푸터는 전체 사이트맵보다 가볍게, 주요 동선 중심으로 구성합니다.

| 푸터 그룹 | 메뉴 |
|---|---|
| 교회소개 | 교회소개, 비전, 섬기는 사람들, 교회연혁, 연간일정, 오시는 길 |
| 예배 안내 | 주일예배, 수요예배, 새벽기도, 주보 |
| 공동체/양육 | 새가족, 소그룹/구역, 다음세대, 청년부, 양육 안내, QT/묵상 |
| 미디어/행정 | 교회소식, 교단소식, 설교, 행사앨범, 자료실, 온라인 헌금, 문의하기 |
| 정책 | 개인정보처리방침, 이메일 무단수집거부 |

## 4. 사이트맵

```text
/
├─ 유틸
│  ├─ 새가족 등록 /newcomers/
│  ├─ 오시는 길 /location/
│  ├─ 온라인 헌금 /giving/
│  ├─ 로그인 /login/
│  └─ 회원가입 /register/
│
├─ 교회소개 /about/
│  ├─ 교회소개 /about/
│  ├─ 비전 /vision/
│  ├─ 섬기는 사람들 /people/
│  ├─ 교회연혁 /history/
│  ├─ 연간일정 /annual-schedule/
│  └─ 오시는 길 /location/
│
├─ 예배 안내 /worship/
│  ├─ 주일예배 /sunday-worship/
│  ├─ 수요예배 /wednesday-worship/
│  ├─ 새벽기도 /dawn-prayer/
│  └─ 주보 /bulletin/
│
├─ 공동체 /community/
│  ├─ 새가족 /newcomers/
│  ├─ 소그룹/구역 /small-groups/
│  ├─ 다음세대 /next-generation/
│  ├─ 청년부 /youth-ministry/
│  └─ 장년/시니어 /senior-ministry/
│
├─ 양육 /training/
│  ├─ 양육 안내 /training/
│  ├─ 새가족 과정 /new-family-course/
│  ├─ 성경공부 /bible-study/
│  ├─ 제자훈련 /discipleship/
│  └─ QT/묵상 /qt/
│
├─ 선교·섬김 /mission/
│  ├─ 선교 안내 /mission/
│  ├─ 섬김 사역 /serve/
│  └─ 후원 안내 /support/
│
├─ 미디어 /media/
│  ├─ 교회소식 /news/
│  ├─ 교단소식 /denomination-news/
│  ├─ 설교 /sermons/
│  ├─ 행사앨범 /albums/
│  ├─ 영상 /videos/
│  └─ 자료실 /library/
│
├─ 행정 /admin-guide/
│  ├─ 온라인 헌금 /giving/
│  ├─ 증명서 발급 /documents/
│  ├─ 장소 사용 신청 /facility-request/
│  ├─ 차량 사용 신청 /vehicle-request/
│  └─ 문의하기 /contact/
│
├─ 로그인 /login/
├─ 회원가입 /register/
├─ 개인정보처리방침 /privacy-policy/
└─ 이메일 무단수집거부 /email-policy/
```

## 5. Slug 사전

| 한글명 | slug | 화면 타입 |
|---|---|---|
| 교회소개 | `about` | page |
| 비전 | `vision` | page |
| 섬기는 사람들 | `people` | page |
| 교회연혁 | `history` | page |
| 연간일정 | `annual-schedule` | page 또는 archive |
| 오시는 길 | `location` | page |
| 예배 안내 | `worship` | page |
| 주일예배 | `sunday-worship` | archive/single 또는 page |
| 수요예배 | `wednesday-worship` | archive/single 또는 page |
| 새벽기도 | `dawn-prayer` | archive/single 또는 page |
| 주보 | `bulletin` | archive/single |
| 공동체 | `community` | page |
| 새가족 | `newcomers` | page + form |
| 소그룹/구역 | `small-groups` | page |
| 다음세대 | `next-generation` | page |
| 청년부 | `youth-ministry` | page |
| 장년/시니어 | `senior-ministry` | page |
| 양육 | `training` | page |
| 새가족 과정 | `new-family-course` | page |
| 성경공부 | `bible-study` | page 또는 archive |
| 제자훈련 | `discipleship` | page |
| QT/묵상 | `qt` | archive/single |
| 선교·섬김 | `mission` | page |
| 섬김 사역 | `serve` | page |
| 후원 안내 | `support` | page |
| 미디어 | `media` | page |
| 교회소식 | `news` | archive/single |
| 교단소식 | `denomination-news` | archive/single |
| 설교 | `sermons` | archive/single |
| 행사앨범 | `albums` | archive/single |
| 영상 | `videos` | archive/single |
| 자료실 | `library` | archive/single |
| 행정 | `admin-guide` | page |
| 온라인 헌금 | `giving` | page |
| 증명서 발급 | `documents` | form page |
| 장소 사용 신청 | `facility-request` | form page |
| 차량 사용 신청 | `vehicle-request` | form page |
| 문의하기 | `contact` | contact form |
| 로그인 | `login` | account page |
| 회원가입 | `register` | account page |
| 개인정보처리방침 | `privacy-policy` | legal page |
| 이메일 무단수집거부 | `email-policy` | legal page |

## 6. 화면 타입 판단 규칙

### 일반 페이지

다음 성격이면 WordPress page 또는 page slug template으로 만듭니다.

- 교회 소개, 비전, 역사, 사역 안내
- 예배 시간표, 양육 과정, 선교 안내
- 헌금 안내, 오시는 길, 개인정보처리방침

### Archive + Single

다음처럼 콘텐츠가 계속 누적되면 archive + single 구조로 만듭니다.

- 설교
- 교회소식
- 교단소식
- 행사
- 앨범
- 영상
- 자료실
- 주보
- QT/묵상

### Contact Form / 신청 폼

사용자가 정보를 입력해야 하면 폼 페이지로 만듭니다.

- 새가족 등록
- 기도 요청
- 증명서 발급
- 장소 사용 신청
- 차량 사용 신청
- 일반 문의

## 7. 템플릿 연결 규칙

- 공용 헤더: `parts/header.html`
- 공용 푸터: `parts/footer.html`
- 일반 페이지 기본: `page.html`
- 기본 archive: `archive.html`
- 기본 single: `single.html`
- 검색 결과: `search.html`
- 설교 archive/single: `archive-modutheme_sermon.html`, `single-modutheme_sermon.html`
- 행사 archive/single: `archive-modutheme_event.html`, `single-modutheme_event.html`
- 앨범 archive/single: `archive-modutheme_album.html`, `single-modutheme_album.html`

새 템플릿을 만들 때는 기존 공용 헤더/푸터를 재사용하고, 페이지 히어로 스타일을 임의로 복제하지 않습니다.

## 8. 메뉴 반영 규칙

- 헤더 주 메뉴는 1차 메뉴 중심으로 유지합니다.
- 방문자에게 중요한 메뉴만 헤더 2차 메뉴로 노출합니다.
- 전체 사이트맵성 링크는 푸터에 배치합니다.
- 헤더 유틸 메뉴는 새가족 등록, 오시는 길, 온라인 헌금, 로그인, 회원가입으로 유지합니다.
- 헤더 CTA는 새가족 등록을 우선 사용합니다.
- 퀵 메뉴는 주보, QT/묵상, 문의하기처럼 반복 방문 동선 중심으로 구성합니다.
- 푸터 메뉴는 교회소개, 예배, 공동체/양육, 미디어/행정, 정책 그룹을 기준으로 구성합니다.
- 삭제 결정된 메뉴는 재추가하지 않습니다.
- 국내 선교와 해외 선교는 분리하지 않고 `선교 안내 /mission/` 안에 통합합니다.
- `선교소식` 메뉴는 만들지 않습니다.
- `교단소식`은 미디어 하위 메뉴로 둡니다.
