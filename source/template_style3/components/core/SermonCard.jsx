import React from "react";

const CAT_COLOR = {
  주일: "var(--cat-sunday)",
  수요: "var(--cat-wed)",
  청년: "var(--cat-youth)",
  새벽: "var(--cat-dawn)",
  유년부: "var(--cat-kids)",
  기타: "var(--cat-etc)",
};

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

/**
 * 설교/예배 미디어 리스트 아이템. 썸네일 + 재생 마크 + 분류 + 제목 + 메타.
 */
export function SermonCard({ image, category = "주일", title, speaker, date, href = "#", style, ...props }) {
  const catColor = CAT_COLOR[category] || "var(--brand-600)";
  return (
    <a
      href={href}
      style={{
        display: "flex",
        gap: 16,
        padding: 16,
        textDecoration: "none",
        borderRadius: "var(--radius-md)",
        fontFamily: "var(--font-sans)",
        transition: "background var(--dur-fast) var(--ease-out)",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--paper)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      {...props}
    >
      <div
        style={{
          position: "relative",
          width: 112,
          height: 80,
          flexShrink: 0,
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          background: "var(--ink-900)",
        }}
      >
        {image && (
          <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
        )}
        <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <PlayIcon />
        </span>
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: catColor, marginBottom: 2 }}>{category}예배</div>
        <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4, color: "var(--text-strong)" }}>{title}</div>
        <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-body)" }}>
          {speaker}
          {speaker && date ? " · " : ""}
          {date}
        </div>
      </div>
    </a>
  );
}
