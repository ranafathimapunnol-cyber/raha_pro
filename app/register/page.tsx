"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/client";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("TENANT");

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();

    setBusy(true);
    setError("");

    try {
      await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      router.push("/signin");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="authPage">
      <section className="authVisual">
        <Link className="brand" href="/">
          RAHA
        </Link>

        <div className="quote">
          <h1>Find a place that feels like yours.</h1>
          <p>
            Discover thoughtful spaces and keep your entire property journey
            together in one calm place.
          </p>
        </div>

        <span style={{ fontSize: 12, opacity: 0.7 }}>
          RAHA · Property discovery, thoughtfully designed
        </span>
      </section>

      <section className="authPanel">
        <div className="authBox">
          <Link className="back" href="/">
            ← Back to home
          </Link>

          <h1 style={{ marginTop: 18 }}>Create your account</h1>

          <p>
            Join RAHA to save homes, manage requests, and explore spaces.
          </p>

          <form className="form" onSubmit={submit}>
            {error && <div className="authError">{error}</div>}

            <div className="formGroup">
              <label htmlFor="name">Full name</label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="formGroup">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
              />
            </div>

          

            <button
              className="primaryBtn"
              type="submit"
              disabled={busy}
            >
              {busy ? "Creating account…" : "Create account →"}
            </button>
          </form>

          <div className="authFooter">
            Already have an account?{" "}
            <Link href="/signin">Sign in</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
