export default class ScoreTracker {
  constructor(initialScore = 0) {
    this.score = initialScore;
  }

  increment() {
    this.score += 1;
    return this.score;
  }

  reset() {
    this.score = 0;
    return this.score;
  }

  value() {
    return this.score;
  }
}
