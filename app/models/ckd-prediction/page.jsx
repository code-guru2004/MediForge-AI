"use client";

import { useMemo, useState } from "react";
import { Likely_NOT_CKD, Borderline_CKD, Early_CKD, Likely_CKD, High_Risk_Diabetic_CKD } from "../../data/ckd";
import Link from "next/link";
import {
  ArrowLeftFromLine,
  Activity,
  FlaskConical,
  Droplets,
  ClipboardList,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Info,
  RotateCcw,
  ArrowRight,
  Gauge,
  ShieldCheck,
} from "lucide-react";

const API_BASE_URL = "https://ckd-prediction-backend.onrender.com";
const PREDICT_URL = `${API_BASE_URL}/predict`;

const yesNo = ["yes", "no"];
const normalAbnormal = ["normal", "abnormal"];
const presentNot = ["present", "notpresent"];
const goodPoor = ["good", "poor"];

// Field definitions are unchanged from the original — only grouped into
// clinically meaningful sections for the UI.
const FIELD_DEFS = {
  age: { key: "age", label: "Age", unit: "years" },
  bp: { key: "bp", label: "Blood Pressure", unit: "mmHg" },
  sg: { key: "sg", label: "Specific Gravity", step: "0.005" },
  al: { key: "al", label: "Albumin" },
  su: { key: "su", label: "Sugar" },
  bgr: { key: "bgr", label: "Blood Glucose Random", unit: "mg/dL" },
  bu: { key: "bu", label: "Blood Urea", unit: "mg/dL" },
  sc: { key: "sc", label: "Serum Creatinine", unit: "mg/dL" },
  sod: { key: "sod", label: "Sodium", unit: "mEq/L" },
  pot: { key: "pot", label: "Potassium", unit: "mEq/L" },
  hemo: { key: "hemo", label: "Hemoglobin", unit: "g/dL" },
  pcv: { key: "pcv", label: "Packed Cell Volume", unit: "%" },
  wc: { key: "wc", label: "White Blood Cell Count", unit: "cells/µL" },
  rc: { key: "rc", label: "Red Blood Cell Count", unit: "M/µL" },
};

const CATEGORICAL_DEFS = {
  rbc: { name: "rbc", label: "Red Blood Cells", options: normalAbnormal },
  pc: { name: "pc", label: "Pus Cell", options: normalAbnormal },
  pcc: { name: "pcc", label: "Pus Cell Clumps", options: presentNot },
  ba: { name: "ba", label: "Bacteria", options: presentNot },
  htn: { name: "htn", label: "Hypertension", options: yesNo },
  dm: { name: "dm", label: "Diabetes Mellitus", options: yesNo },
  cad: { name: "cad", label: "Coronary Artery Disease", options: yesNo },
  appet: { name: "appet", label: "Appetite", options: goodPoor },
  pe: { name: "pe", label: "Pedal Edema", options: yesNo },
  ane: { name: "ane", label: "Anemia", options: yesNo },
};

// Purely presentational grouping — every original field/key/label/unit/
// option is preserved, just organized the way a clinician would read a chart.
const SECTIONS = [
  {
    id: "vitals",
    title: "Vital Signs",
    description: "Baseline physiological measurements",
    icon: Activity,
    numeric: ["age", "bp"],
    categorical: [],
  },
  {
    id: "urinalysis",
    title: "Urinalysis",
    description: "Urine composition and microscopy",
    icon: FlaskConical,
    numeric: ["sg", "al", "su"],
    categorical: ["rbc", "pc", "pcc", "ba"],
  },
  {
    id: "blood",
    title: "Blood Panel",
    description: "Serum chemistry and hematology",
    icon: Droplets,
    numeric: ["bgr", "bu", "sc", "sod", "pot", "hemo", "pcv", "wc", "rc"],
    categorical: [],
  },
  {
    id: "history",
    title: "Clinical History",
    description: "Comorbidities and reported symptoms",
    icon: ClipboardList,
    numeric: [],
    categorical: ["htn", "dm", "cad", "appet", "pe", "ane"],
  },
];

const defaultForm = {
  age: "",
  bp: "",
  sg: "",
  al: "",
  su: "",
  bgr: "",
  bu: "",
  sc: "",
  sod: "",
  pot: "",
  hemo: "",
  pcv: "",
  wc: "",
  rc: "",
  rbc: "normal",
  pc: "normal",
  pcc: "notpresent",
  ba: "notpresent",
  htn: "no",
  dm: "no",
  cad: "no",
  appet: "good",
  pe: "no",
  ane: "no",
};

function toNumberOrNull(v) {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function formatPercent(x) {
  if (typeof x !== "number") return "—";
  return `${(x * 100).toFixed(1)}%`;
}

function riskTone(value) {
  if (typeof value !== "number") return "slate";
  if (value >= 0.6) return "danger";
  if (value >= 0.3) return "warning";
  return "success";
}

const TONE_STYLES = {
  danger: {
    ring: "#DC2626",
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    chip: "bg-red-100 text-red-700",
  },
  warning: {
    ring: "#B45309",
    text: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    chip: "bg-amber-100 text-amber-700",
  },
  success: {
    ring: "#047857",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    chip: "bg-emerald-100 text-emerald-700",
  },
  slate: {
    ring: "#64748B",
    text: "text-slate-600",
    bg: "bg-slate-50",
    border: "border-slate-200",
    chip: "bg-slate-100 text-slate-600",
  },
};

const NumberField = ({ def, value, onChange }) => (
  <div>
    <label className="mb-1.5 flex items-baseline justify-between">
      <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
        {def.label}
      </span>
      {def.unit && (
        <span className="text-[10px] font-medium text-slate-400">{def.unit}</span>
      )}
    </label>
    <input
      type="number"
      name={def.key}
      step={def.step || "any"}
      value={value}
      onChange={onChange}
      placeholder="—"
      className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 font-mono text-sm text-slate-800 tabular-nums transition-colors placeholder:text-slate-300 hover:border-slate-300 focus:border-cyan-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600/15"
    />
  </div>
);

const SelectField = ({ def, value, onChange }) => (
  <div>
    <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500">
      {def.label}
    </label>
    <div className="relative">
      <select
        name={def.name}
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-800 transition-colors hover:border-slate-300 focus:border-cyan-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600/15"
      >
        {def.options.map((op) => (
          <option key={op} value={op}>
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
    </div>
  </div>
);

const RadialGauge = ({ value }) => {
  const tone = TONE_STYLES[riskTone(value)];
  const size = 168;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value || 0));
  const offset = c - pct * c;

  return (
    <div className="relative flex h-[168px] w-[168px] shrink-0 items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF2F6" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone.ring}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 700ms ease, stroke 300ms ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-2xl font-semibold tabular-nums text-slate-900">
          {formatPercent(value)}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
          probability
        </span>
      </div>
    </div>
  );
};

const EcgLoader = () => (
  <div className="flex flex-col items-center justify-center py-14">
    <svg width="220" height="64" viewBox="0 0 220 64" className="text-cyan-600">
      <path
        d="M0 32 H60 L72 10 L86 54 L98 32 H140 L150 20 L160 44 L170 32 H220"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ecg-path"
      />
    </svg>
    <p className="mt-5 text-sm font-medium text-slate-700">Analyzing patient panel…</p>
    <p className="mt-1 text-xs text-slate-400">Cross-referencing clinical markers against the model</p>
    <style jsx>{`
      .ecg-path {
        stroke-dasharray: 340;
        stroke-dashoffset: 340;
        animation: ecg-sweep 1.6s ease-in-out infinite;
      }
      @keyframes ecg-sweep {
        0% {
          stroke-dashoffset: 340;
        }
        60% {
          stroke-dashoffset: 0;
        }
        100% {
          stroke-dashoffset: -340;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .ecg-path {
          animation: none;
          stroke-dashoffset: 0;
        }
      }
    `}</style>
  </div>
);

const SAMPLE_PROFILES = [
  {
    label: "Likely NOT CKD",
    data: Likely_NOT_CKD,
    icon: CheckCircle2,
    tone: "success",
  },
  {
    label: "Borderline CKD",
    data: Borderline_CKD,
    icon: AlertTriangle,
    tone: "warning",
  },
  {
    label: "Likely CKD",
    data: Likely_CKD,
    icon: AlertTriangle,
    tone: "danger",
  },
  {
    label: "Early CKD",
    data: Early_CKD,
    icon: AlertTriangle,
    tone: "warning",
  },
  {
    label: "High-Risk Diabetic CKD",
    data: High_Risk_Diabetic_CKD,
    icon: AlertTriangle,
    tone: "danger",
  },
];

export default function App() {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("input");

  const payload = useMemo(() => {
    return {
      ...form,
      age: toNumberOrNull(form.age),
      bp: toNumberOrNull(form.bp),
      sg: toNumberOrNull(form.sg),
      al: toNumberOrNull(form.al),
      su: toNumberOrNull(form.su),
      bgr: toNumberOrNull(form.bgr),
      bu: toNumberOrNull(form.bu),
      sc: toNumberOrNull(form.sc),
      sod: toNumberOrNull(form.sod),
      pot: toNumberOrNull(form.pot),
      hemo: toNumberOrNull(form.hemo),
      pcv: toNumberOrNull(form.pcv),
      wc: toNumberOrNull(form.wc),
      rc: toNumberOrNull(form.rc),
    };
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setForm(defaultForm);
    setResult(null);
    setError("");
  };

  const loadSample = (data) => {
    setForm(data);
    setActiveTab("input");
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setActiveTab("result");

    try {
      const res = await fetch(PREDICT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "API request failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isCkd = result?.prediction?.toLowerCase() === "ckd";
  const resultTone = result ? (isCkd ? TONE_STYLES.danger : TONE_STYLES.success) : null;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/features"
            className="mb-4 inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
          >
            <ArrowLeftFromLine className="h-3.5 w-3.5" />
            Back to models
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-slate-900 shadow-sm">
                <Activity className="h-5.5 w-5.5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                  CKD Predictor
                </h1>
                <p className="text-xs text-slate-500">
                  Renal risk assessment powered by machine learning
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Clinical Decision Support · v2.0
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Quick start samples */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
            Quick start · sample profiles
          </p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROFILES.map(({ label, data, icon: Icon, tone }) => {
              const t = TONE_STYLES[tone];
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => loadSample(data)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border ${t.border} ${t.bg} px-3 py-2 text-xs font-medium ${t.text} transition-transform hover:-translate-y-0.5 hover:shadow-sm`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 inline-flex rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => setActiveTab("input")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "input"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            Patient Data
          </button>
          <button
            onClick={() => setActiveTab("result")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "result"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Gauge className="h-4 w-4" />
            Prediction Results
            {(result || loading) && (
              <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-cyan-600" />
            )}
          </button>
        </div>

        {/* Input form */}
        {activeTab === "input" && (
          <form onSubmit={submit} className="space-y-5">
            {SECTIONS.map((section) => {
              const SectionIcon = section.icon;
              return (
                <div
                  key={section.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50">
                      <SectionIcon className="h-4.5 w-4.5 text-cyan-700" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">{section.title}</h2>
                      <p className="text-xs text-slate-400">{section.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {section.numeric.map((k) => (
                      <NumberField
                        key={k}
                        def={FIELD_DEFS[k]}
                        value={form[k]}
                        onChange={handleChange}
                      />
                    ))}
                    {section.categorical.map((k) => (
                      <SelectField
                        key={k}
                        def={CATEGORICAL_DEFS[k]}
                        value={form[k]}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Action bar */}
            <div className="sticky bottom-4 flex justify-end gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg shadow-slate-200/60 backdrop-blur">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset form
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-2.5 text-sm font-medium text-white transition-all hover:from-cyan-700 hover:to-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    Run analysis
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Results */}
        {activeTab === "result" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
              <h3 className="mb-1 text-sm font-semibold text-slate-900">Diagnosis Result</h3>
              <p className="mb-4 text-xs text-slate-400">
                Generated from the submitted clinical panel
              </p>

              {loading && <EcgLoader />}

              {!loading && !result && !error && (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="rounded-full bg-slate-100 p-3.5">
                    <Info className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="mt-4 text-sm text-slate-500">
                    No prediction yet. Submit patient data to see a result here.
                  </p>
                  <button
                    onClick={() => setActiveTab("input")}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-cyan-50 px-4 py-2 text-xs font-medium text-cyan-700 hover:bg-cyan-100"
                  >
                    <ClipboardList className="h-3.5 w-3.5" />
                    Go to Patient Data
                  </button>
                </div>
              )}

              {!loading && error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-red-100 p-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-red-800">Request failed</h4>
                      <p className="mt-1 text-xs text-red-600">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {!loading && result && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-6">
                    <RadialGauge value={result.ckd_probability} />
                    <div className="min-w-[180px]">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${resultTone.chip}`}
                      >
                        {isCkd ? (
                          <AlertTriangle className="h-3 w-3" />
                        ) : (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                        {isCkd ? "Elevated risk marker" : "Low risk marker"}
                      </span>
                      <p className="mt-2 text-xs uppercase tracking-wider text-slate-400">
                        Diagnosis
                      </p>
                      <p className={`text-3xl font-bold tracking-tight ${resultTone.text}`}>
                        {result.prediction}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs leading-relaxed text-slate-500">
                      This prediction is generated by an ML model trained on clinical intake
                      features and should be reviewed by a qualified healthcare professional
                      before any diagnostic or treatment decision.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Backend info */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2">
                  <Gauge className="h-4 w-4 text-slate-600" />
                </div>
                <h3 className="text-sm font-medium text-slate-900">Backend Connection</h3>
              </div>
              <div className="mt-3 overflow-x-auto rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-600">
                {PREDICT_URL}
              </div>
              <p className="mt-3 text-xs text-slate-400">
                If you encounter CORS errors, confirm your domain is whitelisted in the
                backend's CORS settings.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}