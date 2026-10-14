import { Metadata } from "next";
import { ExamsClient } from "./ExamsClient";

export const metadata: Metadata = {
  title: "All Supported Exams & Certifications | ExamGuidePal",
  description:
    "Explore our complete directory of 99+ exams and certifications with personalized tutoring, diagnostic tests, and tailored study schedules.",
};

export default function ExamsPage() {
  return <ExamsClient />;
}
