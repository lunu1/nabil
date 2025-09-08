import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

// GET /api/posts – public
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(posts);
  } catch (err: any) {
    console.error("GET /api/posts failed:", err?.message || err);
    // Temporary fallback so your UI works while DB is being set up
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/posts – protected by middleware
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, date, author, tags, coverUrl, excerpt, content, published = true } = body;

    let base = slugify(title || "post");
    let slug = base;
    let i = 1;
    while (await prisma.post.findUnique({ where: { slug } })) slug = `${base}-${i++}`;

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        date: date ? new Date(date) : new Date(),
        author,
        tags: Array.isArray(tags)
          ? tags
          : typeof tags === "string"
          ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
          : [],
        coverUrl,
        excerpt,
        content,
        published: !!published,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/posts failed:", err?.message || err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
