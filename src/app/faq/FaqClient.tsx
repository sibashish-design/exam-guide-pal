"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { faqs, type FaqCategory } from "@/data/faqs";
import styles from "./faq.module.css";

const tabs: Array<"All" | FaqCategory> = ["All", "Getting started", "Exam support", "Enquiries", "Pricing"];

export function FaqClient() {
  const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>("All");
  const visibleFaqs = useMemo(
    () => selectedTab === "All" ? faqs : faqs.filter((faq) => faq.category === selectedTab),
    [selectedTab]
  );

  return (
    <section className={styles.wrapper}>
      <div className={`container ${styles.content}`}>
        <span className="eyebrow">FAQ</span>
        <h1 className={styles.title}>Frequently asked questions</h1>
        <p className={styles.subtitle}>Quick, clear answers about choosing exam support and getting started with ExamGuidePal.</p>

        <div className={styles.tabs} role="tablist" aria-label="FAQ categories">
          {tabs.map((tab) => (
            <button key={tab} type="button" role="tab" aria-selected={selectedTab === tab} className={`${styles.tab} ${selectedTab === tab ? styles.tabActive : ""}`} onClick={() => setSelectedTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.list}>
          {visibleFaqs.map((faq, index) => (
            <Accordion key={faq.question} question={faq.question} answer={faq.answer} icon={String(index + 1).padStart(2, "0")} />
          ))}
        </div>

        <p className={styles.help}>Still have a question? <Link href="/consultation">Send us an enquiry</Link> and we’ll help you find the right next step.</p>
      </div>
    </section>
  );
}
