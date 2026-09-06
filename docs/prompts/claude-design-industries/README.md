# 모두 테마 Claude Design 업종별 프롬프트

한 번에 한 업종의 전체 홈페이지 페이지 세트를 생성하기 위한 복사·붙여넣기용 프롬프트 모음이다. 공통 디자인 규칙은 Claude Design 프로젝트에 별도로 제공되어 있다고 가정하며, 각 파일은 페이지의 목적·내용·전환·필수 상태만 정의한다.

## 사용 방법

1. Claude Design 프로젝트에 모두 테마 디자인 규칙과 브랜드 자료를 먼저 등록한다.
2. 아래에서 제작할 업종 파일 하나를 열고 `입력값`의 대괄호 항목만 바꾼다.
3. 프롬프트 전체를 한 번에 입력한다.
4. 첫 생성에서는 페이지 누락 여부와 정보 구조를 확인하고, 시각 조정은 후속 요청으로 처리한다.

## 업종별 프롬프트

| 번호 | 업종 | 프롬프트 | 핵심 전환 |
|---:|---|---|---|
| 01 | 병원/의원 | [hospital-clinic.md](./hospital-clinic.md) | 진료 예약·상담 |
| 02 | 법률/세무/노무 | [legal-tax-labor.md](./legal-tax-labor.md) | 상담 신청 |
| 03 | 학원/교육기관 | [academy-education.md](./academy-education.md) | 수강 상담·신청 |
| 04 | 제조/B2B | [manufacturing-b2b.md](./manufacturing-b2b.md) | 자료 다운로드·견적 |
| 05 | 인테리어/건축/시공 | [interior-architecture-construction.md](./interior-architecture-construction.md) | 프로젝트 견적 |
| 06 | 부동산/분양 | [property-real-estate.md](./property-real-estate.md) | 관심고객 등록·방문 |
| 07 | 음식점/카페/프랜차이즈 | [restaurant-cafe-franchise.md](./restaurant-cafe-franchise.md) | 예약·매장 찾기·가맹 문의 |
| 08 | 미용/피트니스/예약형 매장 | [beauty-fitness-booking.md](./beauty-fitness-booking.md) | 서비스 예약 |
| 09 | 스타트업/SaaS/문제특화 AI | [startup-saas-ai.md](./startup-saas-ai.md) | 데모 신청 |
| 10 | 포트폴리오/에이전시 | [portfolio-agency.md](./portfolio-agency.md) | 프로젝트 문의 |
| 11 | 지역관광/체험/문화 | [local-tourism-experience.md](./local-tourism-experience.md) | 프로그램 예약·단체 문의 |
| 12 | 웰니스/상담/돌봄 | [wellness-counseling-care.md](./wellness-counseling-care.md) | 상담·방문 예약 |
| 13 | 전문서비스/컨설팅/창업지원 | [professional-consulting-support.md](./professional-consulting-support.md) | 자가진단·상담 |
| 14 | 브랜드/라이프스타일 D2C | [brand-lifestyle-d2c.md](./brand-lifestyle-d2c.md) | 구매·구독 |
| 15 | 교회/종교기관 | [church-religion.md](./church-religion.md) | 첫 방문·행사·미디어·후원 |

## 토큰 사용 원칙

- 한 프롬프트는 한 업종만 생성한다.
- 목록과 상세는 별도 페이지로 만들되 상태 변화는 별도 장식 페이지가 아닌 같은 화면의 변형으로 묶는다.
- Claude의 출력이 부족하면 시각 변형과 설명을 줄이고 페이지 수와 필수 내용을 유지한다.
- 생성 후 후속 프롬프트는 누락 보완이나 특정 페이지 정교화에만 사용한다.

