"use client";

import { useState } from "react";
import styles from "./contact.module.css";
import { whatsappLink, whatsappNumber } from "@/data/contact";

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    exam: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const emailSubject = encodeURIComponent(`Contact Inquiry from ${formData.name}: ${formData.exam || "General Inquiry"}`);
    const emailBody = encodeURIComponent(
      `NEW CONTACT INQUIRY\n` +
      `====================\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || "Not provided"}\n` +
      `Exam of Interest: ${formData.exam || "Not specified"}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `====================\n` +
      `Sent via ExamGuidePal Contact Form`
    );

    window.location.href = `mailto:mosdeeacademy@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    setIsSending(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        {/* Hero Section */}
        <div className={styles.hero}>
          <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>
            Get in Touch
          </span>
          <h1 className={styles.title}>We’re Here To Help You Succeed</h1>
          <p className={styles.subtitle}>
            Have questions about an exam, our tutoring methodology, or how to get started?
            Reach out to our academic advisors directly.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Info Column */}
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Contact Details</h2>
              <p className={styles.infoDesc}>
                Reach out anytime. Our support team typically replies within 24 hours on business days.
              </p>

              <div className={styles.channelList}>
                <div className={styles.channelItem}>
                  <div className={styles.channelIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 11.5a8.38 8.38 0 0 1-9 8.5 9.1 9.1 0 0 1-3.8-.9L3 20l1.1-3.7A8.5 8.5 0 1 1 20 11.5Z"/><path d="M8 9.2c.2 2.6 2.2 4.8 4.8 5.1l1.4-1.1 1.6.8c-.5 1.4-1.6 2-2.8 1.7-3.8-1-6.1-3.4-6.9-6.8-.3-1.2.4-2.2 1.7-2.7l.8 1.6Z"/></svg>
                  </div>
                  <div>
                    <div className={styles.channelLabel}>WhatsApp Support</div>
                    <a href={whatsappLink("Hi ExamGuidePal, I would like help choosing exam preparation support.")} target="_blank" rel="noreferrer" className={styles.channelValue}>{whatsappNumber}</a>
                  </div>
                </div>
                <div className={styles.channelItem}>
                  <div className={styles.channelIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.channelLabel}>Official Enquiry Email</div>
                    <a href="mailto:mosdeeacademy@gmail.com" className={styles.channelValue}>
                      mosdeeacademy@gmail.com
                    </a>
                  </div>
                </div>

                <div className={styles.channelItem}>
                  <div className={styles.channelIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.channelLabel}>Advisory Working Hours</div>
                    <div className={styles.channelValue} style={{ fontSize: "var(--font-size-sm)" }}>
                      Monday – Saturday: 8:00 AM – 8:00 PM EST
                    </div>
                  </div>
                </div>

                <div className={styles.channelItem}>
                  <div className={styles.channelIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.channelLabel}>Consultation Format</div>
                    <div className={styles.channelValue} style={{ fontSize: "var(--font-size-sm)" }}>
                      Online via Google Meet, Zoom, or WhatsApp
                    </div>
                  </div>
                </div>
              </div>
              <a
                href={whatsappLink("Hi ExamGuidePal, I would like help choosing exam preparation support.")}
                target="_blank"
                rel="noreferrer"
                className={styles.whatsappAction}
              >
                Chat on WhatsApp — {whatsappNumber}
              </a>
            </div>

            {/* Quick FAQ Card */}
            <div className={styles.faqCard}>
              <h3 style={{ fontSize: "var(--font-size-base)", fontWeight: 700, marginBottom: "var(--space-md)" }}>
                Quick Questions
              </h3>
              <div className={styles.faqItem}>
                <div className={styles.faqQ}>How fast will I hear back?</div>
                <div className={styles.faqA}>
                  Our team reviews inquiries continuously and responds within 1 business day.
                </div>
              </div>
              <div className={styles.faqItem}>
                <div className={styles.faqQ}>Is the consultation really free?</div>
                <div className={styles.faqA}>
                  Yes, 100% free with zero obligation. We evaluate your goals and outline preparation paths.
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send Us a Message</h2>
            <p className={styles.formDesc}>
              Complete the form below to send an enquiry directly to our academic directors.
            </p>

            {submitted ? (
              <div className={styles.successMessage}>
                <h3 className={styles.successTitle}>Enquiry Prepared!</h3>
                <p className={styles.successText}>
                  Your email client has opened with your message addressed to{" "}
                  <strong>mosdeeacademy@gmail.com</strong>. Click Send in your email client to deliver it.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn--outline"
                  style={{ marginTop: "var(--space-md)", fontSize: "var(--font-size-xs)" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.nameRow}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Your Full Name <span style={{ color: "var(--color-error)" }}>*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address <span style={{ color: "var(--color-error)" }}>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.nameRow}>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number (optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+44 7700 900000"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exam" className="form-label">
                      Exam of Interest
                    </label>
                    <input
                      id="exam"
                      type="text"
                      placeholder="E.g., USMLE Step 1, AWS SAA, NCLEX, GRE"
                      className="form-input"
                      value={formData.exam}
                      onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message / Target Goals <span style={{ color: "var(--color-error)" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell us when your exam is, what study challenges you face, or any specific questions you have..."
                    className="form-input"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn btn--primary btn--lg"
                  style={{ width: "100%", marginTop: "var(--space-md)" }}
                >
                  {isSending ? "Preparing Email..." : "Send Enquiry to mosdeeacademy@gmail.com →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
