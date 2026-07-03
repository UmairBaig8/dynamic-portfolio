"use client";

import { reorderProject } from "@/app/admin/actions";

export default function ReorderButtons({ id, isFirst, isLast }) {
  return (
    <div style={{ display: "inline-flex", gap: 4 }}>
      <button
        type="button"
        className="btn ghost"
        style={{ padding: "4px 8px", opacity: isFirst ? 0.3 : 1 }}
        disabled={isFirst}
        onClick={() => reorderProject(id, "up")}
        aria-label="Move up"
      >
        ↑
      </button>
      <button
        type="button"
        className="btn ghost"
        style={{ padding: "4px 8px", opacity: isLast ? 0.3 : 1 }}
        disabled={isLast}
        onClick={() => reorderProject(id, "down")}
        aria-label="Move down"
      >
        ↓
      </button>
    </div>
  );
}
