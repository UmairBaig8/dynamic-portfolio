"use client";

import { useState, useMemo } from "react";

export default function AdminSearchableTable({ columns, rows, renderRow, searchFields, placeholder }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const lower = q.toLowerCase();
    return rows.filter((row) =>
      searchFields.some((field) => {
        const val = typeof field === "function" ? field(row) : row[field];
        return val?.toString().toLowerCase().includes(lower);
      })
    );
  }, [q, rows, searchFields]);

  return (
    <div>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder || "Search\u2026"}
        style={{ marginBottom: 16, maxWidth: 320 }}
      />
      <table>
        <thead>
          <tr>{columns.map((col, i) => (<th key={i}>{col}</th>))}</tr>
        </thead>
        <tbody>
          {filtered.map((row, i) => renderRow(row, i))}
          {filtered.length === 0 && (
            <tr><td colSpan={columns.length} style={{ color: "var(--muted)" }}>No results.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
