// app/pages/resources/resourcesData.ts

export interface Resource {
  id: number;
  title: string;
  thumbnail: string;
  pdfUrl: string;
  description?: string;
}

export const resourcesData: Resource[] = [
  {
    id: 1,
    title: "Web Development Guide",
    thumbnail: "/images/resources/Thumb-Decode-Code.png",
    pdfUrl: "/images/resources/pdfs/Decode-Code.pdf",
    description: "Complete guide to modern web development"
  },
  {
    id: 2,
    title: "Design Principles",
    thumbnail: "/images/resources/Thumb-Code-To-IELTS.png",
    pdfUrl: "/images/resources/pdfs/Code-To-IELTS.pdf",
    description: "Essential design principles for developers"
  }
];