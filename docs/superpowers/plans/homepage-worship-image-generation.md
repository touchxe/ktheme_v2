# 홈페이지 예배 이미지 생성 계획

## 목표

홈페이지와 교회 소개/예배/공동체 섹션에 사용할 한국 교회 분위기의 사진형 이미지를 미리 생성한다. 전체 이미지는 과장된 광고 느낌을 피하고, 예배에 어울리는 차분한 현실감과 따뜻한 신뢰감을 기준으로 맞춘다.

## 공통 스타일 가이드

- 대상: 한국인 중심, 실제 지역 교회처럼 자연스러운 인물과 공간
- 톤: 톤다운, 낮은 채도, 부드러운 명암, 차분한 주일 예배 분위기
- 스타일: photorealistic editorial photography, natural candid moment
- 색감: warm neutral, muted green/wood/cream accents, no purple or vivid gradient look
- 조명: 자연광 또는 부드러운 실내 조명, 하이라이트 과노출 금지
- 인물: 실제 유명인이나 특정 실존 인물 닮지 않게, 자연스러운 표정
- 텍스트: 이미지 안의 글자는 만들지 않는다. 주보/성경책은 글자가 읽히지 않게 처리
- 금지: 과한 무대 조명, 번쩍이는 콘서트 느낌, 서구 대형교회 스톡사진 느낌, 워터마크, 로고, 손가락/얼굴 왜곡, 과도한 미소 연출

## 저장 위치와 네이밍

- 최종 저장: `public/images/home/`
- 원본 후보: `public/images/home/source/`
- 권장 포맷: 최종 사용본은 `.webp`, 원본 보관은 `.png`
- 네이밍 규칙: `home-[section]-[subject]-[ratio].webp`

예:
- `home-hero-worship-16x9.webp`
- `home-sermon-pastor-4x3.webp`
- `home-community-fellowship-4x3.webp`

## 1차 생성 세트: 홈페이지 핵심 이미지

| 파일명 | 용도 | 비율 | 장면 |
|---|---:|---:|---|
| `home-hero-worship-16x9.webp` | 첫 화면 히어로 | 16:9 | 한국 교회 예배당에서 성도들이 조용히 예배하는 넓은 장면 |
| `home-sermon-pastor-4x3.webp` | 설교/말씀 카드 | 4:3 | 한국인 목사님이 강단에서 성경을 펼치고 설교하는 장면 |
| `home-community-fellowship-4x3.webp` | 공동체 카드 | 4:3 | 예배 후 소그룹 교제, 따뜻하지만 절제된 분위기 |
| `home-church-exterior-16x9.webp` | 교회 소개 | 16:9 | 한국 도심/주거지의 현대적이고 소박한 교회 외관 |
| `home-sanctuary-empty-16x9.webp` | 예배 안내 | 16:9 | 비어 있는 예배당, 나무 의자/강단/십자가, 고요한 자연광 |

## 2차 생성 세트: 사역/직분/세대 이미지

| 파일명 | 용도 | 비율 | 장면 |
|---|---:|---:|---|
| `home-evangelist-ministry-4x3.webp` | 전도사/사역 소개 | 4:3 | 전도사가 청년 또는 새가족과 조용히 대화하는 장면 |
| `home-elder-greeting-4x3.webp` | 장로/안내 | 4:3 | 장로가 예배당 입구에서 성도를 맞이하는 장면 |
| `home-deaconess-care-4x3.webp` | 권사/돌봄 | 4:3 | 권사가 차분하게 성도와 교제하거나 돌보는 장면 |
| `home-choir-praise-16x9.webp` | 찬양대 | 16:9 | 권사/장로/성도들이 포함된 찬양대가 찬양하는 장면 |
| `home-prayer-congregation-4x3.webp` | 기도 | 4:3 | 여러 세대의 성도들이 눈을 감고 기도하는 모습 |
| `home-youth-group-4x3.webp` | 청년부 | 4:3 | 한국 청년들이 성경공부 또는 모임을 하는 장면 |
| `home-children-bulletin-4x3.webp` | 어린이/주보 | 4:3 | 어린이가 주보와 성경책을 들고 예배 준비를 하는 장면 |
| `home-senior-fellowship-4x3.webp` | 어르신 교제 | 4:3 | 노년 성도들이 예배 후 차분히 교제하는 장면 |

## 3차 생성 세트: 디테일/보조 이미지

| 파일명 | 용도 | 비율 | 장면 |
|---|---:|---:|---|
| `home-bible-closeup-1x1.webp` | 말씀/묵상 | 1:1 | 나무 테이블 위 성경책 클로즈업, 글자는 흐릿하게 |
| `home-bulletin-hands-1x1.webp` | 주보/소식 | 1:1 | 손에 든 주보와 펜, 텍스트는 읽히지 않게 |
| `home-hymnal-singing-4x3.webp` | 찬양/노래 | 4:3 | 성도가 찬송가를 들고 낮은 목소리로 찬양하는 모습 |
| `home-fellowship-table-4x3.webp` | 교제 | 4:3 | 종이컵, 간단한 다과, 성도들의 손과 표정이 자연스러운 테이블 장면 |

## 대표 프롬프트 템플릿

아래 템플릿의 `Subject`와 `Scene`만 바꾸어 각 이미지를 생성한다.

```text
Use case: photorealistic-natural
Asset type: Korean church homepage image
Primary request: Create a calm, photorealistic editorial image for a Korean Protestant church website.
Scene/backdrop: [SCENE]
Subject: [SUBJECT]
Style/medium: natural documentary-style photography, realistic Korean people, not a real public figure
Composition/framing: [RATIO] composition, clean website-ready framing, enough breathing room, no dramatic crop
Lighting/mood: soft natural light, quiet worshipful mood, gentle contrast
Color palette: muted warm neutrals, toned-down colors, slightly lower saturation, no vivid colors
Constraints: no readable text, no watermark, no logo, no celebrity likeness, no theatrical concert lighting
Avoid: western megachurch stock-photo look, purple gradients, over-smiling staged poses, distorted hands or faces
```

## 개별 프롬프트 초안

### Hero Worship

```text
Use case: photorealistic-natural
Asset type: homepage hero image
Primary request: A calm Korean Protestant church worship service with Korean congregants seated in a modest sanctuary.
Scene/backdrop: modern but simple Korean church sanctuary, wooden pews or chairs, subtle cross at the front, no readable banners
Subject: mixed-age Korean congregation worshiping quietly, viewed from behind and slightly above
Style/medium: photorealistic editorial photography
Composition/framing: 16:9 wide composition, spacious top area and side breathing room for homepage layout
Lighting/mood: soft morning indoor light, reverent, peaceful, understated
Color palette: muted warm neutrals, toned-down colors, slightly lower saturation
Constraints: no readable text, no watermark, no logo, no celebrity likeness
Avoid: concert stage lighting, dramatic smoke, stock-photo perfection, distorted hands or faces
```

### Pastor Sermon

```text
Use case: photorealistic-natural
Asset type: sermon card image
Primary request: A Korean pastor preaching from an open Bible at a simple pulpit.
Scene/backdrop: modest church pulpit with warm wood, blurred sanctuary background, no readable text
Subject: middle-aged Korean male pastor, natural expression, one hand near the Bible, calm pastoral presence
Style/medium: photorealistic editorial photography
Composition/framing: 4:3 medium shot, pastor slightly off-center, clean background
Lighting/mood: soft indoor light, sincere and grounded
Color palette: muted warm neutrals, toned-down colors, slightly lower saturation
Constraints: fictional person, no readable text, no watermark, no logo
Avoid: celebrity likeness, theatrical gestures, luxury megachurch stage
```

### Community Fellowship

```text
Use case: photorealistic-natural
Asset type: community section image
Primary request: Korean church members sharing fellowship after worship.
Scene/backdrop: church fellowship room with simple tables, paper cups, soft daylight
Subject: small group of Korean adults and seniors talking naturally, warm but not staged
Style/medium: photorealistic documentary lifestyle photography
Composition/framing: 4:3 candid group composition, faces natural and relaxed
Lighting/mood: quiet warmth, gentle community feeling
Color palette: muted warm neutrals, toned-down colors, slightly lower saturation
Constraints: no readable text, no watermark, no logo
Avoid: restaurant party mood, exaggerated smiles, busy clutter
```

### Sanctuary Empty

```text
Use case: photorealistic-natural
Asset type: worship guide image
Primary request: An empty Korean church sanctuary before worship begins.
Scene/backdrop: simple sanctuary with rows of chairs, wooden pulpit, small cross, no readable banners
Subject: empty worship space, prepared and peaceful
Style/medium: architectural editorial photography
Composition/framing: 16:9 wide symmetrical composition, clean website-ready perspective
Lighting/mood: soft natural morning light, quiet, contemplative
Color palette: muted warm neutrals, toned-down colors, slightly lower saturation
Constraints: no readable text, no watermark, no logo
Avoid: luxury cathedral, dark moody atmosphere, saturated colors
```

### Prayer Congregation

```text
Use case: photorealistic-natural
Asset type: prayer ministry image
Primary request: Korean congregants praying quietly together.
Scene/backdrop: modest church interior, shallow depth of field, no readable text
Subject: mixed generations of Korean church members with eyes closed in prayer
Style/medium: photorealistic editorial photography
Composition/framing: 4:3 medium-wide candid composition
Lighting/mood: reverent, intimate, soft indoor light
Color palette: muted warm neutrals, toned-down colors, slightly lower saturation
Constraints: no readable text, no watermark, no logo
Avoid: dramatic crying closeups, staged stock-photo pose, distorted hands
```

## 생성 순서

1. 히어로 이미지 2안 생성 후 1개 선택
2. 카드 핵심 4장 생성: 설교, 공동체, 교회 외관, 예배당
3. 사역/세대 이미지 8장 생성
4. 디테일 이미지 4장 생성
5. 전체 톤 통일 검수 후 필요한 이미지만 1회 재생성
6. 최종본을 `public/images/home/`에 저장하고 홈페이지 섹션에 연결

## 검수 체크리스트

- 한국 교회처럼 보이는가
- 예배 분위기에 맞게 차분한가
- 채도가 낮고 튀는 색이 없는가
- 이미지 안에 읽을 수 있는 글자가 없는가
- 손, 얼굴, 눈, 치아, 성경책 형태가 자연스러운가
- 홈페이지 카드/히어로로 잘라 써도 핵심 피사체가 잘리지 않는가
- 서로 다른 이미지가 같은 교회의 한 세트처럼 보이는가

## 다음 실행 단위

우선 1차 생성 세트 5장을 만든 뒤 홈페이지에 배치해 보고, 화면 톤이 맞으면 2차/3차 세트로 확장한다. 생성은 기본 `image_gen` 경로를 사용하고, 프로젝트에 쓰는 최종 이미지는 반드시 `public/images/home/` 안에 복사한다.

## 생성 완료 기록

- 완료일: 2026-05-27
- 생성 방식: built-in `image_gen`
- 최종 저장 위치: `public/images/home/`
- 원본 복사 위치: `public/images/home/source/`
- 최종 포맷: `.png`
- 비고: 현재 환경 PATH에 `magick`/`cwebp`가 없어 WebP 변환은 보류했다.

생성된 파일:

- `home-hero-worship-16x9.png`
- `home-sermon-pastor-4x3.png`
- `home-community-fellowship-4x3.png`
- `home-church-exterior-16x9.png`
- `home-sanctuary-empty-16x9.png`
- `home-evangelist-ministry-4x3.png`
- `home-elder-greeting-4x3.png`
- `home-deaconess-care-4x3.png`
- `home-choir-praise-16x9.png`
- `home-prayer-congregation-4x3.png`
- `home-youth-group-4x3.png`
- `home-children-bulletin-4x3.png`
- `home-senior-fellowship-4x3.png`
- `home-bible-closeup-1x1.png`
- `home-bulletin-hands-1x1.png`
- `home-hymnal-singing-4x3.png`
- `home-fellowship-table-4x3.png`
