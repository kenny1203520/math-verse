import React from 'react';
import { Shapes, Zap, Triangle, Square } from 'lucide-react';

const GeometryRenderer = ({ question, state }) => {
  const { id: questionId } = question;
  const renderParallelLines = () => {
    // For parallel lines, we need the randomized values from scenario or just the answer info
    let xVal = parseInt(state.userInput) || 15;
    let angle = 3 * xVal + 20; // Default fallback
    
    if (question.id === 5) {
      // Try to parse the answer if numeric, or use state.
      // Actually question 5 is options. The answer is "x_angle".
      const [ansX, ansAngle] = question.answer.split('_').map(Number);
      // If user selected an option, we can show that. 
      // But let's make it interactive with userInput if possible?
      // Since it's options, we'll just use the selected option's value to drive the visual.
      if (state.selectedOption) {
        const [selX, selAngle] = state.selectedOption.split('_').map(Number);
        xVal = selX || ansX;
        angle = selAngle || ansAngle;
      } else {
        xVal = ansX;
        angle = ansAngle;
      }
    }
    
    return (
      <div className="scene-view">
        <svg viewBox="0 0 400 200" className="geo-svg">
          <line x1="50" y1="60" x2="350" y2="60" stroke="#fbbf24" strokeWidth="3" strokeDasharray="10 5" />
          <line x1="50" y1="140" x2="350" y2="140" stroke="#fbbf24" strokeWidth="3" strokeDasharray="10 5" />
          {/* Transversal */}
          <line 
             x1="200" y1="20" 
             x2={200 + 150 * Math.cos((180 - angle) * Math.PI / 180)} 
             y2={20 + 150 * Math.sin((180 - angle) * Math.PI / 180)} 
             stroke="#60a5fa" strokeWidth="2" 
          />
          <text x="100" y="50" fill="#fbbf24" fontSize="12">{3 * xVal + 20}°</text>
          <text x="100" y="130" fill="#fbbf24" fontSize="12">{5 * xVal - 10}°</text>
        </svg>
        <div className="scene-hint">調整變數 x 以對齊內錯角</div>
      </div>
    );
  };

  const renderPolygon = () => {
    const sides = state.selectedOption === '8_45' ? 8 : (state.selectedOption === '6_60' ? 6 : 4);
    const radius = 60;
    const points = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      points.push(`${100 + radius * Math.cos(angle)},${100 + radius * Math.sin(angle)}`);
    }
    
    return (
      <div className="scene-view">
        <svg viewBox="0 0 200 200" className="geo-svg">
          <polygon points={points.join(' ')} fill="none" stroke="#fbbf24" strokeWidth="3" />
          <text x="100" y="105" textAnchor="middle" fill="white" fontSize="14">n = {sides}</text>
        </svg>
        <div className="scene-hint">內角和 = (n-2) * 180°</div>
      </div>
    );
  };

  const renderTriangles = () => {
    return (
      <div className="scene-view">
        <svg viewBox="0 0 300 150" className="geo-svg">
          <path d="M50 100 L50 30 L120 100 Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <path d="M180 100 L180 30 L250 100 Z" fill="none" stroke="#60a5fa" strokeWidth="2" />
          <rect x="50" y="90" width="10" height="10" fill="none" stroke="#fbbf24" strokeWidth="1" />
          <rect x="180" y="90" width="10" height="10" fill="none" stroke="#60a5fa" strokeWidth="1" />
        </svg>
        <div className="scene-hint">AB=DE, AC=DF, ∠B=∠E=90°</div>
      </div>
    );
  };

  const renderQuadrilateral = () => {
    const isRhombus = state.selectedOption === 'rhombus';
    return (
      <div className="scene-view">
        <svg viewBox="0 0 200 200" className="geo-svg">
          {isRhombus ? (
            <path d="M100 40 L160 100 L100 160 L40 100 Z" fill="none" stroke="#fbbf24" strokeWidth="3" />
          ) : (
            <rect x="50" y="60" width="100" height="80" fill="none" stroke="#fbbf24" strokeWidth="3" />
          )}
          {isRhombus && <path d="M100 40 L100 160 M40 100 L160 100" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2" />}
        </svg>
        <div className="scene-hint">對角線互相垂直平分</div>
      </div>
    );
  };

  switch (questionId) {
    case 5:
      return renderParallelLines();
    case 6:
      return renderPolygon();
    case 7:
    case 8:
      return renderTriangles();
    case 10:
    case 11:
      return renderQuadrilateral();
    default:
      return <div className="scene-placeholder"><Shapes size={48} /></div>;
  }
};

export default GeometryRenderer;
