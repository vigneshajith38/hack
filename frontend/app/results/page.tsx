"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function ResultsPage() {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("analysisResult");

    if (data) {
      setAnalysis(JSON.parse(data));
    }
  }, []);

  if (!analysis) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />

          <nav className="flex items-center gap-8 text-sm text-neutral-600">
            <Link href="/">Home</Link>
            <Link href="/workspace">Workspace</Link>
            <Link href="/docs">API Docs</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">

        <h1 className="text-3xl font-bold">
          Analysis Result
        </h1>

        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-8">

          <div className="flex items-center justify-between border-b pb-6">

            <div>
              <p className="text-sm text-neutral-500">
                Prediction
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                {analysis.label}
              </h2>
            </div>

            <span className="rounded-full bg-black px-4 py-2 text-white">
              {analysis.label}
            </span>

          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-4">

            <div className="rounded-xl border p-5">
              <p className="text-sm text-neutral-500">
                Probability
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {(analysis.synthetic_probability * 100).toFixed(2)}%
              </h2>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-sm text-neutral-500">
                Confidence
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {analysis.confidence}
              </h2>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-sm text-neutral-500">
                Duration
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {analysis.duration_seconds}s
              </h2>
            </div>

            <div className="rounded-xl border p-5">
              <p className="text-sm text-neutral-500">
                Model
              </p>

              <h2 className="mt-2 text-sm font-semibold break-all">
                {analysis.model_version}
              </h2>
            </div>

          </div>

          <div className="mt-10 flex gap-4">

            <Link
              href="/workspace"
              className="rounded-xl bg-black px-6 py-3 text-white"
            >
              Analyze Another File
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}