
import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { getProperties } from "../services/api";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Fetch properties from backend
  useEffect(() => {
    let isMounted = true;

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProperties();

        if (!Array.isArray(data)) {
          throw new Error("Invalid properties data received from server.");
        }

        if (isMounted) {
          setProperties(data);
        }
      } catch (err) {
        console.error("Properties loading error:", err);

        if (isMounted) {
          setError(
            "Unable to load properties. Please check your backend connection and try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  // Search and filter properties
  const filteredProperties = properties.filter((property) => {
    const searchText = [
      property.title || "",
      property.location || "",
      property.type || "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchText.includes(
      search.trim().toLowerCase()
    );

    const matchesType =
      selectedType === "All" ||
      (property.type || "").toLowerCase() ===
        selectedType.toLowerCase();

    return matchesSearch && matchesType;
  });

  // Reset search and filters
  const clearFilters = () => {
    setSearch("");
    setSelectedType("All");
  };

  // Retry loading properties
  const retryLoading = () => {
    setLoading(true);
    setError("");

    getProperties()
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid properties data received.");
        }

        setProperties(data);
      })
      .catch((err) => {
        console.error("Retry loading error:", err);
        setError(
          "Unable to load properties. Please check your backend connection."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="section properties-page">
      <div className="container">

        {/* Page heading */}
        <div className="page-heading">
          <p className="hero-small">PROPERTY COLLECTION</p>

          <h1>Explore Available Properties</h1>

          <p>
            Discover houses, apartments and plots in different
            locations. Find a property that fits your needs.
          </p>
        </div>

        {/* Search and filters */}
        <div className="properties-toolbar">
          <div className="properties-search">
            <SearchBar
              search={search}
              setSearch={setSearch}
            />
          </div>

          <div className="property-filters">
            {["All", "House", "Apartment", "Plot"].map((type) => (
              <button
                key={type}
                type="button"
                className={
                  selectedType === type
                    ? "filter-btn active"
                    : "filter-btn"
                }
                onClick={() => setSelectedType(type)}
              >
                {type === "All"
                  ? "All"
                  : type === "House"
                  ? "Houses"
                  : type === "Apartment"
                  ? "Apartments"
                  : "Plots"}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="properties-loading">
            <LoadingSpinner />
            <p>Finding the latest properties...</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="properties-error">
            <div className="empty-icon">⚠️</div>

            <h2>Something Went Wrong</h2>

            <p>{error}</p>

            <button
              type="button"
              className="secondary-btn"
              onClick={retryLoading}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results header */}
        {!loading && !error && (
          <div className="properties-results-header">
            <div>
              <p className="hero-small">PROPERTY LISTINGS</p>

              <h2>
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1
                  ? "Property"
                  : "Properties"}
              </h2>
            </div>

            {(search || selectedType !== "All") && (
              <button
                type="button"
                className="clear-filter-btn"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Empty state */}
        {!loading &&
          !error &&
          filteredProperties.length === 0 && (
            <div className="properties-empty">
              <div className="empty-icon">🔎</div>

              <p className="hero-small">NO MATCHES</p>

              <h2>No Properties Found</h2>

              <p>
                We couldn't find any property matching your
                current search or filter.
              </p>

              <button
                type="button"
                className="secondary-btn"
                onClick={clearFilters}
              >
                Reset Search
              </button>
            </div>
          )}

        {/* Property cards */}
        {!loading &&
          !error &&
          filteredProperties.length > 0 && (
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property._id || property.id}
                  property={property}
                />
              ))}
            </div>
          )}
      </div>
    </section>
  );
}

export default Properties;

