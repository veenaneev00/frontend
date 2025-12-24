import { lazy, Suspense, useState, useEffect } from "react";
import "../assets/css/sections/contact.css";
import { Phone, Mail, MapPin } from "lucide-react";

const Header = lazy(() => import("../componets/Header"));
const Footer = lazy(() => import("../componets/Footer"));

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+1",
    phone: "",
    subject: "Service 1",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Country codes list
  const countryCodes = [
    { code: "+1", country: "US/CA", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+91", country: "IN", flag: "🇮🇳" },
    { code: "+86", country: "CN", flag: "🇨🇳" },
    { code: "+81", country: "JP", flag: "🇯🇵" },
    { code: "+49", country: "DE", flag: "🇩🇪" },
    { code: "+33", country: "FR", flag: "🇫🇷" },
    { code: "+61", country: "AU", flag: "🇦🇺" },
    { code: "+971", country: "AE", flag: "🇦🇪" },
    { code: "+966", country: "SA", flag: "🇸🇦" },
  ];

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, "");
    // Must be exactly 10 digits
    return digitsOnly.length === 10 && /^\d{10}$/.test(digitsOnly);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validateMessage = (message: string): boolean => {
    return message.trim().length >= 10;
  };

  // Format phone number (only digits, max 10)
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, "");
    // Limit to 10 digits
    return digitsOnly.slice(0, 10);
  };

  // Validate individual field
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (!validateName(value))
          return "First name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "First name should only contain letters";
        return "";

      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (!validateName(value))
          return "Last name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Last name should only contain letters";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        return "";

      case "phone":
        if (!value.trim()) return "Phone number is required";
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length === 0) return "Phone number is required";
        if (digitsOnly.length < 10)
          return `Please enter ${10 - digitsOnly.length} more digit${
            10 - digitsOnly.length === 1 ? "" : "s"
          }`;
        if (!validatePhone(value))
          return "Phone number must be exactly 10 digits";
        return "";

      case "message":
        if (!value.trim()) return "Message is required";
        if (!validateMessage(value))
          return "Message must be at least 10 characters";
        if (value.length > 1000)
          return "Message must be less than 1000 characters";
        return "";

      default:
        return "";
    }
  };

  // Handle input change with validation
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let processedValue = value;

    // Format phone number (only digits, max 10)
    if (name === "phone") {
      processedValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear submit messages
    setSubmitSuccess(false);
    setSubmitError("");

    // Validate if field has been touched
    if (touched[name]) {
      const error = validateField(name, processedValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Handle country code change
  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: e.target.value,
    }));
  };

  // Handle field blur (mark as touched)
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubjectChange = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subject,
    }));
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.firstName = validateField("firstName", formData.firstName);
    newErrors.lastName = validateField("lastName", formData.lastName);
    newErrors.email = validateField("email", formData.email);
    newErrors.phone = validateField("phone", formData.phone);
    newErrors.message = validateField("message", formData.message);

    setErrors(newErrors);

    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      message: true,
    });

    // Return true if no errors
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setSubmitSuccess(false);
    setSubmitError("");

    // Validate form
    if (!validateForm()) {
      setSubmitError("Please fix the errors above before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data with full phone number
      const submissionData = {
        ...formData,
        fullPhone: `${formData.countryCode}${formData.phone}`,
      };

      // Send to API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      // Success
      setSubmitSuccess(true);
      setSubmitError("");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+1",
        phone: "",
        subject: "Service 1",
        message: "",
      });
      setErrors({});
      setTouched({});

      // TODO: Replace with your actual form submission logic
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(submissionData) });
    } catch (error) {
      setSubmitError("Something went wrong. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Suspense fallback={<div className="loading-header" />}>
        <Header />
      </Suspense>

      <section className="contact-section">
        <div className="contact-container">
          {/* Header */}
          {/* <div className="contact-header">
            <p className="contact-subtitle">
              Any question or remarks? Just write us a message!
            </p>
          </div> */}

          {/* Contact Content */}
          <div className="contact-content">
            {/* Left Side - Contact Information */}
            <div className="contact-info-panel">
              <div className="contact-info-content">
                <h2 className="contact-info-title">Contact Information</h2>
                <p className="contact-info-subtitle">
                  Any question or remarks? Just reach out to us!
                </p>

                <div className="contact-info-list">
                  {/* Phone – India */}
                  <a href="tel:+917206181859" className="contact-info-item">
                    <div className="contact-info-icon">
                      <Phone size={24} />
                    </div>
                    <span>+91 7206181859</span>
                  </a>

                  {/* Phone – UK */}
                  <a href="tel:+447848119123" className="contact-info-item">
                    <div className="contact-info-icon">
                      <Phone size={24} />
                    </div>
                    <span>+44 7848119123</span>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:renderdacbusiness1@gmail.com"
                    className="contact-info-item"
                  >
                    <div className="contact-info-icon">
                      <Mail size={24} />
                    </div>
                    <span>renderdacbusiness1@gmail.com</span>
                  </a>

                  {/* Address – India */}
                  <a
                    href="https://maps.google.com/?q=Delhi+110006+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-item"
                  >
                    <div className="contact-info-icon">
                      <MapPin size={24} />
                    </div>
                    <span>Delhi 110006, India</span>
                  </a>

                  {/* Address – UK */}
                  <a
                    href="https://maps.google.com/?q=20+Wenlock+Road+London+N1+7GU+United+Kingdom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-item"
                  >
                    <div className="contact-info-icon">
                      <MapPin size={24} />
                    </div>
                    <span>
                      20 Wenlock Road, London N1 7GU,
                      <br />
                      United Kingdom
                    </span>
                  </a>
                </div>

                {/* Social Links */}
                <div className="contact-social">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0 a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="contact-info-decoration">
                <div className="decoration-circle"></div>
                <div className="decoration-circle-small"></div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="contact-form-panel">
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {/* Success Message */}
                {submitSuccess && (
                  <div className="form-message form-message-success">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>
                      Thank you! Your message has been sent successfully.
                    </span>
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div className="form-message form-message-error">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Name Fields */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`form-input ${
                        errors.firstName && touched.firstName
                          ? "form-input-error"
                          : ""
                      }`}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName && (
                      <span className="form-error">{errors.firstName}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`form-input ${
                        errors.lastName && touched.lastName
                          ? "form-input-error"
                          : ""
                      }`}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName && (
                      <span className="form-error">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-input ${
                        errors.email && touched.email ? "form-input-error" : ""
                      }`}
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <span className="form-error">{errors.email}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                      <span className="phone-digit-counter">
                        {formData.phone.length}/10
                      </span>
                    </label>
                    <div className="phone-input-group">
                      <select
                        value={formData.countryCode}
                        onChange={handleCountryCodeChange}
                        className="country-code-select"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className={`form-input phone-input ${
                          errors.phone && touched.phone
                            ? "form-input-error"
                            : ""
                        }`}
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="1234567890"
                        maxLength={10}
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <span className="form-error">{errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Select Subject */}
                <div className="form-group-full">
                  <label className="form-label">Select Service?</label>
                  <div className="radio-group">
                    {["3D Product Animation", "3d Product Render", "Both"].map(
                      (subject, index) => (
                        <label key={index} className="radio-label">
                          <input
                            type="radio"
                            name="subject"
                            value={subject}
                            checked={formData.subject === subject}
                            onChange={() => handleSubjectChange(subject)}
                            className="radio-input"
                          />
                          <span className="radio-custom"></span>
                          <span className="radio-text">{subject}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="form-group-full">
                  <label htmlFor="message" className="form-label">
                    Message
                    <span className="char-count">
                      {formData.message.length}/1000
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-textarea ${
                      errors.message && touched.message
                        ? "form-input-error"
                        : ""
                    }`}
                    placeholder="Write your message..."
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    maxLength={1000}
                  ></textarea>
                  {errors.message && touched.message && (
                    <span className="form-error">{errors.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="form-submit">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="button-spinner"></span>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="section-loading" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Contact;
