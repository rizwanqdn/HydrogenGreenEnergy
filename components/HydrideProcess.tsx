"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const PROCESS_STEPS = [
  {
    n: "01",
    en: {
      title: "Absorb",
      badge: "Charging · < 10 atm",
      metric: "1/1000 gas volume",
      text: "Hydrogen is pumped into a tank of metal alloy such as iron-titanium or lanthanum-nickel. Molecules split and settle inside the metal lattice; the heat released is cooled away during filling.",
    },
    ja: {
      title: "吸蔵（貯蔵）",
      badge: "充填 · 10気圧未満",
      metric: "気体体積の1/1000以下",
      text: "鉄チタンやランタンニッケルなどの水素吸蔵合金タンクへ水素を送り込みます。水素分子が金属格子内に安定して取り込まれ、発生する熱は充填時に冷却されます。",
    },
  },
  {
    n: "02",
    en: {
      title: "Transport",
      badge: "Solid-State Logistics",
      metric: "Ambient temp · No boil-off",
      text: "Bound inside solid alloy, hydrogen travels at low pressure in standard-format containers on trucks, trains and ships, with no cryogenic carriers required.",
    },
    ja: {
      title: "輸送",
      badge: "固体状態でのコンテナ輸送",
      metric: "常温・ボイルオフなし",
      text: "固体合金内に結合した水素は、極低温輸送船を必要とせず、標準コンテナ形式でトラック・鉄道・船舶により低圧・安全に長距離輸送できます。",
    },
  },
  {
    n: "03",
    en: {
      title: "Release",
      badge: "Gentle Thermal Desorption",
      metric: "Steady pure H₂ flow",
      text: "At the destination, gentle heating breaks the bond and releases pure hydrogen on demand at steady pressure. Fuel-cell waste heat can drive the process.",
    },
    ja: {
      title: "放出",
      badge: "低温加熱による脱離",
      metric: "安定した高純度H₂供給",
      text: "利用先で穏やかに加熱することで結合が解け、必要な時に安定した圧力で高純度水素を取り出せます。燃料電池の排熱を活用することも可能です。",
    },
  },
  {
    n: "04",
    en: {
      title: "Power",
      badge: "Zero-Emission Output",
      metric: "Electricity + Heat + H₂O",
      text: "Hydrogen feeds a fuel cell that combines it with oxygen from the air to produce clean electricity, usable heat and water for vehicles, microgrids and industry.",
    },
    ja: {
      title: "発電・利用",
      badge: "ゼロエミッション出力",
      metric: "電力 ＋ 熱 ＋ 水（H₂O）",
      text: "取り出した水素を燃料電池へ供給し、空気中の酸素と反応させてクリーンな電力・熱・水を生成。車両、マイクログリッド、産業設備へ供給します。",
    },
  },
] as const;

export default function HydrideProcess() {
  const { lang } = useLanguage();
  const isJa = lang === "ja";
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 5200);
    return () => clearInterval(id);
  }, [playing]);

  const step = PROCESS_STEPS[active];
  const current = step[lang];

  return (
    <div className="mt-12 border border-white/10 bg-white/[0.02]">
      {/* Interactive Visual Stage */}
      <div className="grid border-b border-white/10 lg:grid-cols-12">
        <div className="relative overflow-hidden bg-navy/40 p-6 sm:p-10 lg:col-span-7">
          <div className="bg-tech-grid pointer-events-none absolute inset-0 opacity-30" />

          {/* Stage top bar */}
          <div className="relative z-10 mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-leaf animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-leaf">
                {isJa ? `工程 ${step.n}` : `Stage ${step.n}`} · {current.badge}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="border border-white/15 bg-ink/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/70 transition hover:border-leaf hover:text-white"
            >
              {playing
                ? isJa
                  ? "一時停止"
                  : "Pause"
                : isJa
                  ? "自動再生"
                  : "Auto-play"}
            </button>
          </div>

          {/* Animated SVG Schematic */}
          <div className="relative z-10 flex min-h-[240px] items-center justify-center sm:min-h-[270px]">
            <svg
              viewBox="0 0 560 240"
              className="w-full max-w-[560px]"
              role="img"
              aria-label={`Process animation: ${current.title}`}
            >
              <defs>
                <marker
                  id="proc-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M0 0L10 5L0 10z" fill="#2f9e6f" />
                </marker>
                <linearGradient id="heatGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* STAGE 0: ABSORB */}
              {active === 0 && (
                <g className="process-fade">
                  <rect
                    x="20"
                    y="68"
                    width="124"
                    height="104"
                    fill="#0b1f33"
                    stroke="#2f9e6f"
                    strokeOpacity="0.55"
                  />
                  <text
                    x="82"
                    y="112"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="13"
                    fontWeight="500"
                  >
                    {isJa ? "グリーン水素" : "Green H₂"}
                  </text>
                  <text
                    x="82"
                    y="132"
                    textAnchor="middle"
                    fill="#2f9e6f"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    &lt; 10 atm
                  </text>

                  <path
                    d="M144 120h88"
                    stroke="#2f9e6f"
                    strokeWidth="2"
                    className="flow-line"
                    markerEnd="url(#proc-arrow)"
                  />
                  <text
                    x="188"
                    y="108"
                    textAnchor="middle"
                    fill="#ffffff"
                    fillOpacity="0.65"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {isJa ? "水素充填" : "H₂ in"}
                  </text>

                  <rect
                    x="244"
                    y="40"
                    width="210"
                    height="160"
                    rx="4"
                    fill="#0b1f33"
                    stroke="#2f9e6f"
                    strokeWidth="1.5"
                  />
                  <text
                    x="349"
                    y="64"
                    textAnchor="middle"
                    fill="#ffffff"
                    fillOpacity="0.85"
                    fontSize="12"
                  >
                    {isJa
                      ? "水素吸蔵合金 (FeTi / LaNi₅)"
                      : "Metal Alloy Lattice (FeTi / LaNi₅)"}
                  </text>

                  {[0, 1, 2, 3].map((col) =>
                    [0, 1, 2].map((row) => (
                      <g key={`${col}-${row}`}>
                        <circle
                          cx={286 + col * 42}
                          cy={94 + row * 36}
                          r="9"
                          fill="#12304a"
                          stroke="#ffffff"
                          strokeOpacity="0.3"
                        />
                        <circle
                          cx={286 + col * 42 + 19}
                          cy={94 + row * 36 + (row < 2 ? 18 : -18)}
                          r="4"
                          fill="#2f9e6f"
                          className="atom-pulse"
                          style={{
                            animationDelay: `${(col + row) * 180}ms`,
                          }}
                        />
                      </g>
                    )),
                  )}

                  <path
                    d="M466 95h56M466 145h56"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="flow-line"
                  />
                  <text
                    x="498"
                    y="124"
                    textAnchor="middle"
                    fill="#7dd3fc"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {isJa ? "冷却" : "Cooling"}
                  </text>
                </g>
              )}

              {/* STAGE 1: TRANSPORT */}
              {active === 1 && (
                <g className="process-fade">
                  <line
                    x1="28"
                    y1="172"
                    x2="532"
                    y2="172"
                    stroke="#ffffff"
                    strokeOpacity="0.2"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="28"
                    y1="172"
                    x2="532"
                    y2="172"
                    stroke="#2f9e6f"
                    strokeWidth="2"
                    className="flow-line"
                  />

                  <circle cx="48" cy="172" r="5" fill="#2f9e6f" />
                  <text
                    x="48"
                    y="196"
                    textAnchor="middle"
                    fill="#ffffff"
                    fillOpacity="0.65"
                    fontSize="11"
                  >
                    {isJa ? "製造拠点" : "Production Site"}
                  </text>
                  <circle cx="512" cy="172" r="5" fill="#2f9e6f" />
                  <text
                    x="512"
                    y="196"
                    textAnchor="middle"
                    fill="#ffffff"
                    fillOpacity="0.65"
                    fontSize="11"
                  >
                    {isJa ? "需要拠点" : "Demand Hub"}
                  </text>

                  <g className="container-glide">
                    <rect
                      x="185"
                      y="76"
                      width="190"
                      height="80"
                      rx="3"
                      fill="#0b1f33"
                      stroke="#2f9e6f"
                      strokeWidth="1.75"
                    />
                    {[210, 230, 250, 270, 290, 310, 330, 350].map((x) => (
                      <line
                        key={x}
                        x1={x}
                        y1="82"
                        x2={x}
                        y2="150"
                        stroke="#2f9e6f"
                        strokeOpacity="0.22"
                      />
                    ))}
                    <rect
                      x="212"
                      y="96"
                      width="136"
                      height="40"
                      fill="#0e6b5c"
                      fillOpacity="0.85"
                    />
                    <text
                      x="280"
                      y="114"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="600"
                    >
                      {isJa ? "MH ISOコンテナ" : "MH ISO CONTAINER"}
                    </text>
                    <text
                      x="280"
                      y="129"
                      textAnchor="middle"
                      fill="#ffffff"
                      fillOpacity="0.85"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {isJa
                        ? "固体 · 10気圧未満 · 常温"
                        : "SOLID · <10 ATM · AMBIENT"}
                    </text>
                  </g>

                  <text
                    x="280"
                    y="44"
                    textAnchor="middle"
                    fill="#2f9e6f"
                    fontSize="11"
                    fontFamily="monospace"
                    letterSpacing="2"
                  >
                    {isJa
                      ? "陸上 · 鉄道 · 海上輸送"
                      : "ROAD · RAIL · OCEAN FREIGHT"}
                  </text>
                </g>
              )}

              {/* STAGE 2: RELEASE */}
              {active === 2 && (
                <g className="process-fade">
                  <rect
                    x="110"
                    y="164"
                    width="180"
                    height="36"
                    fill="url(#heatGrad)"
                  />
                  <text
                    x="200"
                    y="214"
                    textAnchor="middle"
                    fill="#fbbf24"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {isJa
                      ? "穏やかな加熱（排熱利用可）"
                      : "Gentle Heat (Waste Heat Compatible)"}
                  </text>

                  {[145, 200, 255].map((x, idx) => (
                    <path
                      key={x}
                      d={`M${x} 196 q-6 -10 0 -20 t0 -20`}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="1.5"
                      className="heat-rise"
                      style={{ animationDelay: `${idx * 220}ms` }}
                    />
                  ))}

                  <rect
                    x="100"
                    y="48"
                    width="200"
                    height="116"
                    rx="4"
                    fill="#0b1f33"
                    stroke="#2f9e6f"
                    strokeWidth="1.5"
                  />
                  <text
                    x="200"
                    y="100"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="13"
                    fontWeight="500"
                  >
                    {isJa ? "金属水素化物タンク" : "Metal Hydride Tank"}
                  </text>
                  <text
                    x="200"
                    y="120"
                    textAnchor="middle"
                    fill="#2f9e6f"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {isJa ? "制御された水素放出" : "Controlled Desorption"}
                  </text>

                  <path
                    d="M300 106h105"
                    stroke="#2f9e6f"
                    strokeWidth="2.5"
                    className="flow-line"
                    markerEnd="url(#proc-arrow)"
                  />
                  <text
                    x="352"
                    y="92"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {isJa ? "99.99% 高純度H₂" : "99.99% Pure H₂"}
                  </text>

                  <rect
                    x="416"
                    y="68"
                    width="120"
                    height="76"
                    fill="#0e6b5c"
                    fillOpacity="0.25"
                    stroke="#2f9e6f"
                  />
                  <text
                    x="476"
                    y="102"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="500"
                  >
                    {isJa ? "オンデマンド" : "On-Demand"}
                  </text>
                  <text
                    x="476"
                    y="120"
                    textAnchor="middle"
                    fill="#2f9e6f"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {isJa ? "安定圧力供給" : "Steady Pressure"}
                  </text>
                </g>
              )}

              {/* STAGE 3: POWER */}
              {active === 3 && (
                <g className="process-fade">
                  <text
                    x="60"
                    y="88"
                    textAnchor="middle"
                    fill="#2f9e6f"
                    fontSize="12"
                    fontFamily="monospace"
                  >
                    {isJa ? "高純度H₂" : "Pure H₂"}
                  </text>
                  <path
                    d="M95 84h85"
                    stroke="#2f9e6f"
                    strokeWidth="2"
                    className="flow-line"
                    markerEnd="url(#proc-arrow)"
                  />

                  <text
                    x="60"
                    y="156"
                    textAnchor="middle"
                    fill="#7dd3fc"
                    fontSize="12"
                    fontFamily="monospace"
                  >
                    {isJa ? "空気 (O₂)" : "Air (O₂)"}
                  </text>
                  <path
                    d="M95 152h85"
                    stroke="#7dd3fc"
                    strokeWidth="2"
                    className="flow-line"
                    markerEnd="url(#proc-arrow)"
                  />

                  <rect
                    x="190"
                    y="54"
                    width="160"
                    height="132"
                    rx="4"
                    fill="#0b1f33"
                    stroke="#2f9e6f"
                    strokeWidth="2"
                  />
                  <rect
                    x="206"
                    y="70"
                    width="128"
                    height="100"
                    fill="#2f9e6f"
                    fillOpacity="0.14"
                  />
                  <text
                    x="270"
                    y="114"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="14"
                    fontWeight="600"
                  >
                    {isJa ? "燃料電池" : "Fuel Cell"}
                  </text>
                  <text
                    x="270"
                    y="134"
                    textAnchor="middle"
                    fill="#2f9e6f"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {isJa ? "CO₂排出ゼロ" : "Zero CO₂"}
                  </text>

                  <path
                    d="M350 84h75"
                    stroke="#2f9e6f"
                    strokeWidth="2"
                    className="flow-line"
                    markerEnd="url(#proc-arrow)"
                  />
                  <rect x="434" y="64" width="106" height="40" fill="#2f9e6f" />
                  <text
                    x="487"
                    y="88"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="500"
                  >
                    {isJa ? "電力" : "Electricity"}
                  </text>

                  <path
                    d="M350 120h75"
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                    className="flow-line"
                    markerEnd="url(#proc-arrow)"
                  />
                  <rect
                    x="434"
                    y="108"
                    width="106"
                    height="26"
                    fill="#ffffff"
                    fillOpacity="0.08"
                    stroke="#fbbf24"
                    strokeOpacity="0.5"
                  />
                  <text
                    x="487"
                    y="125"
                    textAnchor="middle"
                    fill="#fde68a"
                    fontSize="11"
                  >
                    {isJa ? "有効熱" : "Usable Heat"}
                  </text>

                  <path
                    d="M350 154h75"
                    stroke="#7dd3fc"
                    strokeWidth="1.5"
                    className="flow-line"
                    markerEnd="url(#proc-arrow)"
                  />
                  <rect
                    x="434"
                    y="142"
                    width="106"
                    height="26"
                    fill="#ffffff"
                    fillOpacity="0.08"
                    stroke="#7dd3fc"
                    strokeOpacity="0.5"
                  />
                  <text
                    x="487"
                    y="159"
                    textAnchor="middle"
                    fill="#bae6fd"
                    fontSize="11"
                  >
                    {isJa ? "純水 (H₂O)" : "Pure Water (H₂O)"}
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Synchronized Detail Panel */}
        <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-5">
          <div>
            <span className="font-mono text-sm text-leaf">{step.n} / 04</span>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl">
              {current.title}
            </h3>
            <p className="mt-4 text-[15px] leading-7 text-white/65">
              {current.text}
            </p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              {isJa ? "主な運用上の優位性" : "Key operational advantage"}
            </p>
            <p className="mt-1.5 font-mono text-sm text-leaf">
              {current.metric}
            </p>
          </div>
        </div>
      </div>

      {/* Step Selector Bar */}
      <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {PROCESS_STEPS.map((s, i) => {
          const isCurrent = i === active;
          const item = s[lang];
          return (
            <button
              key={s.n}
              type="button"
              onClick={() => {
                setActive(i);
                setPlaying(false);
              }}
              className={`group relative p-6 text-left transition ${
                isCurrent ? "bg-white/[0.06]" : "bg-ink hover:bg-white/[0.03]"
              }`}
            >
              <span
                className={`absolute inset-x-0 top-0 h-0.5 transition-all ${
                  isCurrent
                    ? "bg-leaf"
                    : "bg-transparent group-hover:bg-white/20"
                }`}
              />
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-xs ${
                    isCurrent ? "text-leaf" : "text-white/40"
                  }`}
                >
                  {s.n}
                </span>
                {isCurrent && (
                  <span className="text-[10px] uppercase tracking-widest text-leaf">
                    {isJa ? "表示中" : "Active"}
                  </span>
                )}
              </div>
              <div
                className={`mt-2 text-base font-medium ${
                  isCurrent ? "text-white" : "text-white/70"
                }`}
              >
                {item.title}
              </div>
              <p className="mt-1 text-xs text-white/45">{item.badge}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
