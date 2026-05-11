const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateGeometricBaseQuestions = () => {
  // Q5: Parallel Lines
  // 3x + 20 = 5x - 10  => 2x = 30 => x = 15.
  // General: Ax + B = Cx - D => (C-A)x = B+D. 
  // Let's keep it simple or randomize B and D.
  const x5_ans = getRandom(10, 20);
  const angle5 = getRandom(40, 80); // Target angle
  const B5 = angle5 - 3 * x5_ans;
  const D5 = 5 * x5_ans - angle5;

  // Q6: Polygon
  const n_options = [
    { n: 6, angle: 60, sum: 720 },
    { n: 8, angle: 45, sum: 1080 },
    { n: 10, angle: 36, sum: 1440 }
  ];
  const q6_data = n_options[getRandom(0, n_options.length - 1)];

  return [
    {
      id: 5,
      unit: '角度與平行 (NS-8-5)',
      title: '古老遺跡：雷射機關',
      scenario: `兩道平行的能量波被光束穿過，一組內錯角分別為 (3x + ${B5})° 與 (5x - ${D5})°。`,
      question: `請解出 x 的值，並求出該內錯角的實際度數。`,
      type: 'options',
      answer: `${x5_ans}_${angle5}`,
      options: [
        { label: `x = ${x5_ans}, 角度為 ${angle5}°`, value: `${x5_ans}_${angle5}` },
        { label: `x = ${x5_ans + 2}, 角度為 ${angle5 + 10}°`, value: `${x5_ans+2}_${angle5+10}` },
        { label: `x = ${x5_ans - 5}, 角度為 ${angle5 - 15}°`, value: `${x5_ans-5}_${angle5-15}` }
      ],
      hint: '平行線的內錯角相等，因此 3x + B = 5x - D。'
    },
    {
      id: 6,
      unit: '多邊形的內角與外角 (NS-8-3)',
      title: '基地防護：結構分析',
      scenario: `防護場是一個正 ${q6_data.n} 邊形結構。`,
      question: `請問這個正多邊形的「每一個外角」度數，以及「內角和」分別是多少？`,
      type: 'options',
      answer: `${q6_data.n}_${q6_data.angle}`,
      options: [
        { label: `外角 ${q6_data.angle}°, 內角和 ${q6_data.sum}°`, value: `${q6_data.n}_${q6_data.angle}` },
        { label: `外角 ${q6_data.angle + 5}°, 內角和 ${q6_data.sum - 180}°`, value: 'wrong_1' },
        { label: `外角 ${q6_data.angle - 5}°, 內角和 ${q6_data.sum + 180}°`, value: 'wrong_2' }
      ],
      hint: '外角和固定為 360°，除以邊數即為每一外角；內角和公式為 (n-2) × 180°。'
    },
    {
      id: 11,
      unit: '特殊四邊形性質 (NS-8-8)',
      title: '遺跡核心：菱形結構',
      scenario: '一個菱形遺跡核心，其兩條對角線長度分別為 16 與 12。',
      question: '請問這個菱形的邊長是多少？',
      type: 'options',
      answer: '10',
      options: [
        { label: '10', value: '10' },
        { label: '14', value: '14' },
        { label: '20', value: '20' }
      ],
      hint: '菱形對角線互相垂直且平分。利用勾股定理，在直角三角形中求出邊長。'
    }
  ];
};
