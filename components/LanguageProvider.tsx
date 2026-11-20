"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ja";

const PAGE_TITLES: Record<Lang, string> = {
  en: "Japanese Green Hydrogen Technology | Hydrogen Energy Solutions",
  ja: "日本発のグリーン水素技術 | 水素エネルギーソリューション",
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyDocumentLanguage(lang: Lang) {
  document.documentElement.lang = lang;
  document.title = PAGE_TITLES[lang];
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("site-lang");
    const initial: Lang = saved === "ja" || saved === "en" ? saved : "en";
    setLangState(initial);
    applyDocumentLanguage(initial);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("site-lang", next);
    applyDocumentLanguage(next);
  };

  const toggleLang = () => setLang(lang === "en" ? "ja" : "en");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
