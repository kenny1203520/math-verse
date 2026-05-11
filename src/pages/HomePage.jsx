import { ArrowRight, Compass, Rocket, Shapes, TrendingUp, Sparkles, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-grid">
      <section className="hero card stagger-1">
        <p className="kicker">Math-Verse Command Center</p>
        <h1>星際導航地圖</h1>
        <p className="hero-desc">
          歡迎來到 Math-Verse 空間站。請選擇你要執行的星際任務，<br />
          在每次任務中，你需要透過數學運算校準系統，啟動遺跡，或分配能量資源。
        </p>
        <div className="hero-actions">
          <a href="#starmap" className="btn btn-primary">
            啟動星圖
            <Map size={16} />
          </a>
        </div>
      </section>

      <section id="starmap" className="missions stagger-2">
        <h2>星圖任務列表</h2>
        <div className="mission-grid">
          
          <article className="mission-card grade-line">
            <div className="mission-icon">
              <TrendingUp size={32} />
            </div>
            <div className="mission-content">
              <p className="kicker" style={{ display: 'inline-block', marginBottom: '8px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>Core Mission</p>
              <h3>躍遷引擎校準</h3>
              <p>調整斜率 a 與截距 b，讓你的牽引光束完美重合目標航道，實現空間躍遷。</p>
              <Link to="/games/line-identity" className="btn btn-sm btn-ghost" style={{ marginTop: 'auto', borderColor: '#8b5cf6', color: '#8b5cf6' }}>
                開始校準
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>

          <article className="mission-card grade-7">
            <div className="mission-icon">
              <Rocket size={32} />
            </div>
            <div className="mission-content">
              <p className="kicker" style={{ display: 'inline-block', marginBottom: '8px' }}>Grade 7 Mission</p>
              <h3>星際資源與能量調控</h3>
              <p>在星際市集中調配資源比例，指揮採礦機器人，並安裝增壓核心突破量子迷宮。</p>
              <Link to="/games/interstellar" className="btn btn-sm btn-ghost" style={{ marginTop: 'auto' }}>
                啟動任務
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>

          <article className="mission-card grade-8">
            <div className="mission-icon">
              <Shapes size={32} />
            </div>
            <div className="mission-content">
              <p className="kicker" style={{ display: 'inline-block', marginBottom: '8px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>Grade 8 Mission</p>
              <h3>幾何遺跡與基地建設</h3>
              <p>解鎖平行線雷射機關，分析正多邊形防護場結構，並探索神祕的菱形遺跡核心。</p>
              <Link to="/games/geometric-base" className="btn btn-sm btn-ghost" style={{ marginTop: 'auto', borderColor: '#f59e0b', color: '#f59e0b' }}>
                探索遺跡
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>

        </div>
      </section>
    </div>
  );
};

export default HomePage;
