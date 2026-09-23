import { useEffect, useState } from "react";
import {
  getMyProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../services/api";

function Dashboard() {
  const emptyForm = {
    title: "",
    type: "House",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    image: "",
    description: "",
  };

  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  // GET MY PROPERTIES
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyProperties();

      setProperties(data);
    } catch (err) {
      setError("Unable to load your properties.");
    } finally {
      setLoading(false);
    }
  };

  // FORM INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // OPEN ADD FORM
  const openAddForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ADD / UPDATE PROPERTY
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // VALIDATION
    if (!formData.title.trim()) {
      setError("Please enter a property title.");
      return;
    }

    if (formData.title.trim().length < 3) {
      setError("Property title must be at least 3 characters.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Please enter the property location.");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      setError("Please enter a valid property price.");
      return;
    }

    if (!formData.area.trim()) {
      setError("Please enter the property area.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter a property description.");
      return;
    }

    if (formData.description.trim().length < 10) {
      setError("Description must be at least 10 characters.");
      return;
    }

    try {
      setSaving(true);

      const propertyData = {
        title: formData.title.trim(),
        type: formData.type,
        location: formData.location.trim(),
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        area: formData.area.trim(),
        image: formData.image.trim(),
        description: formData.description.trim(),
      };

      // UPDATE
      if (editingId) {
        const updatedProperty = await updateProperty(
          editingId,
          propertyData
        );

        setProperties((currentProperties) =>
          currentProperties.map((property) =>
            property._id === editingId
              ? updatedProperty
              : property
          )
        );
      }

      // CREATE
      else {
        const newProperty = await createProperty(propertyData);

        setProperties((currentProperties) => [
          newProperty,
          ...currentProperties,
        ]);
      }

      // RESET
      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      setError(
        editingId
          ? "Failed to update property."
          : "Failed to create property."
      );
    } finally {
      setSaving(false);
    }
  };

  // EDIT PROPERTY
  const handleEdit = (property) => {
    setFormData({
      title: property.title || "",
      type: property.type || "House",
      location: property.location || "",
      price: property.price || "",
      bedrooms: property.bedrooms ?? "",
      bathrooms: property.bathrooms ?? "",
      area: property.area || "",
      image: property.image || "",
      description: property.description || "",
    });

    setEditingId(property._id);
    setShowForm(true);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE PROPERTY
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setDeletingId(id);

      await deleteProperty(id);

      setProperties((currentProperties) =>
        currentProperties.filter(
          (property) => property._id !== id
        )
      );
    } catch (err) {
      setError("Failed to delete property.");
    } finally {
      setDeletingId(null);
    }
  };

  // CLOSE FORM
  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  return (
    <section className="section dashboard">
      <div className="container">

        {/* HEADER */}
        <div className="dashboard-header">

          <div>
            <p className="hero-small">
              MY ACCOUNT
            </p>

            <h1>
              Property Dashboard
            </h1>

            <p>
              Add, edit and manage your property listings
              from one place.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={showForm ? closeForm : openAddForm}
          >
            {showForm
              ? "Close Form"
              : "+ Add Property"}
          </button>

        </div>

        {/* STATS */}
        {!loading && !error && (
          <div className="dashboard-stats">

            <div className="dashboard-stat">
              <span className="dashboard-stat-icon">
                🏠
              </span>

              <div>
                <strong>
                  {properties.length}
                </strong>

                <span>
                  My Properties
                </span>
              </div>
            </div>

            <div className="dashboard-stat">
              <span className="dashboard-stat-icon">
                📋
              </span>

              <div>
                <strong>
                  {properties.filter(
                    (property) =>
                      property.type === "House"
                  ).length}
                </strong>

                <span>
                  Houses
                </span>
              </div>
            </div>

            <div className="dashboard-stat">
              <span className="dashboard-stat-icon">
                🏢
              </span>

              <div>
                <strong>
                  {properties.filter(
                    (property) =>
                      property.type === "Apartment"
                  ).length}
                </strong>

                <span>
                  Apartments
                </span>
              </div>
            </div>

          </div>
        )}

        {/* FORM */}
        {showForm && (
          <div className="form-card">

            <div className="form-header">
              <div>
                <p className="hero-small">
                  {editingId
                    ? "UPDATE LISTING"
                    : "NEW LISTING"}
                </p>

                <h2>
                  {editingId
                    ? "Edit Property"
                    : "Add New Property"}
                </h2>
              </div>

              <button
                type="button"
                className="form-close"
                onClick={closeForm}
              >
                ×
              </button>
            </div>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                {/* TITLE */}
                <div className="form-group">
                  <label>
                    Property Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Modern Family House"
                  />
                </div>

                {/* TYPE */}
                <div className="form-group">
                  <label>
                    Property Type *
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="House">
                      House
                    </option>

                    <option value="Apartment">
                      Apartment
                    </option>

                    <option value="Plot">
                      Plot
                    </option>
                  </select>
                </div>

                {/* LOCATION */}
                <div className="form-group">
                  <label>
                    Location *
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Abbottabad"
                  />
                </div>

                {/* PRICE */}
                <div className="form-group">
                  <label>
                    Price (PKR) *
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g. 25000000"
                  />
                </div>

                {/* BEDROOMS */}
                <div className="form-group">
                  <label>
                    Bedrooms
                  </label>

                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g. 4"
                  />
                </div>

                {/* BATHROOMS */}
                <div className="form-group">
                  <label>
                    Bathrooms
                  </label>

                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g. 3"
                  />
                </div>

                {/* AREA */}
                <div className="form-group">
                  <label>
                    Area *
                  </label>

                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g. 10 Marla"
                  />
                </div>

                {/* IMAGE */}
                <div className="form-group">
                  <label>
                    Image URL
                  </label>

                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="form-group">
                <label>
                  Description *
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe your property..."
                />
              </div>

              {/* FORM ACTIONS */}
              <div className="form-actions">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Property"
                    : "Add Property"}
                </button>

              </div>

            </form>

          </div>
        )}

        {/* ERROR */}
        {error && !showForm && (
          <div className="error-box">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="dashboard-empty">

            <div className="empty-icon">
              🏠
            </div>

            <h2>
              Loading Your Properties...
            </h2>

            <p>
              Please wait while we load your listings.
            </p>

          </div>
        ) : properties.length === 0 ? (

          /* EMPTY */
          <div className="dashboard-empty">

            <div className="empty-icon">
              🏠
            </div>

            <h2>
              No Properties Yet
            </h2>

            <p>
              You haven't added any property listings.
              Start by creating your first listing.
            </p>

            <button
              className="primary-btn"
              onClick={openAddForm}
            >
              + Add Your First Property
            </button>

          </div>

        ) : (

          /* PROPERTY LIST */
          <div>

            <div className="dashboard-list-heading">

              <div>
                <p className="hero-small">
                  YOUR LISTINGS
                </p>

                <h2>
                  My Properties
                </h2>
              </div>

              <span>
                {properties.length}{" "}
                {properties.length === 1
                  ? "Listing"
                  : "Listings"}
              </span>

            </div>

            <div className="property-grid">

              {properties.map((property) => (

                <div
                  className="property-card"
                  key={property._id}
                >

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

                  <div className="property-info">

                    <h3>
                      {property.title}
                    </h3>

                    <p className="location">
                      📍 {property.location}
                    </p>

                    <h2>
                      PKR{" "}
                      {Number(
                        property.price
                      ).toLocaleString()}
                    </h2>

                    <div className="property-features">

                      <span>
                        🛏 {property.bedrooms || 0} Beds
                      </span>

                      <span>
                        🚿 {property.bathrooms || 0} Baths
                      </span>

                      <span>
                        📐 {property.area}
                      </span>

                    </div>

                    <div className="dashboard-actions">

                      <button
                        className="secondary-btn"
                        onClick={() =>
                          handleEdit(property)
                        }
                        disabled={
                          deletingId === property._id
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(property._id)
                        }
                        disabled={
                          deletingId === property._id
                        }
                      >
                        {deletingId === property._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default Dashboard;