// --- HERO & CHARTS ---

export const bioData = {
  title: "S.M. Obaydur Rahman",
  subtitle: "Architecting Digital Ecosystems | Future Data Scientist",
  // Update this path to your actual profile image
  photoUrl: "/images/about.webp", 
  paragraph: "I am an engineer who thinks in systems. From building financial engines at Dana Fintech to automating global logistics at V Shipping, I specialize in robust, scalable architectures. My next mission: Bridging German engineering precision with Advanced AI to solve critical challenges in healthcare and logistics.",
};

export const chartData = {
  // Chart 1: The "Engineer's Balance" (Radar Chart)
  // This proves you are well-rounded, not just a coder.
  capabilityRadar: {
    labels: ['System Arch', 'Frontend UX', 'Data Science', 'DevOps/Linux', 'Research/R&D', 'Leadership'],
    datasets: [{
      label: 'Proficiency Level',
      data: [90, 85, 75, 80, 85, 90], // High scores based on your Lead/Head roles
      backgroundColor: 'rgba(0, 201, 255, 0.2)',
      borderColor: '#00C9FF',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#00C9FF',
      borderWidth: 2,
    }]
  },

  // Chart 2: The "Tech Stack Ecosystem" (Polar Area Chart)
  // Much cooler than a pie chart; looks like a sci-fi radar.
  techPolar: {
    labels: ['JS / Next.js', 'PHP / Laravel', 'Python / ML', 'Flutter / Dart', 'SQL / Oracle'],
    datasets: [{
      data: [90, 85, 70, 80, 85],
      backgroundColor: [
        'rgba(0, 201, 255, 0.7)', // Cyan
        'rgba(147, 51, 234, 0.7)', // Purple
        'rgba(255, 206, 86, 0.7)', // Yellow (Data)
        'rgba(54, 162, 235, 0.7)', // Blue
        'rgba(255, 99, 132, 0.7)', // Red
      ],
      borderWidth: 0,
    }]
  },

  // Chart 3: "Innovation Velocity" (Line Chart)
  // Shows your trajectory from a student to a professional.
  careerVelocity: {
    labels: ['2018 (SUST)', '2021 (Dana Fintech)', '2023 (V Shipping)', '2025 (Vision)'],
    datasets: [{
      label: 'Impact & Complexity',
      data: [30, 65, 85, 100], // Rising trajectory
      borderColor: '#10B981', // Emerald Green for "Growth"
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
        return gradient;
      },
      fill: true,
      tension: 0.4, // Smooth curve
      pointRadius: 6,
      pointBackgroundColor: '#10B981',
    }]
  }
};

export interface TimelineItem {
    date: string;
    title: string;
    subtitle: string;
    description: string;
    group?: string;
    icon: string;
    logo?: string;
    additionalInfo?: string;
  }
  
  export const experiences: TimelineItem[] = [
    {
      date: 'September, 2023 - Present',
      title: 'Full-Stack Software Developer',
      subtitle: 'V Shipping',
      description:
        "V SHIPPAING- It is a DOOR TO DOOR SHIPPING PARTNER. Door to Door Service provider in Bangladesh. Anyone can import products for business or personal needs across the world and we developed it's ecommerce 1stopglobal.com and inhouse warehouse management application in (Flutter, Dart)",
      icon: 'fas fa-briefcase',
      logo: '/images/about-tab/vshipping.webp',
    },
    {
      date: 'December, 2021 - January, 2023',
      title: 'Associate Software Engineer, Backend',
      subtitle: 'Dana FinTech',
      description:
        'Dana enables digital platforms and banks to offer digital loans to MSMEs and individuals instantly Integrate Dana embedded lending API with your e-commerce app, e-wallet, retailer app, or any digital platform to allow your merchants and users to apply for digital loan on the go. Embedded finance is the future of the financial services industry.',
      icon: 'fas fa-briefcase',
      logo: '/images/about-tab/exp-dana.webp',
    },
    {
      date: 'April, 2018 - June, 2020',
      title: 'Executive Head: Reasearch & Olympiads',
      subtitle: 'SUST Science Arena, SUST',
      description:
        'SUST science arena is a renowned scientific organization of Shahjalal university of Science and Technology, Sylhet, Bangladesh. Its main objective is to organize conferences, seminar, talk, Science Fair, Olympiads, debate competitions, study circle, running research project. It also trains university Students in writing a research paper, scientific poster, research proposal, etc. My responsibility is to Manage and mentor the Academic Olympiads and research team of this organization.',
      icon: 'fas fa-briefcase',
      logo: '/images/about-tab/exp-ssa.webp',
    },
    {
      date: 'June, 2018 - June, 2019',
      title: 'Coordinator, Media And Communication',
      subtitle: 'HULT PRIZE at SUST',
      description:
        'The Hult Prize is a startup accelerator for social enterprise named by President Bill Clinton and TIME Magazine as one of the top five ideas changing the world. The initiatives that make up the work of the Hult Prize Foundation are all dedicated to launching the next wave of social entrepreneurs through building custom tailored startups which are impact centered and profit minded. My responsibility was to coordinate media and communication team.',
      icon: 'fas fa-briefcase',
      logo: '/images/about-tab/exp-hult.webp',
    },
    {
      date: 'Jan, 2017 - Oct, 2021',
      title: 'General Member',
      subtitle: 'CSE Society, SUST',
      description:
        'CSE Society, SUST is a non-political departmental organization. All the students and teachers of CSE department of SUST are the general member of this society. The main purpose of this society is to represent the student of CSE SUST and conduct the co-curricular activities for students',
      icon: 'fas fa-briefcase',
      logo: '/images/about-tab/exp-sustcse.webp',
    },
  ];
  
  export const education: TimelineItem[] = [
    {
      date: 'Nov, 2016 - August, 2021',
      title: 'Computer Science & Engineering',
      subtitle: 'Shahjalal University of Science and Technology, Sylhet',
      description: 'CGPA - 3.06 out of 4',
      group: 'Section: A',
      icon: 'fas fa-graduation-cap',
      logo: '/images/about-tab/sust.webp',
    },
    {
      date: 'Jan, 2014 - June, 2016',
      title: 'Higher Secondary School Certificate (HSC)',
      subtitle: 'Govt. Syed Hatem Ali College, Barishal',
      description: 'GPA - 5.00 out of 5.00',
      group: 'Group: Science',
      icon: 'fas fa-graduation-cap',
      logo: '/images/about-tab/gshac.webp',
    },
    {
      date: 'Jan, 2017 - Oct, 2021',
      title: 'Secondary School Certificate (SSC)',
      subtitle: 'Barisal Zilla School, Barishal',
      description: 'GPA - 5.00 out of 5.00',
      group: 'Group: Science',
      icon: 'fas fa-graduation-cap',
      logo: '/images/about-tab/bzs.webp',
    },
    {
      date: 'Jan, 2011 - Nov, 2011',
      title: 'Junior School Certificate (JSC)',
      subtitle: 'Barisal Zilla School, Barishal',
      description: 'GPA - 5.00 out of 5.00',
      group: 'Group: Science',
      icon: 'fas fa-graduation-cap',
      logo: '/images/about-tab/bzs.webp',
    },
    {
      date: 'Jan, 2008 - Nov, 2008',
      title: 'Primary School Certificate (PSC)',
      subtitle: 'Al-Helal Academy, Barishal',
      description: 'GPA - 5.00 out of 5.00',
      group: 'Group: General',
      icon: 'fas fa-graduation-cap',
    },
  ];
  
  export interface Skill {
    name: string;
    percentage: number;
  }
  
  export const skills: Skill[] = [
    { name: 'Oracle Database', percentage: 70 },
    { name: 'SQL', percentage: 80 },
    { name: 'Data Analysis', percentage: 80 },
    { name: 'IT Management', percentage: 90 },
    { name: 'System Administration', percentage: 50 },
    { name: 'Linux OS - RHEL, Ubuntu, IBM Aix, Sun Solaris, Oracle Linux', percentage: 80 },
    { name: 'Html', percentage: 70 },
    { name: 'Css', percentage: 70 },
    { name: 'Javascript', percentage: 60 },
    { name: 'Laravel', percentage: 50 },
    { name: 'C++', percentage: 80 },
    { name: 'Java', percentage: 60 },
    { name: 'PHP', percentage: 90 },
    { name: 'Object-oriented programming (OOP)', percentage: 70 },
    { name: 'React.js', percentage: 60 },
    { name: 'Next.js', percentage: 60 },
    { name: 'Node.js', percentage: 60 },
    { name: 'CodeIgniter', percentage: 80 },
    { name: 'MySQL', percentage: 80 },
    { name: 'Octave', percentage: 60 },
  ];
  
  export const achievements: TimelineItem[] = [
    {
      date: 'Nov, 2019',
      title: '4th at BUP ICT FEST 2018 Hackathon',
      subtitle: 'Team Name: SUST Phantom',
      description: 'Bangladesh University of Professionals (BUP)',
      icon: 'fas fa-chess-queen',
    },
    {
      date: 'Mar, 2016',
      title: 'Higher Secondary Certificate General Grade Scholarship',
      subtitle: 'Board of Intermediate and Secondary Education, Barisal',
      description: 'Government Syed Hatem Ali College, Barishal',
      icon: 'fas fa-chess-queen',
      additionalInfo: 'Higher Secondary Certificate Examination-2016',
    },
    {
      date: 'Feb, 2014',
      title: 'Secondary School Certificate Talent pool Scholarship',
      subtitle: 'Board of Intermediate and Secondary Education, Barisal',
      description: 'Barishal Zilla School, Barishal',
      icon: 'fas fa-chess-queen',
      additionalInfo: 'Secondary School Certificate Examination-2014',
    },
    {
      date: 'Nov, 2011',
      title: 'Junior School Certificate Talent pool Scholarship',
      subtitle: 'Board of Intermediate and Secondary Education, Barisal',
      description: 'Barishal Zilla School, Barishal',
      icon: 'fas fa-chess-queen',
      additionalInfo: 'Junior School Certificate Examination-2011',
    },
    {
      date: 'Nov, 2008',
      title: 'Primary Talent pool Scholarship',
      subtitle: 'Directorate of Primary Education (DPE), Barishal',
      description: 'Al-Helal Academy, Barishal',
      icon: 'fas fa-chess-queen',
      additionalInfo: 'Primary Scholarship Examination',
    },
  ];