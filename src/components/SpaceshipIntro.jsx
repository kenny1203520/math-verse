import React, { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

const SpaceshipIntro = ({ onComplete, text = "前往座標中..." }) => {
  const [stage, setStage] = useState('accelerating'); // 'accelerating', 'warp', 'arriving'

  useEffect(() => {
    // Stage 1: Accelerating (0 - 1.5s)
    const warpTimer = setTimeout(() => {
      setStage('warp');
    }, 1500);

    // Stage 2: Arriving (slow down) (3.5s)
    const arriveTimer = setTimeout(() => {
      setStage('arriving');
    }, 3500);

    // Stage 3: Complete transition (4.5s)
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4500);

    return () => {
      clearTimeout(warpTimer);
      clearTimeout(arriveTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Generate random stars
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: `${Math.random() * 1 + 0.5}s`,
    delay: `${Math.random() * 2}s`,
  }));

  return (
    <div className={`spaceship-intro-container ${stage}`}>
      <div className="warp-tunnel">
        {stars.map(star => (
          <div 
            key={star.id} 
            className="warp-star"
            style={{
              top: star.top,
              left: star.left,
              animationDuration: stage === 'warp' ? '0.2s' : star.duration,
              animationDelay: stage === 'warp' ? '0s' : star.delay,
            }}
          />
        ))}
      </div>
      
      <div className="spaceship-model">
        <Rocket size={80} color="#60a5fa" strokeWidth={1.5} />
        <div className="engine-fire"></div>
      </div>
      
      <div className="intro-text">
        <h2>{text}</h2>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default SpaceshipIntro;
