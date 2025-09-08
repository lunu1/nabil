"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Linkedin, Facebook, Instagram, Twitter } from "lucide-react";
import Navbar from "./Navbar";

/**
 * HERO SECTION – Blue & Burgundy
 * - Animated title (staggered words)
 * - Rotating subtitle that fades out in REVERSE order, then the next one fades in
 * - Sticky social media rail on the left
 * - Pure Tailwind styling using brand colors only
 *
 * Colors
 *  Blue:     #0A1B4B / #0B1B40
 *  Burgundy: #6A1B2B
 */

const BRAND = {
  blue: "#0A1B4B",
  blue2: "#0B1B40",
  burgundy: "#6A1B2B",
};

function SocialRail() {
  const base = "p-2 rounded-full bg-[rgba(10,27,75,0.30)] hover:bg-[rgba(106,27,43,0.40)] transition";
  return (
    <div className="fixed left-3 top-1/3 hidden lg:flex flex-col items-center gap-3 z-40">
      <a href="#" aria-label="LinkedIn" className={base}><Linkedin className="w-4 h-4" /></a>
      <a href="#" aria-label="Facebook" className={base}><Facebook className="w-4 h-4" /></a>
      <a href="#" aria-label="Instagram" className={base}><Instagram className="w-4 h-4" /></a>
      <a href="#" aria-label="Twitter" className={base}><Twitter className="w-4 h-4" /></a>
    </div>
  );
}

// Break a string into words for staggered animations
const Words = ({ text, className = "" }) => {
  const words = useMemo(() => text.split(" "), [text]);
  const wordVariants = {
    initial: { y: 12, opacity: 0 },
    animate: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.06, duration: 0.5 } }),
    exit: (i) => ({ y: -10, opacity: 0, transition: { delay: (words.length - 1 - i) * 0.06, duration: 0.35 } }), // reverse order
  };
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          custom={i}
          variants={wordVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mr-2"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
};

const RotatingSubtitle = ({ items }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 3000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="h-8 md:h-10 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={idx} className="inline-block"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}>
          <Words text={items[idx]} className="text-blue-200" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function HeroSection() {
  const subtitles = [
    "With a Practical Plan",
    "Expand Internationally",
    "Unlock New Revenue Streams",
  ];

  return (
    <section className="relative overflow-hidden">
      <Navbar/>
      {/* Sticky Social Rail */}
      <SocialRail />

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1B4B] via-[#6A1B2B] to-[#0B1B40]" />
        <img
          alt="texture"
          src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1600&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity"
        />
        {/* soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.06),transparent_45%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20  grid lg:grid-cols-2 gap-12 items-center text-white">
        {/* Copy */}
        <div>
          <p className="text-sm md:text-base text-blue-200/90 font-semibold tracking-wide">Attention: SMEs & Service Providers</p>

          {/* Animated Title */}
          <div className="mt-4">
            <motion.h1
              className="text-4xl md:text-6xl leading-tight font-extrabold"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.span
                className="block"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
              >
                <span className="text-white">Scale Beyond</span>
              </motion.span>
              <motion.span
                className="block"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
              >
                <span className="text-blue-200">Borders</span>
              </motion.span>
            </motion.h1>

            {/* Rotating subtitle with reverse fade order */}
            <div className="mt-3 text-xl md:text-2xl font-semibold">
              <RotatingSubtitle items={subtitles} />
            </div>
          </div>

          {/* Description */}
          <p className="mt-6 text-lg text-white/85 max-w-2xl">
            I help SMEs break barriers, expand internationally, and unlock new revenue streams through practical, results‑oriented strategies that deliver measurable outcomes.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-[#6A1B2B] text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition">
              Schedule a Free Call <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#programs" className="inline-flex items-center rounded-2xl border border-[#6A1B2B]/50 px-6 py-3 font-semibold hover:bg-[rgba(106,27,43,0.15)] transition">
              Explore Programs
            </a>
          </div>
        </div>

        {/* Photo / Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-tr from-[#6A1B2B]/30 to-[#0A1B4B]/20 blur-3xl rounded-[2.5rem]" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-[#6A1B2B]/25 bg-[rgba(10,27,75,0.20)]">
            <img
                  src="/najim.jpeg"
              alt="Coach portrait placeholder"
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
