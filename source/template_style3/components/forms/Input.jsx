import React from "react";

/**
 * 텍스트 입력. 라벨 + 입력 필드. 8px 라운드, 포커스 시 브랜드 링.
 */
export function Input({ label, hint, id, style, ...props }) {
  const inputId = id || (label ? `in-${label}` : undefined);
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-strong)", marginBottom: 6 }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        style={{
          width: "100%",
          height: 44,
          padding: "0 14px",
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          color: "var(--text-strong)",
          background: "var(--white)",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-md)",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--brand-500)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(58,100,245,0.15)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--line)";
          e.currentTarget.style.boxShadow = "none";
        }}
        {...props}
      />
      {hint && <div style={{ marginTop: 6, fontSize: 12, color: "var(--text-body)" }}>{hint}</div>}
    </div>
  );
}
