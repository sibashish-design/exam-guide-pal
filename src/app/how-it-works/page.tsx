import { Metadata } from "next";
import Link from "next/link";
import styles from "./how-it-works.module.css";

export const metadata: Metadata = {
  title: "How It Works — 4 Steps to Exam Success | ExamGuidePal",
  description:
    "Learn about our step-by-step methodology: initial diagnostic, tailored study roadmaps, 1-on-1 expert coaching, and simulated mock exams.",
};

const steps = [
  {
    num: "01",
    title: "Submit Your Exam Enquiry",
    desc: "Fill out our quick consultation form with your target exam, anticipated test date, current preparation status, and preferred support options.",
    deliverables: "Instant enquiry receipt & preliminary advisor review within 24 hours.",
  },
  {
    num: "02",
    title: "Diagnostic Assessment & Strategy Call",
    desc: "We evaluate your strengths, weaknesses, and timeline. Together we map out an achievable weekly milestone plan designed around your daily schedule.",
    deliverables: "Customized preparation blueprint and tutor matchmaking recommendations.",
  },
  {
    num: "03",
    title: "Targeted 1-on-1 Sessions & Practice Drills",
    desc: "Work directly with an experienced tutor who specializes in your exact exam. Deconstruct difficult concepts, eliminate test traps, and reinforce high-yield topics.",
    deliverables: "Recorded coaching sessions, curated notes, and weekly progress audits.",
  },
  {
    num: "04",
    title: "Simulated Mocks & Test-Day Mastery",
    desc: "Complete timed, full-length practice tests under exam conditions. Polish your pacing, master educated elimination tactics, and walk into test day with unwavering confidence.",
    deliverables: "Score projection readiness verification and day-before mental protocols.",
  },
];

const pillars = [
  {
    icon: "🎯",
    title: "Diagnostic Precision",
    desc: "We never waste your time reviewing what you already know. Every study hour is focused directly on your highest yield improvement opportunities.",
  },
  {
    icon: "🧠",
    title: "Cognitive Science Principles",
    desc: "Our tutors utilize active recall, spaced repetition, and interleaved practice to ensure durable memory retention on test day.",
  },
  {
    icon: "🤝",
    title: "Dedicated Accountability",
    desc: "Stay consistent with dedicated check-ins and structured milestones, preventing the last-minute cramming trap.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        {/* Hero Section */}
        <div className={styles.hero}>
          <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>
            A Proven Preparation Framework
          </span>
          <h1 className={styles.title}>How ExamGuidePal Works</h1>
          <p className={styles.subtitle}>
            From your very first enquiry to the moment you receive your passing score, here is our
            transparent, four-step process for exam excellence.
          </p>
        </div>

        {/* Steps List */}
        <div className={styles.stepsContainer}>
          {steps.map((step) => (
            <div key={step.num} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.num}</div>
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>{step.title}</h2>
                <p className={styles.stepDesc}>{step.desc}</p>
                <div className={styles.stepDeliverables}>
                  <div className={styles.deliverableHeading}>
                    <span>✦ Deliverable:</span>
                  </div>
                  <span>{step.deliverables}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Methodology Pillars */}
        <div className={styles.methodologySection}>
          <div className={styles.sectionHeader}>
            <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>
              The Science of Passing
            </span>
            <h2 className={styles.sectionTitle}>What Makes Our Method Different</h2>
            <p className={styles.sectionSubtitle}>
              Built on cognitive psychology, deliberate practice, and personalized mentoring.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {pillars.map((pillar, i) => (
              <div key={i} className={styles.pillarCard}>
                <div className={styles.pillarIcon}>{pillar.icon}</div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.desc}</p>
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
            Start Step 01 Today
          </h2>
          <p style={{ color: "var(--color-text-secondary)", maxWidth: "560px", margin: "0 auto var(--space-2xl)" }}>
            It takes just 2 minutes to submit your details. Our advisors will respond with a tailored roadmap for your exam.
          </p>
          <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/consultation" className="btn btn--primary btn--lg">
              Submit Free Enquiry →
            </Link>
            <Link href="/exams" className="btn btn--outline btn--lg">
              Browse All Exams
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
