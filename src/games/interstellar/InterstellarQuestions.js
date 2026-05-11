const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateInterstellarQuestions = () => {
  // Q1: Ratio (Crystals vs Star Coins)
  // Base: 3:5. Value = X * 5. Crystals = X * 3.
  const x1 = getRandom(200, 400);
  const q1_coins = x1 * 5;
  const q1_ans = x1 * 3;

  // Q2: Inverse (Robots vs Time)
  // 4 bots -> 12 hours. K = 48.
  // We want time to be a factor of 48: 2, 3, 4, 6, 8, 12.
  const possible_times = [2, 3, 4, 6, 8];
  const q2_target_time = possible_times[getRandom(0, possible_times.length - 1)];
  const q2_ans = 48 / q2_target_time;

  // Q3: Inequality (Cores vs Power)
  // Power = 120 + cores * 45. Target > T.
  const q3_target = getRandom(400, 600);
  const q3_ans = Math.ceil((q3_target - 120) / 45);

  return [
    {
      id: 1,
      unit: '比與比值 (NC-7-9-1)',
      title: '星際市集：能量交易',
      scenario: '在 Math-Verse 的星際市集中，能量水晶與星幣的兌換比是 3：5。',
      question: `如果玩家想購買一個價值 ${q1_coins} 星幣的太空船推進器，他需要準備多少顆能量水晶？`,
      type: 'numeric',
      unit_label: '顆',
      answer: q1_ans,
      hint: '利用比例式 3：5 = x：星幣金額，交叉相乘即可求出。'
    },
    {
      id: 2,
      unit: '正比與反比 (NC-7-9-2)',
      title: '小行星採礦計畫',
      scenario: '派出 4 台機器人，需要耗時 12 小時才能清空礦脈。',
      question: `若希望在 ${q2_target_time} 小時內完成任務，且效率相同，總共需要幾台採礦機器人？`,
      type: 'numeric',
      unit_label: '台',
      answer: q2_ans,
      hint: '機器人越多，時間越短。這屬於「反比」關係：機器人數量 × 時間 = 定值。'
    },
    {
      id: 4,
      unit: '一元一次不等式 (NA-7-4)',
      title: '量子迷宮：能量突破',
      scenario: `目前戰鬥力為 120，每安裝一個增壓核心可提升 45 點。迷宮入口門檻為 ${q3_target}。`,
      question: `請問玩家至少需要安裝幾個增壓核心，戰鬥力才能「超過」進入門檻？`,
      type: 'numeric',
      unit_label: '個',
      answer: q3_ans,
      hint: '建立不等式 120 + 45x > 門檻，移項後求出 x 的最小整數解。'
    }
  ];
};
