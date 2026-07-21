import Link from "next/link";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />

          <nav className="flex items-center gap-8 text-sm text-neutral-600">
            <Link href="/">Home</Link>
            <Link href="/docs">API Docs</Link>
            <Link href="/login">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <span className="rounded-full border border-neutral-200 bg-white px-4 py-1 text-sm text-neutral-600">
          AI Voice Fraud Detection Platform
        </span>

        <h1 className="mt-8 text-5xl font-bold tracking-tight text-neutral-900">
          Detect AI-generated voices
          <br />
          before they deceive users.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          VoiceShield helps individuals verify suspicious recordings and
          provides developers with a simple API to integrate AI voice fraud
          detection into their applications.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/workspace"
            style={{
              backgroundColor: "#171717",
              color: "#ffffff",
              display: "inline-block",
            }}
            className="rounded-xl px-6 py-3 font-medium"
          >
            <span style={{ color: "#ffffff" }}>Try Demo</span>
          </Link>

          <Link
            href="/docs"
            style={{
              backgroundColor: "#ffffff",
              color: "#171717",
              display: "inline-block",
              border: "1px solid #d4d4d4",
            }}
            className="rounded-xl px-6 py-3 font-medium"
          >
            <span style={{ color: "#171717" }}>Developer API</span>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-10 text-center text-3xl font-semibold">
          How it works
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="text-sm text-neutral-500">Step 1</p>

            <h3 className="mt-3 text-xl font-semibold">
              Upload Audio
            </h3>

            <p className="mt-3 text-neutral-600">
              Upload an audio recording in supported formats.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="text-sm text-neutral-500">Step 2</p>

            <h3 className="mt-3 text-xl font-semibold">
              AI Analysis
            </h3>

            <p className="mt-3 text-neutral-600">
              Our detection model analyzes the recording for synthetic voice
              patterns.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="text-sm text-neutral-500">Step 3</p>

            <h3 className="mt-3 text-xl font-semibold">
              Detection Report
            </h3>

            <p className="mt-3 text-neutral-600">
              Receive confidence scores and the authenticity prediction.
            </p>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold">
            Built for developers
          </h2>

          <p className="mt-5 max-w-2xl text-neutral-600">
            Integrate VoiceShield into your application using our REST API.
            Send an audio file and receive a prediction with confidence and
            probability scores.
          </p>

          <Link
            href="/docs"
            style={{
              backgroundColor: "#ffffff",
              color: "#171717",
              display: "inline-block",
              border: "1px solid #d4d4d4",
            }}
            className="mt-8 rounded-xl px-6 py-3 font-medium"
          >
            <span style={{ color: "#171717" }}>View API Documentation</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-neutral-500">
        © 2026 VoiceShield. All rights reserved.
      </footer>
    </main>
  );
}