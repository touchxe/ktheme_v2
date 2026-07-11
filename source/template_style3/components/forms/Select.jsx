import React from "react";

/**
 * 셀렉트 드롭다운. Input과 동일한 외형.
 */
export function Select({ label, id, children, style, ...props }) {
  const selId = id || (label ? `sel-${label}` : undefined);
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      {label && (
        <label
          htmlFor={selId}
          style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-strong)", marginBottom: 6 }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <select
          id={selId}
          style={{
            width: "100%",
            height: 44,
            padding: "0 38px 0 14px",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--text-strong)",
            background: "var(--white)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-md)",
            outline: "none",
            appearance: "none",
            boxSizing: "border-box",
            cursor: "pointer",
            ...style,
          }}
          {...props}
        >
          {children}
        </select>
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="var(--text-body)"
          strokeWidth="2"
          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
