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

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProperties();

        setProperties(data);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load properties. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // SEARCH + TYPE FILTER
  const filteredProperties = properties.filter((property) => {
    const searchText =
      `${property.title} ${property.location} ${property.type}`
        .toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    const matchesType =
      selectedType === "All" ||
      property.type === selectedType;

    return matchesSearch && matchesType;
  });

  // CLEAR ALL FILTERS
  const clearFilters = () => {
    setSearch("");
    setSelectedType("All");
  };

  return (
    <section className="section properties-page">
      <div className="container">

        {/* =========================
            PAGE HEADER
        ========================== */}

        <div className="page-heading">

          <p className="hero-small">
            PROPERTY COLLECTION
          </p>

          <h1>
            Explore Available Properties
          </h1>

          <p>
            Discover houses, apartments and plots in different
            locations. Find a property that fits your needs.
          </p>

        </div>

        {/* =========================
            SEARCH TOOLBAR
        ========================== */}

        <div className="properties-toolbar">

          <div className="properties-search">

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

          </div>

          {/* PROPERTY TYPE FILTER */}

          <div className="property-filters">

            <button
              type="button"
              className={
                selectedType === "All"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setSelectedType("All")}
            >
              All
            </button>

            <button
              type="button"
              className={
                selectedType === "House"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setSelectedType("House")}
            >
              Houses
            </button>

            <button
              type="button"
              className={
                selectedType === "Apartment"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setSelectedType("Apartment")}
            >
              Apartments
            </button>

            <button
              type="button"
              className={
                selectedType === "Plot"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setSelectedType("Plot")}
            >
              Plots
            </button>

          </div>

        </div>

        {/* =========================
            RESULTS HEADER
        ========================== */}

        {!loading && !error && (
          <div className="properties-results-header">

            <div>
              <p className="hero-small">
                PROPERTY LISTINGS
              </p>

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

        {/* =========================
            LOADING
        ========================== */}

        {loading && (
          <div className="properties-loading">

            <LoadingSpinner />

            <p>
              Finding the latest properties...
            </p>

          </div>
        )}

        {/* =========================
            ERROR
        ========================== */}

        {error && (
          <div className="properties-error">

            <div className="empty-icon">
              ⚠️
            </div>

            <h2>
              Something Went Wrong
            </h2>

            <p>
              {error}
            </p>

          </div>
        )}

        {/* =========================
            NO RESULTS
        ========================== */}

        {!loading &&
          !error &&
          filteredProperties.length === 0 && (
            <div className="properties-empty">

              <div className="empty-icon">
                🔎
              </div>

              <p className="hero-small">
                NO MATCHES
              </p>

              <h2>
                No Properties Found
              </h2>

              <p>
                We couldn't find any property matching
                your current search or filter.
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

        {/* =========================
            PROPERTY GRID
        ========================== */}

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