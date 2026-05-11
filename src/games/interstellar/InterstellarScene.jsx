import React from 'react';
import { Rocket, Zap, Bot, Gem } from 'lucide-react';

const InterstellarScene = ({ question, state }) => {
  const { id: questionId } = question;
  
  const renderRatioCore = () => {
    const crystals = parseInt(state.userInput) || 0;
    const targetCrystals = question.answer || 900;
    const ratio = Math.min(crystals / targetCrystals, 1.2);
    
    return (
      <div className="scene-view">
        <div className="core-visual">
          <svg viewBox="0 0 200 200" className="floating">
            <defs>
              <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="60" fill="url(#coreGrad)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
            <circle cx="100" cy="100" r={60 * ratio} fill="#60a5fa" opacity="0.6">
               <animate attributeName="r" values={`${55*ratio};${60*ratio};${55*ratio}`} dur="3s" repeatCount="indefinite" />
            </circle>
            <path d="M70 100 L130 100 M100 70 L100 130" stroke="white" strokeWidth="1" opacity="0.5" />
          </svg>
          <div className="core-stats">
            <div className="stat">
              <Gem size={14} />
              <span>{crystals} 能量水晶</span>
            </div>
            <div className="stat">
              <Zap size={14} />
              <span>1500 星幣 (目標)</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMiningBots = () => {
    const bots = parseInt(state.userInput) || 0;
    const speed = bots > 0 ? (12 / (bots / 4)) : 0; // Simplified inverse logic for display
    
    return (
      <div className="scene-view">
        <div className="asteroid-belt">
          <div className="asteroid">
            <div className="asteroid-core" />
            <div className="mining-progress">
               <div className="progress-fill" style={{ animationDuration: `${speed || 0}s` }} />
            </div>
          </div>
          <div className="bot-fleet">
            {[...Array(Math.min(bots, 12))].map((_, i) => (
              <Bot key={i} className="bot-item" size={24} style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderBattlePower = () => {
    const cores = parseInt(state.userInput) || 0;
    const power = 120 + cores * 45;
    const target = question.id === 4 ? (question.answer * 45 + 120 - 45) : 500; // Rough estimation for visualization
    const percentage = Math.min((power / (target + 100)) * 100, 100);
    
    return (
      <div className="scene-view">
        <div className="power-meter">
          <div className="meter-arch">
             <svg viewBox="0 0 200 100">
               <path d="M20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
               <path 
                 d="M20 90 A 80 80 0 0 1 180 90" 
                 fill="none" 
                 stroke="#ef4444" 
                 strokeWidth="10" 
                 strokeLinecap="round" 
                 strokeDasharray="251"
                 strokeDashoffset={251 - (251 * percentage) / 100}
                 style={{ transition: 'stroke-dashoffset 0.5s ease' }}
               />
               <line x1="140" y1="25" x2="155" y2="15" stroke="#3b82f6" strokeWidth="3" /> {/* Threshold indicator */}
               <text x="100" y="80" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e293b">{power}</text>
               <text x="100" y="95" textAnchor="middle" fontSize="10" fill="#64748b">Battle Power</text>
             </svg>
          </div>
          <div className="threshold-label">門檻: 500</div>
        </div>
      </div>
    );
  };

  switch (questionId) {
    case 1:
    case 3:
      return renderRatioCore();
    case 2:
      return renderMiningBots();
    case 4:
      return renderBattlePower();
    default:
      return <div className="scene-placeholder"><Rocket size={48} /></div>;
  }
};

export default InterstellarScene;
