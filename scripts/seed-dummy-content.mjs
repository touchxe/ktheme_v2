#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ENV_FILE = join(ROOT, '.env.local');
const IMAGE_DIR = join(ROOT, 'wp-content/themes/modu-theme/assets/images/generated');

const categories = [
  { name: '공지', slug: 'notice', description: '교회의 주요 공지와 신청 안내입니다.' },
  { name: '교회소식', slug: 'news', description: '가평교회의 대표 소식입니다.' },
  { name: '후기', slug: 'review', description: '행사, 새가족, 양육, 섬김 후기를 모읍니다.' },
  { name: '교우소식', slug: 'member-news', description: '결혼, 장례, 개업 등 교우 소식입니다.' },
  { name: '선교', slug: 'mission', description: '선교 모집, 보고, 기도 제목입니다.' },
  { name: '교단소식', slug: 'denomination-news', description: '노회와 총회 관련 소식입니다.' },
  { name: '주보', slug: 'bulletin', description: '주간 주보와 예배 순서입니다.' },
  { name: 'QT/묵상', slug: 'qt', description: '말씀 묵상 자료입니다.' },
  { name: '영상', slug: 'video', description: '설교 외 영상, 찬양, 행사 스케치입니다.' },
  { name: '자료실', slug: 'library', description: '문서, 이미지, 악보, 교육자료입니다.' },
  { name: '새가족', slug: 'newcomers', description: '새가족 등록과 정착 이야기입니다.' },
  { name: '청년부', slug: 'youth-ministry', description: '청년부 예배와 공동체 이야기입니다.' },
  { name: '양육', slug: 'training', description: '양육 과정과 훈련 소식입니다.' },
  { name: '공동체', slug: 'community', description: '목장, 구역, 부서 공동체 소식입니다.' },
  { name: '섬김', slug: 'serve', description: '봉사와 섬김 사역 이야기입니다.' },
];

const sermonSeries = [
  { name: '머무름의 영성', slug: 'abiding-spirituality' },
  { name: '다윗의 길', slug: 'way-of-david' },
  { name: '복음의 시작', slug: 'beginning-of-gospel' },
];

const imageNames = Array.from({ length: 17 }, (_, index) => {
  return `church-generated-${String(index + 1).padStart(2, '0')}.jpg`;
});

const sermons = [
  {
    title: '말씀 안에서 머무르기로 결심하다',
    slug: 'abide-in-the-word',
    series: 'abiding-spirituality',
    worship: '주일예배',
    preacher: '정한결 담임목사',
    scripture: '시편 23:1-3',
    date: '2026-05-31T11:00:00',
    image: 1,
    excerpt: '바쁜 일상 속에서도 말씀 안에 머무르는 삶의 리듬을 다시 세웁니다.',
  },
  {
    title: '골짜기에서도 잔이 넘치는 사람',
    slug: 'overflowing-cup-in-the-valley',
    series: 'abiding-spirituality',
    worship: '주일예배',
    preacher: '정한결 담임목사',
    scripture: '시편 23:4-6',
    date: '2026-05-24T11:00:00',
    image: 2,
    excerpt: '어두운 골짜기에서도 주님의 동행을 믿는 사람의 고백을 나눕니다.',
  },
  {
    title: '쉴 만한 물가로 인도하시는 하나님',
    slug: 'beside-quiet-waters',
    series: 'abiding-spirituality',
    worship: '주일예배',
    preacher: '김다온 부목사',
    scripture: '시편 23:2',
    date: '2026-05-17T11:00:00',
    image: 3,
    excerpt: '회복은 멈춤에서 시작되고, 멈춤은 하나님의 인도하심을 신뢰하는 자리입니다.',
  },
  {
    title: '내 영혼을 소생시키시는 은혜',
    slug: 'grace-that-restores-my-soul',
    series: 'abiding-spirituality',
    worship: '주일예배',
    preacher: '정한결 담임목사',
    scripture: '시편 23:3',
    date: '2026-05-10T11:00:00',
    image: 4,
    excerpt: '지친 영혼을 다시 살리시는 하나님의 은혜를 함께 묵상합니다.',
  },
  {
    title: '주님이 나의 목자이십니다',
    slug: 'the-lord-is-my-shepherd',
    series: 'abiding-spirituality',
    worship: '주일예배',
    preacher: '정한결 담임목사',
    scripture: '시편 23:1',
    date: '2026-05-03T11:00:00',
    image: 5,
    excerpt: '부족함 없는 삶은 소유가 아니라 목자 되신 주님을 아는 데서 시작됩니다.',
  },
  {
    title: '식탁을 베푸시는 하나님',
    slug: 'table-prepared-by-god',
    series: 'abiding-spirituality',
    worship: '주일예배',
    preacher: '김다온 부목사',
    scripture: '시편 23:5',
    date: '2026-04-26T11:00:00',
    image: 6,
    excerpt: '하나님은 우리의 결핍 한가운데 은혜의 식탁을 차리십니다.',
  },
  {
    title: '기다림 속에서 발견한 이름의 의미',
    slug: 'name-found-in-waiting',
    series: 'way-of-david',
    worship: '수요예배',
    preacher: '김다온 부목사',
    scripture: '사무엘상 16:1-13',
    date: '2026-05-28T19:30:00',
    image: 7,
    excerpt: '다윗의 부르심을 통해 기다림의 시간에 숨겨진 하나님의 뜻을 봅니다.',
  },
  {
    title: '광야에서 부르신 이름',
    slug: 'called-by-name-in-wilderness',
    series: 'way-of-david',
    worship: '새벽기도',
    preacher: '정한결 담임목사',
    scripture: '출애굽기 3:1-10',
    date: '2026-05-27T05:30:00',
    image: 8,
    excerpt: '광야의 침묵 가운데 이름을 부르시는 하나님을 만납니다.',
  },
  {
    title: '기도가 멈추지 않는 집',
    slug: 'house-that-keeps-praying',
    series: 'beginning-of-gospel',
    worship: '수요예배',
    preacher: '박은유 전도사',
    scripture: '사도행전 2:42-47',
    date: '2026-05-21T19:30:00',
    image: 9,
    excerpt: '초대교회의 기도와 교제를 통해 오늘의 공동체를 다시 세웁니다.',
  },
  {
    title: '사랑은 가까운 자리부터 시작됩니다',
    slug: 'love-starts-nearby',
    series: 'beginning-of-gospel',
    worship: '청년예배',
    preacher: '박은유 전도사',
    scripture: '마가복음 12:28-34',
    date: '2026-05-18T17:00:00',
    image: 10,
    excerpt: '하나님 사랑과 이웃 사랑이 청년의 일상에서 어떻게 시작되는지 나눕니다.',
  },
  {
    title: '아이의 손을 잡으신 예수님',
    slug: 'jesus-holding-a-childs-hand',
    series: 'beginning-of-gospel',
    worship: '다음세대예배',
    preacher: '이수민 전도사',
    scripture: '마태복음 18:1-5',
    date: '2026-05-17T13:30:00',
    image: 11,
    excerpt: '작은 아이를 품으신 예수님의 마음으로 다음세대를 바라봅니다.',
  },
  {
    title: '말씀으로 하루를 여는 사람',
    slug: 'opening-the-day-with-the-word',
    series: 'way-of-david',
    worship: '새벽기도',
    preacher: '정한결 담임목사',
    scripture: '시편 5:1-12',
    date: '2026-05-14T05:30:00',
    image: 12,
    excerpt: '하루의 첫 시간을 말씀과 기도로 여는 믿음의 태도를 배웁니다.',
  },
];

const events = [
  ['전 교인 봄 야외예배', 'church-spring-outdoor-worship', '2026-06-09T10:30:00', '호숫가 캠퍼스', '전 교인', 13],
  ['새가족반 6월 과정 개강', 'new-family-course-june', '2026-06-15T13:00:00', '비전홀 2층', '새가족 및 등록 희망자', 14],
  ['목장 리더 모임', 'small-group-leaders-meeting', '2026-06-18T19:30:00', '소예배실', '목장 리더', 15],
  ['일대일 제자훈련 오리엔테이션', 'discipleship-orientation', '2026-06-22T15:00:00', '교육관 301호', '신청자', 16],
  ['청년부 여름수련회 준비 모임', 'youth-retreat-prep', '2026-06-28T17:00:00', '청년부실', '청년부 리더', 17],
  ['다음세대 여름성경학교 교사 강습', 'next-generation-teacher-training', '2026-07-05T14:00:00', '교육관', '교회학교 교사', 3],
  ['캄보디아 단기선교 오리엔테이션', 'cambodia-mission-orientation', '2026-07-12T16:00:00', '선교센터', '선교팀 및 관심자', 4],
  ['지역 섬김 주간 봉사자 모임', 'local-serve-week-volunteer-meeting', '2026-07-19T15:00:00', '카페 라운지', '봉사 신청자', 5],
  ['장년/시니어 소풍', 'senior-ministry-picnic', '2026-07-24T09:30:00', '가평 수목원', '장년/시니어 성도', 6],
];

const albums = [
  ['부활절 새벽기도회', 'easter-dawn-prayer-album', '2026-04-05T06:30:00', '예배와 기도로 부활의 아침을 함께 열었습니다.', 4],
  ['전 교인 봄 야외예배', 'spring-outdoor-worship-album', '2026-06-09T14:00:00', '온 세대가 함께 예배하고 식탁을 나눈 하루였습니다.', 13],
  ['새가족 환영회', 'newcomer-welcome-album', '2026-05-25T13:30:00', '처음 오신 분들을 환영하고 공동체를 소개했습니다.', 14],
  ['목장 모임 풍경', 'small-group-moments-album', '2026-05-18T19:00:00', '가정과 일상에서 말씀과 삶을 나눈 목장 이야기입니다.', 15],
  ['청년부 수련회', 'youth-retreat-album', '2026-05-10T20:00:00', '청년들이 말씀 안에서 서로를 격려한 시간이었습니다.', 16],
  ['유초등부 말씀 축제', 'children-bible-festival-album', '2026-05-03T13:00:00', '아이들이 말씀을 놀이와 찬양으로 배웠습니다.', 17],
  ['지역 섬김 주간', 'local-serve-week-album', '2026-04-27T15:00:00', '이웃을 찾아가 작은 필요를 함께 채웠습니다.', 5],
  ['단기선교 파송예배', 'mission-sending-service-album', '2026-04-20T15:00:00', '선교팀을 위해 함께 기도하고 파송했습니다.', 6],
  ['찬양팀 연합 예배', 'worship-team-night-album', '2026-04-13T19:00:00', '찬양으로 한마음이 된 저녁 예배의 기록입니다.', 7],
  ['장년/시니어 봄 모임', 'senior-spring-gathering-album', '2026-04-06T11:00:00', '장년과 시니어 성도들이 교제와 돌봄을 나눴습니다.', 8],
  ['교사 헌신예배', 'teachers-dedication-album', '2026-03-30T15:00:00', '다음세대를 섬기는 교사들을 축복했습니다.', 9],
  ['성금요일 기도회', 'good-friday-prayer-album', '2026-03-27T20:00:00', '십자가의 은혜를 묵상하며 함께 기도했습니다.', 10],
];

const posts = [
  ...[
    ['공지', '2026 봄학기 양육과정 신청 안내', 'spring-training-registration-2026', ['notice', 'news'], '양육과정 신청이 시작되었습니다. 과정별 일정과 신청 방법을 확인해 주세요.', 2],
    ['공지', '새가족반 6월 과정 등록 안내', 'june-new-family-course-registration', ['notice', 'newcomers'], '가평교회에 처음 오신 분들을 위한 4주 과정이 시작됩니다.', 3],
    ['공지', '전 교인 봄 야외예배 안내', 'spring-outdoor-worship-notice', ['notice', 'community'], '야외예배 일정, 준비물, 이동 안내를 정리했습니다.', 13],
    ['공지', '온라인 헌금 안내 업데이트', 'online-giving-guide-update', ['notice'], '온라인 헌금 계좌와 유의사항을 다시 안내드립니다.', 4],
  ],
  ...[
    ['행사 후기', '전 교인 봄 야외예배를 다녀와서', 'review-spring-outdoor-worship', ['review', 'community'], '온 세대가 함께 웃고 예배한 봄날의 기록입니다.', 13],
    ['행사 후기', '부활절 새벽기도회, 함께 밝힌 아침', 'review-easter-dawn-prayer', ['review', 'news'], '부활의 아침을 기도와 찬양으로 열었습니다.', 4],
    ['행사 후기', '찬양팀 연합예배의 밤', 'review-worship-team-night', ['review', 'video'], '서로의 목소리가 하나의 고백이 되었던 밤입니다.', 7],
    ['행사 후기', '지역 섬김 주간을 마치고', 'review-local-serve-week', ['review', 'serve'], '작은 손길이 이웃의 하루를 바꾸는 시간을 보았습니다.', 5],
    ['새가족 후기', '처음 예배에 참석한 날', 'review-first-sunday-visit', ['review', 'newcomers'], '낯선 발걸음이 환대로 바뀌었던 첫 주일 이야기입니다.', 14],
    ['새가족 후기', '새가족반 네 번째 만남을 지나며', 'review-new-family-fourth-week', ['review', 'newcomers', 'training'], '교회를 알아가며 공동체 안에 자리 잡는 시간을 나눕니다.', 15],
    ['새가족 후기', '목장에 처음 초대받은 저녁', 'review-first-small-group-evening', ['review', 'newcomers', 'community'], '식탁과 말씀 안에서 마음이 열렸던 저녁입니다.', 16],
    ['청년부 후기', '서툴러도 괜찮아, 한 학기의 고백', 'review-youth-semester-confession', ['review', 'youth-ministry'], '청년들이 서로의 흔들림과 회복을 솔직하게 나눴습니다.', 10],
    ['청년부 후기', '청년부 수련회 이후 달라진 것들', 'review-after-youth-retreat', ['review', 'youth-ministry'], '수련회 이후 일상에서 말씀을 붙드는 이야기를 모았습니다.', 16],
    ['청년부 후기', '처음 맡은 찬양 인도', 'review-first-worship-leading', ['review', 'youth-ministry'], '떨림 속에서도 하나님께 마음을 드렸던 청년의 고백입니다.', 7],
    ['양육 후기', '새가족 과정을 마치며', 'review-new-family-course-complete', ['review', 'training', 'newcomers'], '교회와 신앙의 기초를 함께 배운 네 주간의 기록입니다.', 3],
    ['양육 후기', '일대일 제자훈련에서 배운 경청', 'review-discipleship-listening', ['review', 'training'], '말씀과 삶을 함께 나누며 배운 경청의 의미를 전합니다.', 6],
    ['섬김 후기', '주방 봉사팀의 토요일 아침', 'review-kitchen-team-saturday', ['review', 'serve'], '보이지 않는 자리에서 공동체를 섬기는 손길을 만났습니다.', 8],
    ['섬김 후기', '주차 안내팀의 첫 봉사', 'review-parking-team-first-serve', ['review', 'serve'], '처음 오는 분의 마음까지 생각하는 안내의 자리입니다.', 9],
  ],
  ...[
    ['교우소식', '결혼 안내: 믿음 안에서 새 가정을 시작합니다', 'member-news-wedding-june', ['member-news'], '성도 가정의 결혼 소식을 기쁨으로 나눕니다.', 11],
    ['교우소식', '장례 안내: 위로와 기도로 함께합니다', 'member-news-funeral-prayer', ['member-news'], '유가족을 위해 공동체가 함께 기도합니다.', 12],
    ['교우소식', '개업 안내: 작은 가게의 첫날을 축복합니다', 'member-news-opening-blessing', ['member-news'], '성도의 새로운 일터를 위해 축복하고 응원합니다.', 2],
    ['교우소식', '출산 안내: 새 생명을 환영합니다', 'member-news-new-baby', ['member-news'], '새 생명의 탄생을 함께 기뻐합니다.', 3],
    ['교우소식', '입원 성도를 위한 중보기도 요청', 'member-news-prayer-request', ['member-news'], '회복을 위해 함께 기도해 주세요.', 4],
  ],
  ...[
    ['선교', '캄보디아 단기선교팀 동역자 모집', 'cambodia-short-term-mission-recruiting', ['mission', 'news'], '기도와 후원으로 함께할 동역자를 기다립니다.', 15],
    ['선교', '지역아동센터 여름 섬김 안내', 'local-child-center-summer-serve', ['mission', 'serve'], '아이들을 위한 여름 섬김 사역에 참여해 주세요.', 16],
    ['선교', '협력 선교사를 위한 6월 기도 제목', 'missionary-prayer-june', ['mission'], '협력 선교지와 선교사를 위한 기도 제목입니다.', 17],
  ],
  ...[
    ['교단소식', '노회 교육 세미나 안내', 'denomination-education-seminar', ['denomination-news'], '노회 주관 교육 세미나 일정을 안내합니다.', 5],
    ['교단소식', '총회 다음세대 자료 배포 안내', 'denomination-next-generation-resource', ['denomination-news', 'library'], '다음세대 교육 자료 배포 소식입니다.', 6],
    ['교단소식', '교단 선교 주일 자료 안내', 'denomination-mission-sunday-resource', ['denomination-news', 'mission'], '선교 주일 예배와 교육 자료를 확인해 주세요.', 7],
    ['교단소식', '노회 목회자 기도회 소식', 'denomination-pastors-prayer', ['denomination-news'], '목회자 기도회 소식과 기도 제목입니다.', 8],
    ['교단소식', '총회 사회봉사부 캠페인 안내', 'denomination-service-campaign', ['denomination-news', 'serve'], '지역과 이웃을 섬기는 캠페인 참여 안내입니다.', 9],
    ['교단소식', '신앙교육 교재 개정 안내', 'denomination-curriculum-update', ['denomination-news', 'training'], '신앙교육 교재 개정 내용을 정리했습니다.', 10],
  ],
];

const bulletins = Array.from({ length: 8 }, (_, index) => {
  const week = index + 1;
  const date = new Date(Date.UTC(2026, 4, 31 - index * 7, 2, 0, 0));
  const ymd = date.toISOString().slice(0, 10);
  return {
    title: `2026년 ${week}번째 여름 주보`,
    slug: `bulletin-2026-summer-week-${week}`,
    date: `${ymd}T09:00:00`,
    image: ((index + 1) % 17) + 1,
    excerpt: '주일예배 순서, 교회소식, 기도 제목을 담은 주간 주보입니다.',
  };
});

const qts = Array.from({ length: 14 }, (_, index) => {
  const day = index + 1;
  const date = new Date(Date.UTC(2026, 5, day, 0, 0, 0));
  const ymd = date.toISOString().slice(0, 10);
  return {
    title: `말씀으로 여는 하루 ${day}`,
    slug: `daily-qt-2026-06-${String(day).padStart(2, '0')}`,
    date: `${ymd}T06:00:00`,
    image: ((index + 5) % 17) + 1,
    excerpt: '오늘의 말씀과 묵상 질문, 짧은 기도문입니다.',
    scripture: ['시편 23:1-6', '마태복음 5:1-12', '사도행전 2:42-47', '요한복음 15:1-8'][index % 4],
  };
});

const videos = Array.from({ length: 8 }, (_, index) => ({
  title: ['찬양팀 연합예배 스케치', '새가족 환영 영상', '청년부 수련회 하이라이트', '다음세대 여름성경학교 예고', '지역 섬김 주간 기록', '부활절 찬양 메들리', '목장 리더 인터뷰', '교회학교 교사 헌신 영상'][index],
  slug: ['worship-team-night-video', 'newcomer-welcome-video', 'youth-retreat-highlight', 'vbs-preview-video', 'local-serve-week-video', 'easter-praise-medley', 'small-group-leader-interview', 'teachers-dedication-video'][index],
  date: `2026-05-${String(25 - index).padStart(2, '0')}T12:00:00`,
  image: ((index + 8) % 17) + 1,
  excerpt: '교회의 사역과 예배 현장을 영상으로 전합니다.',
}));

const libraryPosts = Array.from({ length: 12 }, (_, index) => ({
  title: ['가평리더교육 시즌2 강의안', '구약개관 요약 자료', '사무엘하 묵상 노트', '다니엘서 주권 찾기', '마가복음 Deep & Wide', '왕상하 통독표', '사무엘상 강의안', '민수기 Zoom-in 자료', '크리스천 베이직', '설 가정예배문', '교회학교 주제곡 악보', '2026 가평교회 캘린더'][index],
  slug: ['leader-training-season-2', 'old-testament-overview', 'samuel-2-meditation-note', 'daniel-sovereignty-guide', 'mark-deep-wide', 'kings-reading-plan', 'samuel-1-lecture-note', 'numbers-zoom-in', 'christian-basic', 'family-worship-liturgy', 'church-school-theme-song', 'gapyeong-calendar-2026'][index],
  date: `2026-04-${String(28 - index).padStart(2, '0')}T10:00:00`,
  image: ((index + 3) % 17) + 1,
  excerpt: '양육과 예배, 가정 신앙생활을 돕는 자료입니다.',
}));

function parseEnv(content) {
  const env = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const equalsAt = trimmed.indexOf('=');
    if (equalsAt === -1) continue;
    const key = trimmed.slice(0, equalsAt).trim();
    let value = trimmed.slice(equalsAt + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function requireEnv(env, key) {
  if (!env[key]) throw new Error(`Missing required env: ${key}`);
  return env[key];
}

function wpV2Base(rawUrl) {
  const trimmed = rawUrl.replace(/\/+$/, '');
  return trimmed.endsWith('/wp/v2') ? trimmed : `${trimmed}/wp/v2`;
}

function blockParagraph(text) {
  return `<!-- wp:paragraph -->\n<p>${escapeHtml(text)}</p>\n<!-- /wp:paragraph -->`;
}

function blockHeading(text, level = 2) {
  return `<!-- wp:heading {"level":${level}} -->\n<h${level} class="wp-block-heading">${escapeHtml(text)}</h${level}>\n<!-- /wp:heading -->`;
}

function blocks(...items) {
  return items.join('\n\n');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function imagePath(imageNumber) {
  return join(IMAGE_DIR, imageNames[(imageNumber - 1) % imageNames.length]);
}

async function wpRequest(url, options, authHeader) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: authHeader,
      ...(options.headers || {}),
    },
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${body}`);
  }
  return body ? JSON.parse(body) : null;
}

async function ensureCategory(apiUrl, authHeader, category) {
  const existing = await wpRequest(`${apiUrl}/categories?slug=${encodeURIComponent(category.slug)}&hide_empty=false`, { method: 'GET' }, authHeader);
  if (existing.length > 0) return existing[0];
  return wpRequest(`${apiUrl}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  }, authHeader);
}

async function ensureTerm(apiUrl, authHeader, endpoint, term) {
  const existing = await wpRequest(`${apiUrl}/${endpoint}?slug=${encodeURIComponent(term.slug)}&hide_empty=false`, { method: 'GET' }, authHeader);
  if (existing.length > 0) return existing[0];
  return wpRequest(`${apiUrl}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(term),
  }, authHeader);
}

async function endpointForType(apiUrl, authHeader, postType) {
  const type = await wpRequest(`${apiUrl}/types/${postType}`, { method: 'GET' }, authHeader);
  return type.rest_base || postType;
}

async function uploadImage(apiUrl, authHeader, filePath) {
  const filename = filePath.split(/[\\/]/).pop();
  const mediaTitle = filename.replace(/\.[^.]+$/, '');
  const existing = await wpRequest(`${apiUrl}/media?search=${encodeURIComponent(mediaTitle)}&per_page=1`, { method: 'GET' }, authHeader);
  if (existing.length > 0) return existing[0];

  const data = readFileSync(filePath);
  const media = await wpRequest(`${apiUrl}/media`, {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
    body: data,
  }, authHeader);

  return wpRequest(`${apiUrl}/media/${media.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: mediaTitle,
      alt_text: '가평교회 더미 콘텐츠 이미지',
      caption: 'ModuTheme 더미데이터용 이미지',
    }),
  }, authHeader);
}

async function upsertContent(apiUrl, authHeader, endpoint, payload) {
  const existing = await wpRequest(`${apiUrl}/${endpoint}?slug=${encodeURIComponent(payload.slug)}&status=any&per_page=1`, { method: 'GET' }, authHeader);
  if (existing.length > 0) {
    const updated = await wpRequest(`${apiUrl}/${endpoint}/${existing[0].id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }, authHeader);
    return { action: 'updated', item: updated };
  }

  const created = await wpRequest(`${apiUrl}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }, authHeader);
  return { action: 'created', item: created };
}

function sermonContent(sermon) {
  return blocks(
    blockHeading(sermon.title, 2),
    blockParagraph(sermon.excerpt),
    blockParagraph(`예배: ${sermon.worship}`),
    blockParagraph(`본문: ${sermon.scripture}`),
    blockParagraph(`설교자: ${sermon.preacher}`),
    blockParagraph('영상 URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
    blockParagraph('이 콘텐츠는 화면 검수와 목록 구성을 위한 더미 설교입니다. 실제 운영 전 본문과 영상 링크를 교체하세요.')
  );
}

function eventContent(event) {
  return blocks(
    blockHeading(event.title, 2),
    blockParagraph(`일시: ${formatDateTime(event.date)}`),
    blockParagraph(`장소: ${event.place}`),
    blockParagraph(`대상: ${event.audience}`),
    blockParagraph('신청: 교회 사무실 또는 문의하기 페이지를 통해 신청할 수 있습니다.'),
    blockParagraph('이 콘텐츠는 일정 목록 검수를 위한 더미 행사입니다.')
  );
}

function albumContent(album, mediaItems) {
  const images = mediaItems.slice(0, 4).map((media) => {
    return `<!-- wp:image {"id":${media.id},"sizeSlug":"large"} -->\n<figure class="wp-block-image size-large"><img src="${media.source_url}" alt="${escapeHtml(album.title)}" class="wp-image-${media.id}"/></figure>\n<!-- /wp:image -->`;
  });
  return blocks(
    blockHeading(album.title, 2),
    blockParagraph(album.excerpt),
    ...images,
    blockParagraph('이 콘텐츠는 앨범 archive와 미디어 허브 검수를 위한 더미 앨범입니다.')
  );
}

function postContent(post) {
  return blocks(
    blockHeading(post.title, 2),
    blockParagraph(post.excerpt),
    blockParagraph('공동체 안에서 실제 운영될 글의 길이와 카드 노출을 확인하기 위한 더미 본문입니다.'),
    blockParagraph('운영 전 실제 담당자, 일정, 연락처, 사진, 링크를 확인한 뒤 교체하세요.')
  );
}

function bulletinContent(item) {
  return blocks(
    blockHeading(item.title, 2),
    blockParagraph(item.excerpt),
    blockParagraph('예배 순서: 묵도, 찬양, 기도, 성경봉독, 설교, 봉헌, 축도'),
    blockParagraph('교회소식: 새가족반, 양육과정, 공동체 일정, 선교 기도 제목'),
    blockParagraph('PDF 파일은 실제 운영 시 미디어 라이브러리에 업로드해 연결하세요.')
  );
}

function qtContent(item) {
  return blocks(
    blockHeading(item.title, 2),
    blockParagraph(`오늘의 본문: ${item.scripture}`),
    blockParagraph('묵상 질문: 오늘 말씀은 내 하루의 어떤 선택을 다시 보게 하나요?'),
    blockParagraph('기도: 주님, 말씀 안에 머무르며 오늘의 자리에서 순종하게 하소서.'),
    blockParagraph('이 콘텐츠는 QT 목록 검수를 위한 더미 묵상입니다.')
  );
}

function simpleContent(item, kind) {
  return blocks(
    blockHeading(item.title, 2),
    blockParagraph(item.excerpt),
    blockParagraph(`${kind} 콘텐츠 카드와 단일 글 화면을 확인하기 위한 더미 본문입니다.`),
    blockParagraph('운영 전 실제 파일, 영상, 출처, 설명을 교체하세요.')
  );
}

function formatDateTime(value) {
  return value.replace('T', ' ');
}

async function main() {
  if (!existsSync(ENV_FILE)) throw new Error(`Missing ${ENV_FILE}. Create it from .env.example first.`);
  for (const name of imageNames) {
    if (!existsSync(join(IMAGE_DIR, name))) throw new Error(`Missing image: ${join(IMAGE_DIR, name)}`);
  }

  const env = parseEnv(readFileSync(ENV_FILE, 'utf8'));
  const apiUrl = wpV2Base(requireEnv(env, 'WP_API_URL'));
  const authHeader = `Basic ${Buffer.from(`${requireEnv(env, 'WP_USERNAME')}:${requireEnv(env, 'WP_APP_PASSWORD')}`).toString('base64')}`;

  console.log(`Seeding dummy content into ${apiUrl}`);

  const categoryBySlug = {};
  for (const category of categories) {
    const result = await ensureCategory(apiUrl, authHeader, category);
    categoryBySlug[category.slug] = result;
    console.log(`category: ${category.slug}`);
  }

  const mediaByNumber = {};
  for (let index = 1; index <= imageNames.length; index += 1) {
    const media = await uploadImage(apiUrl, authHeader, imagePath(index));
    mediaByNumber[index] = media;
    console.log(`media: ${imageNames[index - 1]} -> ${media.id}`);
  }

  const sermonEndpoint = await endpointForType(apiUrl, authHeader, 'modutheme_sermon');
  const eventEndpoint = await endpointForType(apiUrl, authHeader, 'modutheme_event');
  const albumEndpoint = await endpointForType(apiUrl, authHeader, 'modutheme_album');

  const seriesBySlug = {};
  for (const term of sermonSeries) {
    const result = await ensureTerm(apiUrl, authHeader, 'modutheme_sermon_series', term);
    seriesBySlug[term.slug] = result;
    console.log(`sermon-series: ${term.slug}`);
  }

  for (const sermon of sermons) {
    const payload = {
      title: sermon.title,
      slug: sermon.slug,
      status: 'publish',
      date: sermon.date,
      excerpt: sermon.excerpt,
      content: sermonContent(sermon),
      featured_media: mediaByNumber[sermon.image].id,
      modutheme_sermon_series: [seriesBySlug[sermon.series].id],
    };
    const result = await upsertContent(apiUrl, authHeader, sermonEndpoint, payload);
    console.log(`${result.action}: sermon/${sermon.slug}`);
  }

  for (const eventData of events) {
    const [title, slug, date, place, audience, image] = eventData;
    const event = { title, slug, date, place, audience };
    const payload = {
      title,
      slug,
      status: 'publish',
      date,
      excerpt: `${place}에서 ${audience}을 대상으로 진행하는 일정입니다.`,
      content: eventContent(event),
      featured_media: mediaByNumber[image].id,
    };
    const result = await upsertContent(apiUrl, authHeader, eventEndpoint, payload);
    console.log(`${result.action}: event/${slug}`);
  }

  for (const albumData of albums) {
    const [title, slug, date, excerpt, image] = albumData;
    const album = { title, slug, date, excerpt };
    const galleryStart = Math.max(1, image - 1);
    const gallery = [0, 1, 2, 3].map((offset) => mediaByNumber[((galleryStart + offset - 1) % imageNames.length) + 1]);
    const payload = {
      title,
      slug,
      status: 'publish',
      date,
      excerpt,
      content: albumContent(album, gallery),
      featured_media: mediaByNumber[image].id,
    };
    const result = await upsertContent(apiUrl, authHeader, albumEndpoint, payload);
    console.log(`${result.action}: album/${slug}`);
  }

  for (const postData of posts) {
    const [kind, title, slug, categorySlugs, excerpt, image] = postData;
    const payload = {
      title,
      slug,
      status: 'publish',
      date: '2026-06-01T10:00:00',
      excerpt,
      content: postContent({ title, excerpt }),
      featured_media: mediaByNumber[image].id,
      categories: categorySlugs.map((slug) => categoryBySlug[slug].id),
    };
    const result = await upsertContent(apiUrl, authHeader, 'posts', payload);
    console.log(`${result.action}: post/${slug} (${kind})`);
  }

  for (const item of bulletins) {
    const payload = {
      title: item.title,
      slug: item.slug,
      status: 'publish',
      date: item.date,
      excerpt: item.excerpt,
      content: bulletinContent(item),
      featured_media: mediaByNumber[item.image].id,
      categories: [categoryBySlug.bulletin.id],
    };
    const result = await upsertContent(apiUrl, authHeader, 'posts', payload);
    console.log(`${result.action}: post/${item.slug} (bulletin)`);
  }

  for (const item of qts) {
    const payload = {
      title: item.title,
      slug: item.slug,
      status: 'publish',
      date: item.date,
      excerpt: item.excerpt,
      content: qtContent(item),
      featured_media: mediaByNumber[item.image].id,
      categories: [categoryBySlug.qt.id],
    };
    const result = await upsertContent(apiUrl, authHeader, 'posts', payload);
    console.log(`${result.action}: post/${item.slug} (qt)`);
  }

  for (const item of videos) {
    const payload = {
      title: item.title,
      slug: item.slug,
      status: 'publish',
      date: item.date,
      excerpt: item.excerpt,
      content: simpleContent(item, '영상'),
      featured_media: mediaByNumber[item.image].id,
      categories: [categoryBySlug.video.id],
    };
    const result = await upsertContent(apiUrl, authHeader, 'posts', payload);
    console.log(`${result.action}: post/${item.slug} (video)`);
  }

  for (const item of libraryPosts) {
    const payload = {
      title: item.title,
      slug: item.slug,
      status: 'publish',
      date: item.date,
      excerpt: item.excerpt,
      content: simpleContent(item, '자료실'),
      featured_media: mediaByNumber[item.image].id,
      categories: [categoryBySlug.library.id],
    };
    const result = await upsertContent(apiUrl, authHeader, 'posts', payload);
    console.log(`${result.action}: post/${item.slug} (library)`);
  }

  console.log('Dummy content seeding complete.');
}

main().catch((error) => {
  console.error(error.message);
  if (error.cause) {
    console.error(`Cause: ${error.cause.message || error.cause}`);
  }
  console.error('Check that WordPress is running and WP_API_URL in .env.local is reachable.');
  process.exit(1);
});
