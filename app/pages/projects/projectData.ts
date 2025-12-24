export type Category = 'All' | 'AI & Research' | 'Enterprise Systems' | 'Creative & Web';
export type Status = 'Completed' | 'Research' | 'In Progress';

export interface Project {
  id: number;
  title: string;
  category: Category;
  status: Status;
  description: string;
  techStack: string[];
  repoUrl: string;
  image: string;
}

export const projectData: Project[] = [
  {
    id: 1,
    title: "Covid-19 Sentiment Analysis",
    category: "AI & Research",
    status: "Research",
    description: "NLP-based sentiment analysis of social media comments on vaccine perception in Bangladesh.",
    techStack: ["Python", "NLTK", "Scikit-learn", "Pandas"],
    repoUrl: "https://github.com/shimanto-rehman/Sentiment-Analysis-of-Social-Media-Comments-on-Covid-19-Post-Vaccination-in-Bangladesh",
    image: "/images/project/sentiment-analysis.webp"
  },
  {
    id: 2,
    title: "Music Generation BLGAN",
    category: "AI & Research",
    status: "Completed",
    description: "Deep Learning project using Generative Adversarial Networks to compose original music sequences.",
    techStack: ["TensorFlow", "GANs", "Python", "Midi-Util"],
    repoUrl: "https://github.com/shimanto-rehman/Music-Generation-Using-BLGAN",
    image: "/images/project/blgan.webp"
  },
  {
    id: 3,
    title: "Loan Prediction System",
    category: "AI & Research",
    status: "Completed",
    description: "A machine learning model designed to automate the loan eligibility process based on customer details like credit history, income, and education.",
    techStack: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
    repoUrl: "https://github.com/shimanto-rehman/Loan-Prediction-using-Machine-Learning",
    image: "/images/project/loan-prediction.webp"
  },
  {
    id: 4,
    title: "MFS Bank Remittance",
    category: "Enterprise Systems",
    status: "Completed",
    description: "A secure financial system for handling mobile bank remittances and transaction logic.",
    techStack: ["Laravel", "PHP", "MySQL", "API"],
    repoUrl: "https://github.com/shimanto-rehman/MFS-Bank-Remitance",
    image: "/images/project/mfs-bank.webp"
  },
  {
    id: 5,
    title: "Student Tuition ERP",
    category: "Enterprise Systems",
    status: "Completed",
    description: "Full-scale ERP for education management including fee tracking and automated reporting.",
    techStack: ["Laravel", "Bootstrap", "MySQL"],
    repoUrl: "https://github.com/shimanto-rehman/Student-Tution-Fee-ERP",
    image: "/images/project/student-erp.webp"
  },
  {
    id: 6,
    title: "Websocket Server",
    category: "Enterprise Systems",
    status: "Completed",
    description: "High-performance real-time communication server for chat and live notifications.",
    techStack: ["Node.js", "Socket.io", "Express"],
    repoUrl: "https://github.com/shimanto-rehman/Websocket-Server",
    image: "/images/project/websocket.webp"
  },
  {
    id: 7,
    title: "WiFi-Talk",
    category: "Enterprise Systems",
    status: "Completed",
    description: "A specialized communication tool designed for local network voice or data transmission, bypassing the need for external internet by utilizing peer-to-peer WiFi protocols.",
    techStack: ["Java", "Android SDK", "WiFi-Direct", "Networking"],
    repoUrl: "https://github.com/shimanto-rehman/WiFi-Talk",
    image: "/images/project/wifi-talk.webp"
  },
  {
    id: 8,
    title: "Point Of Sale (POS) System",
    category: "Enterprise Systems",
    status: "Completed",
    description: "A comprehensive retail management solution featuring inventory tracking, billing, and sales analytics.",
    techStack: ["PHP", "MySQL", "jQuery", "Ajax"],
    repoUrl: "https://github.com/shimanto-rehman/Point-Of-Sale-System",
    image: "/images/project/pos.webp"
  },
  {
    id: 9,
    title: "The Bookaholic",
    category: "Creative & Web",
    status: "Completed",
    description: "A social platform for readers to discover, review, and organize their personal digital libraries.",
    techStack: ["React", "Next.js", "Firebase", "CSS Modules"],
    repoUrl: "https://github.com/shimanto-rehman/The-Bookaholic",
    image: "/images/project/bookaholic.webp"
  },
  {
    id: 10,
    title: "Laravel Portfolio Engine",
    category: "Creative & Web",
    status: "Completed",
    description: "The core engine powering professional portfolios with dynamic content management and sleek UI transitions.",
    techStack: ["Laravel", "Eloquent", "Blade", "Vite"],
    repoUrl: "https://github.com/shimanto-rehman/Laravel-Portfolio",
    image: "/images/project/laravel-portfolio.webp"
  },
  {
    id: 11,
    title: "Arrow Web Game",
    category: "Creative & Web",
    status: "Completed",
    description: "An arcade-style browser game focusing on physics-based mechanics and high-score state management.",
    techStack: ["HTML5 Canvas", "JavaScript", "GSAP"],
    repoUrl: "https://github.com/shimanto-rehman/Arrow-Web-Game",
    image: "/images/project/arrow-game.webp"
  },
  {
    id: 12,
    title: "Galaxy Animation",
    category: "Creative & Web",
    status: "Completed",
    description: "Mathematics-driven particle engine simulating a rotating galaxy on the browser canvas.",
    techStack: ["Canvas API", "JavaScript", "Physics"],
    repoUrl: "https://github.com/shimanto-rehman/Galaxy-Animation",
    image: "/images/project/galaxy.webp"
  },
  {
    id: 13,
    title: "eBank Landing Page",
    category: "Creative & Web",
    status: "Completed",
    description: "A high-conversion landing page for modern banking, focusing on glassmorphism and responsive UX.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    repoUrl: "https://github.com/shimanto-rehman/ebank-landing-page",
    image: "/images/project/e-bank.webp"
  }
];