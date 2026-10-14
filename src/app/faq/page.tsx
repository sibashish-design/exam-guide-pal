import type { Metadata } from "next";
import { FaqClient } from "./FaqClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about ExamGuidePal exam preparation support, enquiries, and pricing.",
};

export default function FaqPage() {
  return <FaqClient />;
}
