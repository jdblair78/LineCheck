"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form-field";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  async function handleDemoLogin() {
    setIsDemoLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/demo", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(
          result.error ?? "Unable to start the demo."
        );
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage(
        "Something went wrong while starting the demo."
      );
    } finally {
      setIsDemoLoading(false);
    }
  }

  async function handleLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const { error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasError = Boolean(errorMessage);
  const isBusy = isSubmitting || isDemoLoading;

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            LineCheck
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Welcome Back
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <FormField>
            <FormLabel htmlFor="email">
              Email address
            </FormLabel>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              hasError={hasError}
              disabled={isBusy}
              required
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="password">
              Password
            </FormLabel>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              hasError={hasError}
              disabled={isBusy}
              required
            />
          </FormField>

          <FormMessage>{errorMessage}</FormMessage>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            loadingText="Signing in..."
            disabled={isDemoLoading}
          >
            Sign in
          </Button>

          {process.env.NEXT_PUBLIC_DEMO_MODE === "true" && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleDemoLogin}
                isLoading={isDemoLoading}
                loadingText="Opening demo..."
                disabled={isSubmitting}
              >
                Explore the live demo
              </Button>
            </>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}