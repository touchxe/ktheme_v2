import React from "react";

/**
 * 필터 칩 / 탭. 알약형. active 시 잉크 배경, 비활성 시 경계선.
 */
export function FilterChip({ active = false, children, style, ...props }) {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 36,
        padding: "0 16px",
        fontFamily: "var(--font-sans)",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "var(--ls-base)",
        borderRadius: "var(--radius-full)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
        background: active ? "var(--ink-900)" : "transparent",
        color: active ? "#fff" : "var(--text-body)",
        border: active ? "1px solid var(--ink-900)" : "1px solid var(--line)",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
