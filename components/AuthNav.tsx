"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
};

export default function AuthNav() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("raha_token");
    const storedUser = localStorage.getItem("raha_user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("raha_user");
      }
    }

    setReady(true);
  }, []);

  function logout() {
    localStorage.removeItem("raha_token");
    localStorage.removeItem("raha_user");
    setUser(null);
    router.push("/");
    router.refresh();
  }

  if (!ready) {
    return null;
  }

  if (!user) {
    return (
      <nav className="siteNav">
        <Link href="/properties">Explore</Link>
        <Link href="/signin">Sign in</Link>
        <Link className="navCta" href="/register">
          Create account
        </Link>
      </nav>
    );
  }

  return (
    <nav className="siteNav">
      <Link href="/properties">Explore</Link>

      <Link href="/dashboard">Dashboard</Link>

      <span className="navUser">
        {user.name || user.email}
      </span>

      <button type="button" className="navCta" onClick={logout}>
        Sign out
      </button>
    </nav>
  );
}
