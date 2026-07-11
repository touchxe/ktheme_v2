import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 시각 스타일. 기본 soft. */
  variant?: "live" | "category" | "solid" | "soft" | "outline";
  /** variant="category"일 때 설교 분류명 — 색이 자동 매핑. */
  category?: "주일" | "수요" | "청년" | "새벽" | "유년부" | "기타";
  /** 색 직접 지정(분류 토큰 대신). */
  color?: string;
  children?: React.ReactNode;
}

/** 상태/분류 라벨 뱃지. */
export function Badge(props: BadgeProps): JSX.Element;
