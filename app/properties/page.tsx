 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProperties } from "@/lib/api/properties";
import type { Property } from "@/types/property";

const images = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=85",
];

export default function PropertiesPage() {
  const [items, setItems] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ city: "", rent: "", bedrooms: "", type: "" });

  async function load() {
    setLoading(true);
    try {
      const data = await getProperties({ ...filters, page: 1, per_page: 12 });
      setItems(data.items);
      setTotal(data.meta.total);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

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

        <section className="pageTop">
          <div className="pageTopRow">
            <div>
              <span className="eyebrow">Explore RAHA</span>
              <h1>Available spaces</h1>
              <p>Search through homes that match the way you want to live.</p>
            </div>
            <Link className="back" href="/">← Back home</Link>
          </div>

          <div className="filters">
            <input className="filterInput" placeholder="City" value={filters.city}
              onChange={e => setFilters({...filters, city:e.target.value})} />
            <input className="filterInput" type="number" placeholder="Max rent" value={filters.rent}
              onChange={e => setFilters({...filters, rent:e.target.value})} />
            <select className="filterSelect" value={filters.bedrooms}
              onChange={e => setFilters({...filters, bedrooms:e.target.value})}>
              <option value="">Bedrooms</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option>
            </select>
            <select className="filterSelect" value={filters.type}
              onChange={e => setFilters({...filters, type:e.target.value})}>
              <option value="">Property type</option><option value="APARTMENT">Apartment</option><option value="HOUSE">House</option>
            </select>
            <button className="primaryBtn" onClick={load}>Search</button>
          </div>

          <div className="resultBar">
            <span>{loading ? "Finding spaces…" : `${total} spaces found`}</span>
            <span>Updated from RAHA</span>
          </div>

          {loading ? <div className="empty">Loading spaces…</div> : items.length ? (
            <div className="propertyGrid">
              {items.map((property, index) => (
                <article className="card" key={property.id}>
                  <div className="cardImage" style={{backgroundImage:`url(${images[index % images.length]})`}}>
                    <span className="cardTag">{property.property_type}</span>
                    <button className="favorite" aria-label="Save property">♡</button>
                  </div>
                  <div className="cardBody">
                    <div className="cardTitle">{property.title}</div>
                    <div className="cardMeta">{property.city} · {property.bedrooms} bedrooms</div>
                    <p className="cardMeta">{property.description}</p>
                    <div className="pills">{property.amenities.slice(0,3).map(a => <span className="pill" key={a.id}>{a.name}</span>)}</div>
                    <div className="cardBottom" style={{marginTop:18}}>
                      <div className="price">₹{property.rent.toLocaleString("en-IN")} <small>/ month</small></div>
                      <span className="status">Available</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : <div className="empty">No spaces match those filters. Try widening your search.</div>}
        </section>
      </div>
    </main>
  );
}
