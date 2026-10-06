 "use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api/client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await api<any>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const token = data.access_token || data.token;
      if (token) localStorage.setItem("raha_token", token);
      if (data.user) localStorage.setItem("raha_user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="authPage">
      <section className="authVisual">
        <Link className="brand" href="/">RAHA</Link>
        <div className="quote">
          <h1>A calmer way to find where you belong.</h1>
          <p>Keep your saved homes, rental requests, and property journey in one thoughtful place.</p>
        </div>
        <span style={{fontSize:12, opacity:.7}}>RAHA · Property discovery, thoughtfully designed</span>
      </section>

      <section className="authPanel">
        <div className="authBox">
          <Link className="back" href="/">← Back to home</Link>
          <h1 style={{marginTop:18}}>Welcome back</h1>
          <p>Sign in to continue exploring and managing your RAHA account.</p>

          <form className="form" onSubmit={submit}>
            {error && <div className="authError">{error}</div>}
            <div className="formGroup">
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" autoComplete="email" required value={email}
                onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" autoComplete="current-password" required value={password}
                onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>
            <button className="primaryBtn" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in →"}</button>
          </form>

<div className="authFooter">
  New to RAHA? <Link href="/register">Create an account</Link>
</div>        </div>
      </section>
    </main>
  );
}
