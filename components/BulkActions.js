"use client";

import { useState, useMemo } from "react";
import { bulkActionPosts } from "@/app/admin/actions";

export default function BulkActions({ columns, rows, searchFields, placeholder, renderRow }) {
  const [selected, setSelected] = useState(new Set());
  const [action, setAction] = useState("");
  const [msg, setMsg] = useState(null);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const lower = q.toLowerCase();
    return rows.filter((row) =>
      searchFields.some((f) => {
        const val = typeof f === "function" ? f(row) : row[f];
        return val?.toString().toLowerCase().includes(lower);
      })
    );
  }, [q, rows, searchFields]);

  async function handleBulk() {
    if (!action || selected.size === 0) return;
    if (action === "delete" && !confirm(`Delete ${selected.size} post(s)? This can't be undone.`)) return;

    const fd = new FormData();
    fd.set("action", action);
    selected.forEach((id) => fd.append("ids", id));

    const res = await bulkActionPosts(fd);
    if (res?.error) setMsg(res.error);
    else {
      setMsg(`${selected.size} post(s) ${action === "delete" ? "deleted" : action === "publish" ? "published" : "unpublished"}.`);
      setSelected(new Set());
    }
  }

  return (
    <div>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder || "Search\u2026"}
        style={{ marginBottom: 16, maxWidth: 320 }}
      />
      {selected.size > 0 && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, padding: "10px 14px", background: "var(--bg-elevated)", border: "1px solid var(--line-strong)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted)" }}>{selected.size} selected</span>
          <select value={action} onChange={(e) => setAction(e.target.value)} style={{ width: "auto", fontFamily: "var(--font-mono)", fontSize: 13, padding: "6px 10px" }}>
            <option value="">Action\u2026</option>
            <option value="publish">Publish</option>
            <option value="unpublish">Unpublish</option>
            <option value="delete">Delete</option>
          </select>
          <button type="button" className="btn primary" style={{ padding: "6px 14px", fontSize: 12 }} onClick={handleBulk}>Apply</button>
          {msg && <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent-2)" }}>{msg}</span>}
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th style={{ width: 1 }}>
              <input
                type="checkbox"
                checked={filtered.length > 0 && selected.size === filtered.length}
                onChange={() => {
                  if (selected.size === filtered.length) setSelected(new Set());
                  else setSelected(new Set(filtered.map((r) => r.id)));
                }}
                style={{ width: "auto" }}
              />
            </th>
            {columns.map((col, i) => (<th key={i}>{col}</th>))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, i) => (
            <tr key={row.id}>
              <td style={{ width: 1 }}>
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => {
                    const next = new Set(selected);
                    if (next.has(row.id)) next.delete(row.id); else next.add(row.id);
                    setSelected(next);
                  }}
                  style={{ width: "auto" }}
                />
              </td>
              {renderRow(row, i).props.children}
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan={columns.length + 1} style={{ color: "var(--muted)" }}>No results.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
