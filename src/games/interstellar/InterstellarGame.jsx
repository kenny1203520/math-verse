import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, ArrowRight, HelpCircle, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import InterstellarEngine from './domain/InterstellarEngine';
import InterstellarScene from './InterstellarScene';

const InterstellarGame = () => {
  const engine = useMemo(() => new InterstellarEngine(), []);
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
          <p>你已成功完成「星際資源與能量調控」的所有挑戰，Math-Verse 的航道已為你開啟。</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn btn-primary">返回星圖導航</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mission-page-layout">
      <div className="scene-container stagger-1">
        <InterstellarScene question={currentQuestion} state={view.state} />
      </div>

      <div className="controls-container stagger-2">
        <header className="mission-header">
          <div className="header-top">
            <p className="kicker">Grade 7 Mission</p>
            <div className="progress-pills">
              {[...Array(view.totalLevels)].map((_, i) => (
                <div 
                  key={i} 
                  className={`pill ${i === view.currentLevel ? 'active' : ''} ${i < view.currentLevel ? 'completed' : ''}`}
                />
              ))}
            </div>
            <div className="score-badge">
              <Trophy size={14} color="#f59e0b" />
              <span>{view.score} PTS</span>
            </div>
          </div>
          <h1>{currentQuestion.title}</h1>
        </header>

        <section className="question-content">
          <div className="unit-label">{currentQuestion.unit}</div>
          <p className="scenario-text">{currentQuestion.scenario}</p>
          <p className="main-question">{currentQuestion.question}</p>

          <div className="interaction-area">
            <div className="input-wrapper">
              <label>調整數值：</label>
              <div className="numeric-control">
                <input 
                  type="number" 
                  placeholder="0" 
                  value={view.state.userInput || ''}
                  onChange={(e) => handleInputChange(e.target.value)}
                  disabled={view.showSuccess}
                />
                <span className="unit-tag">{currentQuestion.unit_label}</span>
              </div>
            </div>

            {view.showSuccess && (
              <div className="status-box success">
                正確！數值已穩定，授權通過。
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
                獲取支援
              </button>
            )}
            
            {!view.showSuccess ? (
              <button 
                className="btn-primary" 
                onClick={handleSubmit}
                disabled={!view.state.userInput}
              >
                執行命令
                <Target size={18} />
              </button>
            ) : (
              <button className="btn-success" onClick={nextQuestion}>
                進入下一階段
                <ArrowRight size={18} />
              </button>
            )}
          </footer>
        </section>

        <div className="footer-links">
          <Link to="/" className="exit-link">
            <ArrowLeft size={14} /> 中止任務
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterstellarGame;
