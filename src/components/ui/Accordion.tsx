"use client";

import { useState } from "react";

interface AccordionProps {
  question: string;
  answer: string;
  dark?: boolean;
  icon?: string;
}

export function Accordion({ question, answer, dark = false, icon = "?" }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion-item ${dark ? "accordion-item--dark" : ""}`}>
      <button
        className="accordion-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion-icon" aria-hidden="true">{icon}</span>
        <span>{question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className={`accordion-content ${isOpen ? "accordion-content--open" : ""}`}>
        <div className="accordion-content-inner">{answer}</div>
      </div>
    </div>
  );
}
