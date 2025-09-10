"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string; // e.g. "max-w-3xl"
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-3xl",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      aria-modal
      role="dialog"
    >
      <div
        className={`w-full ${maxWidth} rounded-2xl overflow-hidden border border-white/15 bg-[var(--brand-blue)] text-white shadow-2xl`}
      >
        <div className="flex items-center justify-between px-5 py-3 bg-[var(--brand-burgundy)]/30 border-b border-white/10">
          <h3 className="font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
