import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategoryBySlug, getExamsByCategory } from "@/data/exams";
import styles from "../../exams.module.css";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | ExamGuidePal" };
  }

  return {
    title: `${category.name} Preparation & Tutors | ExamGuidePal`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryExams = getExamsByCategory(category.slug);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: "var(--space-2xl)", fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>
          <Link href="/" style={{ color: "var(--color-text-secondary)" }}>Home</Link>
          {" / "}
          <Link href="/exams" style={{ color: "var(--color-text-secondary)" }}>Exams</Link>
          {" / "}
          <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>{category.name}</span>
        </div>

        {/* Hero Header */}
        <div className={styles.heroHeader}>
          <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>
            {category.name}
          </span>
          <h1 className={styles.title}>{category.name} Preparation</h1>
          <p className={styles.subtitle}>{category.description}</p>
        </div>

        {/* Results Bar */}
        <div className={styles.resultsBar}>
          <div>
            Showing <span className={styles.countHighlight}>{categoryExams.length}</span> exams in this category
          </div>
          <Link href="/exams" style={{ fontSize: "var(--font-size-xs)", color: "var(--color-primary)", fontWeight: 600 }}>
            ← View all categories
          </Link>
        </div>

        {/* Exam Cards Grid */}
        <div className={styles.examGrid}>
          {categoryExams.map((exam) => (
            <div key={exam.id} className={styles.examCard}>
              <div className={styles.examHeader}>
                <span className={styles.examCategoryBadge}>{exam.category}</span>
                {exam.featured && <span className={styles.featuredBadge}>Popular</span>}
              </div>

              <h2 className={styles.examTitle}>
                <Link href={`/exams/${exam.slug}`} className={styles.examTitleLink}>
                  {exam.name}
                </Link>
              </h2>

              {exam.provider && (
                <div className={styles.examProvider}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <span>{exam.provider}</span>
                </div>
              )}

              <p className={styles.examDesc}>{exam.description}</p>

              {exam.keywords && exam.keywords.length > 0 && (
                <div className={styles.keywordsList}>
                  {exam.keywords.slice(0, 3).map((kw, i) => (
                    <span key={i} className={styles.keywordTag}>
                      #{kw.replace(/\s+/g, "")}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.examActions}>
                <Link href={`/exams/${exam.slug}`} className={styles.detailsLink}>
                  Overview & Syllabus →
                </Link>
                <Link
                  href={`/consultation?exam=${exam.slug}`}
                  className={`btn btn--primary ${styles.bookButton}`}
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: "var(--space-4xl)",
            padding: "var(--space-3xl)",
            background: "linear-gradient(135deg, rgba(27, 42, 74, 0.04), rgba(16, 185, 129, 0.06))",
            borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--color-border)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700, marginBottom: "var(--space-sm)" }}>
            Need help preparing for {category.name}?
          </h2>
          <p style={{ color: "var(--color-text-secondary)", maxWidth: "540px", margin: "0 auto var(--space-xl)" }}>
            Get matched with an experienced tutor who specializes in your exact test requirements.
          </p>
          <Link href={`/consultation`} className="btn btn--primary btn--lg">
            Request Free Consultation →
          </Link>
        </div>
      </div>
    </div>
  );
}
