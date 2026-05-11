import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle, Rocket, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateInterstellarQuestions } from './InterstellarQuestions';
import InterstellarScene from './InterstellarScene';

const InterstellarGame = () => {
  const INTERSTELLAR_QUESTIONS = useMemo(() => generateInterstellarQuestions(), []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', msg: string }
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = INTERSTELLAR_QUESTIONS[currentIdx];

  const handleSubmit = () => {
    let isCorrect = false;
    if (currentQuestion.type === 'numeric') {
      isCorrect = parseInt(userInput) === currentQuestion.answer;
    } else {
      isCorrect = selectedOption === currentQuestion.answer;
    }

    if (isCorrect) {
      setFeedback({ type: 'success', msg: '太棒了！解題成功，能量槽已充填。' });
    } else {
      setFeedback({ type: 'error', msg: '偵測到運算錯誤，請檢查邏輯後再試一次。' });
    }
  };

  const nextQuestion = () => {
    if (currentIdx < INTERSTELLAR_QUESTIONS.length - 1) {
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
          <div className="congrats-icon">
            <Trophy size={80} />
          </div>
          <h2>任務達成！</h2>
          <p>你已成功完成「星際資源與能量調控」的所有挑戰，Math-Verse 的航道已為你開啟。</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn btn-primary">返回基地首頁</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mission-page-layout">
      <div className="scene-container stagger-1">
        <InterstellarScene question={currentQuestion} state={{ userInput, selectedOption }} />
      </div>

      <div className="controls-container stagger-2">
        <header className="mission-header">
          <div className="header-top">
            <p className="kicker">Grade 7 Mission</p>
            <div className="progress-pills">
              {INTERSTELLAR_QUESTIONS.map((_, i) => (
                <div 
                  key={i} 
                  className={`pill ${i === currentIdx ? 'active' : ''} ${i < currentIdx ? 'completed' : ''}`}
                />
              ))}
            </div>
          </div>
          <h1>{currentQuestion.title}</h1>
        </header>

        <section className="question-content">
          <div className="unit-label">{currentQuestion.unit}</div>
          <p className="scenario-text">{currentQuestion.scenario}</p>
          <p className="main-question">{currentQuestion.question}</p>

          <div className="interaction-area">
            {currentQuestion.type === 'numeric' ? (
              <div className="input-wrapper">
                <label>調整數值：</label>
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
                <label>選擇方案：</label>
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.value}
                    className={`option-card ${selectedOption === opt.value ? 'selected' : ''}`}
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
                獲取支援
              </button>
            )}
            
            {feedback?.type !== 'success' ? (
              <button 
                className="btn-primary" 
                onClick={handleSubmit}
                disabled={currentQuestion.type === 'numeric' ? !userInput : !selectedOption}
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
            <ArrowLeft size={14} /> 放棄任務
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterstellarGame;
