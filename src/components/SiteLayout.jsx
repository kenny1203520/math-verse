import { Compass, Gamepad2, Sparkles } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const SiteLayout = () => {
  return (
    <div className="site-shell">
      <div className="bg-orb orb-a" aria-hidden="true" />
      <div className="bg-orb orb-b" aria-hidden="true" />
      <header className="topbar container">
        <Link to="/" className="brand">
          <Sparkles size={18} />
          Math Verse
        </Link>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Compass size={16} />
            首頁
          </NavLink>
          <NavLink
            to="/games/line-identity"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Gamepad2 size={16} />
            直線身分證
          </NavLink>
        </nav>
      </header>

      <main className="container page-enter">
        <Outlet />
      </main>

      <footer className="container footer">
        <p>Math Verse 2026 | 數學宇宙中的遊戲式學習實驗場</p>
      </footer>
    </div>
  );
};

export default SiteLayout;
