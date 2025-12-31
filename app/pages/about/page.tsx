'use client';

import { useState, useEffect } from 'react';
import styles from './About.module.css';
import { bioData, chartData, experiences, education, skills, achievements } from './aboutData';
import Navbar, { navItems } from '@/app/components/Navbar';
import { usePageDataLoaded } from '@/app/hooks/usePageDataLoaded';
import {
  Chart as ChartJS, 
  RadialLinearScale, 
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
} from 'chart.js';
import { Radar, PolarArea, Line } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale, ArcElement, CategoryScale, LinearScale, 
  PointElement, LineElement, Filler, Tooltip, Legend
);

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'skills' | 'achievements'>('experience');
  const [showResume, setShowResume] = useState(false);
  usePageDataLoaded();

  useEffect(() => {
    document.body.style.overflow = showResume ? 'hidden' : 'auto';
  }, [showResume]);

  // --- HELPER: Extracts GPA and renders fractional stars ---
  const renderEducationStars = (description: string) => {
    // Regex to find "3.06 out of 4" or "5.00 out of 5.00"
    // Matches: (number) ... "out of" ... (number)
    const match = description.match(/([\d.]+)\s+out\s+of\s+([\d.]+)/i);

    if (!match) return null;

    const achieved = parseFloat(match[1]); // e.g., 3.06
    const total = Math.floor(parseFloat(match[2])); // e.g., 4

    const stars = [];

    for (let i = 1; i <= total; i++) {
      // Calculate how much this specific star should be filled (0% to 100%)
      let fillPercentage = 0;
      if (achieved >= i) {
        fillPercentage = 100;
      } else if (achieved > i - 1) {
        fillPercentage = (achieved - (i - 1)) * 100;
      }

      stars.push(
        <i
          key={i}
          className={`fas fa-star ${styles.star} ${styles.gradientStar}`}
          style={{
            // The Magic: Linear gradient background clipped to the text
            background: `linear-gradient(90deg, #ffd700 ${fillPercentage}%, rgba(255,255,255,0.2) ${fillPercentage}%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        ></i>
      );
    }

    return (
      <div className={styles.starContainer} title={`GPA: ${achieved}/${total}`}>
        {stars}
      </div>
    );
  };

  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />
      
      <section className="home-section">
        <div className={styles['about-container']}>
          {/* 1. HERO PROFILE */}
          <div className={styles.heroSection}>
            <div className={styles.profileWrapper}>
              <div className={styles.profileRing}></div>
              <img 
                src={bioData.photoUrl} 
                alt="Profile" 
                className={styles.profileImg} 
              />
            </div>
            <h1 className={styles.heroTitle}>{bioData.title}</h1>
            <h2 className={styles.heroSubtitle}>{bioData.subtitle}</h2>
            <div className={styles.bioBox}>
              <p>{bioData.paragraph}</p>
            </div>
            <button 
              className={styles.resumeButton}
              onClick={() => setShowResume(true)}
            >
              <i className="fas fa-file-pdf"></i>
              <span>View Resume</span>
            </button>
          </div>

          {/* 2. THE DATA DASHBOARD */}
          <div className={styles.dashboardGrid}>
            <div className={styles.hudCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Skill Topology</span>
                <i className="fas fa-network-wired cardIcon"></i>
              </div>
              <div className={styles.chartContainer}>
                <Radar 
                  data={chartData.capabilityRadar} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#fff', font: { size: 11 } },
                        ticks: { display: false, backdropColor: 'transparent' }
                      }
                    },
                    plugins: { legend: { display: false } }
                  }} 
                />
              </div>
            </div>

            <div className={styles.hudCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Tech Ecosystem</span>
                <i className="fas fa-code cardIcon"></i>
              </div>
              <div className={styles.chartContainer}>
                <PolarArea 
                  data={chartData.techPolar} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { display: false, backdropColor: 'transparent' }
                      }
                    },
                    plugins: { 
                      legend: { 
                        position: 'bottom', 
                        labels: { color: '#ccc', font: { size: 10 }, boxWidth: 10 } 
                      } 
                    }
                  }} 
                />
              </div>
            </div>

            <div className={styles.hudCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Innovation Velocity</span>
                <i className="fas fa-chart-line cardIcon"></i>
              </div>
              <div className={styles.chartContainer}>
                <Line 
                  data={chartData.careerVelocity} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: { 
                        grid: { display: false }, 
                        ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 10 } } 
                      },
                      y: { display: false }
                    },
                    plugins: { legend: { display: false } }
                  }} 
                />
              </div>
            </div>
          </div>
          
          {/* --- Navigation Tabs --- */}
           <div className={styles.aboutTabs} style={{marginTop: '60px'}}>
            {['experience', 'education', 'skills', 'achievements'].map((tab) => (
              <button
                key={tab}
                className={`${styles.tabItem} ${activeTab === tab ? styles.active : ''}`}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab}
              </button>
            ))}
           </div>
           
          {/* --- Content Area --- */}
           <div className={styles.tabContent}>
            
            {/* 1. Experience Tab */}
            {activeTab === 'experience' && (
              <div className={styles.timeline}>
                {experiences.map((exp, index) => (
                  <div key={index} className={styles.timelineItem}>
                    <i className={`fas fa-briefcase ${styles.icon}`}></i>
                    <div className={styles.timelineContent}>
                      {exp.logo && (
                        <div className={styles.logo}>
                        <img 
                          src={exp.logo} 
                          alt={exp.subtitle}
                        />
                        </div>
                      )}
                      <span className={styles.date}><i className={`fas fa-calendar fa-sm`}></i> {exp.date}</span>
                      <h3 className={styles.title}>{exp.title}</h3>
                      <h4 className={styles.subtitle}>{exp.subtitle}</h4>
                      <p className={styles.desc}>{exp.description}</p>
                    </div>
                  </div>
                ))}
           </div>
            )}

            {/* 2. Education Tab (UPDATED WITH STARS) */}
            {activeTab === 'education' && (
              <div className={styles.timeline}>
                {education.map((edu, index) => (
                  <div key={index} className={styles.timelineItem}>
                    <i className={`fas fa-graduation-cap ${styles.icon}`}></i>
                    <div className={styles.timelineContent}>
                      {edu.logo && (
                        <img 
                          src={edu.logo} 
                          alt={edu.subtitle} 
                          className={styles.logo}
                        />
                      )}
                      <span className={styles.date}><i className={`fas fa-calendar fa-sm`}></i> {edu.date}</span>
                      <h3 className={styles.title}>{edu.title}</h3>
                      <h4 className={styles.subtitle}>{edu.subtitle}</h4>
                      <p className={styles.desc}>{edu.description}</p>
                      <p className={styles.desc}>{edu.group}</p>
                      
                      {/* --- RENDER STARS HERE --- */}
                      {renderEducationStars(edu.description)}
                      
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Skills Tab */}
            {activeTab === 'skills' && (
              <div className={styles.skillsGrid}>
                {skills.map((skill, index) => (
                  <div key={index} className={styles.skillItem}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progress} 
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                      <span className={styles.percent}>{skill.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className={styles.timeline}>
                {achievements.map((ach, index) => (
                  <div key={index} className={styles.timelineItem}>
                    <i className={`fas fa-chess-queen ${styles.icon}`}></i>
                    <div className={styles.timelineContent}>
                      <span className={styles.date}><i className={`fas fa-calendar fa-sm`}></i> {ach.date}</span>
                      <h3 className={styles.title}>{ach.title}</h3>
                      <h4 className={styles.subtitle}>{ach.subtitle}</h4>
                      {ach.additionalInfo && <p className={styles.subtitle} style={{fontSize: '0.9em'}}>{ach.additionalInfo}</p>}
                      <p className={styles.desc}>{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Resume PDF Popup */}
      {showResume && (
        <div className={styles.popupOverlay} onClick={() => setShowResume(false)}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupHeader}>
              <div className={styles.popupTitle}>
                <h3>Resume</h3>
                <span className={styles.popupCategory}>PDF Document</span>
              </div>
              
              <div className={styles.headerControls}>
                <a 
                  href="/pdfs/resume.pdf" 
                  download 
                  className={styles.downloadBtn}
                  title="Download Resume"
                >
                  <i className="fas fa-download"></i>
                </a>
                <button className={styles.closeBtn} onClick={() => setShowResume(false)}>&times;</button>
              </div>
            </div>

            <div className={styles.popupBody}>
              <iframe 
                src="/pdfs/resume.pdf#toolbar=0&view=FitH" 
                title="Resume"
                className={styles.pdfFrame}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}