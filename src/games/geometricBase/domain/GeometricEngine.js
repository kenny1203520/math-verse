class GeometricEngine {
  constructor() {
    this.currentLevel = 0;
    this.totalLevels = 3; 
    this.showSuccess = false;
    this.state = {};
    this.score = 0;
    this.generateChallenge();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateChallenge() {
    this.showSuccess = false;
    
    if (this.currentLevel === 0) {
      // Level 1: Parallel Lines
      const targetX = this.getRandomInt(10, 20);
      const targetAngle = this.getRandomInt(40, 80); 
      const B = targetAngle - 3 * targetX;
      const D = 5 * targetX - targetAngle;

      this.state = {
        id: 5,
        type: 'parallel',
        unit: '角度與平行 (NS-8-5)',
        title: '古老遺跡：雷射機關',
        scenario: `兩道平行的能量波被光束穿過，一組內錯角分別為 (3x ${B >= 0 ? '+' : '-'} ${Math.abs(B)})° 與 (5x ${D >= 0 ? '-' : '+'} ${Math.abs(D)})°。`,
        targetAngle: targetAngle,
        targetX: targetX,
        userInput: '',
        B: B,
        D: D
      };
      this.state.question = `請輸入能讓雷射完美對齊的 x 值：`;
      this.state.unit_label = 'x =';
      this.state.hint = `平行線的內錯角相等，因此 3x + ${B} = 5x - ${D}。`;
    } else if (this.currentLevel === 1) {
      // Level 2: Polygon
      const polygonTypes = [
        { n: 6, name: '六' },
        { n: 8, name: '八' },
        { n: 10, name: '十' }
      ];
      const targetPoly = polygonTypes[this.getRandomInt(0, polygonTypes.length - 1)];
      
      this.state = {
        id: 6,
        type: 'polygon',
        unit: '多邊形的內角與外角 (NS-8-3)',
        title: '基地防護：結構分析',
        scenario: `你需要構建一個正 ${targetPoly.name} 邊形的防護場結構。`,
        targetN: targetPoly.n,
        userInput: ''
      };
      this.state.question = `請輸入該結構的「內角和」度數：`;
      this.state.unit_label = '°';
      this.state.hint = `內角和公式為 (n-2) × 180°。目前 n = ${targetPoly.n}。`;
    } else {
      // Level 3: Rhombus properties
      const halfDiagonal1 = this.getRandomInt(3, 8);
      const halfDiagonal2 = this.getRandomInt(4, 10);
      const d1 = halfDiagonal1 * 2;
      const d2 = halfDiagonal2 * 2;
      
      this.state = {
        id: 11,
        type: 'rhombus',
        unit: '特殊四邊形性質 (NS-8-8)',
        title: '遺跡核心：菱形結構',
        scenario: `探測到一個菱形遺跡核心，其兩條對角線長度分別為 ${d1} 與 ${d2}。`,
        targetSide: Math.sqrt(halfDiagonal1*halfDiagonal1 + halfDiagonal2*halfDiagonal2),
        d1, d2,
        userInput: ''
      };
      // Format targetSide to 2 decimal places if not integer to avoid floating point precision issues in user input.
      // But it's better to ensure Pythogorean triples for middle school.
      // Let's force Pythogorean triples.
      const triples = [[3,4,5], [5,12,13], [6,8,10], [8,15,17]];
      const triple = triples[this.getRandomInt(0, triples.length - 1)];
      this.state.d1 = triple[0] * 2;
      this.state.d2 = triple[1] * 2;
      this.state.targetSide = triple[2];
      this.state.scenario = `探測到一個菱形遺跡核心，其兩條對角線長度分別為 ${this.state.d1} 與 ${this.state.d2}。`;

      this.state.question = `請問這個菱形的邊長是多少？`;
      this.state.unit_label = '單位';
      this.state.hint = `菱形對角線互相垂直平分。利用畢氏定理在分割出的小直角三角形中求斜邊。`;
    }
  }

  setUserInput(value) {
    this.state.userInput = value;
    this.evaluateMatch();
  }

  evaluateMatch() {
    if (this.showSuccess) return;

    const inputNum = parseInt(this.state.userInput, 10);
    if (isNaN(inputNum)) return;

    let isCorrect = false;

    if (this.state.type === 'parallel') {
      if (inputNum === this.state.targetX) {
        isCorrect = true;
      }
    } else if (this.state.type === 'polygon') {
      const sum = (this.state.targetN - 2) * 180;
      if (inputNum === sum) {
        isCorrect = true;
      }
    } else if (this.state.type === 'rhombus') {
      if (inputNum === this.state.targetSide) {
        isCorrect = true;
      }
    }

    if (isCorrect) {
      this.showSuccess = true;
      this.score += 100;
    }
  }

  nextLevel() {
    this.currentLevel++;
    if (this.currentLevel >= this.totalLevels) {
      this.currentLevel = 0; 
    }
    this.generateChallenge();
  }

  getSnapshot() {
    return {
      currentLevel: this.currentLevel,
      totalLevels: this.totalLevels,
      state: this.state,
      showSuccess: this.showSuccess,
      score: this.score
    };
  }
}

export default GeometricEngine;
