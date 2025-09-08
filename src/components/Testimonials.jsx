"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

/**
 * TESTIMONIALS – Blue & Burgundy
 * - Animated grid (staggered fade/slide)
 * - Brand-only palette
 * - Clean, professional cards
 */

const TESTIMONIALS = [
  {
    quote:
      "Within 90 days we doubled qualified leads and hired our first PM. The plan was practical and easy to execute.",
    name: "Layla K.",
    role: "Founder, SaaS Services",
    result: "2x leads in 90 days",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    quote:
      "Entered two new GCC markets with a distributor playbook that saved months of trial and error.",
    name: "Hassan A.",
    role: "GM, FMCG Distributor",
    result: "+2 markets in 6 months",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    quote:
      "Pricing architecture increased our gross margin by 7%. The dashboards keep the team focused on the right KPIs.",
    name: "Sara M.",
    role: "Commercial Director, HORECA",
    result: "+7% margin",
    avatar: "https://i.pravatar.cc/100?img=13",
  },
  {
    quote:
      "Our sales cadence and hiring pipeline finally clicked. We operate with clarity and accountability.",
    name: "Omar R.",
    role: "Managing Director, B2B Services",
    result: "Ops cadence in 4 weeks",
    avatar: "https://i.pravatar.cc/100?img=14",
  },
  {
    quote:
      "We moved from ideas to action with a 90‑day plan and weekly execution. Revenue is trending up and predictable.",
    name: "Noura S.",
    role: "CEO, Agency",
    result: "+28% QoQ revenue",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    quote:
      "Market selection and partner scorecards de‑risked expansion. We closed our first European distributor.",
    name: "Karim D.",
    role: "Head of Growth, FMCG",
    result: "1st EU distributor",
    avatar: "https://i.pravatar.cc/100?img=16",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-20 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* // bg-gradient-to-tr from-[#0A1B4B] via-[#0B1B40] to-[#6A1B2B] */}
        <div className="absolute inset-0 bg-[#0A0F2D]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(10,27,75,0.18),transparent_45%),radial-gradient(ellipse_at_80%_60%,rgba(106,27,43,0.15),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="text-blue-200/90 font-semibold tracking-wide"
          >
            Client Results
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="mt-3 text-3xl md:text-4xl font-bold"
          >
            Testimonials
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="mt-4 text-white/90"
          >
            Real stories from SMEs and commercial leaders who implemented the plan.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="group rounded-3xl p-[1px] bg-gradient-to-tr from-[#6A1B2B]/50 to-[#0A1B4B]/50 shadow-2xl"
            >
              <div className="rounded-3xl h-full border border-[#6A1B2B]/35 bg-[rgba(10,27,75,0.22)] p-7">
                <Quote className="w-6 h-6 text-blue-200/90" />
                <blockquote className="mt-3 text-white/90 leading-relaxed">{`“${t.quote}”`}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full ring-2 ring-[#0A1B4B]" />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-white/75">{t.role}</div>
                  </div>
                  <span className="ml-auto inline-flex items-center text-xs px-2 py-1 rounded-full border border-[#6A1B2B]/60 bg-[#6A1B2B]/20 text-white/90">
                    {t.result}
                  </span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>

        {/* Marquee strip (optional) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="mt-12 rounded-2xl border border-[#6A1B2B]/30 bg-[rgba(10,27,75,0.25)] p-4 overflow-hidden"
        >
          <div className="flex gap-6 animate-[marquee_28s_linear_infinite] whitespace-nowrap">
            {TESTIMONIALS.concat(TESTIMONIALS).map((t, idx) => (
              <span key={idx} className="inline-flex items-center gap-2 text-sm text-white/85">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6A1B2B] inline-block" />
                {t.result}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* marquee keyframes */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
