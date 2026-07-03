"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";

export default function RichTextEditor({ name, defaultValue }) {
  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content: defaultValue || "",
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;
    const input = document.getElementById(`${name}-hidden`);
    const sync = () => { if (input) input.value = editor.getHTML(); };
    editor.on("update", sync);
    sync();
    return () => editor.off("update", sync);
  }, [editor, name]);

  if (!editor) return null;

  return (
    <div className="field">
      <label>Content</label>
      <input type="hidden" id={`${name}-hidden`} name={name} defaultValue={defaultValue} />
      <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>B</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>I</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>H2</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>• list</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>quote</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}>code</ToolBtn>
        <ToolBtn onClick={() => {
          const url = prompt("Link URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}>link</ToolBtn>
      </div>
      <div style={{ border: "1px solid var(--line-strong)", borderRadius: 2, padding: "12px 14px", minHeight: 260 }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolBtn({ onClick, active, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn ghost"
      style={{ padding: "4px 10px", fontSize: 12, borderColor: active ? "var(--accent)" : undefined, color: active ? "var(--accent)" : undefined }}
    >
      {children}
    </button>
  );
}
