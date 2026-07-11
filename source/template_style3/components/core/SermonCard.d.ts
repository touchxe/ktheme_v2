import * as React from "react";

export interface SermonCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 썸네일 이미지 URL. */
  image?: string;
  /** 설교 분류 — 색 라벨이 자동 매핑. 기본 "주일". */
  category?: "주일" | "수요" | "청년" | "새벽" | "유년부" | "기타";
  /** 설교 제목. */
  title: string;
  /** 설교자 (직분 포함). */
  speaker?: string;
  /** 날짜 (예: 2026.04.26). */
  date?: string;
  href?: string;
}

/**
 * 설교/예배 미디어 리스트 아이템.
 * @startingPoint section="Core" subtitle="썸네일·분류·메타 설교 카드" viewport="420x112"
 */
export function SermonCard(props: SermonCardProps): JSX.Element;
