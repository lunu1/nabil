"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe, BarChart3, Building2, DollarSign, Users2, TrendingUp, Map, Gauge, Target, ArrowRight } from "lucide-react";

/**
 * SERVICES SECTION – International Business Growth Coach
 * Palette only: Blue (#0A1B4B/#0B1B40) & Burgundy (#6A1B2B)
 * - Animated entrance (staggered)
 * - 5 primary service cards matching your expertise
 * - CTA banner at the bottom
 */

const SERVICES = [
  {
    icon: TrendingUp,
    title: "Strategic Planning & Business Development",
    desc: "Clarify positioning, sharpen your offer, and turn strategy into a practical, measurable execution plan.",
    bullets: ["ICP & value proposition", "90-day action plan", "Revenue roadmap"],
  },
  {
    icon: Globe,
    title: "International Market Expansion",
    desc: "Evaluate readiness, select target markets, and execute entry with partners, pricing, and local adaptation.",
    bullets: ["Market selection", "Entry strategy", "Local GTM playbooks"],
  },
  {
    icon: Building2,
    title: "Distributor Network Management",
    desc: "Build and optimize distributor/partner networks for FMCG & HORECA with clear scorecards and incentives.",
    bullets: ["Partner mapping", "Onboarding & SLAs", "Performance scorecards"],
  },
  {
    icon: DollarSign,
    title: "Full P&L Ownership & Profitability",
    desc: "Drive sustainable margins with pricing architecture, mix optimization, and cost control.",
    bullets: ["Pricing & terms", "Margin improvement", "Cost-to-serve control"],
  },
  {
    icon: Users2,
    title: "Leading Cross‑Functional Teams",
    desc: "Install operating cadence, dashboards, and accountability to scale leaders and teams.",
    bullets: ["Weekly cadence", "KPI dashboards", "Hiring guidance"],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 text-white overflow-hidden">
      {/* Background: brand gradient + soft texture */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1B4B] via-[#0B1B40] to-[#6A1B2B] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.07),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.06),transparent_45%)]" />
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
            What I help with
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="mt-3 text-3xl md:text-4xl font-bold"
          >
            Services to Scale Beyond Borders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="mt-4 text-white/85"
          >
            Practical, results‑oriented support to expand internationally and grow profitably.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className="group rounded-3xl border border-[#6A1B2B]/30 bg-[rgba(10,27,75,0.20)] p-7 shadow-xl hover:shadow-2xl hover:bg-[rgba(10,27,75,0.30)] transition"
            >
              <div className="flex items-start gap-4">
                <span className="inline-grid place-content-center w-11 h-11 rounded-2xl bg-[#6A1B2B] text-white/95 border border-[#6A1B2B]/50 shadow">
                  <s.icon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-white/80">{s.desc}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-white/80">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-blue-200/90" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#6A1B2B]/60 px-4 py-2 font-semibold hover:bg-[#6A1B2B]/20 transition">
                Book a discovery call <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mt-12 rounded-3xl border border-[#6A1B2B]/30 bg-[rgba(10,27,75,0.30)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        >
          <div>
            <h3 className="text-xl font-semibold">Not sure which service fits?</h3>
            <p className="text-white/80">Get a quick assessment and a 90‑day action plan you can execute immediately.</p>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-[#6A1B2B] text-white px-5 py-2.5 font-semibold shadow-lg hover:shadow-xl transition">
            Book a free discovery call <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
