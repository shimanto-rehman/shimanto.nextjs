import Navbar, { navItems } from "../../components/Navbar";

export default function TeachingPage() {
  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />
      <section className="home-section">
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1>Teaching</h1>
          <p>This is the Teaching page.</p>
        </div>
      </section>
    </main>
  );
}

