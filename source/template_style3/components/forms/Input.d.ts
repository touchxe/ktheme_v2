import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 위에 표시할 라벨. */
  label?: string;
  /** 아래 보조 설명. */
  hint?: string;
}

/** 라벨이 달린 텍스트 입력 필드. */
export function Input(props: InputProps): JSX.Element;
