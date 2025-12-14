'use client';

import Navbar, { navItems } from "../../components/Navbar";
import { usePageDataLoaded } from "../../hooks/usePageDataLoaded";

export default function AboutPage() {
  usePageDataLoaded();
  
  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />
      <section className="home-section">
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1>About</h1>
          <p>This is the About page.</p>
        </div>
      </section>
    </main>
  );
}

