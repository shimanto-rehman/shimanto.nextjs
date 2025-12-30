export interface TeachingExperience {
    id: string;
    role: string;
    institution: string;
    period: string;
    description: string;
    courses: string[]; // List of subjects/courses taught
    logo?: string; // Optional logo path
  }
  
// TOGGLE THIS: Set to [] (empty array) to test the "No Experience" view
export const teachingData: TeachingExperience[] = [

    {
      id: '1',
      role: 'Peer Mentor',
      institution: 'Programming Club',
      period: '2021 - 2022',
      description: 'Mentored junior students in competitive programming, hosting weekly workshops on dynamic programming and Data Structures.',
      courses: ['Competitive Programming', 'Data Structures Workshop']
    },
    {
      id: '2',
      role: 'Instructor',
      institution: 'Tech Summer Camp',
      period: 'Summer 2021',
      description: 'Led a 4-week intensive bootcamp for high school students introducing them to Web Development fundamentals.',
      courses: ['HTML/CSS', 'JavaScript Basics']
    }
  ];
