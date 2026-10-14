"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { categories } from "@/data/exams";
import { whatsappLink, whatsappNumber } from "@/data/contact";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Exams",
    href: "/exams",
    children: categories.map((c) => ({
      label: c.name,
      href: `/exams/category/${c.slug}`,
      count: c.examCount,
    })),
  },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(null), 200);
  }, []);

  const handleDropdownKeyDown = useCallback(
    (e: React.KeyboardEvent, label: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setDropdownOpen((prev) => (prev === label ? null : label));
      }
      if (e.key === "Escape") {
        setDropdownOpen(null);
      }
    },
    []
  );

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="ExamGuidePal Home">
          <img
            src="/images/logos/ExamGuidePal_Logo for white background.png"
            alt="ExamGuidePal"
            className={styles.logoImage}
            width={160}
            height={48}
          />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li
                key={item.label}
                className={`${styles.navItem} ${item.children ? styles.hasDropdown : ""}`}
                onMouseEnter={
                  item.children ? () => handleDropdownEnter(item.label) : undefined
                }
                onMouseLeave={item.children ? handleDropdownLeave : undefined}
              >
                {item.children ? (
                  <>
                    <button
                      className={`${styles.navLink} ${
                        pathname.startsWith(item.href) ? styles.active : ""
                      }`}
                      onClick={() =>
                        setDropdownOpen((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                      onKeyDown={(e) => handleDropdownKeyDown(e, item.label)}
                      aria-expanded={dropdownOpen === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        className={`${styles.chevron} ${
                          dropdownOpen === item.label ? styles.chevronOpen : ""
                        }`}
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {dropdownOpen === item.label && (
                      <div className={styles.dropdown} role="menu">
                        <div className={styles.dropdownInner}>
                          <Link href="/exams" className={styles.dropdownAllLink}>
                            Browse All Exams →
                          </Link>
                          <div className={styles.dropdownGrid}>
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={styles.dropdownItem}
                                role="menuitem"
                              >
                                <span className={styles.dropdownLabel}>
                                  {child.label}
                                </span>
                                <span className={styles.dropdownCount}>
                                  {child.count} exams
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      pathname === item.href ? styles.active : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/consultation" className={`btn btn--primary btn--sm ${styles.ctaBtn}`}>
          Free Consultation →
        </Link>

        <a href={whatsappLink("Hi ExamGuidePal, I would like help choosing exam preparation support.")} target="_blank" rel="noreferrer" className={styles.whatsappHeader}>
          <span>WhatsApp</span> {whatsappNumber}
        </a>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ""}`} />
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ""}`} />
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ""}`} />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ""}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavList}>
            {navItems.map((item) => (
              <li key={item.label} className={styles.mobileNavItem}>
                {item.children ? (
                  <>
                    <button
                      className={styles.mobileNavLink}
                      onClick={() =>
                        setDropdownOpen((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                      aria-expanded={dropdownOpen === item.label}
                    >
                      {item.label}
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        className={`${styles.chevron} ${
                          dropdownOpen === item.label ? styles.chevronOpen : ""
                        }`}
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {dropdownOpen === item.label && (
                      <ul className={styles.mobileSubMenu}>
                        <li>
                          <Link href="/exams" className={styles.mobileSubLink}>
                            Browse All Exams
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} className={styles.mobileSubLink}>
                              {child.label}
                              <span className={styles.dropdownCount}>
                                {child.count}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className={styles.mobileNavLink}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className={styles.mobileNavItem}>
              <a href={whatsappLink("Hi ExamGuidePal, I would like help choosing exam preparation support.")} target="_blank" rel="noreferrer" className={`btn btn--outline ${styles.mobileCta}`}>
                WhatsApp Us: {whatsappNumber}
              </a>
            </li>
            <li className={styles.mobileNavItem}>
              <Link
                href="/consultation"
                className={`btn btn--primary ${styles.mobileCta}`}
              >
                Free Consultation →
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
