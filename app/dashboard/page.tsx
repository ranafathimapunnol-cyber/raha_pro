 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = { name?: string; email?: string; role?: string };

export default function DashboardPage() {
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("raha_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const name = user.name || user.email?.split("@")[0] || "there";

  return (
    <main className="shell">
      <div className="container">
        <nav className="nav">
          <Link className="brand" href="/">RAHA</Link>
          <div className="navLinks">
            <Link href="/properties">Explore</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link className="navCta" href="/signin">Sign in</Link>
          </div>
        </nav>

        <div className="dashboard">
          <aside className="sidebar">
            <div className="sidebarBrand">Your RAHA</div>
            <nav className="sideNav">
              <a className="active" href="#overview">Overview</a>
              <a href="#saved">Saved spaces</a>
              <a href="#requests">Rental requests</a>
              <a href="#owner">Owner tools</a>
            </nav>
          </aside>

          <section className="mainDash">
            <div className="dashHeader">
              <div>
                <span className="eyebrow">Your space</span>
                <h1>Good to see you, {name}.</h1>
              </div>
              <div className="userChip"><span className="avatar">{name[0]?.toUpperCase()}</span><span>{user.role || "Member"}</span></div>
            </div>

            <div className="statGrid" id="overview">
              <div className="stat"><span className="statLabel">Saved properties</span><strong className="statValue">0</strong></div>
              <div className="stat"><span className="statLabel">Open requests</span><strong className="statValue">0</strong></div>
              <div className="stat"><span className="statLabel">Role</span><strong className="statValue" style={{fontSize:24}}>{user.role || "USER"}</strong></div>
            </div>

            <div className="dashGrid">
              <section className="panel" id="saved">
                <h2>Saved spaces</h2>
                <div className="empty">No saved properties yet.<br /><br /><Link className="link" href="/properties">Browse available spaces →</Link></div>
              </section>

              <section className="panel" id="requests">
                <h2>Rental requests</h2>
                <div className="list">
                  <div className="listItem"><div><strong>No active requests</strong><span>Your rental activity will appear here.</span></div><span className="status">Clear</span></div>
                </div>
              </section>
            </div>

            <section className="panel" id="owner" style={{marginTop:16}}>
              <h2>Owner tools</h2>
              <div className="list">
                <div className="listItem"><div><strong>Manage your listings</strong><span>Add, update, or review properties you own.</span></div><span className="status">Ready</span></div>
                <div className="listItem"><div><strong>Review requests</strong><span>Keep track of rental requests from tenants.</span></div><span className="status">Ready</span></div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
