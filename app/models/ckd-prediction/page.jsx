"use client"

import { useMemo, useState } from "react";
import { Boderline_CKD, Likely_NOT_CKD, Likely_CKD } from "@/app/data/ckd";
import { ArrowBigLeft, ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";

const API_BASE_URL = "https://ckd-prediction-backend.onrender.com";
const PREDICT_URL = `${API_BASE_URL}/predict`;

const yesNo = ["yes", "no"];
const normalAbnormal = ["normal", "abnormal"];
const presentNot = ["present", "notpresent"];
const goodPoor = ["good", "poor"];

const numericFields = [
  { key: "age", label: "Age", unit: "years", icon: "👤" },
  { key: "bp", label: "Blood Pressure", unit: "mmHg", icon: "❤️" },
  { key: "sg", label: "Specific Gravity", step: "0.005", icon: "⚖️" },
  { key: "al", label: "Albumin", icon: "🧪" },
  { key: "su", label: "Sugar", icon: "🍬" },
  { key: "bgr", label: "Blood Glucose Random", unit: "mg/dL", icon: "💉" },
  { key: "bu", label: "Blood Urea", unit: "mg/dL", icon: "🩸" },
  { key: "sc", label: "Serum Creatinine", unit: "mg/dL", icon: "🔬" },
  { key: "sod", label: "Sodium", unit: "mEq/L", icon: "🧂" },
  { key: "pot", label: "Potassium", unit: "mEq/L", icon: "⚡" },
  { key: "hemo", label: "Hemoglobin", unit: "g/dL", icon: "🩸" },
  { key: "pcv", label: "Packed Cell Volume", unit: "%", icon: "📊" },
  { key: "wc", label: "White Blood Cell Count", unit: "cells/µL", icon: "🔬" },
  { key: "rc", label: "Red Blood Cell Count", unit: "M/µL", icon: "🔄" },
];

const categoricalFields = [
  { label: "Red Blood Cells", name: "rbc", options: normalAbnormal, icon: "🔴" },
  { label: "Pus Cell", name: "pc", options: normalAbnormal, icon: "⚪" },
  { label: "Pus Cell Clumps", name: "pcc", options: presentNot, icon: "🧫" },
  { label: "Bacteria", name: "ba", options: presentNot, icon: "🦠" },
  { label: "Hypertension", name: "htn", options: yesNo, icon: "💓" },
  { label: "Diabetes Mellitus", name: "dm", options: yesNo, icon: "🍬" },
  { label: "Coronary Artery Disease", name: "cad", options: yesNo, icon: "❤️" },
  { label: "Appetite", name: "appet", options: goodPoor, icon: "🍽️" },
  { label: "Pedal Edema", name: "pe", options: yesNo, icon: "🦶" },
  { label: "Anemia", name: "ane", options: yesNo, icon: "💉" },
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
  if (typeof x !== "number") return "-";
  return `${(x * 100).toFixed(2)}%`;
}

// Move components outside the main component
const Select = ({ label, name, options, icon, value, onChange }) => (
  <div className="group relative">
    <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider">
      {icon} {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 transition-all hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
    >
      {options.map((op) => (
        <option key={op} value={op}>
          {op.charAt(0).toUpperCase() + op.slice(1)}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-400">
      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
      </svg>
    </div>
  </div>
);

const NumberInput = ({ label, name, step, unit, icon, value, onChange }) => (
  <div className="group relative">
    <label className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wider">
      {icon} {label}
    </label>
    <div className="relative">
      <input
        type="number"
        name={name}
        step={step || "any"}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 transition-all hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {unit && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          {unit}
        </span>
      )}
    </div>
  </div>
);

const ProgressBar = ({ value }) => {
  const percentage = value * 100;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div 
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <Link href="/features" className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-gray-700 bg-blue-100 px-2 py-1 rounded-lg">
                <ArrowLeftFromLine className="h-4 w-4" />
              Go Back to Models
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                CKD Predictor
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Advanced ML-powered Chronic Kidney Disease Detection
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                🏥 Clinical Version 2.0
              </span>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                setForm(Likely_NOT_CKD);
                setActiveTab("input");
              }}
              className="mt-4 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-100"
            >
              Load Sample: Likely NOT CKD
            </button>
            <button
              onClick={() => {
                setForm(Boderline_CKD);
                setActiveTab("input");
              } }
              className="mt-4 ml-2 rounded-lg bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-600 hover:bg-yellow-100"
            >
              
          Load Sample: Borderline CKD

            </button>
            <button
              onClick={() => {
                setForm(Likely_CKD);
                setActiveTab("input");
              } }
              className="mt-4 ml-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
            >
              Load Sample: Likely CKD
            </button>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("input")}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "input"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📋 Patient Data
          </button>
          <button
            onClick={() => setActiveTab("result")}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "result"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📊 Prediction Results
          </button>
        </div>

        {/* Form Section */}
        {activeTab === "input" && (
          <form onSubmit={submit} className="space-y-6">
            {/* Numeric Features */}
            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-gray-200/50">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-blue-50 p-2">
                  <span className="text-lg">📊</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Numeric Features</h2>
                <span className="ml-auto text-xs text-gray-400">Enter all values</span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {numericFields.map((f) => (
                  <NumberInput
                    key={f.key}
                    label={f.label}
                    name={f.key}
                    step={f.step}
                    unit={f.unit}
                    icon={f.icon}
                    value={form[f.key]}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>

            {/* Categorical Features */}
            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-gray-200/50">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-purple-50 p-2">
                  <span className="text-lg">🔤</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Categorical Features</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoricalFields.map((f) => (
                  <Select
                    key={f.name}
                    label={f.label}
                    name={f.name}
                    options={f.options}
                    icon={f.icon}
                    value={form[f.name]}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={reset}
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={loading}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-3 text-sm font-medium text-white transition-all hover:from-gray-900 hover:to-black disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Analyze Patient Data
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        )}

        {/* Results Section */}
        {activeTab === "result" && (
          <div className="space-y-6">
            {/* Prediction Card */}
            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-gray-200/50">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Diagnosis Result</h3>
              
              {!result && !error && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-100 p-4">
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="mt-4 text-gray-500">No prediction yet. Please submit patient data first.</p>
                  <button
                    onClick={() => setActiveTab("input")}
                    className="mt-4 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                  >
                    Go to Input Form
                  </button>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-red-100 p-2">
                      <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800">API Error</h4>
                      <p className="mt-1 text-sm text-red-600">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`rounded-full p-4 ${
                      result.prediction?.toLowerCase() === "ckd" 
                        ? "bg-red-50" 
                        : "bg-green-50"
                    }`}>
                      {result.prediction?.toLowerCase() === "ckd" ? (
                        <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      ) : (
                        <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Diagnosis</p>
                      <p className={`text-3xl font-bold ${
                        result.prediction?.toLowerCase() === "ckd" 
                          ? "text-red-600" 
                          : "text-green-600"
                      }`}>
                        {result.prediction}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <p className="mb-2 text-sm text-gray-500">CKD Probability</p>
                    <div className="flex items-center gap-4">
                      <ProgressBar value={result.ckd_probability || 0} />
                      <span className="text-lg font-semibold text-gray-900">
                        {formatPercent(result.ckd_probability)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-4">
                    <p className="text-xs text-gray-500">
                      ⚕️ This prediction is generated by an ML model and should be reviewed by a healthcare professional.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* API Info Card */}
            <div className="rounded-2xl bg-white p-6 shadow-lg shadow-gray-200/50">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-900">Backend Connection</h3>
              </div>
              <div className="mt-3 rounded-lg bg-gray-50 p-3 font-mono text-xs text-gray-600">
                {PREDICT_URL}
              </div>
              <p className="mt-3 text-xs text-gray-500">
                ⚠️ If you encounter CORS errors, ensure your domain is whitelisted in the backend CORS settings.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}