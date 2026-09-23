import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">

          <div className="hero-text">
            <div className="hero-badge">
              <span>●</span>
              PROPERTY DISCOVERY MADE SIMPLE
            </div>

            <h1>
              Find a Place
              <span> You'll Love.</span>
            </h1>

            <p>
              Discover houses, apartments and plots in great locations.
              Search smarter, explore confidently and manage your listings
              with PropertyHub.
            </p>

            <div className="hero-buttons">
              <Link
                to="/properties"
                className="primary-btn hero-main-btn"
              >
                Explore Properties
                <span>→</span>
              </Link>

              <Link
                to="/dashboard"
                className="secondary-btn hero-secondary-btn"
              >
                List Your Property
              </Link>
            </div>

            <div className="hero-trust">
              <span>
                <b>✓</b> Easy Search
              </span>

              <span>
                <b>✓</b> Multiple Locations
              </span>

              <span>
                <b>✓</b> Simple Management
              </span>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="hero-visual">

            <div className="hero-main-card">

              <div className="hero-image-placeholder">
                <div className="hero-house-icon">
                  🏡
                </div>

                <span className="hero-image-label">
                  PROPERTYHUB
                </span>
              </div>

              <div className="hero-property-info">
                <div>
                  <span>FEATURED PROPERTY</span>

                  <h3>
                    Find Your New Home
                  </h3>

                  <p>
                    Explore quality properties in your preferred location.
                  </p>
                </div>

                <div className="hero-property-icon">
                  →
                </div>
              </div>

            </div>

            <div className="hero-floating-card hero-floating-top">
              <span>🏠</span>

              <div>
                <strong>Quality Listings</strong>
                <small>Explore with confidence</small>
              </div>
            </div>

            <div className="hero-floating-card hero-floating-bottom">
              <div className="floating-check">
                ✓
              </div>

              <div>
                <strong>Easy Property Search</strong>
                <small>Find what you need faster</small>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container stats">

          <div className="stat-item">
            <span className="stat-icon">🏠</span>

            <div>
              <h2>500+</h2>
              <p>Properties Listed</p>
            </div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">👥</span>

            <div>
              <h2>200+</h2>
              <p>Happy Clients</p>
            </div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">📍</span>

            <div>
              <h2>50+</h2>
              <p>Locations</p>
            </div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">✓</span>

            <div>
              <h2>100+</h2>
              <p>Verified Listings</p>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="section home-features">
        <div className="container">

          <div className="section-heading">
            <p>WHY PROPERTYHUB?</p>

            <h2>
              Everything You Need in One Place
            </h2>

            <p>
              PropertyHub brings property discovery and listing management
              together in a simple and convenient platform.
            </p>
          </div>

          <div className="features">

            <div className="feature-card">
              <div className="feature-icon">
                🔍
              </div>

              <div className="feature-number">
                01
              </div>

              <h3>
                Easy Search
              </h3>

              <p>
                Quickly search and filter properties according to your
                preferred location, type and requirements.
              </p>

              <Link to="/properties">
                Search Properties →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                🏡
              </div>

              <div className="feature-number">
                02
              </div>

              <h3>
                Wide Selection
              </h3>

              <p>
                Explore houses, apartments and plots available across
                different locations.
              </p>

              <Link to="/properties">
                Browse Listings →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                🔐
              </div>

              <div className="feature-number">
                03
              </div>

              <h3>
                Secure Management
              </h3>

              <p>
                Create an account and manage your own property listings
                through your personal dashboard.
              </p>

              <Link to="/dashboard">
                Open Dashboard →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-section">
        <div className="container">

          <div className="section-heading">
            <p>HOW IT WORKS</p>

            <h2>
              Find Your Property in Three Simple Steps
            </h2>
          </div>

          <div className="steps">

            <div className="step-card">
              <span>01</span>

              <div className="step-icon">
                🔎
              </div>

              <h3>
                Explore
              </h3>

              <p>
                Browse available properties and use search to find relevant
                listings.
              </p>
            </div>

            <div className="step-line"></div>

            <div className="step-card">
              <span>02</span>

              <div className="step-icon">
                📄
              </div>

              <h3>
                View Details
              </h3>

              <p>
                Open a property to view its location, price, features and
                description.
              </p>
            </div>

            <div className="step-line"></div>

            <div className="step-card">
              <span>03</span>

              <div className="step-icon">
                👤
              </div>

              <h3>
                Manage
              </h3>

              <p>
                Login to your account and manage your own property listings.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section home-cta">
        <div className="container">

          <div className="home-cta-card">

            <div className="cta-content">
              <p className="hero-small">
                READY TO GET STARTED?
              </p>

              <h2>
                Your Next Property
                <span> Could Be Here.</span>
              </h2>

              <p>
                Explore available properties and discover a place that
                matches what you're looking for.
              </p>
            </div>

            <div className="cta-actions">
              <Link
                to="/properties"
                className="primary-btn"
              >
                Explore Properties →
              </Link>

              <Link
                to="/about"
                className="cta-about-link"
              >
                Learn More About PropertyHub
              </Link>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;