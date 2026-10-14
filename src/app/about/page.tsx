import { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About ExamGuidePal — Empowering Academic & Professional Success",
  description:
    "Learn about ExamGuidePal's mission to make high-stakes exam preparation transparent, personalized, and effective for students worldwide.",
};

const values = [
  {
    icon: "🎯",
    title: "Student-First Focus",
    desc: "We prioritize your individual learning style and pace. No generic cookie-cutter syllabi; every plan is built uniquely for your goals.",
  },
  {
    icon: "🔬",
    title: "Evidence-Based Pedagogy",
    desc: "Our teaching methodologies apply proven cognitive science: active recall, spaced repetition, and diagnostic error analysis.",
  },
  {
    icon: "💎",
    title: "Uncompromising Integrity",
    desc: "Honest feedback, transparent communication, and realistic score projections. We respect your time, energy, and aspirations.",
  },
  {
    icon: "🌍",
    title: "Global Perspective",
    desc: "Supporting candidates preparing for US, UK, Canadian, Australian, European, and international standardized certifications.",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        {/* Hero Section */}
        <div className={styles.hero}>
          <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>
            Our Mission & Story
          </span>
          <h1 className={styles.title}>About ExamGuidePal</h1>
          <p className={styles.subtitle}>
            We believe that high-stakes exams should not be a roadblock to your dreams. With the right
            mentorship, structured preparation, and diagnostic clarity, any candidate can excel.
          </p>
        </div>

        {/* Story Card */}
        <div className={styles.storyCard}>
          <h2 className={styles.storyTitle}>Demystifying High-Stakes Tests</h2>
          <p className={styles.storyText}>
            ExamGuidePal was founded to solve a pervasive problem: students and professionals invest
            hundreds of hours and significant financial resources into exam prep, only to be overwhelmed
            by generic 1,000-page prep books and unguided online question banks.
          </p>
          <p className={styles.storyText}>
            We set out to create a truly supportive educational companion. By pairing aspiring test-takers
            with experienced tutors who have conquered those exact examinations, we provide the targeted
            feedback, strategy drills, and emotional support needed to turn anxiety into mastery.
          </p>
          <p className={styles.storyText}>
            Today, ExamGuidePal covers more than 99 certifications and examinations across healthcare,
            cloud computing, cybersecurity, finance, business administration, graduate admissions, and
            language testing.
          </p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>99+</div>
            <div className={styles.statLabel}>Exams Supported</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>94%</div>
            <div className={styles.statLabel}>First-Time Pass Rate</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>4.9/5</div>
            <div className={styles.statLabel}>Student Satisfaction</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>24h</div>
            <div className={styles.statLabel}>Fast Response Time</div>
          </div>
        </div>

        {/* Core Values */}
        <div className={styles.valuesSection}>
          <div className={styles.valuesHeader}>
            <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>
              What Drives Us
            </span>
            <h2 className={styles.valuesTitle}>Our Core Principles</h2>
            <p className={styles.valuesSubtitle}>
              The values that define how we coach, mentor, and guide each student.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <div>
                  <h3 className={styles.valueHeading}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--color-surface), rgba(16, 185, 129, 0.06))",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "var(--space-4xl) var(--space-2xl)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "var(--font-size-3xl)", fontWeight: 800, marginBottom: "var(--space-sm)" }}>
            Let&rsquo;s Achieve Your Goals Together
          </h2>
          <p style={{ color: "var(--color-text-secondary)", maxWidth: "560px", margin: "0 auto var(--space-2xl)" }}>
            Whether you are taking your first certification or retaking a critical exam, our team is ready to help you succeed.
          </p>
          <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/consultation" className="btn btn--primary btn--lg">
              Get Started with a Free Consultation →
            </Link>
            <Link href="/contact" className="btn btn--outline btn--lg">
              Contact Our Advisors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
