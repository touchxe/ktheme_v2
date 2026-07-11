import React from "react";

/**
 * 범용 카드 면. 흰 배경 + 경계 + 16px 라운드.
 * elevated 시 카드 그림자, hover 시 살짝 떠오름.
 */
export function Card({ elevated = false, hover = false, padding = 24, style, children, ...props }) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-xl)",
        padding,
        boxShadow: elevated ? "var(--shadow-card)" : "none",
        transition: "transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      onMouseEnter={hover ? (e) => (e.currentTarget.style.transform = "translateY(-2px)") : undefined}
      onMouseLeave={hover ? (e) => (e.currentTarget.style.transform = "translateY(0)") : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
