import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();
  if (!process.env.ADMIN_PASSWORD)
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });

  if (password !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ error: "Invalid" }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 6, // 6h
  });
  return res;
}
