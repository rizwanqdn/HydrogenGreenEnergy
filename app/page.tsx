"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import InvestorForm from "@/components/InvestorForm";
import { company } from "@/lib/company";
import Logo from "@/components/Logo";
import HeroSection from "@/components/HeroSection";
import HydrideProcess from "@/components/HydrideProcess";
import SmartEnergyDiagram from "@/components/SmartEnergyDiagram";
import { useLanguage } from "@/components/LanguageProvider";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function Photo({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

function SectionHeader({
  index,
  eyebrow,
  title,
  children,
  dark = false,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal className="max-w-3xl">
      <div className="mb-5 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em]">
        <span className={dark ? "text-white/40" : "text-ink/35"}>{index}</span>
        <span className={`h-px w-10 ${dark ? "bg-white/25" : "bg-ink/20"}`} />
        <span className={dark ? "text-leaf" : "text-teal"}>{eyebrow}</span>
      </div>
      <h2
        className={`text-balance text-3xl font-medium leading-[1.2] tracking-tight sm:text-[2.5rem] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {children && (
        <p
          className={`mt-6 text-base leading-8 sm:text-[17px] ${dark ? "text-white/65" : "text-ink/65"}`}
        >
          {children}
        </p>
      )}
    </Reveal>
  );
}

const iconPaths: Record<string, ReactNode> = {
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />,
  cube: <path d="M12 3l9 5v8l-9 5-9-5V8l9-5zM12 12l9-4M12 12v9M12 12L3 8" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
};

function Icon({ name }: { name: keyof typeof iconPaths }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {iconPaths[name]}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bilingual Content                                                         */
/* -------------------------------------------------------------------------- */

const CONTENT = {
  en: {
    about: {
      eyebrow: "About us",
      title: "A Japanese hydrogen technology company serving the world",
      desc: "Based in Japan, where hydrogen is a national strategic priority, we provide the technology and infrastructure that connect renewable energy to the people and industries that use it, wherever our partners operate.",
      profile: [
        ["Company name", `${company.legalName} (${company.legalNameJa})`],
        ["Established", company.established],
        [
          "Business",
          "Green hydrogen production, storage, transportation and local-use infrastructure",
        ],
        ["Headquarters", `${company.hq.city}`],
        [
          "Customers",
          "Governments, public agencies and industry partners worldwide",
        ],
        [
          "Core technology",
          "Metal hydride hydrogen storage and AI-driven integrated energy management",
        ],
      ] as [string, string][],
      structure: [
        {
          tag: "01 · Produce",
          title: "Green hydrogen production",
          role: "From renewable power",
          items: [
            "Water electrolysis powered by solar and wind",
            "Low-cost production systems developed in Japan",
            "AI-driven energy management, optimisation and security",
            "Infrastructure design and build-out",
          ],
        },
        {
          tag: "02 · Store & transport",
          title: "Metal hydride storage and logistics",
          role: "Safe, compact, transportable",
          items: [
            "Solid-state storage below 10 atm",
            "Container-format transport by road, rail and sea",
            "Long-term, stable storage",
            "Suited to export and long-distance supply",
          ],
        },
        {
          tag: "03 · Use",
          title: "Local consumption",
          role: "Hydrogen in everyday infrastructure",
          items: [
            "Hydrogen bus, truck and car fleets",
            "Fuel-cell power for industry and microgrids",
            "Zero-emission buildings and smart cities",
            "Refuelling and supply infrastructure",
          ],
        },
      ],
    },
    market: {
      eyebrow: "The market",
      title:
        "A 100-million-tonne market that is still almost entirely fossil-based",
      desc: "Hydrogen demand is dominated by grey hydrogen made from natural gas for refining and chemicals. Governments are now committing to clean hydrogen at scale, and no single producing region can supply it all.",
      consumptionTitle: "Where hydrogen is used today",
      consumptionSub: "Share of global consumption by industry",
      consumption: [
        { label: "Ammonia & fertiliser", value: 55, color: "bg-teal" },
        { label: "Oil refining", value: 25, color: "bg-navy" },
        { label: "Methanol", value: 10, color: "bg-leaf" },
        {
          label: "Other, incl. energy & mobility",
          value: 10,
          color: "bg-ink/30",
        },
      ],
      consumptionNote:
        "Clean sectors such as heavy road transport, shipping, aviation and power are still under 10% of demand. That gap is the opportunity.",
      tableHeaders: ["Country / region", "Target", "Detail"],
      targets: [
        [
          "Japan",
          "12 Mt / yr",
          "By 2040, domestic and overseas. Government interest is focused on green hydrogen, with a cost target of ¥30/Nm³.",
        ],
        [
          "United States",
          "10 → 50 Mt / yr",
          "10 Mt by 2030, 20 Mt by 2040, 50 Mt by 2050.",
        ],
        [
          "European Union",
          "10 + 10 Mt / yr",
          "40 GW of electrolysers for 10 Mt green hydrogen by 2030, plus 10 Mt of imports (REPowerEU).",
        ],
        [
          "South Korea",
          "5 Mt / yr",
          "Clean hydrogen by 2050, of which 3 Mt green.",
        ],
        [
          "United Kingdom",
          "10 GW",
          "Low-carbon hydrogen capacity by 2030, including 5 GW electrolytic.",
        ],
        ["Germany", "10 GW", "Hydrogen production capacity by 2030."],
        ["France", "6.5 GW", "Water electrolysis capacity by 2030."],
        ["China", "1–2 Mt CO₂", "Annual emissions reduction targeted by 2025."],
      ],
      sourceNote:
        "Consumption split: Hydrogen Europe. Targets as announced by each government, 2020–2023.",
    },
    colours: {
      eyebrow: "Why green",
      title: "Hydrogen comes in many colours. The world needs green.",
      desc: "Only hydrogen made from water and renewable electricity delivers a genuinely clean energy carrier. The challenge, and the focus of our technology, is making it cost-effective.",
      emissionsLabel: "Relative CO₂ emissions",
      items: [
        {
          name: "Green hydrogen",
          source: "Water + renewable power",
          co2: 3,
          note: "Zero / near-zero emissions. Scaling up; cost is the challenge.",
          tone: "bg-leaf",
          highlight: true,
        },
        {
          name: "Blue hydrogen",
          source: "Natural gas + carbon capture",
          co2: 40,
          note: "Medium-low emissions. Transitional option.",
          tone: "bg-sky-600",
          highlight: false,
        },
        {
          name: "Grey hydrogen",
          source: "Natural gas (steam reforming)",
          co2: 75,
          note: "About 12 kg CO₂ per kg H₂. Cheapest and most widely used today.",
          tone: "bg-zinc-500",
          highlight: false,
        },
        {
          name: "Brown hydrogen",
          source: "Coal gasification",
          co2: 100,
          note: "Very high emissions. Inexpensive and highly polluting.",
          tone: "bg-amber-800",
          highlight: false,
        },
      ],
    },
    technology: {
      eyebrow: "Our technology",
      title: "Hydrogen stored as a solid: safer, denser, easier to ship",
      desc: "Metal hydride storage binds hydrogen inside a metal alloy. It is considered one of the safest and most space-efficient ways to hold hydrogen, and sits at the centre of Japan’s emerging hydrogen society.",
      photoAlt: "Containerised metal hydride hydrogen storage system",
      volumeTitle: "Space needed to store 1,000 m³ of hydrogen",
      volumeSub:
        "Substance only, without container. Bar length uses a logarithmic scale.",
      volumes: [
        { label: "Low-pressure gas tank", value: 100 },
        { label: "High-pressure gas", value: 6.7 },
        { label: "Liquid hydrogen", value: 1.3 },
        { label: "Hydrogen storage alloy", value: 0.9, best: true },
      ],
      benefits: [
        {
          icon: "shield" as const,
          title: "Safe by design",
          text: "Hydrogen is held chemically inside a solid alloy at low pressure, removing the high-pressure and cryogenic risks of compression or liquefaction.",
        },
        {
          icon: "cube" as const,
          title: "Compact",
          text: "Stored hydrogen occupies less than 1/1000 of its gas volume, so facilities need far less space than conventional tanks.",
        },
        {
          icon: "clock" as const,
          title: "Long-term stability",
          text: "A stable hydride holds hydrogen safely for extended periods, suited to seasonal storage and shipping.",
        },
        {
          icon: "bolt" as const,
          title: "Simple to operate",
          text: "Absorbs and releases hydrogen below 10 atm (1 MPa)—exempt from Japan’s High Pressure Gas Safety Act—enabling safe urban, industrial and residential use.",
        },
      ],
      compHeaders: [
        "Storage medium",
        "Volumetric efficiency",
        "Operating pressure",
        "Safety / risk profile",
      ],
      comparison: [
        {
          medium: "Metal hydride alloys",
          volumetric: "Highest (~1/2 volume of liquid H₂)",
          pressure: "Low (< 10 atm / 1 MPa)",
          risk: "Highly stable; low risk",
          best: true,
        },
        {
          medium: "Liquid hydrogen",
          volumetric: "Moderate",
          pressure: "Atmospheric, but below −253 °C",
          risk: "Cryogenic boil-off; high energy input",
        },
        {
          medium: "Compressed gas",
          volumetric: "Lowest (~7× larger than alloy volume)",
          pressure: "High (350–700 bar)",
          risk: "High stress; structural explosion risk",
        },
      ],
      rd: {
        eyebrow: "Japanese academic R&D",
        title: "Low-cost green hydrogen production backed by Japanese research",
        text: "Research led by Professor Tatsuo Kono (Kono Laboratory, Hydrogen Energy Division, The University of Tokyo) focuses on combining renewable water electrolysis, hydrogen storage, and batteries with AI-driven prediction to stabilize grids, capture surplus renewable power, and dramatically lower green hydrogen production costs.",
      },
      howEyebrow: "How it works",
      howTitle: "From wind and sun to usable power in four steps",
      howDesc:
        "Click any stage below to inspect how solid-state metal hydride technology absorbs, transports, and releases clean hydrogen safely.",
    },
    proof: {
      eyebrow: "Track record",
      title: "Japanese hydrogen technology, proven in the field",
      desc: "A Japanese government-backed pilot at Bolivar, Adelaide, led by Marubeni, produces green hydrogen from renewable power and has shipped it to Indonesia in metal hydride alloy tanks, a world first.",
      photoAlt:
        "Aerial view of Hydrogen Park Adelaide and the Marubeni hydrogen pilot at Bolivar",
      stats: [
        [
          "$12.5M",
          "Japanese government funding to Marubeni for green hydrogen production",
        ],
        ["Bolivar, SA", "Pilot site in Adelaide, South Australia"],
        [
          "Indonesia",
          "Green hydrogen exported via metal hydride alloy tank to power fuel cells in an industrial park",
        ],
        [
          "Local use",
          "Also supplied to a South Australian natural gas power plant and a wastewater plant",
        ],
      ],
      chainLabel: "The demonstrated supply chain",
      chain: [
        {
          t: "Production",
          s: "South Australia",
          d: "Solar and wind power an electrolyser, managed by an energy management system.",
        },
        {
          t: "Transport",
          s: "By sea, in containers",
          d: "Hydrogen stored in metal hydride tanks ships safely at low pressure.",
        },
        {
          t: "Utilisation",
          s: "Indonesia",
          d: "Fuel cells convert hydrogen to power and heat for an industrial town.",
        },
      ],
    },
    applications: {
      eyebrow: "Applications",
      title: "Transport is already shifting to hydrogen",
      desc: "Japan has deployed hydrogen buses, trucks, stations and vessels, changing its infrastructure quickly. This is the local demand that hydrogen infrastructure can serve from day one.",
      gallery: [
        {
          src: "/images/fuel-cell-bus.jpg",
          title: "Fuel-cell buses",
          text: "Zero-emission public transport operating across Japan.",
          span: "lg:col-span-2",
        },
        {
          src: "/images/hydrogen-station.jpg",
          title: "Hydrogen stations",
          text: "Refuelling networks that make fleets practical.",
          span: "",
        },
        {
          src: "/images/fuel-cell-trucks.jpg",
          title: "Freight trucks",
          text: "Zero-emission logistics for major carriers.",
          span: "",
        },
        {
          src: "/images/hydrogen-ferry.jpg",
          title: "Ferries and vessels",
          text: "Hydrogen is moving onto the water.",
          span: "",
        },
        {
          src: "/images/green-hydrogen-ship.jpg",
          title: "Green hydrogen cargo ship",
          text: "Marine transport shifting to hydrogen.",
          span: "",
        },
        {
          src: "/images/hydrogen-jet-engine.jpg",
          title: "Hydrogen aviation",
          text: "Rolls-Royce and easyJet have tested a 100% hydrogen-fuelled jet engine.",
          span: "lg:col-span-2",
        },
      ],
    },
    projects: {
      eyebrow: "Global projects",
      title: "Building hydrogen supply chains with partners worldwide",
      desc: "Japan’s domestic renewable resources are limited, so its Basic Hydrogen Strategy relies on importing renewable hydrogen through a global network, and demand will far exceed what any one country can supply. We work with governments and industry partners to build the production, storage, transport and consumption infrastructure that network needs.",
      photoAlt:
        "Diagram of a CO2-free energy and food loop between Australia and Japan",
      capabilities: [
        "Infrastructure build-out",
        "Green hydrogen production",
        "Hydrogen storage",
        "Hydrogen transportation",
        "Local use: bus, truck and car fleets",
      ],
      featuredEyebrow: "Featured client engagement",
      featuredTitle: "Australia",
      featuredDesc:
        "Australia has abundant sun and wind and is launching hydrogen export initiatives. Our proposed work with Australian partners, including New South Wales, Queensland and South Australia, covers three areas:",
      pillars: [
        {
          n: "01",
          title: "Hydrogen production plants",
          text: "Renewable-powered green hydrogen production plants in Queensland and New South Wales, close to world-class sun and wind.",
        },
        {
          n: "02",
          title: "Hydrogen-powered smart city",
          text: "A living showcase combining hydrogen fleets, zero-emission buildings and AI-managed energy for local consumption.",
        },
        {
          n: "03",
          title: "Export to Japan and the world",
          text: "Green hydrogen shipped in metal-hydride containers to Japan and the wider global market.",
        },
      ],
    },
    leadership: {
      eyebrow: "Leadership",
      title: "Global technology leadership, applied to hydrogen",
      desc: "Bringing enterprise leadership from some of the world’s largest technology companies together with a long-term commitment to Earth’s sustainability through hydrogen energy adoption.",
      role: "Hydrogen Energy Initiative Lead · Japan",
      leaderAt: "Business leader at",
      entrepreneur: "Entrepreneur",
      entrepreneurDesc: "Founded Oilsoft.ca, a Canadian software company.",
      education: "Education",
      edu1: "Electronics Engineering, Aligarh University, India",
      edu2: "Master’s in Computer Science, Nagoya Institute of Technology, Japan",
    },
    contact: {
      eyebrow: "Contact",
      title: "Partner with us to build the hydrogen society",
      desc: "We welcome enquiries from investors, governments, public agencies and industry partners who want to adopt a hydrogen society the way Japan is.",
    },
    footer: {
      desc: "Japanese green hydrogen technology for governments and industry worldwide, for a sustainable global energy future.",
      links: [
        ["About", "#about"],
        ["Market", "#demand"],
        ["Technology", "#technology"],
        ["Track record", "#proof"],
        ["Applications", "#applications"],
        ["Projects", "#projects"],
        ["Leadership", "#leadership"],
        ["Contact", "#contact"],
      ],
      disclaimer: `© ${company.legalName}. All rights reserved. This website is for general information only. It is not an offer to sell or a solicitation to buy any security and is not investment advice. Market figures and government targets are drawn from public announcements and industry sources and may change. Third-party projects, products and names are referenced as examples of the wider hydrogen industry and remain the property of their respective owners.`,
    },
  },
  ja: {
    about: {
      eyebrow: "会社概要",
      title: "世界へ届ける、日本発の水素テクノロジー企業",
      desc: "水素を国家戦略の柱と位置づける日本を拠点に、再生可能エネルギーと地域・産業を結ぶ水素技術およびインフラを世界中のパートナーへ提供しています。",
      profile: [
        ["会社名", `${company.legalNameJa}（${company.legalName}）`],
        ["設立", company.established],
        [
          "事業内容",
          "グリーン水素の製造・貯蔵・輸送および地域利活用インフラの構築",
        ],
        ["本社所在地", `${company.hq.city}`],
        ["主要顧客", "世界各国の政府機関・自治体・産業パートナー"],
        [
          "コア技術",
          "金属水素化物（水素吸蔵合金）による貯蔵技術およびAI統合エネルギー管理",
        ],
      ] as [string, string][],
      structure: [
        {
          tag: "01 · つくる",
          title: "グリーン水素の製造",
          role: "再生可能エネルギーから",
          items: [
            "太陽光・風力発電による水電解システム",
            "日本で開発された低コスト水素製造技術",
            "AIによるエネルギー管理・最適化・セキュリティ",
            "水素製造インフラの設計・構築",
          ],
        },
        {
          tag: "02 · ためる・はこぶ",
          title: "金属水素化物による貯蔵と輸送",
          role: "安全・コンパクト・輸送可能",
          items: [
            "10気圧未満での安全な固体貯蔵",
            "道路・鉄道・海上でのコンテナ輸送に対応",
            "長期間の安定した水素保持",
            "輸出および長距離サプライチェーンに最適",
          ],
        },
        {
          tag: "03 · つかう",
          title: "地域での利活用",
          role: "日常インフラを支える水素",
          items: [
            "水素バス・トラック・乗用車フリート",
            "産業設備・マイクログリッド向け燃料電池発電",
            "ゼロエミッション建築とスマートシティ",
            "水素ステーションおよび供給インフラ",
          ],
        },
      ],
    },
    market: {
      eyebrow: "市場動向",
      title: "年間1億トン規模の水素市場は、今も大半が化石燃料由来",
      desc: "現在の水素需要は、石油精製や化学分野向けの天然ガス由来（グレー水素）が中心です。各国政府がクリーン水素の大規模導入を掲げる中、単一の生産地域だけで世界需要を賄うことは不可能です。",
      consumptionTitle: "現在の水素の用途別シェア",
      consumptionSub: "世界の産業別水素消費割合",
      consumption: [
        { label: "アンモニア・肥料", value: 55, color: "bg-teal" },
        { label: "石油精製", value: 25, color: "bg-navy" },
        { label: "メタノール", value: 10, color: "bg-leaf" },
        {
          label: "その他（エネルギー・モビリティ等）",
          value: 10,
          color: "bg-ink/30",
        },
      ],
      consumptionNote:
        "大型輸送、海運、航空、発電などのクリーン分野はまだ需要の10%未満です。このギャップこそが最大の成長機会です。",
      tableHeaders: ["国・地域", "導入目標", "詳細"],
      targets: [
        [
          "日本",
          "年間 1,200万トン",
          "2040年目標（国内・海外合計）。政府はグリーン水素を重視し、30円/Nm³のコスト目標を設定。",
        ],
        [
          "米国",
          "1,000万 → 5,000万トン/年",
          "2030年に1,000万トン、2040年に2,000万トン、2050年に5,000万トン。",
        ],
        [
          "欧州連合（EU）",
          "1,000万 + 1,000万トン/年",
          "2030年までに40GWの水電解装置で域内1,000万トン製造＋1,000万トン輸入（REPowerEU）。",
        ],
        [
          "韓国",
          "年間 500万トン",
          "2050年までにクリーン水素500万トン（うちグリーン水素300万トン）。",
        ],
        [
          "英国",
          "10 GW",
          "2030年までに低炭素水素製造能力10GW（うち水電解5GW）。",
        ],
        ["ドイツ", "10 GW", "2030年までの水素製造能力目標。"],
        ["フランス", "6.5 GW", "2030年までの水電解設備容量目標。"],
        ["中国", "100〜200万トン CO₂", "2025年目標の年間CO₂排出削減量。"],
      ],
      sourceNote:
        "消費割合出典：Hydrogen Europe。各国目標は2020〜2023年の政府発表に基づく。",
    },
    colours: {
      eyebrow: "グリーン水素の重要性",
      title: "水素にはさまざまな種類がある。世界が求めるのはグリーン水素。",
      desc: "水と再生可能エネルギー電力からつくられる水素だけが、真にクリーンなエネルギーキャリアとなります。私たちの技術の焦点は、そのコスト競争力を高めることです。",
      emissionsLabel: "相対的なCO₂排出量",
      items: [
        {
          name: "グリーン水素",
          source: "水 ＋ 再生可能エネルギー",
          co2: 3,
          note: "CO₂排出ゼロ／ほぼゼロ。拡大期にあり、コスト低減が鍵。",
          tone: "bg-leaf",
          highlight: true,
        },
        {
          name: "ブルー水素",
          source: "天然ガス ＋ CO₂回収・貯留",
          co2: 40,
          note: "中〜低排出。移行期の選択肢。",
          tone: "bg-sky-600",
          highlight: false,
        },
        {
          name: "グレー水素",
          source: "天然ガス（水蒸気改質）",
          co2: 75,
          note: "水素1kgあたり約12kgのCO₂を排出。現在最も安価で広く利用。",
          tone: "bg-zinc-500",
          highlight: false,
        },
        {
          name: "ブラウン水素",
          source: "石炭ガス化",
          co2: 100,
          note: "極めて高いCO₂排出量。安価だが環境負荷が大きい。",
          tone: "bg-amber-800",
          highlight: false,
        },
      ],
    },
    technology: {
      eyebrow: "当社の技術",
      title: "水素を固体として貯蔵：より安全に、高密度に、運びやすく",
      desc: "金属水素化物（水素吸蔵合金）は、金属結晶の内部に水素を化学的に結合させて貯蔵します。最も安全かつ省スペースな貯蔵方式の一つであり、日本の水素社会の中核を担う技術です。",
      photoAlt: "コンテナ型金属水素化物水素貯蔵システム",
      volumeTitle: "水素1,000 m³の貯蔵に必要な体積",
      volumeSub: "容器を除く物質のみの体積（グラフは対数スケール表示）。",
      volumes: [
        { label: "低圧ガスタンク", value: 100 },
        { label: "高圧ガス", value: 6.7 },
        { label: "液体水素", value: 1.3 },
        { label: "水素吸蔵合金（MH）", value: 0.9, best: true },
      ],
      benefits: [
        {
          icon: "shield" as const,
          title: "本質的な安全性",
          text: "低圧で固体合金内に化学結合させるため、高圧圧縮や極低温液化に伴うリスクを大幅に低減します。",
        },
        {
          icon: "cube" as const,
          title: "省スペース設計",
          text: "貯蔵時の体積は気体時の1/1000未満。従来のタンクに比べ設置面積を劇的に削減できます。",
        },
        {
          icon: "clock" as const,
          title: "長期安定性",
          text: "安定した水素化物として長期間安全に保持できるため、季節間貯蔵や海上輸送に適しています。",
        },
        {
          icon: "bolt" as const,
          title: "シンプルな運用",
          text: "10気圧（1 MPa）未満で吸蔵・放出が可能（高圧ガス保安法の適用除外）。都市部・工場・住宅地でも安全に運用できます。",
        },
      ],
      compHeaders: [
        "貯蔵方式",
        "体積効率",
        "運転圧力・温度",
        "安全性・リスク特性",
      ],
      comparison: [
        {
          medium: "金属水素化物（水素吸蔵合金）",
          volumetric: "最高（液体水素の約1/2の体積）",
          pressure: "低圧（10気圧 / 1 MPa未満）",
          risk: "極めて安定・低リスク",
          best: true,
        },
        {
          medium: "液体水素",
          volumetric: "中程度",
          pressure: "大気圧だが −253℃ 以下の極低温",
          risk: "ボイルオフ損失・液化に多大なエネルギーが必要",
        },
        {
          medium: "圧縮ガス",
          volumetric: "最低（吸蔵合金の約7倍の体積）",
          pressure: "高圧（350〜700気圧）",
          risk: "高圧ストレス・構造的爆発リスク",
        },
      ],
      rd: {
        eyebrow: "日本の学術研究開発",
        title: "日本の先端研究に裏付けられた低コスト・グリーン水素製造",
        text: "東京大学 水素エネルギー分野 河野研究室（河野龍夫教授）では、再エネ水電解・水素貯蔵・蓄電池とAI予測技術を統合したエネルギーシステムの研究開発を推進。系統安定化と余剰再エネの有効活用により、グリーン水素の大幅なコスト低減を実現しています。",
      },
      howEyebrow: "仕組み",
      howTitle: "風と太陽からクリーンな電力へ：4つのステップ",
      howDesc:
        "各ステージをクリックすると、固体金属水素化物技術がグリーン水素を安全に吸蔵・輸送・放出するプロセスを確認できます。",
    },
    proof: {
      eyebrow: "実証実績",
      title: "現場で実証された日本の水素テクノロジー",
      desc: "丸紅が主導し日本政府の支援を受けた南オーストラリア州アデレード（ボリバー）の実証事業では、再エネ由来のグリーン水素を製造し、世界初となる金属水素化物タンクでのインドネシアへの海上輸出を実現しました。",
      photoAlt: "アデレードの水素パークおよびボリバー水素実証施設の空撮",
      stats: [
        ["1,250万ドル", "丸紅のグリーン水素製造事業に対する日本政府の支援"],
        ["南豪州ボリバー", "オーストラリア・アデレードの実証拠点"],
        [
          "インドネシア",
          "金属水素化物タンクでグリーン水素を輸出し、工業団地の燃料電池へ供給",
        ],
        [
          "地域利用",
          "南オーストラリア州の天然ガス発電所および下水処理場にも供給",
        ],
      ],
      chainLabel: "実証されたサプライチェーン",
      chain: [
        {
          t: "製造",
          s: "南オーストラリア州",
          d: "太陽光と風力で水電解装置を稼働し、エネルギー管理システムで最適化。",
        },
        {
          t: "輸送",
          s: "海上コンテナ輸送",
          d: "金属水素化物タンクに貯蔵された水素を低圧のまま安全に海上輸送。",
        },
        {
          t: "利活用",
          s: "インドネシア",
          d: "工業団地にて燃料電池で水素を電力と熱に変換して供給。",
        },
      ],
    },
    applications: {
      eyebrow: "活用事例",
      title: "すでに始まっている輸送分野の水素シフト",
      desc: "日本では水素バス、トラック、水素ステーション、船舶の導入が急速に進んでいます。これらが初日から水素インフラを支える地域需要となります。",
      gallery: [
        {
          src: "/images/fuel-cell-bus.jpg",
          title: "燃料電池バス",
          text: "日本各地で運行中のゼロエミッション公共交通。",
          span: "lg:col-span-2",
        },
        {
          src: "/images/hydrogen-station.jpg",
          title: "水素ステーション",
          text: "フリート運用を支える充填インフラネットワーク。",
          span: "",
        },
        {
          src: "/images/fuel-cell-trucks.jpg",
          title: "燃料電池トラック",
          text: "大手物流企業で進むゼロエミッション貨物輸送。",
          span: "",
        },
        {
          src: "/images/hydrogen-ferry.jpg",
          title: "水素フェリー・船舶",
          text: "水上輸送分野にも広がる水素エネルギー。",
          span: "",
        },
        {
          src: "/images/green-hydrogen-ship.jpg",
          title: "グリーン水素貨物船",
          text: "海運業界の脱炭素化を牽引する水素船舶。",
          span: "",
        },
        {
          src: "/images/hydrogen-jet-engine.jpg",
          title: "水素航空機",
          text: "ロールス・ロイスとイージージェットが100%水素ジェットエンジンの試験に成功。",
          span: "lg:col-span-2",
        },
      ],
    },
    projects: {
      eyebrow: "グローバルプロジェクト",
      title: "世界のパートナーと共に水素サプライチェーンを構築",
      desc: "国内の再エネ資源が限られる日本の水素基本戦略は、グローバルな輸入ネットワークの構築を前提としています。私たちは各国の政府・産業パートナーと連携し、製造・貯蔵・輸送・消費まで一貫したインフラを構築します。",
      photoAlt: "オーストラリアと日本を結ぶCO2フリーエネルギー循環の概念図",
      capabilities: [
        "インフラ設計・構築",
        "グリーン水素製造",
        "水素貯蔵システム",
        "水素輸送ロジスティクス",
        "地域利活用（バス・トラック・乗用車）",
      ],
      featuredEyebrow: "注目のプロジェクト構想",
      featuredTitle: "オーストラリア",
      featuredDesc:
        "豊富な太陽光・風力資源を持つオーストラリアでは水素輸出プロジェクトが加速しています。ニューサウスウェールズ州、クイーンズランド州、南オーストラリア州のパートナーとの協業構想は3つの柱で構成されます。",
      pillars: [
        {
          n: "01",
          title: "グリーン水素製造プラント",
          text: "世界屈指の日射・風況を誇るクイーンズランド州およびニューサウスウェールズ州での再エネ水素製造拠点。",
        },
        {
          n: "02",
          title: "水素スマートシティ",
          text: "水素車両フリート、ゼロエミッション建築、AIエネルギー管理を統合した地域消費のショーケース。",
        },
        {
          n: "03",
          title: "日本および世界への輸出",
          text: "金属水素化物コンテナによる、日本およびグローバル市場への安全なグリーン水素輸出。",
        },
      ],
    },
    leadership: {
      eyebrow: "リーダーシップ",
      title: "グローバルITのリーダーシップを、水素エネルギーへ",
      desc: "世界有数のテクノロジー企業で培った経営手腕と、水素エネルギー普及による持続可能な地球環境への長期的なコミットメントを融合させています。",
      role: "水素エネルギー推進リーダー · 日本",
      leaderAt: "主な経歴（リーダーシップ）",
      entrepreneur: "起業実績",
      entrepreneurDesc: "カナダのソフトウェア企業 Oilsoft.ca を創業。",
      education: "学歴",
      edu1: "インド・アリーガル大学 電子工学専攻",
      edu2: "名古屋工業大学大学院 情報工学専攻 修士課程修了",
    },
    contact: {
      eyebrow: "お問い合わせ",
      title: "水素社会の実現に向けて、共に歩みましょう",
      desc: "日本のような水素社会の導入を目指す投資家、各国政府、自治体・公的機関、産業パートナーの皆様からのお問い合わせをお待ちしております。",
    },
    footer: {
      desc: "持続可能なグローバルエネルギーの未来に向けて、日本発のグリーン水素技術を世界中の政府・産業界へ。",
      links: [
        ["会社概要", "#about"],
        ["市場動向", "#demand"],
        ["技術", "#technology"],
        ["実証実績", "#proof"],
        ["活用事例", "#applications"],
        ["プロジェクト", "#projects"],
        ["リーダーシップ", "#leadership"],
        ["お問い合わせ", "#contact"],
      ],
      disclaimer: `© ${company.legalName}. All rights reserved. 本ウェブサイトは一般的な情報提供を目的としたものであり、有価証券の売買の勧誘や投資助言ではありません。市場データおよび各国政府の目標は公表情報および業界資料に基づいており、予告なく変更される場合があります。第三者のプロジェクト・製品・名称は水素産業全体の事例として言及したものであり、各権利者に帰属します。`,
    },
  },
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const logWidth = (v: number) => Math.round(((Math.log10(v) + 1) / 3) * 100);

const credentials = [
  "Panasonic",
  "Cisco Systems",
  "Microsoft",
  "Citrix",
  "Dell",
  "Rakuten",
  "DXC",
  "Cognizant",
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];

  return (
    <>
      <Navbar />
      <main id="top">
        {/* ------------------------------ HERO ------------------------------ */}
        <HeroSection />

        {/* ------------------------------ ABOUT ----------------------------- */}
        <section id="about" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionHeader
                  index="01"
                  eyebrow={t.about.eyebrow}
                  title={t.about.title}
                >
                  {t.about.desc}
                </SectionHeader>
              </div>
              <Reveal className="lg:col-span-7" delay={100}>
                <dl className="border-t border-ink">
                  {t.about.profile.map(([k, v]) => (
                    <div
                      key={k}
                      className="grid gap-1 border-b border-line py-5 sm:grid-cols-3 sm:gap-6"
                    >
                      <dt className="text-sm font-medium text-ink/50">{k}</dt>
                      <dd className="text-[15px] leading-7 text-ink sm:col-span-2">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <div className="mt-20 grid gap-px border border-line bg-line md:grid-cols-3">
              {t.about.structure.map((s, i) => (
                <Reveal key={s.tag} delay={i * 90}>
                  <div className="h-full bg-white p-8">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-teal">
                      {s.tag}
                    </p>
                    <h3 className="mt-3 text-xl font-medium text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink/50">{s.role}</p>
                    <ul className="mt-6 space-y-3 border-t border-line pt-6 text-sm leading-6 text-ink/70">
                      {s.items.map((it) => (
                        <li key={it} className="flex gap-3">
                          <span className="mt-2.5 h-px w-3 shrink-0 bg-teal" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------- DEMAND ----------------------------- */}
        <section id="demand" className="bg-mist py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeader
              index="02"
              eyebrow={t.market.eyebrow}
              title={t.market.title}
            >
              {t.market.desc}
            </SectionHeader>

            <div className="mt-16 grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <div className="h-full border border-line bg-white p-8 sm:p-10">
                  <h3 className="text-base font-medium text-ink">
                    {t.market.consumptionTitle}
                  </h3>
                  <p className="mt-1 text-sm text-ink/50">
                    {t.market.consumptionSub}
                  </p>
                  <ul className="mt-8 space-y-6">
                    {t.market.consumption.map((c, i) => (
                      <li key={c.label}>
                        <div className="mb-2 flex items-baseline justify-between text-sm">
                          <span className="text-ink">{c.label}</span>
                          <span className="font-mono text-ink/60">
                            {c.value}%
                          </span>
                        </div>
                        <div className="h-2 bg-ink/5">
                          <div
                            className={`bar-fill h-full ${c.color}`}
                            style={
                              {
                                "--w": `${c.value}%`,
                                "--reveal-delay": `${i * 120}ms`,
                              } as CSSProperties
                            }
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 border-l-2 border-teal bg-mist p-4 text-sm leading-6 text-ink/70">
                    {t.market.consumptionNote}
                  </p>
                </div>
              </Reveal>

              <Reveal className="lg:col-span-7" delay={100}>
                <div className="overflow-hidden border border-line bg-white">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-ink text-xs uppercase tracking-wider text-white/70">
                      <tr>
                        <th className="px-5 py-3.5 font-medium">
                          {t.market.tableHeaders[0]}
                        </th>
                        <th className="px-5 py-3.5 font-medium">
                          {t.market.tableHeaders[1]}
                        </th>
                        <th className="hidden px-5 py-3.5 font-medium sm:table-cell">
                          {t.market.tableHeaders[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {t.market.targets.map(([c, f, d]) => (
                        <tr
                          key={c}
                          className="align-top transition-colors hover:bg-mist/60"
                        >
                          <td className="px-5 py-4 font-medium text-ink">
                            <div>{c}</div>
                            <p className="mt-1 text-xs font-normal leading-5 text-ink/60 sm:hidden">
                              {d}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 font-medium tabular-nums text-teal">
                            {f}
                          </td>
                          <td className="hidden px-5 py-4 leading-6 text-ink/60 sm:table-cell">
                            {d}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </div>
            <p className="mt-5 text-xs text-ink/45">{t.market.sourceNote}</p>

            {/* Colours */}
            <div className="mt-24">
              <SectionHeader
                index="03"
                eyebrow={t.colours.eyebrow}
                title={t.colours.title}
              >
                {t.colours.desc}
              </SectionHeader>
              <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {t.colours.items.map((c, i) => (
                  <Reveal key={c.name} delay={i * 80}>
                    <div
                      className={`h-full p-7 ${c.highlight ? "bg-ink text-white" : "bg-white text-ink"}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${c.tone}`}
                        />
                        <h3 className="font-medium">{c.name}</h3>
                      </div>
                      <p
                        className={`mt-1 text-sm ${c.highlight ? "text-white/55" : "text-ink/50"}`}
                      >
                        {c.source}
                      </p>
                      <div className="mt-7">
                        <div
                          className={`mb-1.5 text-[11px] uppercase tracking-wider ${c.highlight ? "text-white/45" : "text-ink/40"}`}
                        >
                          {t.colours.emissionsLabel}
                        </div>
                        <div
                          className={`h-1.5 ${c.highlight ? "bg-white/10" : "bg-ink/5"}`}
                        >
                          <div
                            className={`bar-fill h-full ${c.tone}`}
                            style={
                              {
                                "--w": `${c.co2}%`,
                                "--reveal-delay": `${i * 120}ms`,
                              } as CSSProperties
                            }
                          />
                        </div>
                      </div>
                      <p
                        className={`mt-5 text-sm leading-6 ${c.highlight ? "text-white/75" : "text-ink/60"}`}
                      >
                        {c.note}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------- TECHNOLOGY --------------------------- */}
        <section id="technology" className="bg-ink py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeader
              dark
              index="04"
              eyebrow={t.technology.eyebrow}
              title={t.technology.title}
            >
              {t.technology.desc}
            </SectionHeader>

            <div className="mt-16 grid items-stretch gap-px bg-white/10 lg:grid-cols-2">
              <Reveal>
                <Photo
                  src="/images/metal-hydride-system.jpg"
                  alt={t.technology.photoAlt}
                  className="h-full min-h-72 w-full"
                />
              </Reveal>
              <Reveal delay={100}>
                <div className="h-full bg-ink p-8 sm:p-10">
                  <h3 className="text-base font-medium text-white">
                    {t.technology.volumeTitle}
                  </h3>
                  <p className="mt-1 text-sm text-white/45">
                    {t.technology.volumeSub}
                  </p>
                  <ul className="mt-8 space-y-6">
                    {t.technology.volumes.map((v, i) => (
                      <li key={v.label}>
                        <div className="mb-2 flex items-baseline justify-between text-sm">
                          <span
                            className={
                              v.best ? "font-medium text-leaf" : "text-white/70"
                            }
                          >
                            {v.label}
                          </span>
                          <span className="font-mono text-white/75">
                            {v.value} m³
                          </span>
                        </div>
                        <div className="h-2 bg-white/10">
                          <div
                            className={`bar-fill h-full ${v.best ? "bg-leaf" : "bg-white/35"}`}
                            style={
                              {
                                "--w": `${logWidth(v.value)}%`,
                                "--reveal-delay": `${i * 130}ms`,
                              } as CSSProperties
                            }
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="mt-px grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {t.technology.benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 80}>
                  <div className="h-full bg-ink p-7">
                    <div className="mb-5 text-leaf">
                      <Icon name={b.icon} />
                    </div>
                    <h3 className="font-medium text-white">{b.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {b.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-16 overflow-x-auto border border-white/10">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-white/[0.05] text-xs uppercase tracking-wider text-white/45">
                    <tr>
                      <th className="px-6 py-4 font-medium">
                        {t.technology.compHeaders[0]}
                      </th>
                      <th className="px-6 py-4 font-medium">
                        {t.technology.compHeaders[1]}
                      </th>
                      <th className="px-6 py-4 font-medium">
                        {t.technology.compHeaders[2]}
                      </th>
                      <th className="px-6 py-4 font-medium">
                        {t.technology.compHeaders[3]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {t.technology.comparison.map((r) => (
                      <tr key={r.medium} className={r.best ? "bg-leaf/10" : ""}>
                        <td
                          className={`px-6 py-5 font-medium ${r.best ? "text-leaf" : "text-white"}`}
                        >
                          {r.medium}
                        </td>
                        <td className="px-6 py-5 text-white/75">
                          {r.volumetric}
                        </td>
                        <td className="px-6 py-5 text-white/65">
                          {r.pressure}
                        </td>
                        <td className="px-6 py-5 text-white/65">{r.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10 border border-white/10 border-l-2 border-l-leaf bg-white/[0.03] p-7 sm:p-9">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-leaf">
                  {t.technology.rd.eyebrow}
                </p>
                <h3 className="mt-2.5 text-lg font-medium text-white sm:text-xl">
                  {t.technology.rd.title}
                </h3>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-white/65 sm:text-[15px]">
                  {t.technology.rd.text}
                </p>
              </div>
            </Reveal>

            <div className="mt-24">
              <SectionHeader
                dark
                index="05"
                eyebrow={t.technology.howEyebrow}
                title={t.technology.howTitle}
              >
                {t.technology.howDesc}
              </SectionHeader>
              <HydrideProcess />
            </div>
          </div>
        </section>

        {/* ------------------------------ PROOF ----------------------------- */}
        <section id="proof" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeader
              index="06"
              eyebrow={t.proof.eyebrow}
              title={t.proof.title}
            >
              {t.proof.desc}
            </SectionHeader>

            <div className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-5">
              <Reveal className="lg:col-span-3">
                <Photo
                  src="/images/adelaide-hydrogen-park.jpg"
                  alt={t.proof.photoAlt}
                  className="aspect-video h-full w-full"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              </Reveal>
              <Reveal delay={100} className="lg:col-span-2">
                <dl className="h-full bg-white p-8 sm:p-10">
                  {t.proof.stats.map(([k, v]) => (
                    <div
                      key={k}
                      className="border-b border-line py-5 first:pt-0 last:border-0 last:pb-0"
                    >
                      <dt className="text-2xl font-medium tracking-tight text-teal">
                        {k}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-ink/60">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal>
              <div className="mt-px bg-navy p-8 sm:p-12">
                <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.22em] text-leaf">
                  {t.proof.chainLabel}
                </p>
                <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                  {t.proof.chain.map((x, i, arr) => (
                    <div key={x.t} className="contents">
                      <div className="border border-white/15 p-6 text-center">
                        <div className="text-lg font-medium text-white">
                          {x.t}
                        </div>
                        <div className="mt-1 text-sm text-leaf">{x.s}</div>
                        <p className="mt-3 text-sm leading-6 text-white/55">
                          {x.d}
                        </p>
                      </div>
                      {i < arr.length - 1 && (
                        <svg
                          viewBox="0 0 80 24"
                          className="mx-auto h-6 w-16 rotate-90 text-leaf md:rotate-0"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M2 12h68"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="flow-line"
                          />
                          <path
                            d="M64 5l12 7-12 7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------------------- APPLICATIONS ------------------------ */}
        <section id="applications" className="bg-mist py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeader
              index="07"
              eyebrow={t.applications.eyebrow}
              title={t.applications.title}
            >
              {t.applications.desc}
            </SectionHeader>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.applications.gallery.map((g, i) => (
                <Reveal key={g.src} delay={(i % 4) * 70} className={g.span}>
                  <figure className="group relative h-full min-h-64 overflow-hidden">
                    <Image
                      src={g.src}
                      alt={g.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-5">
                      <div className="font-medium text-white">{g.title}</div>
                      <p className="mt-1 text-sm text-white/70">{g.text}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            <div className="mt-24">
              <SmartEnergyDiagram />
            </div>
          </div>
        </section>

        {/* --------------------------- GLOBAL PROJECTS --------------------- */}
        <section id="projects" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <div>
                <SectionHeader
                  index="09"
                  eyebrow={t.projects.eyebrow}
                  title={t.projects.title}
                >
                  {t.projects.desc}
                </SectionHeader>
                <Reveal delay={120}>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {t.projects.capabilities.map((c) => (
                      <span
                        key={c}
                        className="border border-line bg-mist px-4 py-2 text-sm text-ink/75"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
              <Reveal delay={100}>
                <div className="border border-line bg-white p-4">
                  <Photo
                    src="/images/japan-australia-loop.jpg"
                    alt={t.projects.photoAlt}
                    className="aspect-[7/5] bg-white [&_img]:object-contain"
                  />
                </div>
              </Reveal>
            </div>

            <div className="mt-20 max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal">
                {t.projects.featuredEyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight text-ink">
                {t.projects.featuredTitle}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-ink/60">
                {t.projects.featuredDesc}
              </p>
            </div>
            <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-3">
              {t.projects.pillars.map((p, i) => (
                <Reveal key={p.n} delay={i * 90}>
                  <div className="h-full bg-white p-8">
                    <span className="font-mono text-sm text-teal">{p.n}</span>
                    <h3 className="mt-4 text-xl font-medium text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-ink/60">
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------- LEADERSHIP -------------------------- */}
        <section id="leadership" className="bg-mist py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <SectionHeader
                  index="10"
                  eyebrow={t.leadership.eyebrow}
                  title={t.leadership.title}
                >
                  {t.leadership.desc}
                </SectionHeader>
              </div>
              <Reveal className="lg:col-span-3" delay={100}>
                <div className="border border-line bg-white p-8 sm:p-10">
                  <div className="flex items-center gap-5 border-b border-line pb-8">
                    <div className="grid h-20 w-20 shrink-0 place-items-center bg-ink text-2xl font-medium text-white">
                      MI
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium tracking-tight text-ink">
                        Mohamado Isumatorra
                      </h3>
                      <p className="text-ink/50">{t.leadership.role}</p>
                    </div>
                  </div>
                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-medium uppercase tracking-widest text-teal">
                        {t.leadership.leaderAt}
                      </h4>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {credentials.map((c) => (
                          <li
                            key={c}
                            className="border border-line px-3 py-1 text-sm text-ink/75"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-medium uppercase tracking-widest text-teal">
                          {t.leadership.entrepreneur}
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-ink/70">
                          {t.leadership.entrepreneurDesc}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium uppercase tracking-widest text-teal">
                          {t.leadership.education}
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-ink/70">
                          {t.leadership.edu1}
                          <br />
                          {t.leadership.edu2}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------ CONTACT --------------------------- */}
        <section id="contact" className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionHeader
                index="11"
                eyebrow={t.contact.eyebrow}
                title={t.contact.title}
              >
                {t.contact.desc}
              </SectionHeader>
              <Reveal delay={120}>
                <div className="mt-10 border-t border-ink pt-8">
                  {[company.hq].map((o) => (
                    <div key={o.label}>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-teal">
                        {o.labelJa}
                      </p>
                      <p className="mt-1 font-medium text-ink">
                        {lang === "ja" ? o.labelJa : o.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-ink/60">
                        {o.city}
                        <br />
                        {o.address}
                        <br />
                        {o.phone}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-3" delay={100}>
              <InvestorForm />
            </Reveal>
          </div>
        </section>
      </main>

      {/* ------------------------------ FOOTER ------------------------------ */}
      <footer className="bg-ink py-14 text-white/55">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div>
              <div className="flex items-center gap-3 text-white">
                <Logo size={36} className="text-white" />
                <span className="font-semibold">
                  {lang === "ja" ? company.legalNameJa : company.name}
                </span>
                <span className="text-xs tracking-[0.2em] text-white/45">
                  {lang === "ja" ? company.name : company.legalNameJa}
                </span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-6">{t.footer.desc}</p>
            </div>
            <ul className="grid grid-cols-2 gap-x-14 gap-y-2.5 text-sm">
              {t.footer.links.map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="transition hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-12 border-t border-white/10 pt-6 text-xs leading-5 text-white/40">
            {t.footer.disclaimer}
          </p>
        </div>
      </footer>
    </>
  );
}
