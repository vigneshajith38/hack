"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <div className="mb-10 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-8">

          <h2 className="text-2xl font-semibold text-neutral-900">
            Create your account
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Start detecting AI-generated voices securely.
          </p>

          <form className="mt-8 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>
              <Input placeholder="John Doe" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>
              <Input
                type="email"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>
              <Input
                type="password"
                placeholder="Create a password"
              />
            </div>

            <Button>
              Create Account
            </Button>

          </form>

          <p className="mt-8 text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-black hover:underline"
            >
              Sign In
            </Link>
          </p>

        </div>

      </div>
    </main>
  );
}