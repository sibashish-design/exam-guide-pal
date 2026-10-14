import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { whatsappLink, whatsappNumber } from "@/data/contact";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ExamGuidePal — Personalized Exam Preparation & Academic Support",
    template: "%s | ExamGuidePal",
  },
  description:
    "Prepare for your exams with personalized tutoring, study plans, and expert guidance. 99+ exams covered across IT, healthcare, finance, language, and more.",
  keywords: [
    "exam preparation",
    "online tutoring",
    "certification preparation",
    "study support",
    "exam guidance",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://examguidepal.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ExamGuidePal",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logos/ExamGuidePal_Site icon logo for white background.png" />
      </head>
      <body className={poppins.variable}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <a
          className="whatsapp-float"
          href={whatsappLink("Hi ExamGuidePal, I would like help choosing exam preparation support.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with ExamGuidePal on WhatsApp"
        >
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 11.5a8.38 8.38 0 0 1-9 8.5 9.1 9 0 0 1-3.8-.9L3 20l1.1-3.7A8.5 8.5 0 1 1 20 11.5Z"/><path d="M8 9.2c.2 2.6 2.2 4.8 4.8 5.1l1.4-1.1 1.6.8c-.5 1.4-1.6 2-2.8 1.7-3.8-1-6.1-3.4-6.9-6.8-.3-1.2.4-2.2 1.7-2.7l.8 1.6Z"/></svg>
          <span>WhatsApp: {whatsappNumber}</span>
        </a>
      </body>
    </html>
  );
}
