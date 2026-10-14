import Link from "next/link";
import styles from "./Footer.module.css";
import { categories, exams } from "@/data/exams";

const currentYear = new Date().getFullYear();

const popularExams = exams.filter((e) => e.featured).slice(0, 8);

const contactEmail = "mosdeeacademy@gmail.com";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <img
                src="/images/logos/ExamGuidePal_Logo for black background.png"
                alt="ExamGuidePal"
                width={140}
                height={40}
              />
            </Link>
            <p className={styles.brandDesc}>
              Personalized exam preparation and academic support for students
              and professionals. Expert guidance across 99+ exams.
            </p>
            <div className={styles.social}>
              <a href={`mailto:${contactEmail}`} aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 7l-10 7L2 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Exam Categories */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Exam Categories</h3>
            <ul className={styles.columnList}>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/exams/category/${cat.slug}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Exams */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Popular Exams</h3>
            <ul className={styles.columnList}>
              {popularExams.map((exam) => (
                <li key={exam.slug}>
                  <Link href={`/exams/${exam.slug}`}>{exam.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.columnList}>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/how-it-works">How It Works</Link></li>
              <li><Link href="/consultation">Free Consultation</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} ExamGuidePal. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
