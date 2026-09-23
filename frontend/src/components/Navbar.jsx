import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const updateUser = () => {
      try {
        const savedUser = JSON.parse(
          localStorage.getItem("user")
        );

        setUser(savedUser);
      } catch {
        setUser(null);
      }
    };

    // Login/logout ke baad same tab mein update
    window.addEventListener("authChange", updateUser);

    // Dusre tab mein change ho to update
    window.addEventListener("storage", updateUser);

    // Initial check
    updateUser();

    return () => {
      window.removeEventListener("authChange", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const navClass = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/");
  };

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" &&
    user !== null;

  return (
    <nav className="navbar">
      <div className="container nav-content">

        {/* Logo */}
        <NavLink to="/" className="logo">
          Property<span>Hub</span>
        </NavLink>

        {/* Navigation */}
        <div className="nav-links">

          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/properties" className={navClass}>
            Properties
          </NavLink>

          <NavLink to="/dashboard" className={navClass}>
            Dashboard
          </NavLink>

          <NavLink to="/about" className={navClass}>
            About
          </NavLink>

          {isLoggedIn ? (
            <>
              <span className="nav-user">
                Hi, {user.name}
              </span>

              <button
                className="login-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/auth" className="login-btn">
              Login
            </NavLink>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;