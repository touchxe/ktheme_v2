import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 카드 그림자 적용. 기본 false(경계만). */
  elevated?: boolean;
  /** hover 시 살짝 떠오르는 효과. */
  hover?: boolean;
  /** 내부 패딩(px). 기본 24. */
  padding?: number;
  children?: React.ReactNode;
}

/** 범용 흰 카드 면 컨테이너. */
export function Card(props: CardProps): JSX.Element;
