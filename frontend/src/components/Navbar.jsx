import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const CART_KEY = "propertyhub_cart";

function getCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    if (!Array.isArray(cart)) return 0;

    return cart.reduce(
      (total, item) => total + (Number(item.quantity) || 0),
      0
    );
  } catch {
    return 0;
  }
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
}

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(getUser);
  const [cartCount, setCartCount] = useState(getCartCount);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateUser = () => setUser(getUser());
    const updateCart = () => setCartCount(getCartCount());

    window.addEventListener("authChange", updateUser);
    window.addEventListener("storage", updateUser);
    window.addEventListener("storage", updateCart);
    window.addEventListener("propertyhub-cart-update", updateCart);

    updateUser();
    updateCart();

    return () => {
      window.removeEventListener("authChange", updateUser);
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("propertyhub-cart-update", updateCart);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [navigate]);

  const navClass = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item";

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    closeMenu();

    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" && user !== null;

  return (
    <header className="ph-header">
      <nav className="ph-navbar">
        <div className="ph-nav-container">

          {/* BRAND */}
          <NavLink to="/" className="ph-brand" onClick={closeMenu}>
            <span className="ph-brand-icon">⌂</span>

            <span className="ph-brand-text">
              Property<span>Hub</span>
              <small>FIND YOUR SPACE</small>
            </span>
          </NavLink>

          {/* DESKTOP / MOBILE LINKS */}
          <div className={`ph-nav-links ${menuOpen ? "ph-menu-open" : ""}`}>
            <NavLink to="/" end className={navClass} onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink
              to="/properties"
              className={navClass}
              onClick={closeMenu}
            >
              Properties
            </NavLink>

            <NavLink
              to="/dashboard"
              className={navClass}
              onClick={closeMenu}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/about"
              className={navClass}
              onClick={closeMenu}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={navClass}
              onClick={closeMenu}
            >
              Contact
            </NavLink>

            {/* MOBILE ONLY ACTIONS */}
            <div className="ph-mobile-actions">
              <NavLink
                to="/cart"
                className="ph-mobile-cart"
                onClick={closeMenu}
              >
                🛒 Cart ({cartCount})
              </NavLink>

              {isLoggedIn ? (
                <button
                  type="button"
                  className="ph-auth-button ph-logout-button"
                  onClick={handleLogout}
                >
                  Logout ↗
                </button>
              ) : (
                <NavLink
                  to="/auth"
                  className="ph-auth-button"
                  onClick={closeMenu}
                >
                  Login / Sign Up →
                </NavLink>
              )}
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="ph-nav-actions">

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "ph-cart-link active" : "ph-cart-link"
              }
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <span className="ph-cart-icon">🛒</span>
              <span>Cart</span>
              <span className="ph-cart-badge">{cartCount}</span>
            </NavLink>

            {isLoggedIn ? (
              <div className="ph-user-actions">
                <span className="ph-user-greeting">
                  <span className="ph-user-avatar">
                    {(user.name || "U").charAt(0).toUpperCase()}
                  </span>

                  <span className="ph-user-name">
                    Hi, {user.name || "User"}
                  </span>
                </span>

                <button
                  type="button"
                  className="ph-auth-button ph-logout-button"
                  onClick={handleLogout}
                >
                  Logout ↗
                </button>
              </div>
            ) : (
              <NavLink to="/auth" className="ph-auth-button">
                Login <span>↗</span>
              </NavLink>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className={`ph-menu-toggle ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;