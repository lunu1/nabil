import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`; // works on SQLite
    return NextResponse.json({ ok: true, env: !!process.env.DATABASE_URL });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, env: !!process.env.DATABASE_URL, error: e.message || String(e) },
      { status: 500 }
    );
  }
}
