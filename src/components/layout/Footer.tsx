import Link from "next/link";
import styles from "./Footer.module.css";
import { categories, exams } from "@/data/exams";
import { whatsappLink, whatsappNumber } from "@/data/contact";

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
              <a href={whatsappLink("Hi ExamGuidePal, I would like help choosing exam preparation support.")} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${whatsappNumber}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 11.5a8.38 8.38 0 0 1-9 8.5 9.1 9 0 0 1-3.8-.9L3 20l1.1-3.7A8.5 8.5 0 1 1 20 11.5Z"/><path d="M8 9.2c.2 2.6 2.2 4.8 4.8 5.1l1.4-1.1 1.6.8c-.5 1.4-1.6 2-2.8 1.7-3.8-1-6.1-3.4-6.9-6.8-.3-1.2.4-2.2 1.7-2.7l.8 1.6Z"/></svg>
              </a>
            </div>
            <div className={styles.whatsappBox}>
              <span className={styles.whatsappLabel}>WhatsApp support</span>
              <a className={styles.whatsappNumber} href={whatsappLink("Hi ExamGuidePal, I would like help choosing exam preparation support.")} target="_blank" rel="noreferrer">{whatsappNumber}</a>
              <a className={styles.whatsappChat} href={whatsappLink("Hi ExamGuidePal, I would like help choosing exam preparation support.")} target="_blank" rel="noreferrer">Chat with us →</a>
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
