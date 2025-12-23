// app/pages/certificates/certificateData.ts

export interface Certificate {
    id: number;
    title: string;
    thumb: string;
    screenshots: string[];
    brief: string;
    date: string;
    authority: string;
    tools: string;
    detailsUrl: string;
    category: string; // Add category if needed, using a default for now
  }
  
  export const certificates: Certificate[] = [
    {
      id: 1,
      title: "Exploratory Data Analysis for Machine Learning - IBM",
      thumb: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712743969/img/certificates/thumb/3.webp",
      screenshots: [
        "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712744019/img/certificates/large/certificate-3/1.webp"
      ],
      brief: `This first course in the IBM Machine Learning Professional Certificate introduces you to Machine Learning and the content of the professional certificate. In this course you will realize the importance of good, quality data. You will learn common techniques to retrieve your data, clean it, apply feature engineering, and have it ready for preliminary analysis and hypothesis testing.
  
  By the end of this course you should be able to:
  Retrieve data from multiple data sources: SQL, NoSQL databases, APIs, Cloud 
  Describe and use common feature selection and feature engineering techniques
  Handle categorical and ordinal features, as well as missing values
  Use a variety of techniques for detecting and dealing with outliers
  Articulate why feature scaling is important and use a variety of scaling techniques
   
  Who should take this course?
  This course targets aspiring data scientists interested in acquiring hands-on experience  with Machine Learning and Artificial Intelligence in a business setting.
   
  What skills should you have?
  To make the most out of this course, you should have familiarity with programming on a Python development environment, as well as fundamental understanding of Calculus, Linear Algebra, Probability, and Statistics.`,
      date: "November 03, 2021",
      authority: "IBM",
      tools: "Python, Sklearn, Spicy, Pandas",
      detailsUrl: "https://coursera.org/share/f0f36a4b85c2f6d2cfeac90e592a1b9c",
      category: "Data Science"
    },
    {
      id: 2,
      title: "Software Development Processes and Methodologies",
      thumb: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712745284/img/certificates/thumb/4.webp",
      screenshots: [
        "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712745383/img/certificates/large/certificate-4/1.webp"
      ],
      brief: `Software is quickly becoming integral part of human life as we see more and more automation and technical advancements. Just like we expect car to work all the time and can't afford to break or reboot unexpectedly, software industry needs to continue to learn better way to build software if it were to become integral part of human life.
  
  In this course,  you will get an overview of  how software teams work? What processes they use?  What are some of the industry standard methodologies? What are pros and cons of each?  You will learn enough to have meaningful conversation around software development processes.
   
  After completing this course, a learner will be able to 
  1- Apply core software engineering practices at conceptual level for a given problem. 
  2- Compare and contrast traditional, agile, and lean development methodologies at high level.  These include Waterfall, Rational Unified Process, V model, Incremental, Spiral models and overview of agile mindset 
  3- Propose a methodology best suited for a given situation`,
      date: "November 09, 2021",
      authority: "UNIVERSITY OF MINNESOTA",
      tools: "Waterfall, Rational Unified Process, V model, Incremental, Spiral models and overview of agile mindset",
      detailsUrl: "https://coursera.org/share/b9cddcbd98f492fd605ef15a18147a09",
      category: "Software Engineering"
    },
    {
      id: 3,
      title: "Introduction to Applied Machine Learning - AMII",
      thumb: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712773754/img/certificates/thumb/5.webp",
      screenshots: [
        "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712773680/img/certificates/large/certificate-5/1.webp"
      ],
      brief: `This course is for professionals who have heard the buzz around machine learning and want to apply machine learning to data analysis and automation. Whether finance, medicine, engineering, business or other domains, this course will introduce you to problem definition and data preparation in a machine learning project.
  By the end of the course, you will be able to clearly define a machine learning problem using two approaches. You will learn to survey available data resources and identify potential ML applications. You will learn to take a business need and turn it into a machine learning application. You will prepare data for effective machine learning applications.
  This is the first course of the Applied Machine Learning Specialization brought to you by Coursera and the Alberta Machine Intelligence Institute.`,
      date: "October 17, 2021",
      authority: "Alberta Machine Intelligence Institute",
      tools: "Unsupervised Learning, Semi Supervised Learning, Reinforcement Learning, Identity Business Evaluation, Data Protection Laws, Bias in Data Sources, Noise and Sources of Randomness, False Positives and False Negatives",
      detailsUrl: "https://coursera.org/share/2046a831546fa08aa952a6e8dac540e5",
      category: "Machine Learning"
    },
    {
      id: 4,
      title: "Supervised Machine Learning: Regression and Classification",
      thumb: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712774641/img/certificates/thumb/6.webp",
      screenshots: [
        "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712774606/img/certificates/large/certificate-6/1.webp"
      ],
      brief: `In the first course of the Machine Learning Specialization, you will: Build machine learning models in Python using popular machine learning libraries NumPy and scikit-learn. Build and train supervised machine learning models for prediction and binary classification tasks, including linear regression and logistic regression
  The Machine Learning Specialization is a foundational online program created in collaboration between DeepLearning.AI and Stanford Online. In this beginner-friendly program, you will learn the fundamentals of machine learning and how to use these techniques to build real-world AI applications. 
  This Specialization is taught by Andrew Ng, an AI visionary who has led critical research at Stanford University and groundbreaking work at Google Brain, Baidu, and Landing.AI to advance the AI field.
  This 3-course Specialization is an updated and expanded version of Andrews pioneering Machine Learning course, rated 4.9 out of 5 and taken by over 4.8 million learners since it launched in 2012. 
  It provides a broad introduction to modern machine learning, including supervised learning (multiple linear regression, logistic regression, neural networks, and decision trees), unsupervised learning (clustering, dimensionality reduction, recommender systems), and some of the best practices used in Silicon Valley for artificial intelligence and machine learning innovation (evaluating and tuning models, taking a data-centric approach to improving performance, and more.)
  By the end of this Specialization, you will have mastered key concepts and gained the practical know-how to quickly and powerfully apply machine learning to challenging real-world problems. If youre looking to break into AI or build a career in machine learning, the new Machine Learning Specialization is the best place to start.`,
      date: "January 29, 2021",
      authority: "Stanford University",
      tools: "Logistic Regression, Artificial Neural Network, Machine Learning (ML) Algorithms, Machine Learning",
      detailsUrl: "https://coursera.org/share/bf7652824f6bbcef88c5540260d0bf18",
      category: "Machine Learning"
    },
    {
      id: 5,
      title: "Participation of 2019 Hult Prize at Shahjalal University of Science and Technology",
      thumb: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712775329/img/certificates/thumb/7.webp",
      screenshots: [
        "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712775393/img/certificates/large/certificate-7/1.webp"
      ],
      brief: `The Hult Prize is a startup accelerator for social enterprise named by President Bill Clinton and TIME Magazine as one of the top five ideas changing the world. The initiatives that make up the work of the Hult Prize Foundation are all dedicated to launching the next wave of social entrepreneurs through building custom tailored startups which are impact centered and profit minded. My responsibility was to coordinate media and communication team.`,
      date: "December, 2018",
      authority: "Hult Prize, SUST",
      tools: "Leadership Skills",
      detailsUrl: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712775393/img/certificates/large/certificate-7/1.webp",
      category: "Leadership"
    },
    {
      id: 6,
      title: "Participation of BUP ICT FEST - 2018",
      thumb: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712776237/img/certificates/thumb/8.webp",
      screenshots: [
        "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712776158/img/certificates/large/certificate-8/1.webp"
      ],
      brief: `Certificate of Participaion is awarded to S. M. Obaydur Rahman for participating in on 14th November, 2018 in BUP ICT Fest - 2018 organized by BUP InfoTech Club, Dept. of ICT, Bangladesh University of Professionals.`,
      date: "November 14, 2018",
      authority: "BUP InfoTech Club, Dept. of ICT",
      tools: "Android Studio, Adobe XD",
      detailsUrl: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712776158/img/certificates/large/certificate-8/1.webp",
      category: "Competition"
    },
    {
      id: 7,
      title: "Participation of Idea Workshop for Mobile Games & Apps Development",
      thumb: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712776252/img/certificates/thumb/9.webp",
      screenshots: [
        "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712776194/img/certificates/large/certificate-9/1.webp"
      ],
      brief: "",
      date: "January, 2017",
      authority: "Digital Bangladesh, a2i ICT Division",
      tools: "Idea Generation",
      detailsUrl: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712776194/img/certificates/large/certificate-9/1.webp",
      category: "Workshop"
    },
    {
      id: 8,
      title: "ITIL V4 Foundation Training",
      thumb: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712743586/img/certificates/thumb/10.webp",
      screenshots: [
        "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712743481/img/certificates/large/certificate-10/1.webp"
      ],
      brief: "A brief description of the certificate goes here.",
      date: "December 06, 2024, 2023",
      authority: "IBCS-Primax",
      tools: "Basic Support Policies",
      detailsUrl: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712743481/img/certificates/large/certificate-10/1.webp",
      category: "Training"
    },
    {
      id: 9,
      title: "An Introduction to Linux Bash Scripting and R",
      thumb: "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712742825/img/certificates/thumb/1.webp",
      screenshots: [
        "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712742417/img/certificates/large/certificate-1/1.webp",
        "https://res.cloudinary.com/shimanto-rehman/image/upload/v1712742802/img/certificates/large/certificate-1/2.webp"
      ],
      brief: "A brief description of the certificate goes here.",
      date: "23rd December, 2023",
      authority: "Future Learn",
      tools: "Linux, Bash, Bash-Script, R",
      detailsUrl: "https://www.futurelearn.com/certificates/6n2lctm",
      category: "Scripting"
    }
  ];