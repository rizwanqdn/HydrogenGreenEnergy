"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { company } from "@/lib/company";
import { useLanguage } from "@/components/LanguageProvider";

const heroStats = [
  {
    value: "$97B",
    en: "Japan's planned hydrogen infrastructure investment over 15 years",
    ja: "日本が15年間で計画する水素インフラ投資額",
  },
  {
    value: "12 Mt",
    en: "Japan's annual hydrogen demand target by 2040, domestic and imported",
    ja: "2040年の日本の年間水素需要目標（国内・輸入）",
  },
  {
    value: "~100 Mt",
    en: "Global hydrogen demand today",
    ja: "現在の世界の水素需要",
  },
  {
    value: "<10%",
    en: "Share of global demand that is low-emissions",
    ja: "世界需要に占める低排出水素の割合",
  },
];

export default function HeroSection() {
  const { lang } = useLanguage();
  const isJa = lang === "ja";

  return (
    <section className="bg-hero-glow bg-white pt-24 sm:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-12 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-teal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
              </span>
              <span className="h-px w-8 bg-teal" />
              {isJa
                ? "水素エネルギーソリューション · Hydrogen Energy Solutions"
                : "Hydrogen Energy Solutions · 水素エネルギー"}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-balance text-4xl font-medium leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              {isJa
                ? "日本の水素技術を、世界へ。"
                : "Japanese hydrogen technology, delivered to the world."}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-base leading-8 text-ink/65 sm:text-lg">
              {isJa
                ? `${company.legalNameJa}は、再生可能エネルギーによるグリーン水素の製造から、安全な固体貯蔵・輸送、地域での利活用まで一貫したシステムを日本で開発し、世界中の政府・産業界へ提供しています。`
                : `${company.name} develops safe, practical green hydrogen systems in Japan, from renewable production and solid-state storage to transport and local use, and delivers them to governments and industry around the world.`}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="bg-teal px-9 py-4 text-center text-sm font-medium tracking-wide text-white shadow-sm shadow-teal/20 transition hover:bg-leaf"
              >
                {isJa ? "お問い合わせ" : "Contact us"}
              </a>
              <a
                href="#technology"
                className="border border-ink/25 px-9 py-4 text-center text-sm font-medium tracking-wide text-ink transition hover:border-teal hover:text-teal"
              >
                {isJa ? "技術を見る" : "Our technology"}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-6">
          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden">
              <Image
                src="/images/hero-storage-tanks.jpg"
                alt={
                  isJa
                    ? "風力タービンと太陽光パネルの隣に設置された水素貯蔵タンク"
                    : "Hydrogen storage tanks beside wind turbines and solar panels"
                }
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-0 max-w-[16rem] bg-ink p-5 text-white shadow-xl sm:-left-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-leaf">
                金属水素化物 · Metal hydride
              </p>
              <p className="mt-1.5 font-medium">
                {isJa
                  ? "安全でコンパクトな水素貯蔵"
                  : "Safe, compact hydrogen storage"}
              </p>
              <p className="mt-1 text-xs leading-5 text-white/60">
                {isJa
                  ? "水素の輸送と利活用を実用化する固体貯蔵技術。"
                  : "Solid-state storage that makes hydrogen practical to ship and use."}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="border-y border-line bg-mist">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {heroStats.map((s, i) => (
            <div
              key={s.value}
              className={`px-5 py-8 sm:px-8 ${i > 0 ? "lg:border-l lg:border-line" : ""} ${i % 2 === 1 ? "border-l border-line lg:border-l" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
            >
              <dt className="text-3xl font-medium tracking-tight tabular-nums text-ink sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-2 text-[13px] leading-5 text-ink/55">
                {s[lang]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
