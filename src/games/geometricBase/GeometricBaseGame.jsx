import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, ArrowRight, HelpCircle, Compass, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import GeometricEngine from './domain/GeometricEngine';
import GeometryRenderer from './GeometryRenderer';

const GeometricBaseGame = () => {
  const engine = useMemo(() => new GeometricEngine(), []);
  const [view, setView] = useState(engine.getSnapshot());
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setShowHint(false);
  }, [view.currentLevel]);

  const handleInputChange = (value) => {
    engine.setUserInput(value);
    setView(engine.getSnapshot());
  };

  const handleSubmit = () => {
    engine.evaluateMatch();
    setView(engine.getSnapshot());
  };

  const nextQuestion = () => {
    engine.nextLevel();
    setView(engine.getSnapshot());
  };

  const currentQuestion = view.state;

  if (view.currentLevel >= view.totalLevels || !currentQuestion.id) {
    return (
      <div className="mission-container">
        <div className="card congrats-card stagger-1">
          <div className="congrats-icon">
            <Trophy size={80} color="#f59e0b" />
          </div>
          <h2>任務達成！</h2>
          <p>你已成功完成「幾何遺跡與基地建設」的所有挑戰，基地的探測器已完全啟動。</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>返回星圖導航</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mission-page-layout">
      <div className="scene-container stagger-1" style={{ background: '#1c1917' }}>
        <GeometryRenderer question={currentQuestion} state={view.state} />
      </div>

      <div className="controls-container stagger-2">
        <header className="mission-header">
          <div className="header-top">
            <p className="kicker" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}>Grade 8 Mission</p>
            <div className="progress-pills">
              {[...Array(view.totalLevels)].map((_, i) => (
                <div 
                  key={i} 
                  className={`pill ${i === view.currentLevel ? 'active' : ''} ${i < view.currentLevel ? 'completed' : ''}`}
                  style={i === view.currentLevel ? { background: '#f59e0b' } : (i < view.currentLevel ? { background: '#10b981' } : {})}
                />
              ))}
            </div>
            <div className="score-badge" style={{ borderColor: '#f59e0b', color: '#f59e0b' }}>
              <Trophy size={14} color="#f59e0b" />
              <span>{view.score} PTS</span>
            </div>
          </div>
          <h1>{currentQuestion.title}</h1>
        </header>

        <section className="question-content">
          <div className="unit-label" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}>{currentQuestion.unit}</div>
          <p className="scenario-text">{currentQuestion.scenario}</p>
          <p className="main-question">{currentQuestion.question}</p>

          <div className="interaction-area">
            <div className="input-wrapper">
              <label>輸入計算結果：</label>
              <div className="numeric-control">
                <input 
                  type="number" 
                  placeholder="0" 
                  value={view.state.userInput || ''}
                  onChange={(e) => handleInputChange(e.target.value)}
                  disabled={view.showSuccess}
                />
                <span className="unit-tag" style={{ background: '#f59e0b' }}>{currentQuestion.unit_label}</span>
              </div>
            </div>

            {view.showSuccess && (
              <div className="status-box success">
                正確！機關已解鎖，數值完美對齊。
              </div>
            )}

            {showHint && (
              <div className="hint-card">
                <HelpCircle size={16} />
                <p>{currentQuestion.hint}</p>
              </div>
            )}
          </div>

          <footer className="action-bar">
            {!showHint && !view.showSuccess && (
              <button className="btn-secondary" onClick={() => setShowHint(true)}>
                掃描線索
              </button>
            )}
            
            {!view.showSuccess ? (
              <button 
                className="btn-primary" 
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                onClick={handleSubmit}
                disabled={!view.state.userInput}
              >
                解鎖機關
                <Compass size={18} />
              </button>
            ) : (
              <button className="btn-success" onClick={nextQuestion}>
                下一處遺跡
                <ArrowRight size={18} />
              </button>
            )}
          </footer>
        </section>

        <div className="footer-links">
          <Link to="/" className="exit-link">
            <ArrowLeft size={14} /> 中斷探索
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GeometricBaseGame;
