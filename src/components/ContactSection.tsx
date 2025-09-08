"use client";

import { useState } from "react";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Building2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  // honeypot
  website?: string;
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    website: "", // honeypot (kept hidden)
  });
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.message.trim() || form.message.trim().length < 10) return "Message is too short.";
    // honeypot (bots fill this)
    if (form.website && form.website.length > 0) return "Spam detected.";
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setOk(true);
      setForm({ name: "", email: "", company: "", phone: "", message: "", website: "" });
    } catch (err: any) {
      setError(err.message || "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden text-white">
      {/* Brand background */}
      <div className="absolute inset-0 -z-10 bg-[#0A0F2D] " />
      <div className="absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(ellipse_at_20%_20%,rgba(10,27,75,0.18),transparent_45%),radial-gradient(ellipse_at_80%_60%,rgba(106,27,43,0.15),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: intro / contact info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Let’s talk growth</h2>
            <p className="mt-3 text-white/90">
              Tell me about your goals. I’ll reply with next steps and a plan
              to help you grow **exponentially** with smart, practical moves.
            </p>

            <div className="mt-8 space-y-3 text-white/90">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <a href="mailto:hello@example.com" className="hover:underline">
                  hello@example.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <a href="tel:+0000000000" className="hover:underline">
                  +00 000 0000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5" />
                <span>Dubai • Riyadh • Cairo (remote worldwide)</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={submit}
            className="rounded-3xl border border-[#6A1B2B]/40 bg-[rgba(10,27,75,0.28)] backdrop-blur-sm p-6 md:p-8 shadow"
          >
            {/* honeypot (hidden) */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={onChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/80">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="mt-1 w-full h-11 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3 outline-none focus:ring-2 focus:ring-[#6A1B2B]/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/80">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="mt-1 w-full h-11 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3 outline-none focus:ring-2 focus:ring-[#6A1B2B]/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/80">Company (optional)</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  className="mt-1 w-full h-11 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3 outline-none focus:ring-2 focus:ring-[#6A1B2B]/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/80">Phone (optional)</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="mt-1 w-full h-11 rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3 outline-none focus:ring-2 focus:ring-[#6A1B2B]/30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-white/80">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  required
                  className="mt-1 w-full rounded-xl bg-[rgba(10,27,75,0.25)] border border-[#6A1B2B]/40 px-3 py-2 outline-none focus:ring-2 focus:ring-[#6A1B2B]/30"
                />
              </div>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-200">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            {ok && !error && (
              <div className="mt-4 flex items-center gap-2 text-emerald-200">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">Thanks! Your message has been sent.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6A1B2B] text-white px-5 h-11 font-semibold shadow hover:shadow-lg disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
