"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { categories, exams, Exam } from "@/data/exams";
import styles from "./exams.module.css";

const ITEMS_PER_PAGE = 12;

const courseImages = [
  "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=900",
  "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=900",
];

function ExamsDirectory() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter exams based on category and search query
  const filteredExams = useMemo(() => {
    let list = exams;

    if (selectedCategory !== "all") {
      list = list.filter((e) => e.categorySlug === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          (e.provider && e.provider.toLowerCase().includes(q)) ||
          e.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredExams.length / ITEMS_PER_PAGE);

  const paginatedExams = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredExams.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredExams, currentPage]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        {/* Hero Header */}
        <div className={styles.heroHeader}>
          <span className="eyebrow" style={{ margin: "0 auto var(--space-md)" }}>
            Comprehensive Exam Support
          </span>
          <h1 className={styles.title}>Explore All Supported Exams</h1>
          <p className={styles.subtitle}>
            Browse our full catalogue of 99+ examinations across healthcare, IT certifications,
            business, graduate school, and language assessments.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className={styles.controlsCard}>
          <div className={styles.searchBox}>
            <svg
              className={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by exam name, provider, keyword (e.g. USMLE, AWS, NCLEX, Cisco, GRE)..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className={styles.categoryPills}>
            <button
              type="button"
              className={`${styles.categoryPill} ${
                selectedCategory === "all" ? styles.categoryPillActive : ""
              }`}
              onClick={() => handleCategoryChange("all")}
            >
              All Exams ({exams.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                className={`${styles.categoryPill} ${
                  selectedCategory === cat.slug ? styles.categoryPillActive : ""
                }`}
                onClick={() => handleCategoryChange(cat.slug)}
              >
                {cat.name} ({cat.examCount})
              </button>
            ))}
          </div>
        </div>

        {/* Results Bar */}
        <div className={styles.resultsBar}>
          <div>
            Showing <span className={styles.countHighlight}>{filteredExams.length}</span> exams
            {selectedCategory !== "all" && (
              <span> in {categories.find((c) => c.slug === selectedCategory)?.name}</span>
            )}
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
          </div>
          {totalPages > 1 && (
            <div>
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>

        {/* Exam Cards Grid */}
        {filteredExams.length === 0 ? (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>No matching exams found</h2>
            <p className={styles.emptyDesc}>
              We support custom preparation for almost any exam even if not in this list. Tell us what
              you are studying for and our tutors will craft a personalized roadmap.
            </p>
            <Link href="/consultation" className="btn btn--primary">
              Enquire About Your Exam →
            </Link>
          </div>
        ) : (
          <div className={styles.examGrid}>
            {paginatedExams.map((exam: Exam, index) => (
              <div key={exam.id} className={styles.examCard}>
                <img className={styles.courseImage} src={courseImages[index % courseImages.length]} alt="" />
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
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <button
              type="button"
              className={styles.pageButton}
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(p - 1, 1));
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`${styles.pageButton} ${
                  currentPage === page ? styles.pageButtonActive : ""
                }`}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className={styles.pageButton}
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(p + 1, totalPages));
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              style={{ opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ExamsClient() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", padding: "120px 0" }}>
          <span className="spinner" style={{ display: "inline-block" }} />
        </div>
      }
    >
      <ExamsDirectory />
    </Suspense>
  );
}
