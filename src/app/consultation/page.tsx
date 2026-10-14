import { Metadata } from "next";
import { ConsultationClient } from "./ConsultationClient";

export const metadata: Metadata = {
  title: "Free Consultation — Get Personalized Exam Guidance",
  description:
    "Submit a free enquiry to get personalized exam preparation guidance. Tell us about your exam, goals, and preferred support, and our team will reach out.",
};

export default function ConsultationPage() {
  return <ConsultationClient />;
}
