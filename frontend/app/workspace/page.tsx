"use client";
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function WorkspacePage() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyzeAudio() {
    if (!selectedFile) {
      alert("Please select an audio file first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        "https://voiceshield-backend-nebm.onrender.com/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();

      console.log(result);

      localStorage.setItem(
        "analysisResult",
        JSON.stringify(result)
      );

      router.push("/results");

    } catch (error) {
      console.error("Analysis error:", error);
      alert("Analysis failed: " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50">

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


        <div className="mt-10">

          <div className="rounded-2xl border border-neutral-200 bg-white p-8">

            <h2 className="text-xl font-semibold">
              Upload Recording
            </h2>


            <input
              type="file"
              accept=".mp3,.wav,.m4a"
              onChange={(e) => {
                if (e.target.files?.length) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              className="mt-8 block w-full"
            />


            {selectedFile && (
              <p className="mt-4 text-sm text-neutral-600">
                Selected: {selectedFile.name}
              </p>
            )}


            <button
              onClick={analyzeAudio}
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-black py-3 text-white disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Recording"}
            </button>


          </div>

        </div>

      </div>

    </main>
  );
}


                  