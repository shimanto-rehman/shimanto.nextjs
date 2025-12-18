'use client';

import { useState } from 'react';
import styles from './About.module.css'; // Importing the CSS Module
import { experiences, education, skills, achievements } from './aboutData';
import Navbar, { navItems } from '@/app/components/Navbar';
import { usePageDataLoaded } from '@/app/hooks/usePageDataLoaded';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'skills' | 'achievements'>('experience');
  usePageDataLoaded();
  return (
    <main className="home-main">
       {/* Ensure Navbar is correctly imported based on your project structure */}
      <Navbar items={navItems} logo="/images/shimanto.png" />
      
      <section className="home-section">
      <div className={styles['about-container']}>
        {/* --- Section 1: Professional Impact (Creative Metric View) --- */}
            <div className={styles.statsGrid}>
            <div className={styles.statCard}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Years Industry Exp.</span>
            </div>
            <div className={styles.statCard}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>ML Models Built</span>
            </div>
            <div className={styles.statCard}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Import Logistics Automation</span>
            </div>
            </div>

            {/* --- Section 2: The "Expertise Pillars" (Replacing standard list) --- */}
            <div className={styles.timeline1} style={{marginTop: '60px'}}>
                <div className={styles.timelineItem}>
                    <div className={styles.timelineInner} style={{width: '100%', background: 'rgba(255,255,255,0.02)'}}>
                        <h3 className={styles.title}>Research & Vision</h3>
                        <p className={styles.desc}>
                            From my background at <strong>SUST</strong> to my professional journey, I specialize in 
                            bridging the gap between <strong>RDBMS Schema Design</strong> and <strong>Machine Learning 
                            Optimization</strong>. My focus is on <strong>Embedded Finance</strong> and 
                            <strong>Digital Ecosystems</strong>.
                        </p>
                        <div className={styles.techBadgeContainer} style={{marginTop: '20px'}}>
                            {['TensorFlow', 'scikit-learn', 'Next.js', 'Flutter', 'Cloud Computing'].map(tech => (
                                <span key={tech} className={styles.techBadge}>
                                    <i className="fas fa-microchip" style={{fontSize: '10px'}}></i> {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          
          {/* --- Exclusive Impact Section --- */}
            <div className={styles.tabContent} style={{marginTop: '60px'}}>
            <h2 className={styles.title} style={{textAlign: 'center', marginBottom: '40px'}}>Systemic Impact & Research</h2>
            
            <div className={styles.impactGrid}>
                {/* Derived from Dana Fintech responsibilities */}
                <div className={styles.impactCard}>
                <span className={styles.impactVal}>BNPL & Credit</span>
                <span className={styles.impactLabel}>Financial Architecture</span>
                <p className={styles.desc} style={{fontSize: '12px', marginTop: '10px'}}>
                    Developed Credit Scoring & MSME Loan Management systems evaluating user behavior through SMS data.
                </p>
                </div>

                {/* Derived from V Shipping experience */}
                <div className={styles.impactCard}>
                <span className={styles.impactVal}>1-Stop Global</span>
                <span className={styles.impactLabel}>Logistics Automation</span>
                <p className={styles.desc} style={{fontSize: '12px', marginTop: '10px'}}>
                    Automated door-to-door shipping workflows and warehouse management using Flutter & Dart.
                </p>
                </div>

                {/* Derived from Bioinformatics Research in Resume */}
                <div className={styles.impactCard}>
                <span className={styles.impactVal}>In-Silico</span>
                <span className={styles.impactLabel}>Bio-Data Analysis</span>
                <p className={styles.desc} style={{fontSize: '12px', marginTop: '10px'}}>
                    Applied predictive modeling to genetic pathways using Linux/Bash and R-tools.
                </p>
                </div>
            </div>

            {/* --- The "Germany Vision" Section (SOP integration) --- */}
            <div className={styles.timelineItem} style={{marginTop: '60px'}}>
                <div className={styles.timelineInner} style={{width: '100%', border: '1px dashed rgba(255,255,255,0.2)'}}>
                <h3 className={styles.title}><i className="fas fa-microchip"></i> Future Vision: Data Science in Germany</h3>
                <p className={styles.desc}>
                    My goal is to integrate German engineering precision with AI to solve local problems in healthcare and funding. 
                    I am currently focusing on <strong>Transformer Architectures</strong> and <strong>Serverless Microservices</strong> 
                    to build the next generation of digital ecosystems.
                </p>
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

            {/* 2. Education Tab */}
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
    </main>
  );
}