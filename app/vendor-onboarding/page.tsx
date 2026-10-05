"use client";

import { useState, type FormEvent } from "react";

const steps = ["Farm details", "Contact information", "Review"];
const businessTypes = ["Family farm", "Cooperative", "Food producer", "Other"];
const categories = ["Fruit", "Vegetables", "Greens", "Dairy & eggs", "Meat", "Pantry", "Bakery", "Other"];

type FormValues = {
  farmName: string;
  businessType: string;
  category: string;
  weeklySupply: string;
  contactName: string;
  email: string;
  phone: string;
  region: string;
};

type FormField = keyof FormValues;

const initialForm: FormValues = {
  farmName: "",
  businessType: "",
  category: "",
  weeklySupply: "",
  contactName: "",
  email: "",
  phone: "",
  region: "",
};

export default function VendorOnboardingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: FormField, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  function validateStep() {
    const fieldsByStep: FormField[][] = [
      ["farmName", "businessType", "category", "weeklySupply"],
      ["contactName", "email", "phone", "region"],
      [],
    ];
    const nextErrors: Partial<Record<FormField, string>> = {};
    for (const field of fieldsByStep[step]) {
      if (!form[field].trim()) {
        nextErrors[field] = "This field is required.";
      }
    }
    if (
      step === 0 &&
      form.weeklySupply &&
      (!Number.isFinite(Number(form.weeklySupply)) || Number(form.weeklySupply) <= 0)
    ) {
      nextErrors.weeklySupply = "Enter an amount greater than zero.";
    }
    if (step === 1 && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateStep()) return;
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
    } else {
      setSubmitted(true);
    }
  }

  function fieldClass(field: FormField) {
    return `mt-2 w-full rounded-xl border bg-[#0c130e] px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-lime-300 ${
      errors[field] ? "border-rose-400" : "border-white/10"
    }`;
  }

  if (submitted) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-5 py-16 sm:px-8">
        <section aria-live="polite" className="w-full rounded-3xl border border-lime-300/20 bg-lime-300/[0.06] p-8 text-center sm:p-12">
          <span aria-hidden="true" className="mx-auto grid size-14 place-items-center rounded-full bg-lime-300 text-2xl text-emerald-950">✓</span>
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-lime-300">Application preview complete</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Thanks, {form.farmName}.</h1>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-stone-300">
            Your details are ready for review. This preview does not send or store
            applications; vendor submission will be connected when a backend is available.
          </p>
          <button
            type="button"
            onClick={() => { setForm(initialForm); setStep(0); setSubmitted(false); }}
            className="mt-8 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:border-lime-200/60"
          >
            Start another application
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-lime-300">For independent growers</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Bring your farm to TFarms.</h1>
        <p className="mt-4 leading-7 text-stone-300">Tell us a little about your farm and what you grow. It takes about two minutes.</p>

        <ol aria-label="Onboarding progress" className="mt-9 grid grid-cols-3 gap-2">
          {steps.map((label, index) => (
            <li key={label} aria-current={step === index ? "step" : undefined} className={`border-t-2 pt-3 text-xs sm:text-sm ${step >= index ? "border-lime-300 text-lime-200" : "border-white/10 text-stone-500"}`}>
              <span className="mr-2 font-semibold">{`0${index + 1}`}</span>{label}
            </li>
          ))}
        </ol>

        <form onSubmit={handleContinue} noValidate className="mt-7 rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-8">
          {step === 0 && (
            <fieldset className="space-y-5">
              <legend className="text-xl font-semibold text-white">Tell us about your farm</legend>
              <div>
                <label htmlFor="farm-name" className="text-sm font-medium text-stone-200">Farm or business name <span aria-hidden="true" className="text-lime-300">*</span></label>
                <input id="farm-name" autoComplete="organization" value={form.farmName} onChange={(event) => updateField("farmName", event.target.value)} aria-invalid={Boolean(errors.farmName)} aria-describedby={errors.farmName ? "farm-name-error" : undefined} className={fieldClass("farmName")} />
                {errors.farmName && <p id="farm-name-error" className="mt-1 text-sm text-rose-300">{errors.farmName}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="business-type" className="text-sm font-medium text-stone-200">Business type <span aria-hidden="true" className="text-lime-300">*</span></label>
                  <select id="business-type" value={form.businessType} onChange={(event) => updateField("businessType", event.target.value)} aria-invalid={Boolean(errors.businessType)} className={fieldClass("businessType")}>
                    <option value="">Choose one</option>
                    {businessTypes.map((type) => <option key={type}>{type}</option>)}
                  </select>
                  {errors.businessType && <p className="mt-1 text-sm text-rose-300">{errors.businessType}</p>}
                </div>
                <div>
                  <label htmlFor="category" className="text-sm font-medium text-stone-200">What do you grow or make? <span aria-hidden="true" className="text-lime-300">*</span></label>
                  <select id="category" value={form.category} onChange={(event) => updateField("category", event.target.value)} aria-invalid={Boolean(errors.category)} className={fieldClass("category")}>
                    <option value="">Choose a category</option>
                    {categories.map((item) => <option key={item}>{item}</option>)}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-rose-300">{errors.category}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="weekly-supply" className="text-sm font-medium text-stone-200">Typical weekly supply <span aria-hidden="true" className="text-lime-300">*</span></label>
                <div className="mt-2 flex overflow-hidden rounded-xl border border-white/10 focus-within:border-lime-300">
                  <input id="weekly-supply" type="number" min="1" inputMode="numeric" value={form.weeklySupply} onChange={(event) => updateField("weeklySupply", event.target.value)} aria-invalid={Boolean(errors.weeklySupply)} aria-describedby={errors.weeklySupply ? "weekly-supply-error" : "weekly-supply-hint"} className="w-full bg-[#0c130e] px-4 py-3 text-sm text-white outline-none" placeholder="e.g. 50" />
                  <span className="grid shrink-0 place-items-center bg-white/[0.04] px-4 text-sm text-stone-400">units / week</span>
                </div>
                <p id="weekly-supply-hint" className="mt-1 text-xs text-stone-500">A rough estimate helps buyers understand your availability.</p>
                {errors.weeklySupply && <p id="weekly-supply-error" className="mt-1 text-sm text-rose-300">{errors.weeklySupply}</p>}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset className="space-y-5">
              <legend className="text-xl font-semibold text-white">How can we reach you?</legend>
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium text-stone-200">Your name <span aria-hidden="true" className="text-lime-300">*</span></label>
                <input id="contact-name" autoComplete="name" value={form.contactName} onChange={(event) => updateField("contactName", event.target.value)} aria-invalid={Boolean(errors.contactName)} aria-describedby={errors.contactName ? "contact-name-error" : undefined} className={fieldClass("contactName")} />
                {errors.contactName && <p id="contact-name-error" className="mt-1 text-sm text-rose-300">{errors.contactName}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-stone-200">Email address <span aria-hidden="true" className="text-lime-300">*</span></label>
                  <input id="email" type="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={fieldClass("email")} />
                  {errors.email && <p id="email-error" className="mt-1 text-sm text-rose-300">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-stone-200">Phone number <span aria-hidden="true" className="text-lime-300">*</span></label>
                  <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} className={fieldClass("phone")} />
                  {errors.phone && <p id="phone-error" className="mt-1 text-sm text-rose-300">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="region" className="text-sm font-medium text-stone-200">Farm location <span aria-hidden="true" className="text-lime-300">*</span></label>
                <input id="region" autoComplete="address-level2" value={form.region} onChange={(event) => updateField("region", event.target.value)} aria-invalid={Boolean(errors.region)} aria-describedby={errors.region ? "region-error" : "region-hint"} className={fieldClass("region")} placeholder="City, state or region" />
                <p id="region-hint" className="mt-1 text-xs text-stone-500">A city and state or region is enough to get started.</p>
                {errors.region && <p id="region-error" className="mt-1 text-sm text-rose-300">{errors.region}</p>}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="text-xl font-semibold text-white">Review your details</legend>
              <p className="mt-2 text-sm text-stone-400">Make sure everything looks right before continuing.</p>
              <dl className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#0c130e]/70 px-5">
                {[
                  ["Farm", form.farmName],
                  ["Business type", form.businessType],
                  ["Category", form.category],
                  ["Weekly supply", `${form.weeklySupply} units`],
                  ["Contact", form.contactName],
                  ["Email", form.email],
                  ["Phone", form.phone],
                  ["Location", form.region],
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <dt className="text-sm text-stone-400">{label}</dt>
                    <dd className="break-words text-sm font-medium text-white">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs leading-5 text-stone-500">This is a local preview. Selecting submit will not send your information to a server.</p>
            </fieldset>
          )}

          <div className="mt-8 flex flex-wrap-reverse justify-between gap-3 border-t border-white/10 pt-5">
            {step > 0 ? (
              <button type="button" onClick={() => { setStep((current) => current - 1); setErrors({}); }} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40">Back</button>
            ) : <span />}
            <button type="submit" className="rounded-full bg-lime-300 px-6 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300">
              {step === steps.length - 1 ? "Submit application preview" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
