"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// (Optional) also make the page dynamic so it isn't prerendered
export const dynamic = "force-dynamic";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const sp = useSearchParams();            // ✅ OK inside Suspense
  const next = sp.get("next") || "/admin/blog";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) router.push(next);
    else setError("Invalid password");
  }

  return (
    <main className="min-h-screen grid place-items-center bg-[#0A0F2D] text-white p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-[#6A1B2B]/40 bg-[rgba(10,27,75,0.35)] p-6"
      >
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-4 w-full h-11 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3 outline-none focus:ring-2 focus:ring-[#6A1B2B]/30"
        />
        {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-[#6A1B2B] text-white h-11 font-semibold"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen grid place-items-center bg-[#0A0F2D] text-white">
          Loading…
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
