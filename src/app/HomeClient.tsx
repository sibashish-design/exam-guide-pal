"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LanguageIllustration } from "@/components/illustrations/LanguageIllustration";
import { TrustIllustration } from "@/components/illustrations/TrustIllustration";
import { categories, getFeaturedExams } from "@/data/exams";
import { faqs as allFaqs } from "@/data/faqs";
import { useReveal } from "@/hooks/useReveal";
import { Accordion } from "@/components/ui/Accordion";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import styles from "./home.module.css";

function AnimatedMetric({ value, suffix = "", start }: { value: number; suffix?: string; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1000;
    const startedAt = performance.now();
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [start, value]);

  return <>{count}{suffix}</>;
}

const steps = [
  {
    num: "01",
    title: "Choose Your Exam",
    desc: "Browse the catalogue and select the examination or certification relevant to your goals.",
  },
  {
    num: "02",
    title: "Tell Us Your Goals",
    desc: "Complete the enquiry form with your exam, timeline, and preferred support.",
  },
  {
    num: "03",
    title: "Discuss Requirements",
    desc: "Review your goals with the team and clarify available services, expectations, and next steps.",
  },
  {
    num: "04",
    title: "Start Preparing",
    desc: "Receive personalized preparation support and begin your journey to exam success.",
  },
];

const benefits = [
  {
    icon: "✦",
    title: "Personalized Guidance",
    desc: "Support shaped around your exam and learning needs.",
  },
  {
    icon: "◎",
    title: "Clear Communication",
    desc: "Understand the available options before making a decision.",
  },
  {
    icon: "◆",
    title: "Structured Preparation",
    desc: "Organize your study priorities, practice, and revision.",
  },
  {
    icon: "●",
    title: "Broad Exam Coverage",
    desc: "Find relevant support across academic and professional categories.",
  },
];

const resources = [
  {
    title: "How to Build an Effective Study Schedule",
    excerpt: "Learn proven strategies for organizing your study time, setting milestones, and staying on track for exam day.",
    slug: "effective-study-schedule",
    category: "Study Tips",
  },
  {
    title: "Managing Test Anxiety: A Practical Guide",
    excerpt: "Evidence-based techniques to manage exam stress, build confidence, and perform at your best under pressure.",
    slug: "managing-test-anxiety",
    category: "Wellness",
  },
  {
    title: "Choosing the Right Certification Path",
    excerpt: "Navigate the landscape of professional certifications and find the right credential to advance your career goals.",
    slug: "choosing-certification-path",
    category: "Career",
  },
];

export function HomeClient() {
  const featuredExams = getFeaturedExams();
  const heroReveal = useReveal(0.1);
  const trustReveal = useReveal();
  const categoriesReveal = useReveal();
  const popularReveal = useReveal();
  const langReveal = useReveal();
  const howReveal = useReveal();
  const whyReveal = useReveal();
  const statsReveal = useReveal();
  const resourcesReveal = useReveal();
  const faqReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <div
          ref={heroReveal.ref}
          className={`container reveal ${heroReveal.visible ? "reveal--visible" : ""}`}
        >
          <div className={styles.heroContent}>
            <span className="eyebrow">
              ✦ Personalized Exam Preparation
            </span>
            <h1 className={styles.heroTitle}>
              Learn Smarter. Grow Faster.
              <br />
              <span className={styles.heroAccent}>Succeed Anywhere.</span>
            </h1>
            <p className={styles.heroDesc}>
              From university exams to professional certifications, find
              personalized preparation support, expert guidance, and a study plan
              built around your goals.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/exams" className="btn btn--primary btn--lg">
                Explore Exams →
              </Link>
              <Link href="/consultation" className="btn btn--secondary btn--lg">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Request Free Consultation
                </span>
              </Link>
            </div>
            <div className={styles.heroReassurance}>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Personalized guidance
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Clear next steps
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                No-obligation enquiry
              </span>
            </div>
          </div>

          {/* Hero Image — matching the reference layout */}
          <div className={styles.heroImageWrapper}>
            <picture>
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Diverse group of happy students learning together"
                className={styles.heroImage}
                loading="eager"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="section section--white">
        <div
          ref={statsReveal.ref}
          className={`container reveal ${statsReveal.visible ? "reveal--visible" : ""}`}
        >
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statValue}><AnimatedMetric value={99} suffix="+" start={statsReveal.visible} /></span>
              <span className={styles.statLabel}>Exams Covered</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}><AnimatedMetric value={9} start={statsReveal.visible} /></span>
              <span className={styles.statLabel}>Categories</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}><AnimatedMetric value={10} suffix="+" start={statsReveal.visible} /></span>
              <span className={styles.statLabel}>Languages</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}><AnimatedMetric value={100} suffix="%" start={statsReveal.visible} /></span>
              <span className={styles.statLabel}>Personalized</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST HIGHLIGHTS ═══ */}
      <section className={`section section--light ${styles.trust}`}>
        <div
          ref={trustReveal.ref}
          className={`container reveal ${trustReveal.visible ? "reveal--visible" : ""}`}
        >
          <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
            <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>Why ExamGuidePal</span>
            <h2 className="section-heading" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Everything You Need to Succeed
            </h2>
          </div>
          <div className={styles.trustGrid}>
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M5 20c0-4.418 3.134-8 7-8s7 3.582 7 8"/>
                  </svg>
                ),
                title: "Personalized Study Support",
                desc: "Tailored study plans crafted around your specific exam and timeline.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                    <path d="M3 10h18"/>
                    <circle cx="8" cy="15" r="1.5" fill="var(--color-accent)"/>
                  </svg>
                ),
                title: "99+ Exam Categories",
                desc: "Coverage across IT, healthcare, finance, language, and academic exams.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M3 10h18"/>
                    <path d="M10 4v16"/>
                  </svg>
                ),
                title: "Flexible Consultation",
                desc: "Free consultation to discuss your goals and explore available options.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l2.5 5 5.5 .8-4 3.9 .9 5.3-4.9-2.6L7.1 18l.9-5.3-4-3.9L9.5 8z"/>
                  </svg>
                ),
                title: "Student-Focused Guidance",
                desc: "Clear communication and transparent advice throughout your journey.",
              },
            ].map((item) => (
              <div key={item.title} className={styles.trustCard}>
                <div className={styles.trustIcon}>{item.icon}</div>
                <h3 className={styles.trustTitle}>{item.title}</h3>
                <p className={styles.trustDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXAM CATEGORIES ═══ */}
      <section className="section section--white" id="categories">
        <div
          ref={categoriesReveal.ref}
          className={`container reveal ${categoriesReveal.visible ? "reveal--visible" : ""}`}
        >
          <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
            <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>Explore</span>
            <h2 className="section-heading" style={{ maxWidth: "600px", margin: "0 auto var(--space-md)" }}>
              Find Support for Your Exam
            </h2>
            <p className="section-subheading" style={{ margin: "0 auto" }}>
              Explore academic assessments, professional certifications, language
              tests, and specialized subject exams.
            </p>
          </div>
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/exams/category/${cat.slug}`}
                className={styles.categoryCard}
              >
                <div className={styles.categoryIcon}>
                  <CategoryIcon type={cat.icon} />
                </div>
                <h3 className={styles.categoryName}>{cat.name}</h3>
                <p className={styles.categoryDesc}>{cat.description}</p>
                <span className={styles.categoryCount}>
                  {cat.examCount} exams
                </span>
                <span className={styles.categoryLink}>Explore Exams →</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "var(--space-2xl)" }}>
            <Link href="/exams" className="btn btn--primary">
              Browse All Exams →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ GLOBAL LANGUAGE CERTIFICATIONS ═══ */}
      <section className={`section section--light ${styles.langSection}`}>
        <div
          ref={langReveal.ref}
          className={`container reveal ${langReveal.visible ? "reveal--visible" : ""}`}
        >
          <div className={styles.langGrid}>
            <div>
              <span className="eyebrow">Multi-Lingual Excellence</span>
              <h2 className="section-heading">Master 10+ Global Languages</h2>
              <p className="section-subheading" style={{ marginBottom: "var(--space-lg)" }}>
                Achieve official certifications in English, Spanish, French, German, Chinese, Japanese, Korean, Italian, Portuguese, and healthcare English (OET).
              </p>
              <div className={styles.langBadges}>
                {[
                  "DELE & SIELE (Spanish)",
                  "DELF & DALF (French)",
                  "Goethe & TestDaF (German)",
                  "HSK & HSKK (Chinese)",
                  "JLPT (Japanese)",
                  "TOPIK (Korean)",
                  "CELI & CILS (Italian)",
                  "IELTS & TOEFL (English)",
                  "OET (Healthcare)",
                  "CELPIP & PTE",
                ].map((badge) => (
                  <span key={badge} className="badge" style={{ fontSize: "var(--fs-xs)", padding: "0.4rem 0.85rem" }}>
                    {badge}
                  </span>
                ))}
              </div>
              <Link href="/exams/category/language-exams" className="btn btn--primary">
                Explore All Language Exams →
              </Link>
            </div>
            <div className={styles.langVisual}>
              <LanguageIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ POPULAR EXAMS ═══ */}
      <section className="section section--white">
        <div
          ref={popularReveal.ref}
          className={`container reveal ${popularReveal.visible ? "reveal--visible" : ""}`}
        >
          <div style={{ textAlign: "center", marginBottom: "var(--space-md)" }}>
            <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>
              Popular
            </span>
            <h2 className="section-heading" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Prepare for Your Next Milestone
            </h2>
          </div>
          <div className={styles.examGrid}>
            {featuredExams.map((exam) => (
              <div key={exam.slug} className={styles.examCard}>
                <span className={styles.examCategory}>{exam.category}</span>
                <h3 className={styles.examName}>{exam.name}</h3>
                <p className={styles.examDesc}>{exam.description}</p>
                <div className={styles.examActions}>
                  <Link
                    href={`/exams/${exam.slug}`}
                    className="btn btn--primary btn--sm"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/consultation?exam=${exam.slug}`}
                    className="btn btn--outline btn--sm"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="section section--dark">
        <div
          ref={howReveal.ref}
          className={`container reveal ${howReveal.visible ? "reveal--visible" : ""}`}
        >
          <div style={{ textAlign: "center", marginBottom: "var(--space-md)" }}>
            <span className="eyebrow eyebrow--dark" style={{ margin: "0 auto var(--space-md)" }}>Process</span>
            <h2 className="section-heading section-heading--light" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Your Next Step Starts Here
            </h2>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((step) => (
              <div key={step.num} className={styles.stepCard}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY EXAMGUIDEPAL ═══ */}
      <section className="section section--white">
        <div
          ref={whyReveal.ref}
          className={`container reveal ${whyReveal.visible ? "reveal--visible" : ""}`}
        >
          <div className={styles.whyGrid}>
            <div className={styles.whyContent}>
              <span className="eyebrow">
                Why Choose Us
              </span>
              <h2 className="section-heading">
                Support Built Around Your Goals
              </h2>
              <div className={styles.benefitsList}>
                {benefits.map((b) => (
                  <div key={b.title} className={styles.benefitItem}>
                    <div className={styles.benefitDot}>
                      <span style={{ color: "var(--color-accent)", fontSize: "14px" }}>{b.icon}</span>
                    </div>
                    <div>
                      <h3 className={styles.benefitTitle}>{b.title}</h3>
                      <p className={styles.benefitDesc}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.whyIllustration}>
              <TrustIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RESOURCES ═══ */}
      <section className="section section--light">
        <div
          ref={resourcesReveal.ref}
          className={`container reveal ${resourcesReveal.visible ? "reveal--visible" : ""}`}
        >
          <div style={{ textAlign: "center", marginBottom: "var(--space-md)" }}>
            <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>Resources</span>
            <h2 className="section-heading" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Make Your Preparation More Effective
            </h2>
          </div>
          <div className={styles.resourceGrid}>
            {resources.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className={styles.resourceCard}
              >
                <span className={styles.resourceCategory}>{r.category}</span>
                <h3 className={styles.resourceTitle}>{r.title}</h3>
                <p className={styles.resourceExcerpt}>{r.excerpt}</p>
                <span className={styles.resourceLink}>Read More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section section--white">
        <div
          ref={faqReveal.ref}
          className={`container reveal ${faqReveal.visible ? "reveal--visible" : ""}`}
        >
          <div style={{ textAlign: "center", marginBottom: "var(--space-md)" }}>
            <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>
              FAQ
            </span>
            <h2 className="section-heading" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className={styles.faqContainer}>
            {allFaqs.slice(0, 6).map((faq) => (
              <Accordion key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "var(--space-xl)" }}>
            <Link href="/faq" className="btn btn--outline btn--sm">
              View All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className={`section ${styles.finalCta}`}>
        <div
          ref={ctaReveal.ref}
          className={`container reveal ${ctaReveal.visible ? "reveal--visible" : ""}`}
          style={{ textAlign: "center" }}
        >
          <h2 className={styles.ctaTitle}>Let&rsquo;s Plan Your Next Step.</h2>
          <p className={styles.ctaDesc}>
            Tell us which exam you&rsquo;re preparing for and what kind of support
            you need. Our team can review your enquiry and explain the available
            options.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/consultation" className="btn btn--accent btn--lg">
              Request a Consultation →
            </Link>
            <Link href="/exams" className="btn btn--outline-light btn--lg">
              Browse Exams
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
