"use client";

import { useEffect, useState } from "react";
import { company } from "@/lib/company";
import Logo from "@/components/Logo";
import { useLanguage } from "@/components/LanguageProvider";

const links = [
  { href: "#about", id: "about", en: "About", ja: "会社概要" },
  { href: "#demand", id: "demand", en: "Market", ja: "市場動向" },
  { href: "#technology", id: "technology", en: "Technology", ja: "技術" },
  { href: "#proof", id: "proof", en: "Track record", ja: "実証実績" },
  {
    href: "#applications",
    id: "applications",
    en: "Applications",
    ja: "活用事例",
  },
  { href: "#projects", id: "projects", en: "Projects", ja: "プロジェクト" },
  { href: "#leadership", id: "leadership", en: "Leadership", ja: "経営陣" },
];

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const contactLabel = lang === "ja" ? "お問い合わせ" : "Contact";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-ink text-[11px] tracking-wide text-white/70 sm:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-5 sm:px-8">
          <span>
            {company.hq.labelJa} · {company.hq.label}
          </span>
          <span className="hidden md:inline">
            {lang === "ja"
              ? "水素エネルギーソリューション · Hydrogen Energy Solutions"
              : "Hydrogen Energy Solutions · 水素エネルギー"}
          </span>
        </div>
      </div>

      <div
        className={`relative border-b border-line bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Logo size={38} className="text-ink" />
            <span className="leading-tight">
              <span className="block text-[15px] font-semibold tracking-tight text-ink">
                {lang === "ja" ? company.legalNameJa : company.name}
              </span>
              <span className="block text-[10px] tracking-[0.2em] text-ink/50">
                {lang === "ja" ? company.name : company.legalNameJa}
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 xl:flex">
            {links.map((l) => {
              const isActive = activeId === l.id;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative py-1 text-[13px] transition-colors ${
                      isActive
                        ? "font-medium text-teal"
                        : "text-ink/70 hover:text-teal"
                    }`}
                  >
                    {l[lang]}
                    {isActive && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-teal" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            {/* EN / JP Segmented Toggle */}
            <div
              role="group"
              aria-label="Language selector"
              className="inline-flex items-center border border-line bg-mist p-0.5 text-[11px] font-medium"
            >
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={`px-2.5 py-1 transition ${
                  lang === "en"
                    ? "bg-ink text-white"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("ja")}
                aria-pressed={lang === "ja"}
                className={`px-2.5 py-1 transition ${
                  lang === "ja"
                    ? "bg-ink text-white"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                日本語
              </button>
            </div>

            <a
              href="#contact"
              className="hidden bg-teal px-6 py-2.5 text-[13px] font-medium text-white transition hover:bg-leaf sm:inline-block"
            >
              {contactLabel}
            </a>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center text-ink xl:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Scroll progress bar */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-teal transition-[width] duration-75"
          style={{ width: `${progress}%` }}
          aria-hidden
        />

        {open && (
          <div className="border-t border-line bg-white px-5 pb-6 pt-2 xl:hidden">
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-line py-3.5 text-sm ${
                      activeId === l.id
                        ? "font-medium text-teal"
                        : "text-ink/80"
                    }`}
                  >
                    {l[lang]}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-5 block bg-teal py-3 text-center text-sm font-medium text-white transition hover:bg-leaf"
            >
              {contactLabel}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
