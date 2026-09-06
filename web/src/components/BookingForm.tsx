"use client";

import { FormEvent, useState } from "react";
import type { PackSize } from "@/lib/types";
import { useI18n } from "@/i18n/LanguageProvider";

const packIds = ["FIVE_KG", "TEN_KG", "FIFTEEN_KG", "custom"] as const;
const packKg: Record<string, number | undefined> = {
  FIVE_KG: 5,
  TEN_KG: 10,
  FIFTEEN_KG: 15,
};

export function BookingForm() {
  const { t } = useI18n();
  const [pack, setPack] = useState<(typeof packIds)[number]>("TEN_KG");
  const [customKg, setCustomKg] = useState(20);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = new FormData(e.currentTarget);
    const fullName = String(form.get("fullName") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const pincode = String(form.get("pincode") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();
    if (fullName.length < 2) return setMessage(t.booking.errors.name);
    if (!/^[6-9]\d{9}$/.test(phone)) return setMessage(t.booking.errors.phone);
    if (!/^\d{6}$/.test(pincode)) return setMessage(t.booking.errors.pincode);
    const packSize: PackSize = pack === "custom" ? "CUSTOM" : pack;
    const quantityKg = pack === "custom" ? customKg : packKg[pack] ?? 10;
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email: email || undefined,
          pincode,
          city: city || undefined,
          quantityKg,
          packSize,
          notes: notes || undefined,
          source: "landing_page",
        }),
      });
      const json = await res.json();
      if (!res.ok || json.success === false) throw new Error(json.message ?? t.booking.errors.network);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : t.booking.errors.network);
    }
  }

  return (
    <section id="prebook" className="scroll-mt-28 bg-cream-alt px-5 py-20">
      <div className="mx-auto max-w-xl rounded-brand bg-white p-8 shadow-soft">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">{t.booking.kicker}</p>
        <h2 className="mt-2 font-display text-4xl">{t.booking.title}</h2>
        <p className="mt-3 text-bark-muted">{t.booking.intro}</p>
        {status === "success" ? (
          <div className="mt-8 rounded-brand bg-secondary/10 p-5">
            <p className="font-display text-2xl">{t.booking.successTitle}</p>
            <p className="mt-2 text-sm text-bark-muted">{t.booking.successBody}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
            <Field name="fullName" label={t.booking.fullName} required />
            <Field name="phone" label={t.booking.phone} required inputMode="tel" />
            <Field name="email" label={t.booking.email} type="email" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="pincode" label={t.booking.pincode} required inputMode="numeric" />
              <Field name="city" label={t.booking.city} />
            </div>
            <div>
              <label className="text-sm font-medium">{t.booking.quantity}</label>
              <select
                className="mt-1 w-full rounded-brand bg-cream px-3 py-2.5 outline-none ring-1 ring-bark/10"
                value={pack}
                onChange={(e) => setPack(e.target.value as typeof pack)}
              >
                {packIds.map((id) => (
                  <option key={id} value={id}>{t.booking.packs[id]}</option>
                ))}
              </select>
              {pack === "custom" && (
                <input
                  type="number"
                  min={1}
                  value={customKg}
                  onChange={(e) => setCustomKg(Number(e.target.value))}
                  className="mt-2 w-full rounded-brand bg-cream px-3 py-2.5 tabular-nums"
                />
              )}
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="notes">{t.booking.notes}</label>
              <textarea id="notes" name="notes" rows={4} className="mt-1 w-full rounded-brand bg-cream px-3 py-2.5" />
            </div>
            {message && <p className="text-sm text-primary">{message}</p>}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-brand bg-primary py-3 text-white hover:bg-primary-hover disabled:opacity-60"
            >
              {status === "submitting" ? t.booking.submitting : t.booking.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  name, label, required, type = "text", inputMode,
}: {
  name: string; label: string; required?: boolean; type?: string; inputMode?: "tel" | "numeric" | "email" | "text";
}) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        inputMode={inputMode}
        className="mt-1 w-full rounded-brand bg-cream px-3 py-2.5 outline-none ring-1 ring-bark/10 focus:ring-primary"
      />
    </div>
  );
}
