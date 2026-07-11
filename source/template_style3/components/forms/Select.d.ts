import * as React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** 위에 표시할 라벨. */
  label?: string;
  children?: React.ReactNode;
}

/** 라벨이 달린 셀렉트 드롭다운. */
export function Select(props: SelectProps): JSX.Element;
