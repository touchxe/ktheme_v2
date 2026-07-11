import * as React from "react";

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 선택 상태. 기본 false. */
  active?: boolean;
  children?: React.ReactNode;
}

/** 콘텐츠 필터/탭에 쓰는 알약형 칩. */
export function FilterChip(props: FilterChipProps): JSX.Element;
