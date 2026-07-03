"use client";

import { useState, useMemo } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableRow({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: isDragging ? "var(--bg-elevated-2)" : undefined,
  };
  return (
    <tr ref={setNodeRef} style={style}>
      <td style={{ width: 1, cursor: "grab" }} {...attributes} {...listeners}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--muted)" }}>⠿</span>
      </td>
      {children}
    </tr>
  );
}

export default function DragSortTable({ columns, rows, searchFields, placeholder, renderRow, onReorder }) {
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

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onReorder(active.id, over.id);
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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filtered.map((r) => r.id)} strategy={verticalListSortingStrategy}>
          <table>
            <thead>
              <tr><th style={{ width: 1 }}></th>{columns.map((col, i) => (<th key={i}>{col}</th>))}</tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <SortableRow key={row.id} id={row.id}>
                  {renderRow(row, i).props.children}
                </SortableRow>
              ))}
              {filtered.length === 0 && <tr><td colSpan={columns.length + 1} style={{ color: "var(--muted)" }}>No results.</td></tr>}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
}
