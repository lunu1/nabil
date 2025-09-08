"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Search, Tag } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  date: string;
  author?: string | null;
  tags?: string[] | null;
  coverUrl?: string | null;
  excerpt?: string | null;
};

export default function BlogSectionPublic() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/posts", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text(); // safer than res.json() when API not ready
        const data: Post[] = text ? JSON.parse(text) : [];
        if (mounted) setPosts(Array.isArray(data) ? data : []);
      } catch (e: any) {
        console.error("Failed to load posts", e);
        if (mounted) setError(e.message || "Failed to load posts");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const allTags = useMemo(() => {
    const t = new Set<string>();
    posts.forEach((p) => (p.tags || []).forEach((x) => t.add(x)));
    return Array.from(t).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || "").toLowerCase().includes(q);
      const matchesTag = !activeTag || (p.tags || []).includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [posts, query, activeTag]);

  return (
    <section id="blog" className="relative py-20 text-white overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1B4B] via-[#0B1B40] to-[#6A1B2B]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(10,27,75,0.18),transparent_45%),radial-gradient(ellipse_at_80%_60%,rgba(106,27,43,0.15),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Insights & Articles</h2>
            <p className="text-white/90 mt-1">
              Practical playbooks for expansion, partners, pricing, and growth.
            </p>
          </div>

        <div className="relative ml-auto w-full max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-9 pr-3 h-10 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 outline-none focus:ring-2 focus:ring-[#6A1B2B]/30"
          />
        </div>
        </div>

        {allTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag((cur) => (cur === t ? "" : t))}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition
                  ${
                    activeTag === t
                      ? "bg-[#6A1B2B] border-[#6A1B2B]"
                      : "bg-[rgba(10,27,75,0.22)] border-[#6A1B2B]/50"
                  }`}
              >
                <Tag className="w-3.5 h-3.5" /> {t}
              </button>
            ))}
            {activeTag && (
              <button
                onClick={() => setActiveTag("")}
                className="text-sm underline underline-offset-4 ml-1"
              >
                clear
              </button>
            )}
          </div>
        )}

        {error && !loading && posts.length === 0 && (
          <div className="mt-8 rounded-2xl border border-[#6A1B2B]/40 bg-[rgba(10,27,75,0.25)] p-6">
            <div className="text-white/90">
              Couldn’t load posts yet. Open <code>/api/posts</code> in the browser to confirm the API.
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-3xl overflow-hidden border border-[#6A1B2B]/40 bg-[rgba(10,27,75,0.22)]"
                >
                  <div className="h-44 bg-[rgba(10,27,75,0.25)]" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-1/3 bg-white/20 rounded" />
                    <div className="h-4 w-3/4 bg-white/20 rounded" />
                    <div className="h-4 w-2/3 bg-white/20 rounded" />
                  </div>
                </div>
              ))
            : filtered.map((p) => (
                <article
                  key={p.id}
                  className="group rounded-3xl overflow-hidden border border-[#6A1B2B]/40 bg-[rgba(10,27,75,0.22)] shadow hover:shadow-2xl transition"
                >
                  <div className="relative h-44 bg-[rgba(10,27,75,0.25)]">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F2D] via-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-white/70">
                      {p.date?.slice(0, 10)} {p.author ? `• ${p.author}` : ""}
                    </div>
                    <h3 className="mt-1.5 text-lg font-semibold leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-white/85 line-clamp-3">{p.excerpt}</p>

                    {p.tags && p.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-full border border-[#6A1B2B]/60 bg-[#6A1B2B]/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${p.slug}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#6A1B2B]/60 px-3 py-1.5 hover:bg-[#6A1B2B]/20"
                    >
                      Read more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
