
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Auth() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const email = formData.email.trim().toLowerCase();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (mode === "register" && !formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (mode === "forgot") {
      setLoading(true);

      try {
        const response = await fetch(
          `${API_URL}/auth/forgot-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          setError(
            data.message || "Unable to process your request."
          );
          return;
        }

        setSuccess(
          data.message ||
            "If an account exists for this email, password reset instructions will be sent."
        );
      } catch {
        setError(
          "Unable to connect to the server. Please try again."
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    if (
      mode === "register" &&
      formData.password.length < 6
    ) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        mode === "login"
          ? `${API_URL}/auth/login`
          : `${API_URL}/auth/register`;

      const body =
        mode === "login"
          ? {
              email,
              password: formData.password,
            }
          : {
              name: formData.name.trim(),
              email,
              password: formData.password,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          data.message ||
            `Request failed with status ${response.status}.`
        );
        return;
      }

      if (mode === "login") {
        if (!data.token || !data.user) {
          setError(
            "Login response is incomplete. Please check the backend."
          );
          return;
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.dispatchEvent(new Event("authChange"));

        navigate("/");
      } else {
        setSuccess(
          "Account created successfully! You can now log in."
        );

        setMode("login");

        setFormData({
          name: "",
          email,
          password: "",
        });
      }
    } catch {
      setError(
        "Unable to connect to the server. Check your backend and API URL."
      );
    } finally {
      setLoading(false);
    }
  };

  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";

  return (
    <section className="section auth-page">
      <div className="auth-card">
        <div className="auth-icon">🏠</div>

        <p className="hero-small">PROPERTYHUB</p>

        <h1>
          {isLogin
            ? "Welcome Back"
            : isRegister
            ? "Create Account"
            : "Forgot Password?"}
        </h1>

        <p>
          {isLogin
            ? "Login to explore and manage your properties."
            : isRegister
            ? "Create your PropertyHub account today."
            : "Enter your registered email to request password reset instructions."}
        </p>

        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-success" role="status">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          {!isForgot && (
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete={
                  isLogin ? "current-password" : "new-password"
                }
                minLength={isRegister ? 6 : undefined}
                required
              />
            </div>
          )}

          {isLogin && (
            <div className="forgot-password-row">
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => switchMode("forgot")}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="primary-btn full-btn"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login to PropertyHub"
              : isRegister
              ? "Create PropertyHub Account"
              : "Send Reset Instructions"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        {isForgot ? (
          <button
            type="button"
            className="switch-auth"
            onClick={() => switchMode("login")}
          >
            ← Back to Login
          </button>
        ) : (
          <button
            type="button"
            className="switch-auth"
            onClick={() =>
              switchMode(isLogin ? "register" : "login")
            }
          >
            {isLogin
              ? "Don't have an account? Create one"
              : "Already have an account? Login"}
          </button>
        )}
      </div>
    </section>
  );
}

export default Auth;

