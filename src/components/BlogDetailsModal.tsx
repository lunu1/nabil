"use client";

import { useEffect, useMemo, useState } from "react";
import Modal from "@/components/ui/Modal";
import { Calendar, Clock, Image as ImageIcon, Share2, Tag } from "lucide-react";

type ListPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  author?: string | null;
  tags?: string[] | null;
  coverUrl?: string | null;
  excerpt?: string | null;
};

type FullPost = ListPost & {
  content?: string;
  createdAt?: string;
  updatedAt?: string;
};

function readingTime(text: string | undefined) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogDetailsModal({
  open,
  onClose,
  post,
}: {
  open: boolean;
  onClose: () => void;
  post: ListPost | null;
}) {
  const [data, setData] = useState<FullPost | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch the full post by ID when opened
  useEffect(() => {
    if (!open || !post) return;
    let active = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/${post.id}`, { cache: "no-store" });
        const json = res.ok ? await res.json() : post; // fall back to list info
        if (active) setData(json);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
      setData(null);
    };
  }, [open, post]);

  const tags = useMemo(
    () => (data?.tags && Array.isArray(data.tags) ? data.tags : []),
    [data?.tags]
  );

  const minutes = readingTime(data?.content);

  return (
    <Modal open={open} onClose={onClose} title={post?.title} maxWidth="max-w-4xl">
      {!data || loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-48 rounded-xl bg-white/10" />
          <div className="h-5 w-2/3 rounded bg-white/15" />
          <div className="h-4 w-3/4 rounded bg-white/15" />
          <div className="h-4 w-1/2 rounded bg-white/15" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cover */}
          <div className="relative h-56 rounded-xl overflow-hidden border border-white/10 bg-white/5">
            {data.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.coverUrl}
                alt="cover"
                className="absolute inset-0 h-full w-full object-cover opacity-95"
              />
            ) : (
              <div className="absolute inset-0 grid place-content-center text-white/70">
                <ImageIcon className="h-8 w-8" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-blue)]/80 via-transparent" />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {(data.date || data.createdAt || "").slice(0, 10)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {minutes} min read
            </span>
            {data.author && (
              <span>
                By <strong className="text-white">{data.author}</strong>
              </span>
            )}
          </div>

          {/* Tags + share */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-burgundy)]/20 border border-[var(--brand-burgundy)]/40 px-3 py-1 text-sm"
                >
                  <Tag className="h-3.5 w-3.5" />
                  {t}
                </span>
              ))}
            </div>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                `${location.origin}/blog/${data.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10 transition"
            >
              <Share2 className="h-4 w-4" /> Share
            </a>
          </div>

          {/* Content */}
          <article className="prose prose-invert max-w-none">
            {(data.content || data.excerpt || "")
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((p, i) => (
                <p key={i} className="leading-relaxed text-white/90">
                  {p}
                </p>
              ))}
          </article>
        </div>
      )}
    </Modal>
  );
}
