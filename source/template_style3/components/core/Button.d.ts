import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 시각 스타일. 기본 dark. */
  variant?: "dark" | "brand" | "outline" | "ghost";
  /** 크기. 기본 md(44px). */
  size?: "sm" | "md" | "lg";
  /** 오른쪽 아이콘 (보통 화살표 SVG) */
  iconRight?: React.ReactNode;
  /** 왼쪽 아이콘 */
  iconLeft?: React.ReactNode;
  /** 렌더 태그. 링크 버튼이면 "a". 기본 "button". */
  as?: "button" | "a";
  children?: React.ReactNode;
}

/**
 * 가평교회 알약형 버튼.
 * @startingPoint section="Core" subtitle="알약형 액션 버튼 4종" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
