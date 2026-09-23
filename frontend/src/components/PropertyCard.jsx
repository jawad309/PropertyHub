import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  return (
    <article className="property-card">

      {/* PROPERTY IMAGE */}
      <div className="property-image-wrapper">

        <img
          src={
            property.image ||
            "https://via.placeholder.com/600x400"
          }
          alt={property.title}
          className="property-image"
        />

        <span className="property-card-badge">
          {property.type}
        </span>

      </div>

      {/* PROPERTY CONTENT */}
      <div className="property-info">

        <div className="property-card-top">

          <span className="property-type">
            {property.type}
          </span>

          <span className="property-status">
            Available
          </span>

        </div>

        <h3>
          {property.title}
        </h3>

        <p className="location">
          📍 {property.location}
        </p>

        <h2>
          PKR{" "}
          {Number(property.price).toLocaleString()}
        </h2>

        {/* FEATURES */}
        <div className="property-features">

          <span>
            🛏 {property.bedrooms || 0} Beds
          </span>

          <span>
            🚿 {property.bathrooms || 0} Baths
          </span>

          <span>
            📐 {property.area || "N/A"}
          </span>

        </div>

        {/* DETAILS BUTTON */}
        <Link
          to={`/properties/${property._id}`}
          className="details-btn"
        >
          View Property
          <span>→</span>
        </Link>

      </div>

    </article>
  );
}

export default PropertyCard;