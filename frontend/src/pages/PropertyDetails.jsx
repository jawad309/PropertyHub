import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProperty } from "../services/api";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProperty(id);

        setProperty(data);
      } catch (err) {
        setError("Unable to load property.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // LOADING
  if (loading) {
    return (
      <section className="section property-details-page">
        <div className="container">

          <div className="details-loading">
            <div className="loading-icon">
              🏠
            </div>

            <h2>
              Loading Property...
            </h2>

            <p>
              Please wait while we fetch the property details.
            </p>
          </div>

        </div>
      </section>
    );
  }

  // ERROR
  if (error) {
    return (
      <section className="section property-details-page">
        <div className="container">

          <div className="details-error">
            <div className="error-icon">
              ⚠️
            </div>

            <h2>
              Something Went Wrong
            </h2>

            <p>
              {error}
            </p>

            <Link
              to="/properties"
              className="primary-btn"
            >
              ← Back to Properties
            </Link>
          </div>

        </div>
      </section>
    );
  }

  // PROPERTY NOT FOUND
  if (!property) {
    return (
      <section className="section property-details-page">
        <div className="container">

          <div className="details-error">
            <div className="error-icon">
              🔍
            </div>

            <h2>
              Property Not Found
            </h2>

            <p>
              The property you're looking for may have been
              removed or is no longer available.
            </p>

            <Link
              to="/properties"
              className="primary-btn"
            >
              ← Browse Properties
            </Link>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="section property-details-page">
      <div className="container">

        {/* BACK LINK */}
        <Link
          to="/properties"
          className="back-link"
        >
          ← Back to Properties
        </Link>

        {/* DETAILS */}
        <div className="property-details">

          {/* IMAGE */}
          <div className="property-details-image">

            <img
              src={
                property.image ||
                "https://via.placeholder.com/800x500"
              }
              alt={property.title}
            />

            <div className="details-image-badge">
              {property.type}
            </div>

          </div>

          {/* CONTENT */}
          <div className="property-details-content">

            <div className="details-top">

              <span className="property-type">
                {property.type}
              </span>

              <span className="details-status">
                Available
              </span>

            </div>

            <h1>
              {property.title}
            </h1>

            <p className="location">
              📍 {property.location}
            </p>

            <div className="details-price">
              <span>
                PRICE
              </span>

              <h2>
                PKR{" "}
                {Number(property.price).toLocaleString()}
              </h2>
            </div>

            {/* FEATURES */}
            <div className="property-features details-features">

              <div>
                <span className="details-feature-icon">
                  🛏
                </span>

                <strong>
                  {property.bedrooms || 0}
                </strong>

                <small>
                  Bedrooms
                </small>
              </div>

              <div>
                <span className="details-feature-icon">
                  🚿
                </span>

                <strong>
                  {property.bathrooms || 0}
                </strong>

                <small>
                  Bathrooms
                </small>
              </div>

              <div>
                <span className="details-feature-icon">
                  📐
                </span>

                <strong>
                  {property.area}
                </strong>

                <small>
                  Area
                </small>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="details-description">

              <h3>
                About This Property
              </h3>

              <p>
                {property.description}
              </p>

            </div>

            {/* ACTIONS */}
            <div className="details-actions">

              <Link
                to="/properties"
                className="primary-btn"
              >
                Browse More Properties
              </Link>

              <Link
                to="/dashboard"
                className="secondary-btn"
              >
                Manage Your Listings
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default PropertyDetails;