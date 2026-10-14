import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
      </body>
    </html>
  );
}
