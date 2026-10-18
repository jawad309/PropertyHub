
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CART_KEY = "propertyhub_cart";

function getSavedCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function Cart() {
  const [cart, setCart] = useState(getSavedCart);

  useEffect(() => {
    const updateCart = () => {
      setCart(getSavedCart());
    };

    window.addEventListener("storage", updateCart);
    window.addEventListener("propertyhub-cart-update", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener(
        "propertyhub-cart-update",
        updateCart
      );
    };
  }, []);

  const updateSavedCart = (updatedCart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event("propertyhub-cart-update"));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      String(item._id) === String(id)
        ? { ...item, quantity: (Number(item.quantity) || 0) + 1 }
        : item
    );

    updateSavedCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        String(item._id) === String(id)
          ? { ...item, quantity: (Number(item.quantity) || 0) - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateSavedCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => String(item._id) !== String(id)
    );

    updateSavedCart(updatedCart);
  };

  const clearCart = () => {
    updateSavedCart([]);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  return (
    <section className="section">
      <div className="container">
        <div className="page-heading">
          <p className="hero-small">YOUR SELECTION</p>
          <h1>My Shopping Cart</h1>
          <p>Review your selected properties below.</p>
        </div>

        {cart.length === 0 ? (
          <div className="properties-empty">
            <div className="empty-icon">🛒</div>
            <h2>Your Cart Is Empty</h2>
            <p>Add a property to see it here.</p>

            <Link to="/properties" className="primary-btn">
              Explore Properties →
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-page-list">
              {cart.map((item) => (
                <article
                  className="cart-page-item"
                  key={item._id}
                >
                  <img
                    src={
                      item.image ||
                      "https://placehold.co/160x120?text=Property"
                    }
                    alt={item.title || "Property"}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        "https://placehold.co/160x120?text=Property";
                    }}
                  />

                  <div className="cart-page-info">
                    <h3>{item.title || "Property"}</h3>
                    <p>{item.location || "Location unavailable"}</p>
                    <p>
                      PKR{" "}
                      {(Number(item.price) || 0).toLocaleString("en-PK")}
                    </p>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item._id)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item._id)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-cart-btn"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>

                  <strong>
                    PKR{" "}
                    {(
                      (Number(item.price) || 0) *
                      (Number(item.quantity) || 0)
                    ).toLocaleString("en-PK")}
                  </strong>
                </article>
              ))}
            </div>

            <div className="cart-page-summary">
              <h2>
                Total: PKR {total.toLocaleString("en-PK")}
              </h2>

              <button
                type="button"
                className="remove-cart-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>

              <Link to="/properties" className="details-btn">
                Continue Exploring
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
