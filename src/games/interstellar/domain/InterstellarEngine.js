class InterstellarEngine {
  constructor() {
    this.currentLevel = 0;
    this.totalLevels = 3; // Let's simplify to 3 levels for Grade 7 based on previous design
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
      // Level 1: Ratio (Crystals vs Star Coins)
      const ratios = [[2, 3], [3, 4], [3, 5], [4, 5], [5, 7], [2, 5], [3, 8]];
      const selectedRatio = ratios[this.getRandomInt(0, ratios.length - 1)];
      const ratioA = selectedRatio[0]; // Crystals
      const ratioB = selectedRatio[1]; // Coins
      
      // Controlled difficulty: multiplier 10 to 50
      const multiplier = this.getRandomInt(1, 5) * 10;
      const targetCoins = ratioB * multiplier;

      this.state = {
        id: 1,
        type: 'ratio',
        unit: '比與比值 (NC-7-9-1)',
        title: '星際市集：能量交易',
        scenario: `在 Math-Verse 的星際市集中，能量水晶與星幣的兌換比是 ${ratioA}：${ratioB}。`,
        ratioA: ratioA,
        ratioB: ratioB,
        targetCoins: targetCoins,
        userInput: '',
        expectedCrystals: ratioA * multiplier
      };
      this.state.question = `如果玩家想購買一個價值 ${targetCoins} 星幣的太空船推進器，他需要準備多少顆能量水晶？`;
      this.state.unit_label = '顆';
      this.state.hint = `利用比例式 ${ratioA}：${ratioB} = 水晶：星幣，交叉相乘即可求出。`;
    } else if (this.currentLevel === 1) {
      // Level 2: Inverse Proportion (Robots vs Time)
      const baseRobots = this.getRandomInt(2, 6);
      const baseHours = this.getRandomInt(6, 15);
      const constantK = baseRobots * baseHours;
      
      // Find divisors of constantK for the targetTime
      const divisors = [];
      for (let i = 2; i <= constantK / 2; i++) {
        if (constantK % i === 0) divisors.push(i);
      }
      
      // If no good divisors, default to a few
      const possibleTimes = divisors.length > 0 ? divisors : [2, 3, 4, 5, 6];
      const targetTime = possibleTimes[this.getRandomInt(0, possibleTimes.length - 1)];

      this.state = {
        id: 2,
        type: 'inverse',
        unit: '正比與反比 (NC-7-9-2)',
        title: '小行星採礦計畫',
        scenario: `派遣 ${baseRobots} 台機器人前往礦脈，需要耗時 ${baseHours} 小時才能清空。`,
        baseRobots: baseRobots,
        baseHours: baseHours,
        constantK: constantK,
        targetTime: targetTime,
        userInput: ''
      };
      this.state.question = `若希望在 ${targetTime} 小時內完成任務，且每台效率相同，總共需要幾台採礦機器人？`;
      this.state.unit_label = '台';
      this.state.hint = `這屬於「反比」關係：機器人數量 × 時間 = 定值 (${baseRobots} × ${baseHours})。`;
    } else {
      // Level 3: Inequality (Cores vs Power)
      // Power = 120 + cores * 45.
      // Target threshold between 300 and 600.
      const targetThreshold = this.getRandomInt(300, 600);
      this.state = {
        id: 4,
        type: 'inequality',
        unit: '一元一次不等式 (NA-7-4)',
        title: '量子迷宮：能量突破',
        scenario: `目前的星艦基礎戰鬥力為 120，每安裝一個增壓核心可提升 45 點。迷宮入口的最低戰鬥力門檻為 ${targetThreshold}。`,
        targetThreshold: targetThreshold,
        userInput: ''
      };
      this.state.question = `請問至少需要安裝幾個增壓核心，戰鬥力才能「超過」進入門檻？`;
      this.state.unit_label = '個';
      this.state.hint = `建立不等式 120 + 45x > ${targetThreshold}，求出 x 的最小整數解。`;
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

    if (this.state.type === 'ratio') {
      // Mathematical verification: ratioA / ratioB = input / targetCoins
      // Use multiplication to avoid floating point precision issues
      if (this.state.ratioA * this.state.targetCoins === inputNum * this.state.ratioB) {
        isCorrect = true;
      }
    } else if (this.state.type === 'inverse') {
      // Verification: input * targetTime == baseRobots * baseHours
      if (inputNum * this.state.targetTime === this.state.constantK) {
        isCorrect = true;
      }
    } else if (this.state.type === 'inequality') {
      // Verification: input is the MINIMUM integer where 120 + 45*input > threshold
      const power = 120 + 45 * inputNum;
      const prevPower = 120 + 45 * (inputNum - 1);
      if (power > this.state.targetThreshold && prevPower <= this.state.targetThreshold) {
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
      this.currentLevel = 0; // Or handle mission complete
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

export default InterstellarEngine;
