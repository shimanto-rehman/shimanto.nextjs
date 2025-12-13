import Navbar, { navItems } from "../../components/Navbar";

export default function PeoplePage() {
  return (
    <main className="home-main">
      <Navbar items={navItems} logo="/images/shimanto.png" />
      <section className="home-section">
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1>People</h1>
          <p>This is the People page.</p>
        </div>
      </section>
    </main>
  );
}

