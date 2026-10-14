import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { exams, getExamBySlug, getExamsByCategory } from "@/data/exams";
import styles from "./exam-detail.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return exams.map((exam) => ({
    slug: exam.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExamBySlug(slug);

  if (!exam) {
    return {
      title: "Exam Not Found | ExamGuidePal",
    };
  }

  return {
    title: `${exam.name} Preparation, Tutoring & Study Plan | ExamGuidePal`,
    description: exam.description,
  };
}

export default async function ExamDetailPage({ params }: Props) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);

  if (!exam) {
    notFound();
  }

  const relatedExams = getExamsByCategory(exam.categorySlug)
    .filter((e) => e.slug !== exam.slug)
    .slice(0, 5);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span>/</span>
          <Link href="/exams" className={styles.breadcrumbLink}>
            Exams
          </Link>
          <span>/</span>
          <Link
            href={`/exams/category/${exam.categorySlug}`}
            className={styles.breadcrumbLink}
          >
            {exam.category}
          </Link>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{exam.name}</span>
        </nav>

        <div className={styles.layout}>
          {/* Main Column */}
          <div className={styles.mainContent}>
            {/* Hero Card */}
            <div className={styles.heroCard}>
              <div className={styles.badges}>
                <span className={styles.categoryBadge}>{exam.category}</span>
                {exam.provider && (
                  <span className={styles.providerBadge}>Provider: {exam.provider}</span>
                )}
                {exam.featured && (
                  <span className={styles.categoryBadge} style={{ background: "rgba(245, 158, 11, 0.1)", color: "#d97706" }}>
                    High Demand
                  </span>
                )}
              </div>

              <h1 className={styles.title}>{exam.name}</h1>
              <p className={styles.leadText}>{exam.description}</p>
            </div>

            {/* Preparation Strategy Section */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>
                <span>✦</span> Comprehensive Preparation Strategy
              </h2>
              <p className={styles.sectionText}>
                Achieving a top score on {exam.name} requires a balance of core theoretical knowledge,
                active recall, timed simulation, and targeted remediation. Our experienced tutors
                design a curriculum customized to your starting diagnostic level and target test date.
              </p>

              <div className={styles.featureGrid}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>01</div>
                  <div>
                    <h3 className={styles.featureTitle}>Diagnostic Evaluation</h3>
                    <p className={styles.featureDesc}>
                      Initial assessment to identify strong areas and prioritize high-yield weak topics.
                    </p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>02</div>
                  <div>
                    <h3 className={styles.featureTitle}>1-on-1 Concept Mastery</h3>
                    <p className={styles.featureDesc}>
                      Live interactive coaching to deconstruct difficult concepts and test-maker tricks.
                    </p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>03</div>
                  <div>
                    <h3 className={styles.featureTitle}>Simulated Mock Exams</h3>
                    <p className={styles.featureDesc}>
                      Timed practice tests under real exam conditions with in-depth question breakdowns.
                    </p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>04</div>
                  <div>
                    <h3 className={styles.featureTitle}>Final Polish & Strategy</h3>
                    <p className={styles.featureDesc}>
                      Time management tips, anxiety mitigation, and pacing strategies for exam day.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What You Receive */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>
                <span>★</span> What Our {exam.name} Program Includes
              </h2>
              <p className={styles.sectionText}>
                Every student receives dedicated, attentive support with no generic cookie-cutter plans:
              </p>
              <div className={styles.featureGrid}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div>
                    <h3 className={styles.featureTitle}>Personalized Daily Schedule</h3>
                    <p className={styles.featureDesc}>
                      Structured task lists calibrated to fit around your work or school commitments.
                    </p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div>
                    <h3 className={styles.featureTitle}>Vetted Study Materials</h3>
                    <p className={styles.featureDesc}>
                      Access to top-rated question banks, curated summaries, and high-yield cheatsheets.
                    </p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div>
                    <h3 className={styles.featureTitle}>Direct Tutor Access</h3>
                    <p className={styles.featureDesc}>
                      WhatsApp / Email question support between scheduled live tutoring sessions.
                    </p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✓</div>
                  <div>
                    <h3 className={styles.featureTitle}>Progress Tracking</h3>
                    <p className={styles.featureDesc}>
                      Continuous metrics and score projection milestones to ensure you hit your goal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaHeading}>Ready to Excel in {exam.name}?</h2>
              <p className={styles.ctaSubtitle}>
                Enquire today for a customized study plan and free consultation.
              </p>

              <ul className={styles.ctaIncludes}>
                <li className={styles.ctaIncludeItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Free Initial Needs Assessment</span>
                </li>
                <li className={styles.ctaIncludeItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Personalized Roadmap</span>
                </li>
                <li className={styles.ctaIncludeItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Match with Expert Tutors</span>
                </li>
                <li className={styles.ctaIncludeItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Flexible Scheduling</span>
                </li>
              </ul>

              <Link
                href={`/consultation?exam=${exam.slug}`}
                className={`btn btn--primary btn--lg ${styles.ctaButton}`}
              >
                Book Free Consultation →
              </Link>

              <p className={styles.ctaGuarantee}>
                No obligation • We respond via email or WhatsApp
              </p>
            </div>

            {/* Related Exams in Same Category */}
            {relatedExams.length > 0 && (
              <div className={styles.relatedCard}>
                <h3 className={styles.relatedTitle}>More in {exam.category}</h3>
                <div className={styles.relatedList}>
                  {relatedExams.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/exams/${rel.slug}`}
                      className={styles.relatedItem}
                    >
                      {rel.name}
                    </Link>
                  ))}
                  <Link
                    href={`/exams/category/${exam.categorySlug}`}
                    style={{ fontSize: "var(--font-size-xs)", color: "var(--color-primary)", fontWeight: 600, marginTop: "var(--space-xs)" }}
                  >
                    View all in {exam.category} →
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
