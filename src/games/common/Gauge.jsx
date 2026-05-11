import React from 'react';

const Gauge = ({ value, max, label, color = '#0057d9' }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className="gauge-container">
      <div className="gauge-label">
        <span>{label}</span>
        <strong>{value} / {max}</strong>
      </div>
      <div className="gauge-track">
        <div 
          className="gauge-fill" 
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}80`
          }} 
        />
        {percentage >= 100 && <div className="gauge-glow" style={{ backgroundColor: color }} />}
      </div>
    </div>
  );
};

export default Gauge;
