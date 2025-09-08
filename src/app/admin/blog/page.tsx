"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, X, Image as ImageIcon } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  date: string;
  author?: string | null;
  tags?: string[] | null;
  coverUrl?: string | null;
  excerpt?: string | null;
  content: string;
  published: boolean;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);

  async function load() {
    const res = await fetch("/api/posts", { cache: "no-store" });
    const data = (await res.json()) as Post[];
    setPosts(data);
  }
  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setEditing({
      id: "",
      title: "",
      slug: "",
      date: new Date().toISOString().slice(0, 10),
      author: "Nabil Najem",
      tags: [],
      coverUrl: "",
      excerpt: "",
      content: "",
      published: true,
    });
    setOpenForm(true);
  }
  function startEdit(p: Post) {
    setEditing({ ...p, date: p.date?.slice(0, 10) });
    setOpenForm(true);
  }

  async function savePost() {
    if (!editing) return;
    const { id, slug, ...body } = editing as any;
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/posts/${id}` : "/api/posts";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setOpenForm(false);
      setEditing(null);
      load();
    }
  }

  async function del(id: string) {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <main className="min-h-screen bg-[#0A0F2D] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blog Admin</h1>
          <button
            onClick={startNew}
            className="inline-flex items-center gap-2 rounded-xl bg-[#6A1B2B] text-white px-4 h-11 font-semibold"
          >
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl overflow-hidden border border-[#6A1B2B]/40 bg-[rgba(10,27,75,0.22)]"
            >
              <div className="relative h-40 bg-[rgba(10,27,75,0.25)]">
                {p.coverUrl ? (
                  <img
                    src={p.coverUrl}
                    alt="cover"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-content-center text-white/70">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs text-white/70">
                  {p.date?.slice(0, 10)} • {p.author || ""}
                </div>
                <h3 className="font-semibold mt-1">{p.title}</h3>
                <p className="text-white/85 line-clamp-2 mt-1">{p.excerpt}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="px-3 h-9 rounded-lg border border-[#6A1B2B]/60 hover:bg-[#6A1B2B]/20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(p.id)}
                    className="px-3 h-9 rounded-lg bg-[#6A1B2B] text-white inline-flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {openForm && editing && (
          <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4">
            <div className="max-w-2xl w-full rounded-2xl border border-[#6A1B2B]/40 bg-[rgba(10,27,75,0.98)] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  {editing.id ? "Edit Post" : "New Post"}
                </h3>
                <button
                  onClick={() => {
                    setOpenForm(false);
                    setEditing(null);
                  }}
                  className="p-2 rounded-lg border border-[#6A1B2B]/50 hover:bg-[#6A1B2B]/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <input
                  className="h-10 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3"
                  placeholder="Title"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="h-10 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3"
                  value={editing.date || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, date: e.target.value })
                  }
                />
                <input
                  className="h-10 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3"
                  placeholder="Author"
                  value={editing.author || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, author: e.target.value })
                  }
                />
                <input
                  className="h-10 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3"
                  placeholder="Cover URL"
                  value={editing.coverUrl || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, coverUrl: e.target.value })
                  }
                />
                <input
                  className="md:col-span-2 h-10 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3"
                  placeholder="Tags (comma separated)"
                  value={(editing.tags || []).join(", ")}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      tags: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
                <textarea
                  rows={3}
                  className="md:col-span-2 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3 py-2"
                  placeholder="Excerpt"
                  value={editing.excerpt || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, excerpt: e.target.value })
                  }
                />
                <textarea
                  rows={8}
                  className="md:col-span-2 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3 py-2"
                  placeholder="Content"
                  value={editing.content}
                  onChange={(e) =>
                    setEditing({ ...editing, content: e.target.value })
                  }
                />
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setOpenForm(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-[#6A1B2B]/60 hover:bg-[#6A1B2B]/20"
                >
                  Cancel
                </button>
                <button
                  onClick={savePost}
                  className="px-5 py-2 rounded-xl bg-[#6A1B2B] text-white font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
