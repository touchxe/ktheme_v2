import React from "react";

/**
 * 가평교회 기본 버튼. 알약형(full radius)이 기본.
 * variant: dark(잉크) · brand(블루) · outline(반전) · ghost(연한 면)
 */
export function Button({
  variant = "dark",
  size = "md",
  iconRight,
  iconLeft,
  as = "button",
  children,
  style,
  ...props
}) {
  const sizes = {
    sm: { height: 36, padding: "0 14px", font: 13 },
    md: { height: 44, padding: "0 20px", font: 14 },
    lg: { height: 48, padding: "0 22px", font: 14 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    dark: { background: "var(--ink-900)", color: "#fff", border: "1px solid var(--ink-900)" },
    brand: { background: "var(--brand-600)", color: "#fff", border: "1px solid var(--brand-600)" },
    outline: { background: "transparent", color: "var(--ink-900)", border: "1px solid var(--ink-900)" },
    ghost: { background: "transparent", color: "var(--text-strong)", border: "1px solid var(--line)" },
  };
  const v = variants[variant] || variants.dark;

  const Tag = as;
  return (
    <Tag
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        height: s.height,
        padding: s.padding,
        fontSize: s.font,
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        letterSpacing: "var(--ls-base)",
        borderRadius: "var(--radius-full)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
        ...v,
        ...style,
      }}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
