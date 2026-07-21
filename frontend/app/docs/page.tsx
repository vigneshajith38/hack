import Link from "next/link";
import Logo from "@/components/Logo";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />

          <nav className="flex items-center gap-8 text-sm text-neutral-600">
            <Link href="/">Home</Link>
            <Link href="/workspace">Workspace</Link>
            <Link href="/login">Login</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">

        <h1 className="text-4xl font-bold">
          API Documentation
        </h1>

        <p className="mt-3 text-neutral-600">
          Integrate VoiceShield into your application using our REST API.
        </p>

        {/* Endpoint */}
        <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-8">

          <p className="text-sm text-neutral-500">
            Endpoint
          </p>

          <div className="mt-3 rounded-lg bg-neutral-100 p-4 font-mono">
            POST /analyze
          </div>

        </section>

        {/* Request */}
        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-8">

          <h2 className="text-2xl font-semibold">
            Request
          </h2>

          <div className="mt-6 space-y-5">

            <div>
              <p className="font-medium">
                Content-Type
              </p>

              <div className="mt-2 rounded-lg bg-neutral-100 p-3 font-mono">
                multipart/form-data
              </div>
            </div>

            <div>
              <p className="font-medium">
                Form Field
              </p>

              <div className="mt-2 rounded-lg bg-neutral-100 p-3 font-mono">
                file
              </div>
            </div>

          </div>

        </section>

        {/* Response */}
        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-8">

          <h2 className="text-2xl font-semibold">
            Sample Response
          </h2>

          <pre className="mt-6 overflow-x-auto rounded-xl bg-neutral-900 p-6 text-sm text-white">
{`{
  "label": "synthetic",
  "synthetic_probability": 0.91,
  "confidence": "high",
  "duration_seconds": 18.4,
  "model_version": "v1.0"
}`}
          </pre>

        </section>

        {/* Example */}
        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-8">

          <h2 className="text-2xl font-semibold">
            Python Example
          </h2>

          <pre className="mt-6 overflow-x-auto rounded-xl bg-neutral-900 p-6 text-sm text-white">
{`import requests

url = "http://localhost:8000/analyze"

files = {
    "file": open("sample.wav","rb")
}

response = requests.post(url, files=files)

print(response.json())
`}
          </pre>

        </section>

      </div>
    </main>
  );
}