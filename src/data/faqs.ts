export type FaqCategory = "Getting started" | "Exam support" | "Enquiries" | "Pricing";

export type Faq = { question: string; answer: string; category: FaqCategory };

export const faqs: Faq[] = [
  { question: "How do I choose the right support for my exam?", answer: "Start by selecting your exam from the catalogue. Then tell us your target date, current preparation level, and where you need help. We will explain the most suitable next step for your situation.", category: "Getting started" },
  { question: "Which exams and certifications do you support?", answer: "We cover 99+ academic exams, professional certifications, IT and cloud credentials, healthcare licensing exams, finance qualifications, and language tests. Browse the catalogue to see the current list.", category: "Exam support" },
  { question: "Can you help if my exam is not listed?", answer: "Yes. Choose “Other / Not Listed” in the enquiry form and share the exam name, syllabus or official link, and your intended exam date. We will review whether we can support your preparation.", category: "Exam support" },
  { question: "What happens after I submit an enquiry?", answer: "Our team reviews your exam, timeline, and learning goals, then contacts you through your preferred method to discuss available preparation options and next steps.", category: "Enquiries" },
  { question: "When should I contact you before my exam?", answer: "Contact us as early as possible so there is time to understand your goals and build a structured approach. If your exam is soon, still get in touch and include the date in your enquiry.", category: "Enquiries" },
  { question: "What should I include in my enquiry?", answer: "Include the exam you are taking, target date, current level, topics you find difficult, and whether you need tutoring, a study plan, practice support, or guidance choosing an option.", category: "Enquiries" },
  { question: "How is pricing decided?", answer: "Pricing depends on the exam, the type of support, and your preparation needs. The first enquiry helps us understand your requirements before we explain the options available.", category: "Pricing" },
  { question: "Can I ask for a study plan without ongoing tutoring?", answer: "Yes. Tell us the type of support you are looking for in the enquiry form. We will discuss the available preparation options for your exam and timeline.", category: "Exam support" },
];
