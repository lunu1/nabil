import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/posts/[idOrSlug]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const p = await prisma.post.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(p);
}

// PUT /api/posts/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { title, date, author, tags, coverUrl, excerpt, content, published } = body;

  const data: any = {};
  if (title !== undefined) data.title = title;
  if (date) data.date = new Date(date);
  if (author !== undefined) data.author = author;
  if (tags !== undefined)
    data.tags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];
  if (coverUrl !== undefined) data.coverUrl = coverUrl;
  if (excerpt !== undefined) data.excerpt = excerpt;
  if (content !== undefined) data.content = content;
  if (published !== undefined) data.published = !!published;

  const p = await prisma.post.update({ where: { id }, data });
  return NextResponse.json(p);
}

// DELETE /api/posts/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
