"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/lib/company";
import { useLanguage } from "@/components/LanguageProvider";

const field =
  "w-full border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-ink/35 focus:border-teal focus:ring-1 focus:ring-teal disabled:cursor-not-allowed disabled:bg-mist disabled:opacity-60";
const label = "mb-1.5 block text-xs font-medium tracking-wide text-ink/60";

const COPY = {
  en: {
    name: "Full name",
    company: "Organisation",
    email: "Work email",
    interest: "Enquiry type",
    message: "Message",
    note: "Enquiries are handled by our Japan headquarters.",
    submit: "Send enquiry",
    submitting: "Sending…",
    sentTitle: "Thank you for your enquiry",
    sentBody:
      "We have received your message and our Japan headquarters team will respond shortly. For urgent matters, you may also write to",
    sendAnother: "Send another enquiry",
    genericError:
      "We could not submit your enquiry right now. Please try again or email us directly.",
    rateLimitError: (minutes?: number) =>
      minutes
        ? `Too many enquiries have been sent from this network. Please wait about ${minutes} ${minutes === 1 ? "minute" : "minutes"} before trying again.`
        : "Too many enquiries have been sent from this network. Please wait a few minutes before trying again.",
    options: [
      "Investment",
      "Government / public agency",
      "Technology partnership",
      "Energy supply / offtake",
      "Fleet / logistics",
      "Other",
    ],
  },
  ja: {
    name: "お名前",
    company: "貴社名・団体名",
    email: "メールアドレス",
    interest: "お問い合わせ種別",
    message: "お問い合わせ内容",
    note: "お問い合わせはすべて日本本社にて対応いたします。",
    submit: "お問い合わせを送信",
    submitting: "送信中…",
    sentTitle: "お問い合わせを受け付けました",
    sentBody:
      "ご連絡ありがとうございます。日本本社の担当者より折り返しご連絡いたします。お急ぎの場合は下記アドレスまで直接ご連絡ください：",
    sendAnother: "別のお問い合わせを送る",
    genericError:
      "送信に失敗しました。時間をおいて再度お試しいただくか、メールにて直接ご連絡ください。",
    rateLimitError: (minutes?: number) =>
      minutes
        ? `短時間に多数のお問い合わせが送信されました。約${minutes}分ほど時間をおいてから再度お試しください。`
        : "短時間に多数のお問い合わせが送信されました。しばらく時間をおいてから再度お試しください。",
    options: [
      "投資・出資について",
      "政府・自治体・公的機関",
      "技術提携・パートナーシップ",
      "水素供給・オフテイク",
      "車両フリート・物流",
      "その他",
    ],
  },
} as const;

export default function InvestorForm() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          company: get("company"),
          email: get("email"),
          interest: get("interest"),
          message: get("message"),
          website: get("website"),
          lang,
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        if (res.status === 429) {
          const retrySec = Number(res.headers.get("Retry-After"));
          const minutes =
            Number.isFinite(retrySec) && retrySec > 0
              ? Math.max(1, Math.ceil(retrySec / 60))
              : undefined;
          setError(t.rateLimitError(minutes));
        } else {
          setError(
            lang === "ja" ? t.genericError : (payload.error ?? t.genericError),
          );
        }
        setStatus("idle");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError(t.genericError);
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="border border-line bg-white p-10 text-center"
      >
        <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-teal text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-ink">{t.sentTitle}</h3>
        <p className="mt-3 text-ink/65">
          {t.sentBody}{" "}
          <a className="text-teal underline" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          {lang === "en" ? "." : ""}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setError(null);
          }}
          className="mt-6 text-sm text-ink/50 underline hover:text-ink"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 border border-line bg-white p-6 sm:grid-cols-2 sm:p-10"
    >
      {/* Hidden honeypot field for spam bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="block">
        <span className={label}>{t.name}</span>
        <input
          required
          name="name"
          autoComplete="name"
          disabled={isSubmitting}
          className={field}
        />
      </label>
      <label className="block">
        <span className={label}>{t.company}</span>
        <input
          required
          name="company"
          autoComplete="organization"
          disabled={isSubmitting}
          className={field}
        />
      </label>
      <label className="block">
        <span className={label}>{t.email}</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          disabled={isSubmitting}
          className={field}
        />
      </label>
      <label className="block">
        <span className={label}>{t.interest}</span>
        <select
          key={lang}
          name="interest"
          disabled={isSubmitting}
          className={field}
          defaultValue={t.options[0]}
        >
          {t.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>{t.message}</span>
        <textarea
          required
          name="message"
          rows={5}
          disabled={isSubmitting}
          className={field}
        />
      </label>

      {error && (
        <div
          role="alert"
          className="border border-sun/30 bg-sun/5 px-4 py-3 text-sm text-sun sm:col-span-2"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-ink/45">{t.note}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 bg-ink px-10 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-teal disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden
            />
          )}
          {isSubmitting ? t.submitting : t.submit}
        </button>
      </div>
    </form>
  );
}
