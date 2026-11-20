"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type ModeKey = "day" | "night" | "summer" | "winter";

const MODES: {
  key: ModeKey;
  en: { label: string; summary: string };
  ja: { label: string; summary: string };
  activeNodes: string[];
  activePaths: string[];
}[] = [
  {
    key: "day",
    en: {
      label: "Daytime",
      summary: "Solar charges batteries and runs the electrolyser",
    },
    ja: {
      label: "日中",
      summary: "太陽光で蓄電池を充電し、水電解装置で水素を製造",
    },
    activeNodes: ["solar", "battery", "electrolyser", "mh", "building"],
    activePaths: ["solar-battery", "solar-electro", "electro-mh"],
  },
  {
    key: "night",
    en: {
      label: "Night",
      summary: "Batteries and fuel cells keep buildings powered",
    },
    ja: {
      label: "夜間",
      summary: "蓄電池と燃料電池が建物へ安定して電力を供給",
    },
    activeNodes: ["battery", "mh", "fuelcell", "building"],
    activePaths: ["mh-fc", "fc-battery", "fc-building"],
  },
  {
    key: "summer",
    en: {
      label: "Spring – Summer",
      summary: "Surplus renewable power is stored long-term as hydrogen",
    },
    ja: {
      label: "春〜夏",
      summary: "余剰の再エネ電力を水素として長期貯蔵",
    },
    activeNodes: ["solar", "electrolyser", "mh"],
    activePaths: ["solar-electro", "electro-mh"],
  },
  {
    key: "winter",
    en: {
      label: "Autumn – Winter",
      summary: "Fuel cells generate power and heat from stored hydrogen",
    },
    ja: {
      label: "秋〜冬",
      summary: "貯蔵した水素から燃料電池で電力と熱を生成",
    },
    activeNodes: ["mh", "fuelcell", "building"],
    activePaths: ["mh-fc", "fc-building"],
  },
];

const SYSTEM_NODES = [
  { id: "solar", x: 40, y: 90, w: 180, en: "Solar power", ja: "太陽光発電" },
  { id: "battery", x: 300, y: 90, w: 180, en: "Battery", ja: "蓄電池" },
  {
    id: "electrolyser",
    x: 40,
    y: 210,
    w: 130,
    en: "Electrolyser",
    ja: "水電解装置",
  },
  { id: "mh", x: 195, y: 210, w: 130, en: "MH tank", ja: "MHタンク" },
  { id: "fuelcell", x: 350, y: 210, w: 130, en: "Fuel cell", ja: "燃料電池" },
] as const;

export default function SmartEnergyDiagram() {
  const { lang } = useLanguage();
  const isJa = lang === "ja";
  const [modeKey, setModeKey] = useState<ModeKey>("day");
  const mode = MODES.find((m) => m.key === modeKey)!;
  const currentMode = mode[lang];

  const isNodeActive = (id: string) => mode.activeNodes.includes(id);
  const isPathActive = (id: string) => mode.activePaths.includes(id);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <div className="mb-5 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em]">
          <span className="text-ink/35">08</span>
          <span className="h-px w-10 bg-ink/20" />
          <span className="text-teal">
            {isJa ? "スマートエネルギー" : "Smart energy"}
          </span>
        </div>
        <h2 className="text-balance text-3xl font-medium leading-[1.2] tracking-tight text-ink sm:text-[2.5rem]">
          {isJa
            ? "ゼロエミッション地域を支えるAIエネルギー管理"
            : "AI-managed energy for zero-emission communities"}
        </h2>
        <p className="mt-6 text-base leading-8 text-ink/65 sm:text-[17px]">
          {isJa
            ? "太陽光発電、蓄電池、そして水素がひとつのシステムとして連携します。AIエネルギー管理システムが需給を予測し、昼夜および季節間のバランスを最適化。夏の余剰電力を水素として貯蔵し、冬に電力として取り出します。"
            : "Solar power, batteries and hydrogen work as one system. An energy management system predicts supply and demand to balance use between day and night and across seasons: surplus summer power is stored as hydrogen and returned as electricity in winter."}
        </p>

        {/* Interactive mode selector */}
        <ul className="mt-8 space-y-2.5">
          {MODES.map((m) => {
            const active = m.key === modeKey;
            const copy = m[lang];
            return (
              <li key={m.key}>
                <button
                  type="button"
                  onClick={() => setModeKey(m.key)}
                  className={`flex w-full items-start gap-3 border px-4 py-3 text-left text-[15px] transition ${
                    active
                      ? "border-teal bg-white text-ink shadow-xs"
                      : "border-transparent bg-transparent text-ink/65 hover:border-line hover:bg-white/60"
                  }`}
                >
                  <span
                    className={`mt-2.5 h-px w-4 shrink-0 transition-colors ${
                      active ? "bg-teal" : "bg-ink/25"
                    }`}
                  />
                  <span>
                    <strong className="font-medium text-ink">
                      {copy.label}
                      {isJa ? "：" : ":"}
                    </strong>{" "}
                    {copy.summary}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border border-line bg-ink p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-leaf">
            {isJa
              ? `稼働モード · ${currentMode.label}`
              : `Live Mode · ${currentMode.label}`}
          </span>
          <span className="text-xs text-white/45">
            {isJa ? "サイクルを選択して確認" : "Select a cycle to inspect"}
          </span>
        </div>

        <svg
          viewBox="0 0 520 330"
          className="w-full"
          role="img"
          aria-label={
            isJa
              ? `${currentMode.label}のスマートエネルギーフロー：${currentMode.summary}`
              : `Smart energy flow during ${currentMode.label}: ${currentMode.summary}`
          }
        >
          <defs>
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10z" fill="#2f9e6f" />
            </marker>
            <marker
              id="arrow-idle"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10z" fill="#ffffff" fillOpacity="0.2" />
            </marker>
          </defs>

          {/* AI Controller */}
          <rect x="165" y="12" width="190" height="40" fill="#0e6b5c" />
          <text
            x="260"
            y="37"
            textAnchor="middle"
            fill="#fff"
            fontSize="13.5"
            fontWeight="500"
          >
            {isJa ? "AIエネルギー管理" : "AI Energy Management"}
          </text>
          <path
            d="M260 52v36M130 52v36M390 52v36"
            stroke="#2f9e6f"
            strokeOpacity=".45"
            strokeDasharray="3 4"
            fill="none"
          />

          {/* System Nodes */}
          {SYSTEM_NODES.map((n) => {
            const on = isNodeActive(n.id);
            return (
              <g key={n.id} className="transition-opacity duration-300">
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height="46"
                  fill={on ? "#2f9e6f" : "#ffffff"}
                  fillOpacity={on ? "0.18" : "0.04"}
                  stroke={on ? "#2f9e6f" : "#ffffff"}
                  strokeOpacity={on ? "0.9" : "0.18"}
                  strokeWidth={on ? "1.5" : "1"}
                />
                <text
                  x={n.x + n.w / 2}
                  y={n.y + 28}
                  textAnchor="middle"
                  fill="#fff"
                  fillOpacity={on ? "1" : "0.45"}
                  fontSize="14"
                  fontWeight={on ? "500" : "400"}
                >
                  {n[lang]}
                </text>
              </g>
            );
          })}

          {/* Flow Paths */}
          {[
            { id: "solar-battery", d: "M220 113h78" },
            { id: "solar-electro", d: "M105 136v72" },
            { id: "electro-mh", d: "M170 233h23" },
            { id: "mh-fc", d: "M325 233h23" },
            { id: "fc-battery", d: "M415 210v-62" },
            { id: "fc-building", d: "M415 256v48h-53" },
          ].map((p) => {
            const on = isPathActive(p.id);
            return (
              <path
                key={p.id}
                d={p.d}
                fill="none"
                stroke={on ? "#2f9e6f" : "#ffffff"}
                strokeOpacity={on ? "1" : "0.18"}
                strokeWidth={on ? "2" : "1.25"}
                className={on ? "flow-line" : ""}
                markerEnd={on ? "url(#arrow-active)" : "url(#arrow-idle)"}
              />
            );
          })}

          {/* Building Output */}
          <rect
            x="160"
            y="285"
            width="200"
            height="38"
            fill={isNodeActive("building") ? "#2f9e6f" : "#ffffff"}
            fillOpacity={isNodeActive("building") ? "1" : "0.1"}
          />
          <text
            x="260"
            y="309"
            textAnchor="middle"
            fill="#fff"
            fillOpacity={isNodeActive("building") ? "1" : "0.5"}
            fontSize="14"
            fontWeight="500"
          >
            {isJa ? "ゼロエミッション建築" : "Zero-emission building"}
          </text>
        </svg>
      </div>
    </div>
  );
}
