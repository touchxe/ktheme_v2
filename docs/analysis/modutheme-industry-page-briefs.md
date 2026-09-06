# 모두테마 업종별 페이지 기본 기획서

Date: 2026-08-30  
Status: external design handoff baseline

## 읽는 방법

비교 상태는 현재 `wp-content/themes/modu-theme` v0.3.62를 기준으로 한다.

- `보유`: 현재 디자인을 콘텐츠·토큰 교체로 활용 가능
- `변형`: 현재 컴포넌트를 재사용하되 업종별 구조와 상태 디자인 필요
- `신규`: 대응 페이지 또는 핵심 상호작용을 새로 디자인해야 함

모든 페이지는 데스크톱 1440px/콘텐츠 1200~1240px, 모바일 390px을 기본으로 제작한다. 목록은 기본·필터 적용·결과 없음, 폼은 기본·검증 오류·전송 중·완료, 예약/상품은 가능·마감·품절·종료 상태까지 포함한다.

## 1. 병원/의원

대상: 의원, 전문클리닉, 검진센터, 치과, 한의원  
프리셋: `medical-specialty`, `medical-local-clinic`, `medical-booking`, `medical-facility`  
핵심 전환: 진료 예약 → 전화/카카오 상담 → 길찾기

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 증상/목적에 맞는 진료와 예약 진입을 빠르게 제공 | 진료시간, 대표 진료, 의료진, 시설, 위치, 예약 CTA, 의료 고지 | `hero-consultation`, `availability-strip`, `goal-based-navigation`, `expert-profiles`, `facility-gallery`, `conversion-cta` | 신규 |
| 병원소개 | 진료 철학과 운영 신뢰 설명 | 원장 메시지, 진료 원칙, 연혁, 협력기관, 위치 | `brand-story`, `metrics-proof`, `credentials-proof` | 변형 |
| 진료과목 | 목적/증상별 진료 탐색 | 진료분야, 대상, 대표 증상, 담당 의료진, 예약 연결 | `service-catalog`, `goal-based-navigation` | 신규 |
| 진료과목 상세 | 특정 진료의 대상·과정·주의사항 설명 | 대상, 진료 범위, 검사/치료 흐름, 담당자, FAQ, 예약 | `offering-single`, `service-process`, `service-disclosure` | 신규 |
| 치료/프로그램 | 치료·검진·프로그램 비교 | 프로그램 분류, 포함 항목, 기간, 가격/문의, 의료 고지 | `service-catalog`, `pricing-consultation` | 신규 |
| 의료진 | 전문분야에 맞는 의료진 선택 | 사진, 이름, 직위, 진료분야, 경력, 진료 일정 | `profile-directory`, `expert-profiles` | 변형 |
| 의료진 상세 | 의료진 신뢰와 예약 연결 | 약력, 자격, 논문/학회, 전문분야, 진료시간, 관련 프로그램 | `profile-single`, `credentials-proof` | 신규 |
| 시설/장비 | 안전·접근성·장비 신뢰 제공 | 시설 사진, 장비명, 용도, 편의시설, 접근성 | `facility-gallery`, `credentials-proof` | 보유 |
| 예약/상담 | 진료 예약 또는 상담 접수 | 진료분야, 의료진 선택, 희망일, 연락처, 동의, 완료 안내 | `booking-availability`, `conversion-form`, `privacy-consent` | 신규 |
| 공지/FAQ | 방문 전 질문과 운영 변경 안내 | 휴진, 진료시간 변경, 준비사항, 주차, 자주 묻는 질문 | `notice-archive`, `faq-preparation`, `service-disclosure` | 변형 |
| 오시는 길 | 방문 실패 방지 | 지도, 주소, 대중교통, 주차, 층/출입구, 연락처 | `location-page` | 보유 |

## 2. 법률/세무/노무

대상: 법무법인, 변호사·세무사·노무사·행정사 사무소  
프리셋: `professional-practice`, `professional-team`, `professional-case`, `professional-local-office`  
핵심 전환: 전문분야 확인 → 사례/구성원 신뢰 → 상담 신청

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 방문자의 문제를 전문분야와 상담으로 연결 | 문제별 진입, 대표 구성원, 사례, 절차, 상담 CTA, 면책 | `hero-consultation`, `problem-solution`, `service-category-nav`, `case-studies`, `conversion-cta` | 신규 |
| 사무소소개 | 전문성·책임범위·지역 신뢰 설명 | 철학, 연혁, 자격/등록, 업무 원칙, 위치 | `brand-story`, `credentials-proof` | 변형 |
| 전문분야 | 문제/업무별 서비스 탐색 | 분야, 대상, 주요 쟁점, 준비자료, 담당자 | `service-catalog`, `service-category-nav` | 신규 |
| 전문분야 상세 | 상담 전 범위와 절차 이해 | 가능한 업무, 제외 범위, 진행절차, 기간, 필요서류, 관련 사례 | `offering-single`, `service-process`, `service-disclosure` | 신규 |
| 구성원 | 담당 전문가 선택 | 자격, 전문분야, 경력, 언어, 지점, 상담 CTA | `profile-directory` | 변형 |
| 구성원 상세 | 개인 전문성 검증 | 약력, 자격, 주요업무, 기고/강의, 사례, 상담 연결 | `profile-single`, `credentials-proof` | 신규 |
| 성공사례 | 유사 문제 해결 경험 탐색 | 분야/상황 필터, 문제, 대응, 결과, 익명/면책 | `case-archive`, `case-studies` | 신규 |
| 사례 상세 | 해결 과정과 전문성 설명 | 배경, 쟁점, 전략, 결과, 제한/면책, 관련 서비스 | `case-single`, `service-disclosure` | 신규 |
| 자료실 | 검색 유입과 사전 이해 제공 | 칼럼, 체크리스트, 법령/세무 일정, 파일, 버전 | `resource-archive` | 변형 |
| 상담신청 | 적합한 담당자에게 문의 전달 | 문의분야, 상황 요약, 일정, 연락처, 첨부, 동의, 면책 | `conversion-form`, `sensitive-request-form` | 변형 |
| 오시는 길 | 방문 상담 지원 | 주소, 주차, 방문시간, 지점/담당 연락처 | `location-page` | 보유 |

## 3. 학원/교육기관

대상: 입시학원, 직업·평생교육, 온라인교육, 공공/민간 교육기관  
프리셋: `academy-course`, `academy-instructor`, `academy-admission`, `education-institution`  
핵심 전환: 과정 탐색 → 일정/강사 확인 → 수강 상담·신청

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 적합한 과정을 빠르게 찾고 상담하게 함 | 대상별 과정, 개강 일정, 강사진, 후기, 자료, 상담 CTA | `hero-consultation`, `goal-based-navigation`, `featured-offerings`, `event-calendar` | 신규 |
| 기관소개 | 교육 철학과 운영 신뢰 제시 | 교육 목표, 연혁, 시설, 인증, 운영 주체 | `brand-story`, `credentials-proof`, `facility-gallery` | 변형 |
| 교육과정 | 대상·목표·기간별 과정 탐색 | 분류/필터, 대상, 기간, 일정, 수강료, 상태 | `service-catalog`, `program-catalog` | 신규 |
| 과정 상세 | 수강 결정을 위한 전체 정보 제공 | 학습목표, 커리큘럼, 강사, 일정, 준비물, 수료/평가, 가격, CTA | `offering-single`, `service-process`, `pricing-consultation` | 신규 |
| 강사진 | 분야별 강사 신뢰 확인 | 전문분야, 경력, 담당 과정, 소개 영상 | `profile-directory` | 변형 |
| 강사 상세 | 강사와 담당 과정 연결 | 경력, 자격, 교육 철학, 담당 과정, 일정, 후기 | `profile-single` | 신규 |
| 일정/개강 | 신청 가능한 일정을 확인 | 달력/목록, 과정, 시간, 정원, 마감, 신청 | `calendar-schedule`, `event-calendar`, `availability-strip` | 변형 |
| 수강후기 | 과정 선택의 사회적 근거 제공 | 과정/목표별 필터, 후기, 결과 맥락, 사진/영상, 고지 | `review-archive`, `reviews-gallery` | 신규 |
| 자료실 | 커리큘럼·학습자료 다운로드 | 분류, 버전, 파일, 미리보기, 관련 과정 | `resource-archive`, `resource-single` | 변형/신규 |
| 입학/수강상담 | 과정 추천과 상담 접수 | 목표, 현재 수준, 희망 일정, 과정, 연락처, 동의 | `conversion-form`, `conditional-form` | 변형 |
| 공지/FAQ | 운영 안내와 반복 질문 해결 | 개강/휴강, 환불, 준비물, 수료, 온라인 접속 | `notice-archive`, `faq-preparation`, `service-disclosure` | 변형 |
| 오시는 길 | 방문/등원 지원 | 지도, 교통, 주차, 교실, 상담시간 | `location-page` | 보유 |

## 4. 제조/B2B

대상: 장비, 자동화/로봇, 센서/IoT, 에너지, 설비, 검사/안전, 부품/소재  
프리셋: `industrial-equipment`, `industrial-automation`, `industrial-energy`, `industrial-inspection`  
핵심 전환: 제품 탐색 → 사양/사례 검증 → 자료 다운로드·견적

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 현장 문제와 제품/솔루션을 연결 | 문제, 제품군, 적용산업, 대표제품, 사례, 인증, 견적 CTA | `hero-quote`, `problem-solution`, `featured-products`, `case-studies` | 신규 |
| 회사소개 | 제조 역량과 공급 신뢰 제시 | 연혁, 조직, 생산능력, 품질정책, 글로벌 대응 | `brand-story`, `metrics-proof`, `credentials-proof` | 변형 |
| 제품/기술 | 제품군과 모델 탐색 | 제품군, 필터, 핵심 사양, 적용처, 비교 선택 | `product-catalog`, `product-category-nav` | 신규 |
| 제품 상세 | 기술 검토와 견적에 필요한 정보 제공 | 이미지/도면, 사양표, 옵션, 인증, 다운로드, 적용사례, 견적 | `product-single`, `spec-comparison`, `resource-library` | 신규 |
| 적용산업 | 업종별 해결 방식 설명 | 산업 문제, 적용 제품, 구성도, 성과, 관련 사례 | `service-catalog`, `problem-solution` | 신규 |
| 사례 | 납품/도입 경험 탐색 | 산업·제품 필터, 현장 문제, 구성, 성과 | `case-archive` | 신규 |
| 사례 상세 | 기술 적용 근거 제공 | 현장 배경, 요구사항, 설계/납품, 결과, 수치, 관련 제품 | `case-single`, `metrics-proof` | 신규 |
| 설비현황 | 생산·검사 역량 증명 | 공장/설비 이미지, 장비명, 역할, 생산/검사 능력 | `facility-gallery`, `metrics-proof` | 변형 |
| 인증현황 | 품질·납품 자격 검증 | 인증/특허, 발급기관, 유효기간, 문서 | `certification-library`, `credentials-proof` | 신규 |
| 기술자료 | 도면·카탈로그·매뉴얼 제공 | 분류, 모델, 버전, 파일, 언어, 다운로드 | `resource-archive`, `resource-single` | 변형/신규 |
| 견적문의 | 기술 요구를 구조화해 전달 | 제품, 수량, 사양, 적용환경, 일정, 첨부, 회사정보 | `quote-form` | 신규 |
| A/S·기술지원 | 설치 후 지원 경로 안내 | 지원 범위, 접수절차, 보증, 부품/매뉴얼, 긴급 연락 | `service-process`, `service-disclosure`, `conversion-form` | 변형 |
| 오시는 길 | 본사/공장 방문 지원 | 지점 선택, 주소, 물류/방문 안내, 연락처 | `location-page` 또는 `branch-locator` | 보유/신규 |

## 5. 인테리어/건축/시공

대상: 인테리어, 건축사, 시공사, 리모델링, 조경  
프리셋: `interior-residential`, `interior-commercial`, `architecture-project`, `construction-quote`  
핵심 전환: 프로젝트 탐색 → 과정/역량 검증 → 견적 문의

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 대표 작업과 견적 전환을 동시에 제공 | 프로젝트, 서비스, 전후, 과정, 팀, 후기, 견적 CTA | `hero-quote`, `case-studies`, `experience-process`, `conversion-cta` | 신규 |
| 브랜드/회사소개 | 미감·시공 철학·책임범위 설명 | 철학, 팀, 경력, 자격, 협력사, 지역 | `brand-story`, `expert-profiles`, `credentials-proof` | 변형 |
| 서비스 | 공간/공정별 제공 범위 안내 | 주거/상업/건축/조경, 포함·제외, 예상 기간, 상담 | `service-catalog`, `service-disclosure` | 신규 |
| 시공사례 | 공간·평수·스타일별 탐색 | 프로젝트 필터, 대표 이미지, 범위, 기간, 지역 | `case-archive` | 신규 |
| 프로젝트 상세 | 디자인과 시공 과정의 깊이 제공 | 배경, 요구, 컨셉, 도면, 전후, 공정, 자재, 결과 | `case-single`, `before-after`, `material-process` | 신규 |
| 전후/과정 | 변화와 작업 신뢰를 집중 제시 | 전후 비교, 공정별 이미지, 기간, 조건/고지 | `before-after`, `experience-process` | 신규 |
| 진행 프로세스 | 문의부터 하자지원까지 기대치 정리 | 상담, 현장방문, 제안, 계약, 시공, 검수, A/S | `service-process` | 보유 |
| 팀 | 설계·시공 담당자 소개 | 역할, 경력, 자격, 대표 프로젝트 | `profile-directory` | 변형 |
| 견적문의 | 현장 정보를 충분히 수집 | 공간유형, 위치, 면적, 예산, 희망일, 도면/사진 첨부 | `quote-form` | 신규 |
| 오시는 길 | 상담 사무실 방문 지원 | 주소, 주차, 상담 가능시간, 연락처 | `location-page` | 보유 |

## 6. 부동산/분양

대상: 분양대행, 시행사, 모델하우스, 중개법인, 상업시설  
프리셋: `property-sales`, `residential-complex`, `commercial-property`, `local-brokerage`  
핵심 전환: 입지/타입 검토 → 방문 계획 → 관심고객 등록

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 핵심 가치와 등록 CTA를 즉시 전달 | 사업명, 위치, 일정, 대표 타입, 프리미엄, 지도, 등록 CTA | `hero-consultation`, `availability-strip`, `conversion-cta` | 신규 |
| 사업개요 | 사업의 기본 조건 설명 | 위치, 규모, 세대/호실, 시행/시공, 일정, 유의사항 | `brand-story`, `metrics-proof`, `service-disclosure` | 변형 |
| 입지환경 | 생활권·교통·미래가치 탐색 | 지도, 교통, 학교/상권/공원, 거리/시간, 개발계획 출처 | `nearby-map`, `route-itinerary` | 신규 |
| 타입/평면 | 타입별 구성 비교 | 타입 카드, 면적, 방/공간, 방향, 대표 도면, 비교 | `comparison-page`, `spec-comparison` | 신규 |
| 타입 상세 | 특정 평면의 세부 검토 | 확대 도면, 면적표, 공간 설명, 옵션, 갤러리, 문의 | `floor-plan-viewer`, `facility-gallery` | 신규 |
| 프리미엄 | 구매 이유와 근거 정리 | 입지, 설계, 커뮤니티, 브랜드, 수치/출처 | `problem-solution`, `metrics-proof` | 변형 |
| 단지/시설 | 단지 배치와 편의시설 안내 | 배치도, 시설, 동선, 접근성, 이미지 | `facility-gallery`, `route-itinerary` | 변형 |
| 분양일정 | 주요 마감과 방문 일정 안내 | 공급/청약/계약/입주 일정, 상태, 변경 고지 | `calendar-schedule`, `availability-strip` | 변형 |
| 관심고객등록 | 리드 수집과 방문 연결 | 관심 타입, 지역, 연락처, 방문 희망, 동의, 완료 | `conversion-form`, `privacy-consent` | 변형 |
| 공지/FAQ | 변경사항과 반복 질문 해결 | 분양 공지, 자격/일정, 방문, 유의사항 | `notice-archive`, `faq-preparation` | 변형 |
| 오시는 길 | 모델하우스 방문 지원 | 지도, 주차, 대중교통, 운영시간, 전화 CTA | `location-page` | 보유 |

## 7. 음식점/카페/프랜차이즈

대상: 음식점, 카페, 베이커리, 프랜차이즈 본사, 로컬 식음료  
프리셋: `restaurant-menu`, `cafe-space`, `franchise-recruitment`, `local-food-brand`  
핵심 전환: 메뉴 탐색·예약·매장 찾기 또는 가맹 문의

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 음식/공간/매장/가맹 중 핵심 목적을 빠르게 제시 | 대표 메뉴, 공간, 매장, 이야기, 후기, 예약/가맹 CTA | `hero-booking` 또는 `hero-commerce`, `featured-products`, `conversion-cta` | 신규 |
| 브랜드 | 맛·재료·공간의 정체성 설명 | 시작, 철학, 원재료, 공정, 사람, 매장 경험 | `brand-story`, `material-process` | 변형 |
| 메뉴 | 카테고리와 메뉴 탐색 | 분류, 이미지, 가격, 알레르기/원산지, 판매 상태 | `product-catalog`, `product-category-nav` | 신규 |
| 메뉴 상세 | 선택 전 충분한 정보 제공 | 이미지, 설명, 구성/옵션, 가격, 알레르기, 추천 조합 | `product-single`, `usage-guide` | 신규 |
| 공간/갤러리 | 방문 분위기와 좌석/편의 정보 제공 | 공간 사진, 좌석, 단체 가능, 유아/반려동물, 주차 | `facility-gallery` | 보유 |
| 매장안내 | 지역별 매장 찾기 | 지역 필터, 지도, 운영시간, 편의, 예약/길찾기 | `branch-locator` | 신규 |
| 매장 상세 | 특정 매장 방문 결정 지원 | 주소, 시간, 메뉴/서비스, 사진, 주차, 예약 | `location-page`, `facility-gallery` | 변형 |
| 예약 | 날짜·인원·지점 예약 문의 | 지점, 날짜, 시간, 인원, 요청사항, 연락처, 동의 | `booking-availability`, `conversion-form` | 신규 |
| 창업/가맹안내 | 브랜드·비용·절차 설명 | 경쟁력, 모델, 예상비용, 지원, 절차, 사례, FAQ | `problem-solution`, `package-comparison`, `service-process` | 신규 |
| 가맹문의 | 예비 가맹점 리드 수집 | 지역, 점포, 예산, 경험, 일정, 연락처, 동의 | `conditional-form`, `conversion-form` | 변형 |
| 소식/FAQ | 신메뉴·행사·운영 안내 | 공지, 프로모션, 매장 소식, 예약/가맹 FAQ | `notice-archive`, `faq-preparation` | 변형 |

## 8. 미용/피트니스/예약형 매장

대상: 미용실, 네일, 피부관리, PT, 피트니스, 스튜디오  
프리셋: `beauty-booking`, `fitness-trainer`, `service-pricing`, `multi-branch-store`  
핵심 전환: 목적/서비스 선택 → 전문가·가격 확인 → 예약

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 예약 전 필요한 선택을 압축 | 목적별 탐색, 서비스, 전문가, 가격, 후기, 지점, 예약 CTA | `hero-booking`, `goal-based-navigation`, `expert-profiles`, `reviews-gallery` | 신규 |
| 매장소개 | 공간·운영철학·위생 신뢰 설명 | 브랜드, 위생/안전, 시설, 이용 규칙, 위치 | `brand-story`, `facility-gallery`, `service-disclosure` | 변형 |
| 서비스 | 목적/카테고리별 서비스 탐색 | 분류, 소요시간, 가격, 대상, 담당자, 상태 | `service-catalog` | 신규 |
| 서비스 상세 | 예약 선택에 필요한 조건 설명 | 효과 표현 주의, 과정, 시간, 가격, 준비/주의, 담당자, 후기 | `offering-single`, `usage-guide`, `service-disclosure` | 신규 |
| 가격안내 | 서비스·회원권·패키지 비교 | 단품, 패키지, 포함 항목, 추가비용, 유효기간 | `pricing-page`, `package-comparison` | 변형/신규 |
| 전문가 | 담당자 선택 | 전문분야, 경력, 지점, 가능 서비스, 예약 | `profile-directory` | 변형 |
| 전문가 상세 | 개인 전문성과 예약 연결 | 소개, 자격, 작업/수업, 일정, 후기, 관련 서비스 | `profile-single` | 신규 |
| 시설/전후 갤러리 | 공간과 결과 신뢰 제공 | 시설, 장비, 전후 이미지, 조건/동의 고지 | `facility-gallery`, `before-after` | 보유/신규 |
| 리뷰 | 실제 이용 맥락 제공 | 서비스/담당자/지점 필터, 후기, 평점, 이미지, 승인 | `review-archive` | 신규 |
| 예약 | 지점·서비스·전문가·시간 선택 | 단계형 선택, 가능 상태, 연락처, 동의, 완료 | `booking-availability`, `conversion-form` | 신규 |
| 지점/오시는 길 | 가까운 지점 선택 | 지도, 지역, 운영시간, 서비스, 담당자, 길찾기 | `branch-locator` | 신규 |
| FAQ | 예약·취소·준비사항 안내 | 변경/취소, 지각, 준비, 회원권, 주의사항 | `faq-preparation`, `service-disclosure` | 보유 |

## 9. 스타트업/SaaS/문제특화 AI

대상: B2B SaaS, 업무 플랫폼, AI 상담/제조/에너지, 데이터, 개발자 도구  
프리셋: `saas-product`, `saas-enterprise`, `saas-problem-specific-ai`, `saas-developer-tool`  
핵심 전환: 문제/기능 이해 → 사례·가격 검증 → 데모 신청

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 문제와 제품 가치를 짧게 증명 | 문제, 핵심 기능, 사용 흐름, 연동, 고객사, 사례, 가격, 데모 | `hero-consultation`, `problem-solution`, `case-studies`, `package-comparison` | 신규 |
| 제품/기능 | 기능군과 사용 목적 탐색 | 기능 분류, 역할별/문제별 진입, 통합 설명 | `service-catalog`, `service-category-nav` | 신규 |
| 기능 상세 | 특정 기능의 작동·가치 설명 | 문제, 화면, 입력/출력, 권한, 연동, 보안, 관련 사례 | `offering-single`, `technical-process` | 신규 |
| 사용 흐름 | 도입·사용 과정을 시각화 | 시작, 설정, 협업, 결과, 관리자 흐름 | `service-process`, `technical-process` | 보유/변형 |
| 연동/API | 기술 검토 지원 | 연동 목록, 범주, 상태, 인증, API 문서, 개발자 CTA | `product-catalog`, `resource-library` | 신규 |
| 고객사 | 신뢰와 적용 범위 제시 | 로고, 업종, 규모, 사용 기능, 성과 | `case-archive`, `metrics-proof` | 신규 |
| 사례 상세 | 도입 근거와 결과 설명 | 배경, 문제, 도입, 변화, 수치, 인용, 관련 기능 | `case-single` | 신규 |
| 요금 | 플랜 선택과 영업 연결 | 대상, 기능, 사용량, 가격/문의, 비교, FAQ | `pricing-page`, `package-comparison` | 변형/신규 |
| 자료실 | 보고서·가이드·웨비나 탐색 | 유형/주제 필터, 파일/영상, 리드 폼 여부 | `resource-archive` | 변형 |
| 자료 상세 | 다운로드 전 가치 설명 | 요약, 목차, 대상, 미리보기, 폼, 관련 자료 | `resource-single` | 신규 |
| 데모신청 | 영업 적격 정보 수집 | 회사, 역할, 문제, 규모, 일정, 연동, 연락처, 동의 | `conversion-form`, `conditional-form` | 변형 |
| 문의 | 일반·기술·파트너 문의 분리 | 문의유형, 내용, 회사, 회신, 동의 | `conversion-form` | 보유/변형 |
| FAQ | 도입 장벽 제거 | 가격, 보안, 데이터, 계약, 지원, 해지 | `faq-preparation`, `service-disclosure` | 보유 |

## 10. 포트폴리오/에이전시

대상: 디자인·개발·영상·마케팅·브랜딩·콘텐츠 스튜디오  
프리셋: `agency-cases`, `agency-services`, `agency-editorial`, `studio-profile`  
핵심 전환: 프로젝트 탐색 → 역량/과정 확인 → 미팅·문의

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 대표 작업과 전문성을 즉시 보여 줌 | 대표 프로젝트, 서비스, 성과, 프로세스, 팀, 문의 CTA | `hero-quote`, `case-studies`, `metrics-proof` | 신규 |
| 소개 | 관점과 팀 정체성 설명 | 철학, 역사, 팀, 수상, 파트너, 방식 | `brand-story`, `expert-profiles`, `credentials-proof` | 변형 |
| 서비스 | 제공 범위와 적합 고객 설명 | 분야, 산출물, 기간, 협업방식, 가격/문의 | `service-catalog`, `package-comparison` | 신규 |
| 프로젝트 | 작업 유형·산업별 탐색 | 필터, 대표 이미지, 클라이언트/맥락, 역할, 결과 | `case-archive` | 신규 |
| 프로젝트 상세 | 사고과정과 결과를 깊이 설명 | 브리프, 문제, 전략, 과정, 산출물, 성과, 크레딧 | `case-single`, `media-gallery` | 신규 |
| 프로세스 | 협업 기대치 정리 | 문의, 진단, 제안, 제작, 검수, 전달/운영 | `service-process` | 보유 |
| 팀 | 역할별 구성원 신뢰 제공 | 역할, 전문분야, 대표 프로젝트, 소개 | `profile-directory` | 변형 |
| 인사이트 | 전문성 검색 유입 확보 | 글/리포트/영상, 주제 필터, 관련 서비스 | `resource-archive`, `resource-single` | 변형/신규 |
| 문의 | 프로젝트 적합성 판단 정보 수집 | 유형, 목표, 범위, 예산, 일정, 참고/첨부, 연락처 | `quote-form` | 신규 |

## 11. 지역관광/체험/문화

대상: 체험농장, 공방, 수목원, 로컬투어, 관광협회/문화재단, 축제, 숙박  
프리셋: `local-experience`, `local-destination`, `local-event`, `local-stay`  
핵심 전환: 날짜/인원 확인 → 프로그램·코스 선택 → 예약/문의

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 오늘 가능한 경험과 지역 탐색을 제공 | 날짜/인원, 추천 프로그램, 계절 코스, 주변 지도, 후기, 예약 | `hero-booking`, `availability-strip`, `seasonal-recommendations`, `nearby-map` | 신규 |
| 브랜드/운영자 이야기 | 장소와 운영자 신뢰 형성 | 시작, 지역, 사람, 철학, 지속가능성, 사진 | `brand-story`, `material-process` | 변형 |
| 프로그램/상품 | 체험·투어·행사·숙박 탐색 | 유형, 날짜, 대상, 시간, 가격, 가능 상태 | `service-catalog`, `program-catalog` | 신규 |
| 프로그램 상세 | 예약 판단에 필요한 전체 정보 제공 | 일정, 포함/불포함, 준비물, 안전, 위치, 가격, 후기, 예약 | `offering-single`, `experience-process`, `service-disclosure` | 신규 |
| 일정/예약 | 날짜·인원·프로그램 선택 | 달력, 시간, 정원, 마감, 옵션, 연락처, 동의 | `booking-availability`, `conversion-form` | 신규 |
| 추천 코스 | 체류시간별 방문 동선 제안 | 코스 단계, 시간, 거리, 교통, 프로그램/장소 연결 | `route-nearby`, `route-itinerary` | 신규 |
| 주변 관광 | 함께 방문할 장소 탐색 | 지도, 카테고리, 거리, 운영시간, 제휴 혜택 | `nearby-map` | 신규 |
| 갤러리 | 공간·계절·경험을 시각적으로 확인 | 분류, 사진/영상, 캡션, 관련 프로그램 | `gallery-archive` | 보유 |
| 후기 | 실제 방문 맥락 제공 | 프로그램/계절/동반 유형, 후기, 이미지, 승인/고지 | `review-archive` | 신규 |
| 단체/제휴 문의 | 학교·기업·여행사 요구 수집 | 단체 규모, 일정, 예산, 목적, 식사/교통, 제휴 유형 | `quote-form`, `group-partnership-inquiry` | 신규 |
| 공지/FAQ | 기상·휴무·취소·준비 안내 | 운영 변경, 환불, 복장, 연령, 반려동물, 접근성 | `notice-archive`, `faq-preparation` | 변형 |
| 오시는 길 | 방문 동선과 주차 지원 | 지도, 교통, 주차, 입구, 주변 연결 | `location-page` | 보유 |

## 12. 웰니스/상담/돌봄

대상: 필라테스/요가, 심리상담, 비의료 코칭, 운동센터, 시니어돌봄, 명상  
프리셋: `wellness-movement`, `wellness-counseling`, `wellness-senior-care`, `wellness-multi-branch`  
핵심 전환: 이용 목적 탐색 → 전문가/프로그램 확인 → 상담·방문 예약

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 방문자의 목적을 안전하게 상담으로 연결 | 목적 탐색, 프로그램, 전문가, 절차, 공간, 가격, 고지, 예약 | `hero-consultation`, `goal-based-navigation`, `expert-profiles`, `service-disclosure` | 신규 |
| 센터소개 | 운영철학·범위·공간 신뢰 설명 | 철학, 제공/제외 범위, 시설, 접근성, 지점 | `brand-story`, `facility-gallery`, `service-disclosure` | 변형 |
| 프로그램 | 목적·강도·대상별 서비스 탐색 | 분류, 대상, 시간, 빈도, 가격/상담, 담당자 | `service-catalog` | 신규 |
| 프로그램 상세 | 적합성과 주의사항 설명 | 대상, 목표, 과정, 일정, 담당자, 준비/제한, 가격, 상담 | `offering-single`, `usage-guide`, `service-disclosure` | 신규 |
| 전문가 | 전문분야·지점별 담당자 선택 | 자격, 분야, 경력, 지점, 가능 프로그램, 상담 | `profile-directory` | 변형 |
| 전문가 상세 | 자격과 상담 방식 이해 | 약력, 자격, 접근방식, 담당 프로그램, 일정, 후기 | `profile-single` | 신규 |
| 이용절차 | 첫 문의부터 이용까지 불안 감소 | 문의, 초기상담, 배정, 이용, 평가/종료 | `service-process` | 보유 |
| 공간/시설 | 편안함·안전·접근성 확인 | 사진, 상담실/운동공간, 편의, 접근성, 위생 | `facility-gallery` | 보유 |
| 가격/상담 안내 | 비용 기대치 설정 | 프로그램/회기, 포함 항목, 시작가/문의, 변경/환불 | `pricing-page`, `pricing-consultation` | 변형 |
| 상담/예약 | 민감정보를 최소 수집해 접수 | 목적, 희망 방식/일정, 담당자/지점, 연락처, 동의, 긴급안내 | `sensitive-request-form`, `booking-availability` | 신규 |
| 후기 | 과장 없이 이용 경험 제시 | 프로그램, 이용 맥락, 인용, 익명, 효과 보장 아님 고지 | `review-archive`, `reviews-gallery` | 신규 |
| FAQ/고지 | 범위와 위기대응 한계 명시 | 의료행위 아님, 긴급연락, 취소, 개인정보, 보호자 | `faq-preparation`, `service-disclosure` | 보유/변형 |
| 지점/오시는 길 | 가까운 지점과 서비스 선택 | 지도, 지점, 시간, 프로그램, 전문가, 접근성 | `branch-locator` | 신규 |

## 13. 전문서비스/컨설팅/창업지원

대상: 경영컨설팅, 창업지원, 액셀러레이터, 인증자문, 시장조사, 조직/디지털전환  
프리셋: `expert-consulting`, `expert-startup-support`, `expert-assessment`, `expert-public-program`  
핵심 전환: 문제 확인 → 자가진단/사례/자료 → 상담·사업 문의

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 문제와 해결 프로그램을 상담으로 연결 | 문제, 서비스, 진단, 전문가, 사례, 절차, 패키지, 자료 | `hero-consultation`, `problem-solution`, `self-assessment-entry`, `case-studies` | 신규 |
| 회사/기관소개 | 수행역량과 공공성/전문성 증명 | 미션, 연혁, 조직, 파트너, 인증, 성과/출처 | `brand-story`, `metrics-proof`, `credentials-proof` | 변형 |
| 서비스 | 문제·단계·대상별 서비스 탐색 | 분야, 대상, 산출물, 기간, 가격/문의 | `service-catalog`, `service-category-nav` | 신규 |
| 서비스 상세 | 범위·산출물·진행방식 명확화 | 대상, 문제, 방법, 산출물, 기간, 전문가, 사례, 패키지 | `offering-single`, `service-process`, `service-disclosure` | 신규 |
| 자가진단 | 방문자의 상태를 구조화 | 질문, 진행률, 조건부 문항, 동의, 결과 안내 | `self-assessment` | 신규 |
| 진단 결과 | 결과를 상담/자료로 연결 | 유형/점수, 해석, 근거/면책, 추천 서비스, CTA | `assessment-result` | 신규 |
| 전문가 | 전문영역과 담당자 탐색 | 분야, 경력, 프로젝트, 자격, 상담 | `profile-directory` | 변형 |
| 프로젝트/사례 | 유사 조직의 문제 해결 경험 탐색 | 업종/서비스 필터, 문제, 접근, 결과 | `case-archive` | 신규 |
| 사례 상세 | 해결 과정과 산출물 증명 | 배경, 진단, 실행, 산출물, 결과, 근거, 관련 서비스 | `case-single` | 신규 |
| 진행절차 | 계약 전 기대치 설정 | 진단, 제안, 계약, 수행, 보고, 후속지원 | `service-process` | 보유 |
| 패키지 비교 | 대상에 맞는 범위 비교 | 대상, 포함 항목, 기간, 가격/문의, 추천, 산출물 | `comparison-page`, `package-comparison` | 신규 |
| 자료실 | 보고서·지원사업·도구 제공 | 유형/주제, 버전, 마감일, 파일, 다운로드/리드 | `resource-archive`, `resource-single` | 변형/신규 |
| 상담신청 | 적합성 판단 정보 수집 | 조직, 문제, 단계, 예산/일정, 자료 첨부, 연락처 | `conversion-form`, `quote-form` | 변형/신규 |
| FAQ | 지원범위·계약·보안 질문 해결 | 대상, 비용, 기간, 데이터, 환불, 지원사업 유의 | `faq-preparation`, `service-disclosure` | 보유 |
| 오시는 길 | 미팅 장소 안내 | 주소, 주차, 온라인 미팅, 운영시간 | `location-page` | 보유 |

## 14. 브랜드/라이프스타일 D2C

대상: 뷰티, 로컬식품, 리빙, 패션잡화, 친환경, 반려동물, 공예, 구독  
프리셋: `brand-beauty`, `brand-food`, `brand-living`, `brand-subscription`  
핵심 전환: 목적별 상품 탐색 → 근거/리뷰 확인 → 구매·구독

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 브랜드 이유와 대표상품을 구매로 연결 | 캠페인, 이야기, 상품군, 대표상품, 추천, 소재/공정, 리뷰, 프로모션 | `hero-commerce`, `featured-products`, `material-process`, `bundle-promotion` | 신규 |
| 브랜드 이야기 | 정체성과 제조 신뢰 설명 | 시작, 미션, 사람, 지역, 지속가능성, 근거 | `brand-story`, `material-process` | 변형 |
| 상품 | 분류·목적·가격별 탐색 | 카테고리, 필터, 정렬, 가격, 재고, 프로모션 | `commerce-archive`, `product-catalog` | 신규 |
| 상품 상세 | 구매에 필요한 전체 정보 제공 | 미디어, 옵션, 가격, 재고, 배송, 성분/소재, 사용법, 리뷰 | `commerce-single`, `product-single` | 신규 |
| 목적별 추천 | 상황에 맞는 상품 선택 지원 | 질문/필터, 선택 요약, 추천 근거, 비교, 상품 연결 | `recommendation-flow` | 신규 |
| 소재/성분/제조 | 검증 가능한 근거 제공 | 원료/소재, 원산지, 성분, 공정, 인증, 문서 | `material-process`, `credentials-proof` | 변형/신규 |
| 사용 가이드 | 올바른 사용과 주의 안내 | 단계, 빈도/용량, 팁, 주의, 관련 상품 | `usage-guide` | 변형 |
| 리뷰/콘텐츠 | 후기와 활용 콘텐츠 탐색 | 평점, 리뷰, UGC, 승인, 가이드/에디토리얼 | `review-archive`, `resource-archive` | 신규/변형 |
| 프로모션 | 기간 혜택과 세트/구독 전환 | 기간, 대상, 쿠폰, 세트, 구독, 종료 상태 | `promotion-campaign`, `bundle-promotion` | 신규 |
| FAQ/고객지원 | 구매 불안과 문의 해결 | 배송, 교환/환불, 성분/주의, 구독, 문의 | `support-faq`, `service-disclosure` | 보유/변형 |
| 장바구니 | 구매 항목 최종 확인 | 옵션/수량, 쿠폰, 배송 예상, 합계, 빈 상태 | `commerce-cart` | 신규 |
| 결제 | 안전한 주문 완료 | 주문자, 배송, 결제, 약관, 오류/완료, 구독 조건 | `commerce-checkout` | 신규 |
| 내 계정 | 주문·배송·구독 관리 | 주문, 배송, 다운로드, 주소, 구독 변경/해지 | `commerce-account` | 신규 |

## 15. 교회/종교기관

대상: 지역/다지점 교회, 천주교 본당, 불교 사찰, 교단/종단, 선교·복지·교육기관  
프리셋: `church-local`, `church-media`, `catholic-parish`, `buddhist-temple`, `religious-organization`  
핵심 전환: 정기 모임 확인 → 새 방문자/행사 참여 → 메시지·자료 → 후원/문의

| 페이지 | 목적 | 포함 내용 | 권장 섹션/원형 | 비교 |
|---|---|---|---|---|
| 홈 | 다음 모임과 첫 방문 행동을 명확히 제공 | 다음 예배/미사/법회, 메시지, 소식, 새 방문자, 행사, 위치, 후원 | `hero-welcome`, `gathering-schedule`, `latest-faith-media`, `notice-bulletin` | 보유/변형 |
| 기관/공동체 소개 | 정체성·역사·지도자·조직 설명 | 비전, 역사, 지도자, 조직, 시설, 소속기관 | `brand-story`, `expert-profiles`, `metrics-proof` | 보유 |
| 예배·미사·법회 안내 | 정기 모임의 시간·장소·대상 제공 | 유형, 요일/시간, 장소, 언어/대상, 변경 공지, 라이브 | `gathering-schedule`, `service-disclosure` | 보유/변형 |
| 말씀·강론·법문 | 메시지 목록 탐색 | 날짜, 연사, 본문/주제, 시리즈/절기, 영상/음성 | `media-archive`, `latest-faith-media` | 보유 |
| 메시지 상세 | 메시지 시청·청취·읽기 | 플레이어, 제목, 연사, 날짜, 본문/주제, 대본, 관련 메시지 | `media-single` | 보유 |
| 일정/행사 | 행사·교육·모임 일정 확인 | 달력/목록, 대상, 장소, 신청/마감, 변경 | `event-archive`, `event-calendar` | 보유/변형 |
| 행사 상세 | 참여 결정을 위한 상세 제공 | 일정, 장소, 대상, 준비물, 정원, 신청, 관련 자료 | `event-single`, `experience-process` | 보유/변형 |
| 새가족/새신자 안내 | 첫 방문과 등록 과정 안내 | 방문 동선, 예절/준비, 등록 단계, 담당자, FAQ, 폼 | `newcomer-journey`, `conversion-form` | 보유 |
| 교육/수행 프로그램 | 양육·교리·수행·문화과정 탐색 | 대상, 기간, 일정, 담당자, 신청 상태 | `service-catalog`, `event-calendar` | 변형/신규 |
| 부서/공동체 | 연령·관심사별 모임 연결 | 대상, 모임, 시간/장소, 담당자, 활동, 문의 | `ministry-community-nav`, `expert-profiles` | 보유 |
| 봉사/사역 | 참여 역할과 절차 안내 | 역할, 대상/조건, 시간, 교육, 담당자, 신청 | `service-catalog`, `service-process`, `conversion-form` | 변형 |
| 소식/주보 | 최신 운영 정보를 반복 확인 | 공지, 주보, 본당/사찰/기관 소식, 첨부, 중요 표시 | `notice-bulletin`, `resource-archive` | 보유 |
| 미디어/자료실 | 영상·사진·문서 탐색 | 유형 필터, 앨범, 자료, 버전, 다운로드 | `media-archive`, `gallery-archive`, `resource-archive` | 보유/변형 |
| 후원/헌금/보시 안내 | 목적·방법·영수증 절차를 투명하게 안내 | 지원 유형, 사용처, 방법, 영수증, 문의, 고지 | `giving-support`, `service-disclosure` | 보유 |
| 시설/오시는 길 | 방문 동선과 편의 지원 | 지도, 교통, 주차, 시설, 접근성, 다지점/캠퍼스 | `location-page` 또는 `branch-locator` | 보유/신규 |
| 문의/신청 | 일반·기도·상담·행정 요청을 구분 | 문의유형, 공개범위, 내용, 회신, 동의, 긴급안내 | `conversion-form`, `sensitive-request-form` | 변형/신규 |

## 공통 시스템 페이지

업종 메뉴에 직접 노출되지 않아도 모든 데모 키트에 포함해야 한다.

| 페이지 | 목적 | 포함 내용 | 비교 |
|---|---|---|---|
| 검색 결과 | 사이트 전체 탐색 | 검색어, 유형 필터, 결과, 결과 없음 | 보유 |
| 404 | 이탈 방지 | 오류 안내, 검색, 주요 링크, 문의 | 보유 |
| 개인정보처리방침 | 수집·이용 투명성 | 항목, 목적, 보유기간, 제3자/처리위탁, 담당자 | 변형 |
| 이용약관/환불정책 | 거래·예약 조건 안내 | 업종별 약관, 취소/환불, 책임범위 | 신규 콘텐츠 템플릿 |
| 로그인/회원가입 | 계정 필요 기능 진입 | 로그인, 가입, 오류, 인증/승인 | 보유 |
| 폼 완료 | 제출 확인과 다음 행동 안내 | 접수번호/요약, 처리시간, 수정/문의, 다음 링크 | 신규 variant |
| 빈 상태/오류 상태 | 데이터가 없거나 연동이 실패한 상황 처리 | 원인, 재시도, 대체 연락수단, 이전 화면 | 신규 variant |

## 외부 디자인 완료 기준

각 페이지는 다음이 모두 있어야 완료로 본다.

1. 데스크톱과 모바일 화면
2. 페이지 목적과 단 하나의 1차 전환
3. 실제 한국어 제목·본문·CTA 예시
4. 목록/필터/폼/예약에 해당하는 상태 화면
5. 접근 가능한 제목 계층, 키보드 focus, 오류 문구
6. 사용한 공통 섹션 ID와 신규 컴포넌트 표시
7. 이미지 용도·비율·필요 수량
8. Elementor/ModuTheme 기존 위젯 또는 신규 위젯 매핑
9. 업종별 고지·개인정보·환불/예약 제한
10. `docs/DESIGN.md`의 금지 패턴을 사용하지 않았다는 확인
