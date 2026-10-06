import Link from "next/link";
import { getProperties } from "@/lib/api/properties";
import type { Property } from "@/types/property";

const images = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
];

export default async function Home() {
  let properties: Property[] = [];
  try {
    const result = await getProperties({ page: 1, per_page: 3 });
    properties = result.items;
  } catch {}

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

        <section className="hero">
          <div className="heroGrid">
            <div>
              <span className="eyebrow"><span className="eyebrowDot" /> Property discovery, thoughtfully designed</span>
              <h1>Find a place that feels like home.</h1>
              <p className="heroCopy">
                Discover carefully listed spaces, compare what matters, save your favourites,
                and manage your rental journey from one calm platform.
              </p>

              <form className="searchPanel" action="/properties">
                <div className="searchField">
                  <label>Location</label>
                  <input name="city" placeholder="Where do you want to live?" />
                </div>
                <div className="searchField">
                  <label>Type</label>
                  <select name="type" defaultValue="">
                    <option value="">Any property</option>
                    <option value="APARTMENT">Apartment</option>
                    <option value="HOUSE">House</option>
                  </select>
                </div>
                <div className="searchField">
                  <label>Budget</label>
                  <input name="rent" type="number" placeholder="Max rent" />
                </div>
                <button className="primaryBtn" type="submit">Explore</button>
              </form>
            </div>

            <div className="heroVisual">
              <div className="heroBadge">
                <strong>Spaces worth coming home to.</strong>
                <span>Simple discovery. Clear details. Better decisions.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="sectionHeader">
            <div>
              <span className="eyebrow">Curated for you</span>
              <h2>Featured spaces</h2>
            </div>
            <Link className="link" href="/properties">View all →</Link>
          </div>

          {properties.length ? (
            <div className="propertyGrid">
              {properties.map((property, index) => (
                <article className="card" key={property.id}>
                  <div className="cardImage" style={{ backgroundImage: `url(${images[index % images.length]})` }}>
                    <span className="cardTag">{property.property_type}</span>
                    <button className="favorite" aria-label="Save property">♡</button>
                  </div>
                  <div className="cardBody">
                    <div className="cardTitle">{property.title}</div>
                    <div className="cardMeta">{property.city} · {property.bedrooms} bedrooms</div>
                    <div className="cardBottom">
                      <div className="price">₹{property.rent.toLocaleString("en-IN")} <small>/ month</small></div>
                      <div className="pills"><span className="pill">{property.status}</span></div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty">Your featured spaces will appear here once the API is available.</div>
          )}
        </section>
      </div>
    </main>
  );
}
