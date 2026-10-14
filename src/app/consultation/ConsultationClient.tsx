"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { categories, exams } from "@/data/exams";
import { useReveal } from "@/hooks/useReveal";
import styles from "./consultation.module.css";

type FormStep = 1 | 2 | 3;

interface FormData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Step 2
  examCategory: string;
  examName: string;
  customExam: string;
  timeline: string;
  supportType: string[];
  // Step 3
  goals: string;
  experience: string;
  contactMethod: string;
  bestTime: string;
  additionalNotes: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  examCategory: "",
  examName: "",
  customExam: "",
  timeline: "",
  supportType: [],
  goals: "",
  experience: "",
  contactMethod: "email",
  bestTime: "",
  additionalNotes: "",
};

const timelines = [
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Not sure yet",
];

const supportTypes = [
  "One-on-one tutoring",
  "Study plan creation",
  "Practice tests & mock exams",
  "Study materials & resources",
  "Group study sessions",
  "Exam strategy & tips",
  "Full preparation package",
];

const contactMethods = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone Call" },
];

const experienceLevels = [
  "Complete beginner",
  "Some familiarity",
  "Intermediate",
  "Advanced — need final polish",
  "Re-taking the exam",
];

function ConsultationForm() {
  const searchParams = useSearchParams();
  const preselectedExam = searchParams.get("exam") || "";

  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>(() => {
    const data = { ...initialFormData };
    if (preselectedExam) {
      const exam = exams.find((e) => e.slug === preselectedExam);
      if (exam) {
        data.examCategory = exam.categorySlug;
        data.examName = exam.slug;
      }
    }
    return data;
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const headerReveal = useReveal(0.1);

  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const toggleSupportType = useCallback((type: string) => {
    setFormData((prev) => ({
      ...prev,
      supportType: prev.supportType.includes(type)
        ? prev.supportType.filter((t) => t !== type)
        : [...prev.supportType, type],
    }));
  }, []);

  const validateStep = (currentStep: FormStep): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Please enter a valid email address";
    }

    if (currentStep === 2) {
      if (!formData.examCategory) newErrors.examCategory = "Please select a category";
      if (!formData.timeline) newErrors.timeline = "Please select a timeline";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3) as FormStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1) as FormStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    try {
      // Build the email body
      const selectedExam = exams.find((ex) => ex.slug === formData.examName);
      const selectedCategory = categories.find((c) => c.slug === formData.examCategory);

      const emailBody = `
NEW EXAM CONSULTATION ENQUIRY
==============================

PERSONAL INFORMATION
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone || "Not provided"}

EXAM DETAILS
- Category: ${selectedCategory?.name || formData.examCategory}
- Exam: ${selectedExam?.name || formData.customExam || "Not specified"}
- Timeline: ${formData.timeline}
- Support Type: ${formData.supportType.join(", ") || "Not specified"}

ADDITIONAL INFORMATION
- Goals: ${formData.goals || "Not provided"}
- Experience Level: ${formData.experience || "Not specified"}
- Preferred Contact: ${formData.contactMethod}
- Best Time: ${formData.bestTime || "Not specified"}
- Additional Notes: ${formData.additionalNotes || "None"}

==============================
Sent from ExamGuidePal Consultation Form
      `.trim();

      // Use mailto link for sending
      const mailtoLink = `mailto:mosdeeacademy@gmail.com?subject=${encodeURIComponent(
        `New Consultation Request: ${selectedExam?.name || formData.customExam || selectedCategory?.name || "General Inquiry"} — ${formData.firstName} ${formData.lastName}`
      )}&body=${encodeURIComponent(emailBody)}`;

      window.location.href = mailtoLink;

      setIsSuccess(true);
    } catch {
      // fallback
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredExams = formData.examCategory
    ? exams.filter((e) => e.categorySlug === formData.examCategory)
    : [];

  if (isSuccess) {
    return (
      <div className={styles.wrapper}>
        <div className={`container ${styles.successContainer}`}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="var(--color-accent-light)" />
                <path d="M15 24l6 6 12-12" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className={styles.successTitle}>Enquiry Ready to Send!</h2>
            <p className={styles.successDesc}>
              Your email client should open with your enquiry details pre-filled.
              Simply click &ldquo;Send&rdquo; to submit your consultation request to our team.
              We&rsquo;ll get back to you as soon as possible.
            </p>
            <div className={styles.successActions}>
              <Link href="/" className="btn btn--primary">
                Return to Home
              </Link>
              <Link href="/exams" className="btn btn--outline">
                Browse More Exams
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div
          ref={headerReveal.ref}
          className={`reveal ${headerReveal.visible ? "reveal--visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}
        >
          <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>
            Free Consultation
          </span>
          <h1 className={styles.pageTitle}>
            Tell Us About Your Exam Goals
          </h1>
          <p className={styles.pageDesc}>
            Fill out this form and our team will review your enquiry and reach out
            to discuss how we can help you prepare.
          </p>
        </div>

        {/* Progress Steps */}
        <div className={styles.progressBar}>
          {[
            { num: 1, label: "Your Details" },
            { num: 2, label: "Exam Info" },
            { num: 3, label: "Preferences" },
          ].map((s) => (
            <div
              key={s.num}
              className={`${styles.progressStep} ${
                step >= s.num ? styles.progressStepActive : ""
              } ${step > s.num ? styles.progressStepComplete : ""}`}
            >
              <div className={styles.progressStepDot}>
                {step > s.num ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  s.num
                )}
              </div>
              <span className={styles.progressStepLabel}>{s.label}</span>
              {s.num < 3 && <div className={styles.progressLine} />}
            </div>
          ))}
        </div>

        {/* Form */}
        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Personal Information</h2>
              <p className={styles.stepDesc}>
                Let us know who you are so we can get back to you.
              </p>
              <div className={styles.fieldGrid}>
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span style={{ color: "var(--color-error)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className={`form-input ${errors.firstName ? "form-input--error" : ""}`}
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                  />
                  {errors.firstName && <p className="form-error">{errors.firstName}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span style={{ color: "var(--color-error)" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className={`form-input ${errors.lastName ? "form-input--error" : ""}`}
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                  />
                  {errors.lastName && <p className="form-error">{errors.lastName}</p>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span style={{ color: "var(--color-error)" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className={`form-input ${errors.email ? "form-input--error" : ""}`}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number <span style={{ color: "var(--color-text-tertiary)", fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="form-input"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Exam Details */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Exam Information</h2>
              <p className={styles.stepDesc}>
                Tell us about the exam you&rsquo;re preparing for.
              </p>
              <div className="form-group">
                <label htmlFor="examCategory" className="form-label">
                  Exam Category <span style={{ color: "var(--color-error)" }}>*</span>
                </label>
                <select
                  id="examCategory"
                  className={`form-input ${errors.examCategory ? "form-input--error" : ""}`}
                  value={formData.examCategory}
                  onChange={(e) => {
                    updateField("examCategory", e.target.value);
                    updateField("examName", "");
                  }}
                >
                  <option value="">Select a category...</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                  <option value="other">Other / Not Listed</option>
                </select>
                {errors.examCategory && <p className="form-error">{errors.examCategory}</p>}
              </div>

              {formData.examCategory && formData.examCategory !== "other" && (
                <div className="form-group">
                  <label htmlFor="examName" className="form-label">
                    Specific Exam
                  </label>
                  <select
                    id="examName"
                    className="form-input"
                    value={formData.examName}
                    onChange={(e) => updateField("examName", e.target.value)}
                  >
                    <option value="">Select an exam (optional)...</option>
                    {filteredExams.map((exam) => (
                      <option key={exam.slug} value={exam.slug}>
                        {exam.name}
                      </option>
                    ))}
                    <option value="other">Other / Not Listed</option>
                  </select>
                </div>
              )}

              {(formData.examCategory === "other" || formData.examName === "other") && (
                <div className="form-group">
                  <label htmlFor="customExam" className="form-label">
                    Please describe the exam
                  </label>
                  <input
                    type="text"
                    id="customExam"
                    className="form-input"
                    placeholder="E.g., University calculus final, CompTIA Security+..."
                    value={formData.customExam}
                    onChange={(e) => updateField("customExam", e.target.value)}
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="timeline" className="form-label">
                  When is your exam? <span style={{ color: "var(--color-error)" }}>*</span>
                </label>
                <select
                  id="timeline"
                  className={`form-input ${errors.timeline ? "form-input--error" : ""}`}
                  value={formData.timeline}
                  onChange={(e) => updateField("timeline", e.target.value)}
                >
                  <option value="">Select a timeline...</option>
                  {timelines.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.timeline && <p className="form-error">{errors.timeline}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  What type of support do you need?
                </label>
                <div className={styles.checkboxGrid}>
                  {supportTypes.map((type) => (
                    <label key={type} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.supportType.includes(type)}
                        onChange={() => toggleSupportType(type)}
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkboxCustom}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className={styles.checkboxText}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>Your Preferences</h2>
              <p className={styles.stepDesc}>
                Help us understand your goals and how to best reach you.
              </p>

              <div className="form-group">
                <label htmlFor="goals" className="form-label">
                  What are your goals for this exam?
                </label>
                <textarea
                  id="goals"
                  className="form-input"
                  rows={3}
                  placeholder="E.g., achieve a minimum score of 700, pass on first attempt..."
                  value={formData.goals}
                  onChange={(e) => updateField("goals", e.target.value)}
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience" className="form-label">
                  Your current experience level
                </label>
                <select
                  id="experience"
                  className="form-input"
                  value={formData.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                >
                  <option value="">Select your level...</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Preferred contact method
                </label>
                <div className={styles.radioGroup}>
                  {contactMethods.map((method) => (
                    <label key={method.value} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method.value}
                        checked={formData.contactMethod === method.value}
                        onChange={(e) => updateField("contactMethod", e.target.value)}
                        className={styles.radioInput}
                      />
                      <span className={styles.radioCustom} />
                      <span>{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bestTime" className="form-label">
                  Best time to reach you
                </label>
                <input
                  type="text"
                  id="bestTime"
                  className="form-input"
                  placeholder="E.g., Weekday evenings after 6pm EST"
                  value={formData.bestTime}
                  onChange={(e) => updateField("bestTime", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="additionalNotes" className="form-label">
                  Anything else you&rsquo;d like us to know?
                </label>
                <textarea
                  id="additionalNotes"
                  className="form-input"
                  rows={3}
                  placeholder="Any additional information, questions, or concerns..."
                  value={formData.additionalNotes}
                  onChange={(e) => updateField("additionalNotes", e.target.value)}
                  style={{ resize: "vertical" }}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={styles.formActions}>
            {step > 1 && (
              <button
                type="button"
                className="btn btn--outline"
                onClick={prevStep}
              >
                ← Back
              </button>
            )}
            <div style={{ flex: 1 }} />
            {step < 3 ? (
              <button
                type="button"
                className="btn btn--primary"
                onClick={nextStep}
              >
                Continue →
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn--accent btn--lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <span className="spinner" />
                    Preparing...
                  </span>
                ) : (
                  "Submit Enquiry →"
                )}
              </button>
            )}
          </div>
        </form>

        {/* Trust note */}
        <div className={styles.trustNote}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>Your information is secure and will only be used to respond to your enquiry.</span>
        </div>
      </div>
    </div>
  );
}

export function ConsultationClient() {
  return (
    <Suspense fallback={
      <div className={styles.wrapper}>
        <div className="container" style={{ textAlign: "center", padding: "var(--space-5xl) 0" }}>
          <span className="spinner" style={{ display: "inline-block" }} />
        </div>
      </div>
    }>
      <ConsultationForm />
    </Suspense>
  );
}
