import { Link } from "react-router-dom";

function About() {
return ( <section className="section about-section"> <div className="container about-page">


    <div className="page-heading">
      <p>ABOUT PROPERTYHUB</p>

      <h1>Making Property Search Simple</h1>

      <p>
        PropertyHub is a modern real estate platform designed to make
        discovering, listing and managing properties simple and convenient.
        Our goal is to provide users with an easy and reliable property
        browsing experience.
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
          Find property options that suit your needs.
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
          Use search and filtering tools to discover properties
          according to your preferences and requirements.
        </p>

        <span className="about-link">
          Start Searching <span>→</span>
        </span>
      </Link>

      <Link to="/dashboard" className="about-feature-card">
        <div className="about-card-top">
          <div className="about-icon">📊</div>
          <span className="about-arrow">↗</span>
        </div>

        <h3>Property Management</h3>

        <p>
          Add new properties, manage your listings and update existing
          property details through the dashboard.
        </p>

        <span className="about-link">
          Open Dashboard <span>→</span>
        </span>
      </Link>

    </div>

    <div className="about-bottom">
      <h2>Find Your Next Property with PropertyHub</h2>

      <p>
        Whether you are searching for a new home or managing property
        listings, PropertyHub makes the process simple and convenient.
      </p>

      <Link to="/properties" className="btn btn-primary">
        Browse Properties →
      </Link>
    </div>

  </div>
</section>


);
}

export default About;
