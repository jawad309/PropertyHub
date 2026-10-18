import { Link } from "react-router-dom";

const features = [
  {
    icon: "⌕",
    title: "Smart Property Search",
    text: "Find properties by location, type and your preferences.",
  },
  {
    icon: "⌂",
    title: "Beautiful Properties",
    text: "Explore houses, apartments and plots in one place.",
  },
  {
    icon: "✓",
    title: "Easy Management",
    text: "Manage your property listings from your dashboard.",
  },
];

function Home() {
  return (
    <div className="home-page">
      {/* HERO */}
      <section className="modern-hero">
        <div className="hero-overlay"></div>

        <div className="modern-hero-content">
          <div className="hero-pill">
            <span className="live-dot"></span>
            YOUR JOURNEY HOME STARTS HERE
          </div>

          <h1>
            Find Your
            <br />
            <span>Perfect Place.</span>
          </h1>

          <p className="modern-hero-description">
            Discover beautiful homes, modern apartments and amazing
            properties. Your next chapter starts with PropertyHub.
          </p>

          <div className="modern-hero-buttons">
            <Link to="/properties" className="modern-primary-btn">
              Explore Properties <span>↗</span>
            </Link>

            <Link to="/about" className="modern-outline-btn">
              Discover PropertyHub
            </Link>
          </div>

          {/* SEARCH BOX */}
          <form
            className="hero-search-box"
            onSubmit={(e) => {
              e.preventDefault();

              const query = e.currentTarget.elements.location.value.trim();

              window.location.href = query
                ? `/properties?search=${encodeURIComponent(query)}`
                : "/properties";
            }}
          >
            <div className="search-field">
              <span className="search-field-icon">⌖</span>

              <div>
                <label htmlFor="hero-location">LOCATION</label>

                <input
                  id="hero-location"
                  name="location"
                  type="text"
                  placeholder="Enter city or location"
                />
              </div>
            </div>

            <div className="search-divider"></div>

            <div className="search-field">
              <span className="search-field-icon">⌂</span>

              <div>
                <label>PROPERTY TYPE</label>
                <span className="search-field-hint">
                  Houses, apartments & plots
                </span>
              </div>
            </div>

            <button type="submit" className="hero-search-btn">
              Search Properties <span>→</span>
            </button>
          </form>

          <div className="hero-bottom-note">
            <span>✦</span> Discover. Explore. Find Your Place.
          </div>
        </div>

        <div className="hero-side-label">PROPERTYHUB · REAL ESTATE</div>
      </section>

      {/* INTRO STRIP */}
      <section className="modern-intro">
        <div>
          <span className="intro-eyebrow">WELCOME TO PROPERTYHUB</span>

          <h2>
            A better way to find
            <br />
            <span>your next home.</span>
          </h2>
        </div>

        <p>
          From your first search to exploring property details, PropertyHub
          makes the property discovery experience simple, organized and
          convenient.
        </p>

        <Link to="/properties" className="intro-link">
          Explore all properties <span>↗</span>
        </Link>
      </section>

      {/* FEATURES */}
      <section className="modern-features">
        <div className="features-heading">
          <div>
            <span className="intro-eyebrow">THE PROPERTYHUB EXPERIENCE</span>
            <h2>Everything, in one place.</h2>
          </div>

          <p>
            Simple tools to help you explore and manage properties with ease.
          </p>
        </div>

        <div className="modern-feature-grid">
          {features.map((feature, index) => (
            <article className="modern-feature-card" key={feature.title}>
              <div className="feature-card-top">
                <span className="modern-feature-icon">{feature.icon}</span>
                <span className="modern-feature-number">
                  0{index + 1}
                </span>
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>

              <Link to="/properties" className="feature-card-link">
                Explore more <span>↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* IMAGE CTA */}
      <section className="modern-cta-section">
        <div className="modern-cta">
          <div className="modern-cta-image"></div>

          <div className="modern-cta-content">
            <span className="intro-eyebrow">YOUR NEXT CHAPTER</span>

            <h2>
              Somewhere
              <br />
              <span>you belong.</span>
            </h2>

            <p>
              The right property is waiting to be discovered. Start exploring
              today and take the next step towards your ideal place.
            </p>

            <Link to="/properties" className="modern-primary-btn">
              Find Your Property <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;