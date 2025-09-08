"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * ABOUT (Minimal) – Picture + Description Only
 * Palette: Blue (#0A1B4B/#0B1B40) & Burgundy (#6A1B2B)
 * Animations: soft reveal, parallax float on image, subtle glow pulse
 */

const wrapper = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutMinimal() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#0A0F2D] text-white">
      {/* Background gradient (brand only) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1B4B] via-[#0B1B40] to-[#6A1B2B] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(10,27,75,0.22),transparent_40%),radial-gradient(ellipse_at_85%_60%,rgba(106,27,43,0.18),transparent_45%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* IMAGE */}
          <div className="lg:col-span-5 relative">
            {/* Glow blob */}
            <motion.div
              initial={{ opacity: 0.6, scale: 0.9 }}
              animate={{ opacity: 0.9, scale: 1.03 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-tr from-[#6A1B2B]/35 to-[#0A1B4B]/30 blur-3xl"
            />

            {/* Frame */}
            <motion.div
              variants={wrapper}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ y: -4 }}
              className="relative rounded-[2rem] border border-[#6A1B2B]/35 bg-[rgba(10,27,75,0.25)] shadow-2xl overflow-hidden"
            >
              <img
                src="/najim.jpeg"
                alt="Portrait of Nabil Najem"
                className="w-full h-[520px] object-cover"
              />
            </motion.div>
          </div>

          {/* DESCRIPTION */}
          <div className="lg:col-span-7">
            <motion.div
              variants={wrapper}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-3xl border border-[#6A1B2B]/35 bg-[rgba(10,27,75,0.22)] p-6 md:p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold">About</h2>
              <p className="mt-3 text-white/85">
                I help SMEs break barriers, expand internationally, and unlock new revenue streams. As an International Business Growth Coach, I focus on practical, results‑oriented strategies that deliver measurable outcomes, whether it’s profit improvement, market expansion, or sustainable growth. Often, small tweaks can drive big transformations, and I specialize in turning those into visible results.
              </p>
              <p className="mt-4 text-white/85">
                With 25+ years of experience across Hospitality, FMCG, B2B, and HORECA sectors, I’ve worked throughout the GCC, Levant, Africa, Asia, and Europe, helping businesses to grow and navigate complexity, optimize commercial operations, and achieve multimillion‑dollar growth. I’m passionate about aligning global vision with local execution so strategies deliver impact on the ground.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
