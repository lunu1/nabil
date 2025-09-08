"use client";

import Link from "next/link";
import { Mail, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative text-white">
      {/* Brand background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#0A1B4B] via-[#0B1B40] to-[#6A1B2B]" />
      <div className="absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(ellipse_at_20%_20%,rgba(10,27,75,0.18),transparent_45%),radial-gradient(ellipse_at_80%_60%,rgba(106,27,43,0.15),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-semibold text-lg">Nabil Najem</div>
            <p className="text-white/80 text-sm mt-1">International Business Growth Coach</p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/#services" className="text-white/80 hover:text-white">Services</Link>
            <Link href="/#about" className="text-white/80 hover:text-white">About</Link>
            <Link href="/#blog" className="text-white/80 hover:text-white">Blog</Link>
            <Link href="/#testimonials" className="text-white/80 hover:text-white">Testimonials</Link>
            <Link href="/#contact" className="text-white/80 hover:text-white">Contact</Link>
            {/* <Link href="/privacy" className="text-white/80 hover:text-white">Privacy</Link> */}
          </nav>

          <div className="flex items-center gap-3">
            <a href="mailto:hello@example.com" className="group p-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition">
              <Mail className="w-5 h-5 group-hover:scale-110 transition" />
            </a>
            <a href="https://www.linkedin.com/in/nabilnajem" target="_blank" rel="noreferrer" className="group p-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition">
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="group p-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition">
              <Twitter className="w-5 h-5 group-hover:scale-110 transition" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="group p-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition">
              <Youtube className="w-5 h-5 group-hover:scale-110 transition" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <p>© {new Date().getFullYear()} Nabil Najem. All rights reserved.</p>
          <p className="text-center md:text-right">Built with blue & burgundy.</p>
        </div>
      </div>
    </footer>
  );
}
