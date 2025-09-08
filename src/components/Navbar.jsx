import React from "react";
import { ArrowRight } from "lucide-react";

/**
 * NAVBAR – Blue & Burgundy
 * Left: Signature image (PNG)
 * Right: CTA button – "Grow your business exponentially"
 * Sticky, blurred background, border accent.
 *
 * Usage: Place nabil-signature-demo.png in your public/ folder and set src="/nabil-signature-demo.png".
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-[#6A1B2B]/30">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Signature */}
        <a href="#" className="flex items-center" aria-label="Nabil Najem">
          <img
            src="/sign.png"
            alt="Nabil Najem signature (demo)"
            className="h-8 md:h-16 w-auto select-none pointer-events-none"
          />
        </a>

        {/* Right: CTA */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-2xl bg-[#6A1B2B] text-white px-4 py-2 font-semibold shadow-lg hover:shadow-xl transition"
        >
          Grow your business exponentially <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}
