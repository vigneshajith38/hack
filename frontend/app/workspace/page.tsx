"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function WorkspacePage() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />

          <nav className="flex items-center gap-8 text-sm text-neutral-600">
            <Link href="/">Home</Link>
            <Link href="/docs">API Docs</Link>
            <Link href="/login">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-bold text-neutral-900">
          Workspace
        </h1>

        <p className="mt-2 text-neutral-600">
          Upload an audio recording to verify whether it is authentic or AI-generated.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">

          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-8">

              <h2 className="text-xl font-semibold">
                Upload Recording
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Supported formats: MP3, WAV, M4A
              </p>

              <div className="mt-8 rounded-xl border-2 border-dashed border-neutral-300 p-12 text-center">

                <p className="text-lg font-medium text-neutral-700">
                  Drag & Drop Audio Here
                </p>

                <p className="mt-2 text-sm text-neutral-500">
                  or click below to browse your files
                </p>

                <input
                  type="file"
                  accept=".mp3,.wav,.m4a"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                  className="mt-8 block w-full text-sm text-neutral-600
                  file:mr-4
                  file:rounded-lg
                  file:border-0
                  file:bg-black
                  file:px-4
                  file:py-2
                  file:text-white
                  hover:file:bg-neutral-800"
                />

                {selectedFile && (
                  <p className="mt-4 text-sm text-neutral-600">
                    Selected File:{" "}
                    <span className="font-medium">{selectedFile.name}</span>
                  </p>
                )}

              </div>

              <button
                onClick={() => {
                  if (!selectedFile) {
                    alert("Please select an audio file first.");
                    return;
                  }

                  setLoading(true);

                  // Temporary until backend integration
                  setTimeout(() => {
                    router.push("/results");
                  }, 1000);
                }}
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-black py-3 text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze Recording"}
              </button>

            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">

            {/* Developer Tools */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">

              <h2 className="text-lg font-semibold">
                Developer Tools
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Integrate VoiceShield into your application.
              </p>

              <div className="mt-5 rounded-lg bg-neutral-100 p-3 font-mono text-sm">
                POST /analyze
              </div>

              <Link
                href="/docs"
                className="mt-5 inline-block text-sm font-medium text-black hover:underline"
              >
                View Documentation →
              </Link>

            </div>

            {/* Recent Analysis */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">

              <h2 className="text-lg font-semibold">
                Recent Analysis
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    meeting.wav
                  </span>

                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs">
                    Authentic
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    bank_call.mp3
                  </span>

                  <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
                    Synthetic
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    interview.m4a
                  </span>

                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs">
                    Authentic
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}