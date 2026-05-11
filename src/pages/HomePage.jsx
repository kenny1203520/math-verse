import { ArrowRight, BadgeCheck, Lightbulb, Orbit, Rocket, Shapes, Telescope, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-grid">
      <section className="hero card stagger-1">
        <p className="kicker">Adaptive Math Playground</p>
        <h1>數學宇宙：把公式變成你看得見的冒險</h1>
        <p className="hero-desc">
          在互動遊戲中操控變數、觀察圖像、累積任務分數。每個遊戲都是可擴充的模組，幫你用直覺理解抽象概念。
        </p>
        <div className="hero-actions">
          <Link to="/games/line-identity" className="btn btn-primary">
            立即開玩
            <ArrowRight size={16} />
          </Link>
          <a href="#roadmap" className="btn btn-ghost">看學習路線</a>
        </div>
      </section>

      <section className="spotlight card stagger-2">
        <h2>本週推薦遊戲</h2>
        <article className="game-card featured">
          <div>
            <p className="tag">Graph Quest</p>
            <h3>直線身分證：y = ax + b</h3>
            <p>透過斜率與截距調整，找到目標線條，快速建立圖像與方程式連結。</p>
          </div>
          <Link to="/games/line-identity" className="play-link">開始挑戰</Link>
        </article>
      </section>

      <section className="missions card stagger-2-5">
        <h2>Math-Verse 核心冒險</h2>
        <div className="mission-grid">
          <article className="mission-card grade-7">
            <div className="mission-icon">
              <Rocket size={32} />
            </div>
            <div className="mission-content">
              <p className="tag">七年級任務</p>
              <h3>星際資源與能量調控</h3>
              <p>掌握比與比例式，解鎖星際推進器，並利用不等式突破量子迷宮。</p>
              <Link to="/games/interstellar" className="btn btn-sm btn-primary">進入任務</Link>
            </div>
          </article>

          <article className="mission-card grade-8">
            <div className="mission-icon">
              <Shapes size={32} />
            </div>
            <div className="mission-content">
              <p className="tag">八年級任務</p>
              <h3>幾何遺跡與基地建設</h3>
              <p>在遺跡中破解平行線機關，利用全等與畢氏定理建設強大的探測基地。</p>
              <Link to="/games/geometric-base" className="btn btn-sm btn-primary">進入任務</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="insight card stagger-3" id="roadmap">
        <h2>學習節奏</h2>
        <ul>
          <li>
            <BadgeCheck size={18} />
            <span>Warm-up：先用拖曳與調參建立圖像直覺。</span>
          </li>
          <li>
            <Lightbulb size={18} />
            <span>Core Loop：每次解題立即回饋，強化推理鏈。</span>
          </li>
          <li>
            <Telescope size={18} />
            <span>Mastery：透過推薦系統挑戰下一個適合關卡。</span>
          </li>
        </ul>
      </section>

      <section className="pillars card stagger-4">
        <h2>開發原則</h2>
        <div className="pillar-list">
          <article>
            <Orbit size={18} />
            <h3>OOP 模組化</h3>
            <p>遊戲規則引擎與 UI 分離，便於重用與測試。</p>
          </article>
          <article>
            <Orbit size={18} />
            <h3>敏捷迭代</h3>
            <p>每次交付一個可玩的增量，快速驗證學習效果。</p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
