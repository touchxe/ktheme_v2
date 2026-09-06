# Dummy Data Requirements Audit

작성일: 2026-06-03

## 기준

- IA 기준: `docs/SITE_IA_SLUG_RULES.md`
- 실제 메뉴 기준: `wp-content/themes/modu-theme/parts/header.html`, `parts/footer.html`
- 필수 페이지 자동 생성 기준: `wp-content/themes/modu-theme/functions.php`
- 홈 화면 기준: `wp-content/themes/modu-theme/patterns/style1-home.php`
- 현재 등록된 누적 콘텐츠 타입: `modutheme_sermon`, `modutheme_event`, `modutheme_album`

## 핵심 결론

1. 헤더/전체 메뉴/푸터의 주요 slug는 대부분 IA와 맞지만, 헤더 유틸에는 `/english/`가 추가되어 있고 IA의 `/giving/`, `/register/` 유틸 링크는 노출되지 않는다.
2. `functions.php`는 필수 페이지를 만들지만, 대부분 본문이 "콘텐츠를 준비하고 있습니다." 수준이라 페이지별 더미 본문이 필요하다.
3. Archive + single 성격이어야 하는 항목 중 실제 CPT가 있는 것은 `sermons`, `events`, `albums`뿐이다.
4. `bulletin`, `qt`, `news`, `denomination-news`, `videos`, `library`는 IA상 누적 콘텐츠지만 현재는 일반 페이지 또는 기본 `post`/카테고리 운용이 필요하다.
5. 홈은 정적 패턴이어서 더미 게시물을 넣어도 홈 카드가 자동으로 바뀌지 않는다. 홈 카드 데이터와 실제 게시물 데이터를 같은 제목/날짜/이미지로 맞춰야 한다.

## 우선순위

- P0: 메인 메뉴에서 즉시 보이는 페이지와 빈 archive를 채우는 데이터
- P1: 하위 페이지 본문, 폼 페이지, 행정/자료/FAQ 데이터
- P2: 푸터, 패밀리 사이트, SNS, 정책, 영어 페이지 등 운영 보조 데이터

## CPT / 포스트 / 후기 중심 요약

페이지 본문보다 먼저 채워야 하는 것은 실제 목록 화면과 홈/허브 화면에 노출되는 콘텐츠다. 현재 테마 기준으로는 `modutheme_sermon`, `modutheme_event`, `modutheme_album` 3개 CPT가 이미 등록되어 있고, 나머지 반복 콘텐츠는 우선 기본 `post` + 카테고리로 운영하는 편이 가장 빠르다.

실행 스크립트: `pnpm seed:dummy`

이 스크립트는 `.env.local`의 `WP_API_URL`, `WP_USERNAME`, `WP_APP_PASSWORD`를 사용해 WordPress REST API에 더미 콘텐츠를 생성/업데이트한다. 기존 테마 이미지 `wp-content/themes/modu-theme/assets/images/generated/church-generated-01.jpg`부터 `church-generated-17.jpg`까지를 미디어 라이브러리에 업로드하고 featured image로 연결한다.

| 우선순위 | 생성 단위 | 현재 구현 | 노출 위치 | 최소 수량 | 핵심 필드 |
|---|---|---|---|---:|---|
| P0 | 설교 | `modutheme_sermon` CPT | `/sermons/`, `/worship/`, `/sunday-worship/`, `/media/`, 홈 설교 섹션 | 12 | 제목, 설교자, 본문, 날짜, 예배 유형, 시리즈, 영상 URL, 썸네일, 요약 |
| P0 | 행사/일정 | `modutheme_event` CPT | `/events/`, `/community/`, 홈 공지/행사 카드 | 9 | 제목, 시작일, 종료일, 장소, 대상, 신청 링크, 요약, 썸네일 |
| P0 | 행사앨범 | `modutheme_album` CPT | `/albums/`, `/media/`, 홈 갤러리 | 12 | 제목, 날짜, 대표 이미지, 갤러리 이미지, 행사명, 요약 |
| P0 | 교회소식/공지 | 기본 `post` + `notice`/`news` category | `/news/`, 홈 업데이트, 검색 | 4 | 제목, 날짜, 카테고리, 요약, 본문, 고정 여부 |
| P0 | 후기/간증 포스트 | 기본 `post` + `review` category | `/news/`, 공동체/청년/새가족 연결, 홈 업데이트 | 14 | 제목, 작성자 표시명, 날짜, 관련 사역, 사진, 인용문, 본문 |
| P0 | 교우소식 | 기본 `post` + `member-news` category | `/news/`, `/admin-guide/` 교우소식 | 5 | 유형, 대상, 일시, 장소, 안내문, 공개 범위 |
| P1 | 주보 | 기본 `post` + `bulletin` category 우선 | `/bulletin/`, 예배 메뉴, 검색 | 8 | 주차/날짜, PDF 또는 이미지, 예배 순서, 광고 요약 |
| P1 | QT/묵상 | 기본 `post` + `qt` category 우선 | `/qt/`, 양육 메뉴, 검색 | 14 | 날짜, 성경 본문, 묵상 제목, 질문, 기도문 |
| P1 | 교단소식 | 기본 `post` + `denomination-news` category | `/denomination-news/`, 미디어 메뉴 | 6 | 제목, 출처, 날짜, 요약, 외부 링크 |
| P1 | 영상 | 기본 `post` + `video` category 우선 | `/videos/`, 미디어 메뉴 | 8 | 제목, 영상 유형, embed URL, 썸네일, 설명 |
| P1 | 자료실 | 기본 `post` + `library` category 우선 | `/library/`, 행정 자료실 | 12 | 자료명, 분류, 파일 URL, 설명, 등록일 |
| P2 | 선교소식 | 기본 `post` + `mission` category | 홈 업데이트, `/news/` | 3 | 제목, 선교지, 기도 제목, 모집/후원 링크 |

### 운영 판단

| 콘텐츠 | 지금 바로 권장 | 장기 권장 | 이유 |
|---|---|---|---|
| 설교 | `modutheme_sermon` 유지 | CPT 유지 + 예배 유형 taxonomy 추가 검토 | 이미 archive/single 템플릿과 시리즈 taxonomy가 있다. |
| 행사 | `modutheme_event` 유지 | CPT 유지 + 행사일 custom field 정리 | 공동체 대표 페이지가 이 CPT를 직접 조회한다. |
| 앨범 | `modutheme_album` 유지 | CPT 유지 + 갤러리 이미지 필드 정리 | 미디어 대표 페이지가 이 CPT를 직접 조회한다. |
| 후기 | 기본 `post` + `review` category | 필요 시 `modutheme_story` CPT 검토 | IA에 별도 후기 메뉴가 없어서 뉴스 흐름 안에 두는 것이 자연스럽다. |
| 주보 | 기본 `post` + `bulletin` category | 사용량 많으면 `modutheme_bulletin` CPT | PDF/이미지 첨부와 주차별 archive가 필요하다. |
| QT/묵상 | 기본 `post` + `qt` category | 매일 운영이면 `modutheme_qt` CPT | 초기에는 글 카테고리로 충분하지만 날짜별 누적이 많다. |
| 영상 | 기본 `post` + `video` category | 설교 외 영상이 많으면 `modutheme_video` CPT | 설교 영상과 일반 영상을 분리해야 한다. |
| 자료실 | 기본 `post` + `library` category | 다운로드 관리가 필요하면 `modutheme_resource` CPT | 파일, 분류, 다운로드 버튼이 핵심이다. |

## 포스트 카테고리 제안

| 카테고리명 | slug | 용도 | 최소 수량 |
|---|---|---|---:|
| 공지 | `notice` | 일반 공지, 운영 안내, 신청 안내 | 4 |
| 교회소식 | `news` | 대표 소식 묶음, 홈 업데이트 연결 | 4 |
| 후기 | `review` | 행사 후기, 새가족 후기, 청년부 후기, 양육/섬김 후기 | 14 |
| 교우소식 | `member-news` | 결혼, 장례, 개업, 출산 등 행정성 소식 | 5 |
| 선교 | `mission` | 선교 모집, 보고, 기도 제목 | 3 |
| 교단소식 | `denomination-news` | 노회/총회/교단 자료 | 6 |
| 주보 | `bulletin` | 주간 주보 PDF/이미지 | 8 |
| QT/묵상 | `qt` | 매일 또는 주간 묵상 콘텐츠 | 14 |
| 영상 | `video` | 설교 외 영상, 찬양, 행사 스케치 | 8 |
| 자료실 | `library` | 문서, 이미지, 악보, 교육자료 | 12 |

## 후기 포스트 세트

후기는 별도 메뉴를 만들기보다 `post`의 `review` 카테고리로 만들고, 필요하면 보조 카테고리로 `newcomers`, `youth-ministry`, `training`, `community`를 함께 붙인다.

| 후기 묶음 | 예시 제목 | 연결 페이지 | 최소 수량 | 필수 요소 |
|---|---|---|---:|---|
| 행사 후기 | 전 교인 봄 야외예배를 다녀와서 | `/news/`, `/albums/` | 4 | 대표 사진, 참여자 인용문, 행사 링크 |
| 새가족 후기 | 처음 예배에 참석한 날 | `/newcomers/`, `/news/` | 3 | 익명 표시명, 첫 방문 동선, 환영 경험 |
| 청년부 후기 | 서툴러도 괜찮아, 한 학기의 고백 | `/youth-ministry/`, `/news/` | 3 | 청년부 사진, 짧은 인용문, 모임 안내 CTA |
| 양육 후기 | 새가족 과정을 마치며 | `/training/`, `/new-family-course/` | 2 | 과정명, 수료 시점, 변화 포인트 |
| 섬김 후기 | 주방 봉사팀의 토요일 아침 | `/serve/`, `/news/` | 2 | 사역팀, 봉사 내용, 참여 CTA |

## CPT별 더미데이터 상세

### `modutheme_sermon`

| 묶음 | 수량 | 예시 |
|---|---:|---|
| 주일예배 | 6 | 말씀 안에서 머무르기로 결심하다, 골짜기에서도 잔이 넘치는 사람 |
| 수요예배 | 3 | 기다림 속에서 발견한 이름의 의미 |
| 새벽기도 | 2 | 광야에서 부르신 이름 |
| 다음세대/청년예배 | 1 | 사랑은 가까운 자리부터 시작됩니다 |

필드: `post_title`, `post_content`, `post_excerpt`, featured image, `modutheme_sermon_series`, 설교자 custom field, 성경본문 custom field, 영상 URL custom field, 예배 유형 custom field.

### `modutheme_event`

| 묶음 | 수량 | 예시 |
|---|---:|---|
| 공동체 행사 | 3 | 전 교인 봄 야외예배, 목장 리더 모임 |
| 양육/훈련 일정 | 2 | 새가족반 개강, 일대일 제자훈련 OT |
| 다음세대/청년 일정 | 2 | 청년부 수련회, 다음세대 여름성경학교 |
| 선교/섬김 일정 | 2 | 단기선교 오리엔테이션, 지역 섬김 주간 |

필드: `post_title`, `post_content`, `post_excerpt`, featured image, 시작일, 종료일, 장소, 대상, 신청 링크.

### `modutheme_album`

| 묶음 | 수량 | 예시 |
|---|---:|---|
| 예배/절기 | 3 | 부활절 새벽기도회, 성탄 감사예배 |
| 공동체 | 3 | 목장 모임 풍경, 새가족 환영회 |
| 다음세대/청년 | 3 | 청년부 수련회, 유초등부 여름성경학교 |
| 선교/섬김 | 3 | 지역 섬김 주간, 단기선교 파송예배 |

필드: `post_title`, `post_content`, `post_excerpt`, featured image, 갤러리 이미지, 촬영일, 관련 행사/사역.

## 홈페이지 더미데이터

| 영역 | 필요 데이터 | 최소 수량 | 비고 |
|---|---:|---:|---|
| 히어로 슬라이드 | 이미지, eyebrow, 제목, 본문, 설교/본문/설교자 meta, primary/secondary CTA | 4 | 현재 JS 슬라이드도 4개 기준 |
| 상단 공지 카드 | 유형, 날짜, 제목, 링크 | 3 | 현재 `href="#"` 형태라 실제 `/news/`, `/events/`, `/mission/` 등으로 연결 필요 |
| Welcome quick links | 아이콘 라벨, 링크, 보조 문구 | 8 | 현재 "중보기도"는 `/contact/`, "교회력"은 `/worship/`로 연결 |
| 업데이트 Featured | 카테고리, 날짜, 제목, 요약, 이미지, 링크 | 1 | 실제 일반 `post` 또는 `news` 카테고리와 매칭 |
| 업데이트 리스트 | 카테고리, 제목, 날짜, 링크 | 4 | 공지/선교/행사/교회력 |
| 사이드 미디어 카드 | 카테고리, 제목, 이미지, 링크 | 2 | 미디어/공동체 성격 |
| 새가족 단계 | 단계명, 설명, 아이콘, CTA | 4 | 새가족 페이지 본문과 내용 일치 |
| 설교 메인 카드 | 예배 유형, 시리즈, 제목, 본문, 설교자, 길이, 썸네일, 영상 URL | 2 | `modutheme_sermon` 게시물과 제목 일치 |
| 설교 썸네일 | 제목, 본문, 예배 유형, 날짜, 길이, 썸네일 | 4 | 주일/수요/새벽/다음세대 혼합 |
| 갤러리 | 제목, 대표 이미지, 날짜, 설명, 링크 | 7 | `modutheme_album`과 매칭 |
| CTA 카드 | 온라인 헌금, 문의하기 제목/본문/링크 | 2 | 실제 헌금/문의 페이지 본문 필요 |
| 상단바 | 기준 날짜, 예배명, 시간, 장소 | 1 | 현재 `2026년 5월 25일` 고정 |

## 메뉴/페이지 전수 목록

| 그룹 | 페이지 | slug | 화면 타입 | 더미데이터 필요 항목 | 최소 수량 |
|---|---|---|---|---|---:|
| 교회소개 | 교회소개 | `/about/` | page, 전용 템플릿 | 교회 소개 리드, 핵심 가치, 사역 방향, 대표 이미지 | 1 page |
| 교회소개 | 비전 | `/vision/` | page | 비전 문장, 핵심 가치 3-5개, 실천 문장, 이미지 | 1 page |
| 교회소개 | 섬기는 사람들 | `/people/` | page | 담임목사, 부목사/전도사, 장로, 권사/집사, 행정 담당 프로필 | 8-12명 |
| 교회소개 | 교회연혁 | `/history/` | page | 연도, 월, 사건명, 설명, 사진 | 8-12건 |
| 교회소개 | 연간일정 | `/annual-schedule/` | page 또는 archive | 월별 주요 예배/행사/양육/선교 일정 | 12개월 |
| 교회소개 | 오시는 길 | `/location/` | page | 주소, 교통편, 주차, 예배당 층별 안내, 지도 embed 정보 | 1 page |
| 예배 | 예배 대표 | `/worship/` | page, 전용 템플릿 | 라이브 예배, 최근 설교, 설교 시리즈, 오늘의 예배 시간표 | 1 set |
| 예배 | 예배 안내 | `/worship-guide/` | page | 예배 시간표, 장소, 처음 방문 안내, 유아/주차 안내 | 6-8개 예배 |
| 예배 | 주일예배 | `/sunday-worship/` | page + sermon query | 주일예배 설교 게시물, 시리즈 taxonomy, 썸네일 | 9개 이상 |
| 예배 | 수요예배 | `/wednesday-worship/` | page 또는 sermon filtered list | 수요예배 설교 게시물, 본문, 설교자, 날짜 | 6개 이상 |
| 예배 | 새벽기도 | `/dawn-prayer/` | page 또는 sermon filtered list | 새벽기도 말씀/기도 제목/일정 | 6개 이상 |
| 예배 | 주보 | `/bulletin/` | archive/single 권장 | 주보 제목, 날짜, PDF/이미지, 예배 순서, 교회소식 요약 | 8주분 |
| 공동체 | 공동체 대표 | `/community/` | page + event query | 공동체 소개, 하위 사역 카드, 공동체 일정 | 3 events |
| 공동체 | 새가족 | `/newcomers/` | page + form | 등록 절차, 안내자, 환영 메시지, FAQ, 신청 폼 필드 | 1 page |
| 공동체 | 소그룹/구역 | `/small-groups/` | page | 목장/구역 소개, 모임 요일, 대상, 리더, 장소 | 8-12개 |
| 공동체 | 다음세대 | `/next-generation/` | page | 영유아/유초등/중고등 예배 시간, 교역자, 사진, 커리큘럼 | 4-6개 부서 |
| 공동체 | 청년부 | `/youth-ministry/` | page | 청년예배, 소그룹, 리더, 후기/간증성 포스트 | 4-6개 |
| 공동체 | 장년/시니어 | `/senior-ministry/` | page | 장년/시니어 모임, 돌봄 사역, 일정, 사진 | 4-6개 |
| 양육 | 양육 대표 | `/training/` | page, 전용 템플릿 | 프로그램 목록, 카테고리, 대상, 기간, 신청 링크 | 8개 |
| 양육 | 새가족 과정 | `/new-family-course/` | page | 4주 과정 소개, 일정, 강사, 수료 안내 | 4주차 |
| 양육 | 성경공부 | `/bible-study/` | page 또는 archive | 강좌명, 대상, 교재, 기간, 요일, 장소 | 6개 |
| 양육 | 제자훈련 | `/discipleship/` | page | 과정 소개, 단계, 신청 조건, 담당자, 후기 | 3-5개 과정 |
| 양육 | QT/묵상 | `/qt/` | archive/single 권장 | 묵상 제목, 본문, 날짜, 질문, 기도문 | 14일분 |
| 선교·섬김 | 선교 안내 | `/mission/` | page | 국내/해외 통합 선교 소개, 선교지, 협력기관, 기도 제목 | 6-8개 |
| 선교·섬김 | 섬김 사역 | `/serve/` | page | 봉사팀, 역할, 신청 조건, 담당자, 활동 사진 | 8개 팀 |
| 선교·섬김 | 후원 안내 | `/support/` | page | 후원 방법, 계좌 안내, 지정 후원 항목, FAQ | 1 page |
| 미디어 | 미디어 대표 | `/media/` | page + album/sermon query | 사진 앨범 4개, 설교 영상 3개 | 7 posts |
| 미디어 | 교회소식 | `/news/` | archive/single 권장 | 공지/교우소식/후기/선교/행사 카테고리 글 | 12개 |
| 미디어 | 교단소식 | `/denomination-news/` | archive/single 권장 | 교단 공지, 노회 소식, 교육 자료 링크 | 6개 |
| 미디어 | 설교 | `/sermons/` | `modutheme_sermon` archive | 설교 제목, 본문, 설교자, 날짜, 시리즈, 영상 URL, 썸네일 | 12개 |
| 미디어 | 행사앨범 | `/albums/` | `modutheme_album` archive | 앨범 제목, 대표 이미지, 설명, 갤러리 이미지 | 12개 |
| 미디어 | 영상 | `/videos/` | archive/single 권장 | 영상 제목, 유형, embed URL, 썸네일, 설명 | 8개 |
| 미디어 | 자료실 | `/library/` | page, 누적 콘텐츠 권장 | 자료명, 분류, 파일 URL, 설명, 날짜 | 12개 |
| 행정 | 행정 대표 | `/admin-guide/` | page, 전용 템플릿 | 행정서비스 8개, 교우소식 5개, FAQ 3개, 자료 6개 | 1 set |
| 행정 | 온라인 헌금 | `/giving/` | page | 헌금 종류, 계좌, 방법, 유의사항, 개인정보 안내 | 1 page |
| 행정 | 증명서 발급 | `/documents/` | form page | 신청 가능한 증명서, 신청 필드, 처리 시간, 수령 방법 | 4종 |
| 행정 | 장소 사용 신청 | `/facility-request/` | form page | 공간 목록, 사용 가능 시간, 신청 필드, 승인 절차 | 6공간 |
| 행정 | 차량 사용 신청 | `/vehicle-request/` | form page | 차량 목록, 사용 목적, 신청 필드, 운전자 조건 | 3차량 |
| 행정 | 문의하기 | `/contact/` | contact form | 문의 유형, 연락처, 운영 시간, 기도 요청/상담 필드 | 1 form |
| 유틸 | English | `/english/` | page | 영어 예배/방문 안내, 위치, 연락처 | 1 page |
| 유틸 | 로그인 | `/login/` 또는 `/wp-login.php` | account page | 안내 문구, 로그인 경로 | 1 page |
| 유틸 | 회원가입 | `/register/` | account page | 회원가입 정책/필드/승인 안내 | 1 page |
| 정책 | 개인정보처리방침 | `/privacy-policy/` | legal page | 수집 항목, 이용 목적, 보관 기간, 담당자 | 1 page |
| 정책 | 이메일 무단수집거부 | `/email-policy/` | legal page | 이메일 수집 거부 고지문 | 1 page |

## 게시물/후기 데이터

사용자가 언급한 "포스트 후기" 성격은 현재 IA에 별도 메뉴로 없으므로 `post`의 `review` 카테고리로 넣고, `/news/`에서 함께 노출하는 것이 자연스럽다. 이 표는 앞의 "후기 포스트 세트"를 압축한 보조 요약이다.

| 카테고리 | 예시 제목 | 필요 필드 | 최소 수량 |
|---|---|---|---:|
| 공지 | 2026 봄학기 양육과정 신청 안내 | 제목, 날짜, 요약, 본문, 고정 여부 | 4 |
| 행사 후기 | 전 교인 봄 야외예배를 다녀와서 | 제목, 날짜, 작성자, 사진, 후기 본문 | 4 |
| 새가족 후기 | 처음 예배에 참석한 날 | 제목, 날짜, 작성자 익명 처리, 본문 | 3 |
| 청년부 후기 | 서툴러도 괜찮아, 한 학기의 고백 | 제목, 날짜, 사진, 인용문 | 3 |
| 양육/섬김 후기 | 새가족 과정을 마치며 | 과정/사역명, 날짜, 사진, 변화 포인트 | 4 |
| 선교 소식 | 캄보디아 단기선교팀 동역자 모집 | 제목, 날짜, 기도 제목, 신청 링크 | 3 |
| 교우소식 | 결혼/장례/개업 안내 | 유형, 대상, 일시, 장소, 연락처 노출 범위 | 5 |

## 섬기는 사람들 데이터

| 구분 | 필요 필드 | 최소 수량 |
|---|---|---:|
| 담임목사 | 이름, 직분, 인사말, 약력 3-5줄, 사진, 이메일 또는 문의 연결 | 1 |
| 부목사/전도사 | 이름, 직분, 담당 사역, 사진, 한 줄 소개 | 3-5 |
| 장로 | 이름, 담당 위원회/사역, 사진 선택 | 4-6 |
| 권사/집사/팀장 | 이름, 담당 사역, 사진 선택 | 4-8 |
| 행정/시설 담당 | 이름 또는 부서명, 담당 업무, 연락 가능 시간 | 2-3 |

## 누적 콘텐츠 타입별 권장 데이터

| 타입 | 현재 구현 | 필요한 더미데이터 | 비고 |
|---|---|---|---|
| 설교 | `modutheme_sermon` CPT | 12개, 시리즈 taxonomy 3개, 썸네일/영상 URL | 홈, `/worship/`, `/sermons/`, `/sunday-worship/`에서 사용 |
| 행사 | `modutheme_event` CPT | 9개, 날짜/장소/대상/신청 링크 | `/community/`, `/events/` archive에서 사용 |
| 앨범 | `modutheme_album` CPT | 12개, 대표 이미지, 갤러리 이미지 4-8장 | `/media/`, `/albums/`에서 사용 |
| 일반 글 | 기본 `post` | 공지/후기/교우소식/선교소식 26개 | `/news/`, 검색, 기본 archive 보강 |
| 주보 | 미구현 | 8주분 PDF/이미지/예배 순서 | CPT 또는 `post` category 결정 필요 |
| QT/묵상 | 미구현 | 14일분 본문/질문/기도문 | CPT 또는 `post` category 결정 필요 |
| 영상 | 미구현 | 8개 embed URL/썸네일 | 설교 외 영상 구분 필요 |
| 자료실 | 정적 page | 12개 자료명/분류/파일 URL | 다운로드형이면 CPT 권장 |

## 폼 페이지 더미 필드

| 페이지 | 필수 필드 |
|---|---|
| `/newcomers/` | 이름, 연락처, 방문일, 연령대, 동반 가족, 관심 사역, 개인정보 동의 |
| `/documents/` | 이름, 연락처, 증명서 종류, 용도, 수령 방식, 신청 메모 |
| `/facility-request/` | 신청자, 부서, 공간, 사용일시, 인원, 장비, 승인 연락처 |
| `/vehicle-request/` | 신청자, 부서, 사용일시, 목적지, 탑승 인원, 운전자, 비상 연락처 |
| `/contact/` | 문의 유형, 이름, 연락처, 이메일, 내용, 회신 방식, 개인정보 동의 |

## 정리 필요 항목

1. 헤더 유틸 IA와 실제 헤더가 다르다: 실제 헤더는 `/english/`, `/wp-login.php`를 사용하고, IA의 `/giving/`, `/register/`는 빠져 있다.
2. 푸터 IA는 공동체/양육, 미디어/행정 그룹까지 요구하지만 실제 푸터는 교회소개/예배/정책 중심으로 축소되어 있다.
3. `scripts/sync-wp-pages.mjs`에는 `children`, `youth-worship`, `new-family-ministry`처럼 현재 IA와 다른 예전 slug가 남아 있다.
4. `news`, `denomination-news`, `bulletin`, `qt`, `videos`, `library`는 누적 콘텐츠인데 현재 자동 생성 페이지 중심이다. 운영 방식 결정이 필요하다.
5. 홈 패턴과 예배 페이지에는 날짜/본문/설교자/제목이 하드코딩되어 있으므로 실제 더미 게시물과 불일치하지 않게 맞춰야 한다.

## 추천 생성 순서

1. P0 `modutheme_sermon` 12개, `modutheme_event` 9개, `modutheme_album` 12개 생성
2. P0 기본 `post`로 공지 4개, 후기 14개, 교우소식 5개, 선교소식 3개 생성
3. P1 기본 `post`로 주보 8주분, QT 14일분, 교단소식 6개, 영상 8개, 자료실 12개 생성
4. P1 홈/예배/미디어 페이지의 하드코딩 카드 제목과 실제 CPT/포스트 제목을 맞춤
5. P1 섬기는 사람들 8-12명, 연혁 8-12건, 연간일정 12개월 생성
6. P2 메인 메뉴 하위 페이지 본문 seed 교체, 푸터 연락처, 패밀리 사이트, SNS, 정책/영문 페이지 보강
