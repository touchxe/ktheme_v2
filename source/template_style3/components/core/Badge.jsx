import React from "react";

const CATEGORY_COLORS = {
  주일: "var(--cat-sunday)",
  수요: "var(--cat-wed)",
  청년: "var(--cat-youth)",
  새벽: "var(--cat-dawn)",
  유년부: "var(--cat-kids)",
  기타: "var(--cat-etc)",
};

/**
 * 뱃지 / 라벨.
 * variant: live(레드, 실시간) · category(분류 색) · solid(잉크) · soft(연한 면) · outline
 */
export function Badge({ variant = "soft", category, color, children, style, ...props }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    lineHeight: 1,
    whiteSpace: "nowrap",
  };

  if (variant === "live") {
    return (
      <span
        style={{
          ...base,
          background: "var(--accent-red)",
          color: "#fff",
          fontSize: 10,
          letterSpacing: "var(--ls-live)",
          padding: "3px 6px",
          borderRadius: "var(--radius-sm)",
          ...style,
        }}
        {...props}
      >
        {children || "LIVE"}
      </span>
    );
  }

  const catColor = color || CATEGORY_COLORS[category] || "var(--brand-600)";
  const styles = {
    category: { background: catColor, color: "#fff" },
    solid: { background: "var(--ink-900)", color: "#fff" },
    soft: { background: "var(--paper)", color: "var(--text-strong)" },
    outline: { background: "transparent", color: "var(--text-body)", boxShadow: "inset 0 0 0 1px var(--line)" },
  };
  const v = styles[variant] || styles.soft;

  return (
    <span
      style={{
        ...base,
        fontSize: 11.5,
        fontWeight: variant === "soft" || variant === "outline" ? 600 : 700,
        padding: "5px 10px",
        borderRadius: "var(--radius-full)",
        ...v,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
