import { Metadata } from "next";
import Link from "next/link";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Comprehensive Exam Preparation Services | ExamGuidePal",
  description:
    "Personalized 1-on-1 tutoring, custom study roadmaps, simulated mock exams, and test strategy coaching for 99+ exams and certifications.",
};

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "1-on-1 Dedicated Tutoring",
    desc: "Private, live video coaching with subject matter experts who have passed your exam in top percentiles.",
    features: [
      "Customized pacing based on your diagnostic",
      "Screen sharing & interactive problem-solving",
      "Session recordings for unlimited review",
      "Direct tutor messaging between sessions",
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Tailored Study Roadmaps",
    desc: "A realistic day-by-day and week-by-week study plan that fits seamlessly into your work, family, and university schedule.",
    features: [
      "Target score timeline calculation",
      "Daily chapter and question quotas",
      "Built-in catch-up buffer days",
      "Dynamic adjustments based on progress",
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Simulated Mock Exams & Analytics",
    desc: "Replicate authentic test-day conditions with timed assessments and detailed diagnostic explanations.",
    features: [
      "Official-style interface & timing",
      "Question-by-question breakdown",
      "Pacing & time management analytics",
      "Confidence vs. accuracy correlation",
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    title: "Curated High-Yield Notes",
    desc: "Eliminate information overload with summaries, memory anchors, mnemonics, and cheat sheets focused strictly on what is tested.",
    features: [
      "Concentrated formula & rule sheets",
      "Visual flowcharts & diagrams",
      "Common test trap alerts",
      "Offline downloadable PDFs",
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    title: "Test Strategy & Anxiety Coaching",
    desc: "Techniques for eliminating wrong answers, educated guessing algorithms, stress mitigation, and mental endurance.",
    features: [
      "Test anxiety management drills",
      "Process of elimination tactics",
      "Last 48-hours test readiness protocol",
      "Score verification & review guidance",
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Application & Registration Support",
    desc: "Guidance through complex eligibility applications, credential verification, exam scheduling, and accommodations.",
    features: [
      "Prerequisite auditing & checklist",
      "Documentation review & verification",
      "Testing center date optimization",
      "Special accommodation petitions",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        {/* Hero Section */}
        <div className={styles.hero}>
          <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>
            Our Support Framework
          </span>
          <h1 className={styles.title}>
            Everything You Need To Prepare, Practice & Pass
          </h1>
          <p className={styles.subtitle}>
            We combine high-touch personalized tutoring with evidence-based study tools to help you
            achieve your target score without wasting months of trial and error.
          </p>
        </div>

        {/* Services Cards */}
        <div className={styles.servicesGrid}>
          {services.map((svc, i) => (
            <div key={i} className={styles.serviceCard}>
              <div className={styles.serviceIconWrap}>{svc.icon}</div>
              <h2 className={styles.serviceTitle}>{svc.title}</h2>
              <p className={styles.serviceDesc}>{svc.desc}</p>
              <ul className={styles.featureList}>
                {svc.features.map((f, fi) => (
                  <li key={fi} className={styles.featureListItem}>
                    <span className={styles.checkMark}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/consultation"
                className="btn btn--outline"
                style={{ marginTop: "auto", fontSize: "var(--font-size-xs)" }}
              >
                Inquire About This Service →
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className={styles.comparisonCard}>
          <h2 className={styles.comparisonTitle}>Why Students Choose ExamGuidePal</h2>
          <p className={styles.comparisonSubtitle}>
            How structured mentorship accelerates your preparation compared to independent study
          </p>

          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Feature / Dimension</th>
                <th>Traditional Self-Study</th>
                <th className={styles.highlightCol}>ExamGuidePal Approach</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Curriculum</strong></td>
                <td>Generic textbooks with irrelevant fluff</td>
                <td className={styles.highlightCol}>Customized high-yield blueprint based on diagnostic</td>
              </tr>
              <tr>
                <td><strong>Accountability</strong></td>
                <td>Easy to procrastinate and lose momentum</td>
                <td className={styles.highlightCol}>Weekly tutor check-ins and objective milestone tracking</td>
              </tr>
              <tr>
                <td><strong>Doubts & Bottlenecks</strong></td>
                <td>Hours spent searching forums or ChatGPT</td>
                <td className={styles.highlightCol}>Instant clarification from vetted expert educators</td>
              </tr>
              <tr>
                <td><strong>Practice Testing</strong></td>
                <td>Random scores without actionable insights</td>
                <td className={styles.highlightCol}>Detailed analytics on error patterns and timing traps</td>
              </tr>
              <tr>
                <td><strong>Time To Exam Readiness</strong></td>
                <td>Often 6–12 months of trial and error</td>
                <td className={styles.highlightCol}>Focused 6–12 weeks of concentrated high-impact prep</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaHeading}>Ready to Start Your Preparation?</h2>
          <p className={styles.ctaText}>
            Tell us about your test date and goals. We will match you with a specialized tutor
            and send a customized proposal straight to your inbox.
          </p>
          <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/consultation" className="btn btn--primary btn--lg">
              Request Free Consultation →
            </Link>
            <Link href="/exams" className="btn btn--outline btn--lg">
              Explore 99+ Exams
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
