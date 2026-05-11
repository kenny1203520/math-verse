import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle, Shapes, Trophy, Compass, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateGeometricBaseQuestions } from './GeometricBaseQuestions';
import GeometryRenderer from './GeometryRenderer';

const GeometricBaseGame = () => {
  const GEOMETRIC_BASE_QUESTIONS = useMemo(() => generateGeometricBaseQuestions(), []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = GEOMETRIC_BASE_QUESTIONS[currentIdx];

  const handleSubmit = () => {
    let isCorrect = false;
    if (currentQuestion.type === 'numeric') {
      isCorrect = parseInt(userInput) === currentQuestion.answer;
    } else {
      isCorrect = selectedOption === currentQuestion.answer;
    }

    if (isCorrect) {
      setFeedback({ type: 'success', msg: '破解成功！幾何結構已穩定。' });
    } else {
      setFeedback({ type: 'error', msg: '幾何邏輯不匹配，請重新分析遺跡線索。' });
    }
  };

  const nextQuestion = () => {
    if (currentIdx < GEOMETRIC_BASE_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setUserInput('');
      setSelectedOption(null);
      setFeedback(null);
      setShowHint(false);
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <div className="mission-container">
        <div className="card congrats-card stagger-1">
          <div className="congrats-icon" style={{ color: '#f59e0b' }}>
            <Trophy size={80} />
          </div>
          <h2>建設完成！</h2>
          <p>你已成功修復幾何遺跡並建立了強大的探測基地。Math-Verse 的文明拼圖又完整了一塊。</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              返回基地首頁
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mission-page-layout">
      <div className="scene-container stagger-1" style={{ background: '#1c1917' }}>
        <GeometryRenderer question={currentQuestion} state={{ userInput, selectedOption }} />
      </div>

      <div className="controls-container stagger-2">
        <header className="mission-header">
          <div className="header-top">
            <p className="kicker" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}>Grade 8 Mission</p>
            <div className="progress-pills">
              {GEOMETRIC_BASE_QUESTIONS.map((_, i) => (
                <div 
                  key={i} 
                  className={`pill ${i === currentIdx ? 'active' : ''} ${i < currentIdx ? 'completed' : ''}`}
                  style={i === currentIdx ? { background: '#f59e0b' } : (i < currentIdx ? { background: '#10b981' } : {})}
                />
              ))}
            </div>
          </div>
          <h1>{currentQuestion.title}</h1>
        </header>

        <section className="question-content">
          <div className="unit-label" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}>{currentQuestion.unit}</div>
          <p className="scenario-text">{currentQuestion.scenario}</p>
          <p className="main-question">{currentQuestion.question}</p>

          <div className="interaction-area">
            {currentQuestion.type === 'numeric' ? (
              <div className="input-wrapper">
                <label>輸入計算結果：</label>
                <div className="numeric-control">
                  <input 
                    type="number" 
                    placeholder="0" 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={feedback?.type === 'success'}
                  />
                  <span className="unit-tag">{currentQuestion.unit_label}</span>
                </div>
              </div>
            ) : (
              <div className="options-list">
                <label>選擇正確解答：</label>
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.value}
                    className={`option-card ${selectedOption === opt.value ? 'selected' : ''}`}
                    style={selectedOption === opt.value ? { borderColor: '#f59e0b', background: 'rgba(245, 158, 11, 0.05)' } : {}}
                    onClick={() => setSelectedOption(opt.value)}
                    disabled={feedback?.type === 'success'}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {feedback && (
              <div className={`status-box ${feedback.type}`}>
                {feedback.msg}
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
            {!showHint && feedback?.type !== 'success' && (
              <button className="btn-secondary" onClick={() => setShowHint(true)}>
                掃描線索
              </button>
            )}
            
            {feedback?.type !== 'success' ? (
              <button 
                className="btn-primary" 
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                onClick={handleSubmit}
                disabled={currentQuestion.type === 'numeric' ? !userInput : !selectedOption}
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
            <ArrowLeft size={14} /> 離開基地
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GeometricBaseGame;
