import React, { useState } from 'react';
import { Rocket, Zap, Bot, Gem, Activity } from 'lucide-react';
import SciFiStall from '../../components/SciFiStall';

const InterstellarScene = ({ question, state }) => {
  const { id: questionId } = question;
  const [activeStall, setActiveStall] = useState(null);
  
  // Parallax state for mouse tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Calculate mouse position relative to center (-1 to 1)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;
    setMousePos({ x, y });
  };

  const renderStarMarket = () => {
    const crystals = parseInt(state.userInput) || 0;
    const targetCoins = question.targetCoins || 1500;
    const ratioA = question.ratioA || 3;
    const ratioB = question.ratioB || 5;
    const expectedCrystals = targetCoins * ratioA / ratioB;
    const ratio = Math.min(crystals / expectedCrystals, 1.2) || 0;
    
    // Parallax logic: slightly rotate the floor based on mouse position
    // Base: rotateX(60deg) rotateZ(-45deg)
    // Add up to 5deg rotation based on mouse
    const rotateX = 60 - mousePos.y * 5;
    const rotateZ = -45 + mousePos.x * 5;

    return (
      <div className="isometric-container" onMouseMove={handleMouseMove}>
        <div 
          className="isometric-floor"
          style={{ transform: `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)` }}
        >
          <div className="floor-decorator" />
          
          {/* Stall 1: Crystal Exchange */}
          <div className="stall-3d-shadow" style={{ top: '30%', left: '30%' }} />
          <div 
            style={{ position: 'absolute', top: '30%', left: '30%', transformStyle: 'preserve-3d' }}
            onMouseEnter={() => setActiveStall('exchange')}
            onMouseLeave={() => setActiveStall(null)}
          >
            <SciFiStall 
              color="#3b82f6" 
              title="官方匯率" 
              value={`${ratioA} 水晶 = ${ratioB} 星幣`} 
              icon={Activity} 
              active={activeStall === 'exchange'} 
            />
          </div>

          {/* Stall 2: Thruster Shop */}
          <div className="stall-3d-shadow" style={{ top: '70%', left: '70%' }} />
          <div 
            style={{ position: 'absolute', top: '70%', left: '70%', transformStyle: 'preserve-3d' }}
            onMouseEnter={() => setActiveStall('shop')}
            onMouseLeave={() => setActiveStall(null)}
          >
            <SciFiStall 
              color="#10b981" 
              title="推進器售價" 
              value={`${targetCoins} 星幣`} 
              icon={Rocket} 
              active={activeStall === 'shop'} 
            />
          </div>
        </div>

        {/* Global Progress or UI in scene */}
        <div className="core-stats" style={{ position: 'absolute', bottom: '20px', zIndex: 10 }}>
          <div className="stat" style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3b82f6' }}>
            <Gem size={14} color="#60a5fa" />
            <span style={{ color: '#60a5fa' }}>{crystals} 顆預備水晶</span>
          </div>
        </div>
      </div>
    );
  };


  const renderMiningBots = () => {
    const bots = parseInt(state.userInput) || 0;
    const speed = bots > 0 ? (12 / (bots / 4)) : 0; 
    
    return (
      <div className="rpg-scene">
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
    const target = question.targetThreshold || 500;
    const percentage = Math.min((power / (target + 100)) * 100, 100);
    
    return (
      <div className="rpg-scene">
        <div className="power-meter">
          <div className="meter-arch">
             <svg viewBox="0 0 200 100">
               <path d="M20 90 A 80 80 0 0 1 180 90" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
               <path 
                 d="M20 90 A 80 80 0 0 1 180 90" 
                 fill="none" 
                 stroke={power > target ? "#10b981" : "#ef4444"} 
                 strokeWidth="10" 
                 strokeLinecap="round" 
                 strokeDasharray="251"
                 strokeDashoffset={251 - (251 * percentage) / 100}
                 style={{ transition: 'stroke-dashoffset 0.5s ease' }}
               />
               {/* Threshold indicator */}
               <line 
                 x1={20 + 80 - 80 * Math.cos((target/(target+100)) * Math.PI)} 
                 y1={90 - 80 * Math.sin((target/(target+100)) * Math.PI)} 
                 x2={20 + 95 - 95 * Math.cos((target/(target+100)) * Math.PI)} 
                 y2={90 - 95 * Math.sin((target/(target+100)) * Math.PI)} 
                 stroke="#3b82f6" 
                 strokeWidth="3" 
               /> 
               <text x="100" y="80" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#f8fafc">{power}</text>
               <text x="100" y="95" textAnchor="middle" fontSize="10" fill="#64748b">Battle Power</text>
             </svg>
          </div>
          <div className="threshold-label">門檻: {target}</div>
        </div>
      </div>
    );
  };

  switch (questionId) {
    case 1:
    case 3:
      return renderStarMarket();
    case 2:
      return renderMiningBots();
    case 4:
      return renderBattlePower();
    default:
      return <div className="scene-placeholder"><Rocket size={48} /></div>;
  }
};

export default InterstellarScene;
