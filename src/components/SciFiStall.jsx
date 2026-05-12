import React from 'react';

const SciFiStall = ({ color = "#3b82f6", title, value, icon: Icon, active }) => {
  return (
    <div className={`true-3d-stall ${active ? 'active' : ''}`}>
      <div className="stall-cube-container">
        
        {/* Hologram Sign (Floats above the counter) */}
        <div className="stall-hologram-sign">
          <div className="holo-icon" style={{ color: color, filter: `drop-shadow(0 0 10px ${color})` }}>
            <Icon size={40} />
          </div>
          <div className="holo-board" style={{ borderColor: color, boxShadow: `0 0 10px ${color}40`, backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <div className="h-title" style={{ color: '#94a3b8' }}>{title}</div>
            <div className="h-val" style={{ color: '#fff', textShadow: `0 0 8px ${color}` }}>{value}</div>
          </div>
        </div>

        {/* Counter Base (The 3D Prism) */}
        {/* Dimensions: 140px width x 80px depth x 60px height */}
        <div className="cube-base">
          <div className="cube-face cube-front" style={{ borderColor: color }} />
          <div className="cube-face cube-back" style={{ borderColor: color }} />
          <div className="cube-face cube-left" style={{ borderColor: color }} />
          <div className="cube-face cube-right" style={{ borderColor: color }} />
          <div className="cube-face cube-top" style={{ borderColor: color, backgroundColor: `${color}33` }}>
            {/* Some glowing circuits on top of the counter */}
            <div className="top-circuit" style={{ background: color }} />
          </div>
          {/* Bottom face is not really needed since it sits on the floor, but good for completeness */}
          <div className="cube-face cube-bottom" />
        </div>
        
      </div>
    </div>
  );
};

export default SciFiStall;
