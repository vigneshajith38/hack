"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8">

          <h2 className="text-2xl font-semibold text-neutral-900">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Sign in to continue to VoiceShield.
          </p>

          <form className="mt-8 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Email
              </label>

              <Input
                type="email"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-neutral-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-neutral-500 hover:text-black"
                >
                  Forgot?
                </button>
              </div>

              <Input
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <Button>
              Sign In
            </Button>

          </form>

          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="px-4 text-sm text-neutral-400">or</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <button
            className="
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-neutral-300
            bg-white
            py-3
            text-sm
            font-medium
            transition
            hover:bg-neutral-100
            "
          >
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-neutral-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-black hover:underline"
            >
              Create one
            </Link>
          </p>

        </div>

      </div>
    </main>
  );
}