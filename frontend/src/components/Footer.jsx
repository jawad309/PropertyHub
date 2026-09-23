function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="container footer-content">

        {/* BRAND */}
        <div className="footer-brand">

          <h2>
            Property<span>Hub</span>
          </h2>

          <p>
            Find your next property with confidence.
            Explore, discover and manage properties
            in one place.
          </p>

        </div>

        {/* QUICK INFO */}
        <div className="footer-info">

          <h3>
            PropertyHub
          </h3>

          <p>
            Real Estate & Property Listing Platform
          </p>

          <p>
            Built with MERN Stack
          </p>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="container footer-bottom">

        <p>
          © {currentYear} PropertyHub. All rights reserved.
        </p>

        <p>
          Find • Explore • Manage
        </p>

      </div>

    </footer>
  );
}

export default Footer;