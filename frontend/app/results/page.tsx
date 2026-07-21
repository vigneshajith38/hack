import Link from "next/link";
import Logo from "@/components/Logo";

const analysis = {
  fileName: "bank_call.mp3",
  label: "Synthetic",
  confidence: 91.3,
  duration: "18.4 sec",
  model: "VoiceShield v1.0",
};

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
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

        <h1 className="text-3xl font-bold text-neutral-900">
          Analysis Result
        </h1>

        <p className="mt-2 text-neutral-600">
          The uploaded recording has been analyzed successfully.
        </p>

        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-8">

          <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
            <div>
              <p className="text-sm text-neutral-500">
                Uploaded File
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                {analysis.fileName}
              </h2>
            </div>

            <span className="rounded-full bg-black px-4 py-2 text-sm text-white">
              {analysis.label}
            </span>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            <div className="rounded-xl border border-neutral-200 p-5">
              <p className="text-sm text-neutral-500">
                Confidence
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {analysis.confidence}%
              </h2>
            </div>

            <div className="rounded-xl border border-neutral-200 p-5">
              <p className="text-sm text-neutral-500">
                Duration
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {analysis.duration}
              </h2>
            </div>

            <div className="rounded-xl border border-neutral-200 p-5">
              <p className="text-sm text-neutral-500">
                Model
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {analysis.model}
              </h2>
            </div>

          </div>

          <div className="mt-10 flex gap-4">

            <Link
              href="/workspace"
              className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-neutral-800"
            >
              Analyze Another File
            </Link>

            <Link
              href="/docs"
              className="rounded-xl border border-neutral-300 px-6 py-3 transition hover:bg-neutral-100"
            >
              API Documentation
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}