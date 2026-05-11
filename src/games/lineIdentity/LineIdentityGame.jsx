import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Target, TrendingUp } from 'lucide-react';
import LineIdentityEngine from './domain/LineIdentityEngine';

const renderGrid = () => {
  const lines = [];
  for (let i = -5; i <= 5; i += 1) {
    lines.push(<line key={`h-${i}`} x1="-100" y1={i * 20} x2="100" y2={i * 20} stroke="#f2f4f8" strokeWidth="1" />);
    lines.push(<line key={`v-${i}`} x1={i * 20} y1="-100" x2={i * 20} y2="100" stroke="#f2f4f8" strokeWidth="1" />);
  }
  return lines;
};

const LineIdentityGame = () => {
  const engine = useMemo(() => new LineIdentityEngine(), []);
  const [view, setView] = useState(engine.getSnapshot());

  const applySlope = (value) => {
    engine.setSlope(parseFloat(value));
    setView(engine.getSnapshot());
  };

  const applyIntercept = (value) => {
    engine.setIntercept(parseFloat(value));
    setView(engine.getSnapshot());
  };

  const resetAll = () => {
    engine.resetAll();
    setView(engine.getSnapshot());
  };

  const nextChallenge = () => {
    engine.nextChallenge();
    setView(engine.getSnapshot());
  };

  return (
    <div className="game-page">
      <section className="panel">
        <h2>
          <TrendingUp size={20} /> 躍遷引擎校準：y = ax + b
        </h2>
        <p>
          調整牽引光束的斜率 a 與截距 b，讓你的藍線完全重合目標航道。重合即完成校準並解鎖下一個航點。
        </p>

        <div className="game-canvas-wrap">
          <svg viewBox="-100 -100 200 200">
            {renderGrid()}
            <line x1="-100" y1="0" x2="100" y2="0" stroke="#cad5e8" strokeWidth="2" />
            <line x1="0" y1="-100" x2="0" y2="100" stroke="#cad5e8" strokeWidth="2" />

            {!view.showSuccess && (
              <line
                x1="-100"
                y1={-(((-100 / 20) * view.targetSlope + view.targetIntercept) * 20)}
                x2="100"
                y2={-(((100 / 20) * view.targetSlope + view.targetIntercept) * 20)}
                stroke="#90a0b8"
                strokeWidth="2"
                strokeDasharray="4"
                opacity="0.35"
              />
            )}

            <line
              x1="-100"
              y1={-(((-100 / 20) * view.slope + view.intercept) * 20)}
              x2="100"
              y2={-(((100 / 20) * view.slope + view.intercept) * 20)}
              stroke={view.showSuccess ? '#0aa06f' : '#0057d9'}
              strokeWidth="4"
            />

            <circle cx="0" cy={-view.intercept * 20} r="6" fill="#f0475d" />
          </svg>

          {view.showSuccess && (
            <div className="success-overlay">
              <div className="success-card">
                <CheckCircle2 size={44} color="#0aa06f" />
                <h3>航道已鎖定</h3>
                <button type="button" className="btn-action primary" onClick={nextChallenge}>
                  前往下一航點
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="game-equation">
          目前方程式：
          <strong>
            {' '}
            y = {view.slope}x {view.intercept >= 0 ? '+' : ''} {view.intercept}
          </strong>
        </div>
      </section>

      <aside className="panel">
        <h3>
          <Target size={18} /> 控制台
        </h3>

        <div className="game-meta">
          <div className="meta-row">
            <span>得分</span>
            <strong>{view.score}</strong>
          </div>
          <div className="meta-row">
            <span>目標斜率 a</span>
            <strong>{view.showSuccess ? view.targetSlope : '???'}</strong>
          </div>
          <div className="meta-row">
            <span>目標截距 b</span>
            <strong>{view.showSuccess ? view.targetIntercept : '???'}</strong>
          </div>
        </div>

        <div className="input-group">
          <label>
            斜率 a
            <strong>{view.slope}</strong>
          </label>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.5"
            value={view.slope}
            onChange={(event) => applySlope(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label>
            截距 b
            <strong>{view.intercept}</strong>
          </label>
          <input
            type="range"
            min="-5"
            max="5"
            step="1"
            value={view.intercept}
            onChange={(event) => applyIntercept(event.target.value)}
          />
        </div>

        <div className="action-row">
          <button type="button" className="btn-action light" onClick={nextChallenge}>
            切換航點
          </button>
          <button type="button" className="btn-action light" onClick={resetAll}>
            <RotateCcw size={14} /> 全部重來
          </button>
        </div>
      </aside>
    </div>
  );
};

export default LineIdentityGame;
