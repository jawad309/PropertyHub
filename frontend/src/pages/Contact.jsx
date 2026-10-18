import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation and confirmation
    setStatus(
      "Your message has been prepared successfully. Connect an email service or backend endpoint to deliver it."
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-content">
          <span className="contact-eyebrow">
            WE'RE HERE FOR YOU
          </span>

          <h1>
            Let's Start a
            <br />
            <span>Conversation.</span>
          </h1>

          <p>
            Have a question about a property or need help using
            PropertyHub? We'd love to hear from you.
          </p>

          <div className="contact-breadcrumb">
            <span>Home</span>
            <span> / </span>
            <span>Contact</span>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="contact-main">
        <div className="contact-layout">
          {/* LEFT INFORMATION */}
          <aside className="contact-info">
            <span className="contact-eyebrow">
              GET IN TOUCH
            </span>

            <h2>
              We're just a
              <br />
              <span>message away.</span>
            </h2>

            <p className="contact-info-description">
              Whether you're exploring properties, managing listings
              or simply have a question, our team is ready to help.
            </p>

            <div className="contact-info-item">
              <div className="contact-info-icon">✉</div>

              <div>
                <h3>Email Us</h3>
                <p>Send us your questions or feedback.</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">⌂</div>

              <div>
                <h3>PropertyHub</h3>
                <p>Your place to discover properties.</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">◷</div>

              <div>
                <h3>We're Listening</h3>
                <p>Tell us how we can make your experience better.</p>
              </div>
            </div>

            <div className="contact-decoration">
              PROPERTYHUB <span>✦</span> FIND YOUR SPACE
            </div>
          </aside>

          {/* RIGHT FORM */}
          <div className="contact-form-card">
            <div className="contact-form-heading">
              <span className="contact-form-tag">
                SEND AN INQUIRY
              </span>

              <h2>Send us a message</h2>

              <p>Fill in the details below and let us know how we can help.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="contact-name">Your Name *</label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="contact-email">Email Address *</label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-form-group">
                <label htmlFor="contact-subject">Subject *</label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What is your message about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="contact-message">Your Message *</label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message <span>↗</span>
              </button>

              {status && (
                <p className="contact-status" role="status">
                  {status}
                </p>
              )}

              <p className="contact-form-note">
                ✦ Thank you for getting in touch with PropertyHub.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;