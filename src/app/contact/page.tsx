import { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact ExamGuidePal Advisors | Free Exam Consultation",
  description:
    "Get in touch with ExamGuidePal academic advisors. Submit an enquiry to mosdeeacademy@gmail.com for personalized exam guidance.",
};

export default function ContactPage() {
  return <ContactClient />;
}
