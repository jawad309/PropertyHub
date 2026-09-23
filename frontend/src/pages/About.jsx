import { Link } from "react-router-dom";

function About() {
  return (
    <section className="section about-section">
      <div className="container about-page">

        <div className="page-heading">
          <p>ABOUT PROPERTYHUB</p>

          <h1>Making Property Search Simple</h1>

          <p>
            PropertyHub is a modern real estate platform designed to make
            discovering, listing and managing properties simple and convenient.
          </p>
        </div>

        <div className="about-grid">

          <Link to="/properties" className="about-feature-card">
            <div className="about-card-top">
              <div className="about-icon">🏠</div>
              <span className="about-arrow">↗</span>
            </div>

            <h3>Property Listings</h3>

            <p>
              Explore houses, apartments and plots available on PropertyHub.
            </p>

            <span className="about-link">
              Explore Properties <span>→</span>
            </span>
          </Link>

          <Link to="/properties" className="about-feature-card">
            <div className="about-card-top">
              <div className="about-icon">🔎</div>
              <span className="about-arrow">↗</span>
            </div>

            <h3>Easy Discovery</h3>

            <p>
              Use search and filtering tools to quickly discover properties
              that match your needs.
            </p>

            <span className="about-link">
              Start Searching <span>→</span>
            </span>
          </Link>

          <Link to="/dashboard" className="about-feature-card">
            <div className="about-card-top">
              <div className="about-icon">👤</div>
              <span className="about-arrow">↗</span>
            </div>

            <h3>User Management</h3>

            <p>
              Manage your property listings, add new properties and update
              existing listings from your dashboard.
            </p>

            <span className="about-link">
              Open Dashboard <span>→</span>
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}

export default About;