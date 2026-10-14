import { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "ExamGuidePal — Personalized Exam Preparation & Academic Support",
  description:
    "Prepare for your exams with personalized tutoring, study plans, and expert guidance. 99+ exams covered across IT certifications, healthcare, finance, language tests, and more.",
  openGraph: {
    title: "ExamGuidePal — Personalized Exam Preparation & Academic Support",
    description: "Expert exam preparation and academic support across 99+ exams.",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
