
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CART_KEY = "propertyhub_cart";

function getSavedCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function PropertyCard({ property }) {
  const [cart, setCart] = useState(getSavedCart);
  const [showCart, setShowCart] = useState(false);

  const price = Number(property.price) || 0;
  const propertyId = String(property._id || property.id || "");

  const quantity =
    cart.find((item) => String(item._id) === propertyId)?.quantity || 0;

  // Synchronize cart changes
  useEffect(() => {
    const syncCart = () => {
      const savedCart = getSavedCart();

      setCart(savedCart);
      setShowCart(
        savedCart.some(
          (item) => String(item._id) === propertyId
        )
      );
    };

    window.addEventListener("storage", syncCart);
    window.addEventListener("propertyhub-cart-update", syncCart);

    syncCart();

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener(
        "propertyhub-cart-update",
        syncCart
      );
    };
  }, [propertyId]);

  // Save cart and notify other components
  const saveCart = (updatedCart) => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
      setCart(updatedCart);

      window.dispatchEvent(
        new Event("propertyhub-cart-update")
      );
    } catch (error) {
      console.error("Unable to save cart:", error);
      alert("Unable to update your cart. Please try again.");
    }
  };

  // Add property to cart
  const handleAddToCart = () => {
    const currentCart = getSavedCart();

    const existing = currentCart.find(
      (item) => String(item._id) === propertyId
    );

    let updatedCart;

    if (existing) {
      updatedCart = currentCart.map((item) =>
        String(item._id) === propertyId
          ? {
              ...item,
              quantity: (Number(item.quantity) || 0) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...currentCart,
        {
          _id: property._id || property.id,
          title: property.title || "Property",
          price,
          image: property.image || "",
          type: property.type || "Property",
          location: property.location || "",
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          area: property.area || "N/A",
          quantity: 1,
        },
      ];
    }

    saveCart(updatedCart);
    setShowCart(true);
  };

  // Increase quantity
  const increaseQuantity = () => {
    const currentCart = getSavedCart();

    const updatedCart = currentCart.map((item) =>
      String(item._id) === propertyId
        ? {
            ...item,
            quantity: (Number(item.quantity) || 0) + 1,
          }
        : item
    );

    saveCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    const currentCart = getSavedCart();

    const updatedCart = currentCart
      .map((item) =>
        String(item._id) === propertyId
          ? {
              ...item,
              quantity: (Number(item.quantity) || 0) - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);

    if (
      !updatedCart.some(
        (item) => String(item._id) === propertyId
      )
    ) {
      setShowCart(false);
    }
  };

  // Remove property from cart
  const removeFromCart = () => {
    const currentCart = getSavedCart();

    const updatedCart = currentCart.filter(
      (item) => String(item._id) !== propertyId
    );

    saveCart(updatedCart);
    setShowCart(false);
  };

  const totalPrice = price * quantity;

  return (
    <article className="property-card">
      {/* Property image */}
      <div className="property-image-wrapper">
        <img
          src={
            property.image ||
            "https://placehold.co/600x400?text=Property"
          }
          alt={property.title || "Property"}
          className="property-image"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              "https://placehold.co/600x400?text=Property";
          }}
        />

        <span className="property-card-badge">
          {property.type || "Property"}
        </span>

        <span className="property-image-label">
          Premium Listing
        </span>

        {quantity > 0 && (
          <span className="property-in-cart">
            ✓ In Cart
          </span>
        )}
      </div>

      {/* Property information */}
      <div className="property-info">
        <div className="property-card-top">
          <span className="property-type">
            {property.type || "Real Estate"}
          </span>

          <span className="property-status">
            <span className="status-dot"></span>
            Available
          </span>
        </div>

        <h3 className="property-title">
          {property.title || "Beautiful Property"}
        </h3>

        <p className="location">
          <span>📍</span>{" "}
          {property.location || "Location unavailable"}
        </p>

        <div className="property-price">
          <h2>PKR {price.toLocaleString("en-PK")}</h2>
          <span>Listed Price</span>
        </div>

        <div className="property-features">
          <span>🛏 {property.bedrooms || 0} Beds</span>
          <span>🚿 {property.bathrooms || 0} Baths</span>
          <span>📐 {property.area || "N/A"}</span>
        </div>

        {/* Property details */}
        <Link
          to={`/properties/${property._id || property.id}`}
          className="details-btn"
        >
          View Details <span>↗</span>
        </Link>

        {/* Add to cart */}
        {!showCart || quantity === 0 ? (
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            <span>＋</span> Add to Cart
          </button>
        ) : (
          <div className="cart-section">
            <div className="cart-success">
              <span className="cart-success-icon">✓</span>

              <div>
                <h4>Saved to Your Cart</h4>
                <p>Your cart has been updated.</p>
              </div>
            </div>

            {/* Quantity controls */}
            <div className="cart-quantity-row">
              <span>Quantity</span>

              <div className="quantity-controls">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price summary */}
            <div className="cart-total">
              <div>
                <span>Unit Price</span>
                <strong>
                  PKR {price.toLocaleString("en-PK")}
                </strong>
              </div>

              <div>
                <span>Quantity</span>
                <strong>{quantity}</strong>
              </div>

              <div className="cart-grand-total">
                <span>Subtotal</span>
                <strong>
                  PKR {totalPrice.toLocaleString("en-PK")}
                </strong>
              </div>
            </div>

            {/* Remove from cart */}
            <button
              type="button"
              className="remove-cart-btn"
              onClick={removeFromCart}
            >
              🗑 Remove from Cart
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default PropertyCard;

