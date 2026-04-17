import ChallengeGenerator from './ChallengeGenerator';
import LineModel from './LineModel';
import ScoreTracker from './ScoreTracker';

export default class LineIdentityEngine {
  constructor({ challengeGenerator = new ChallengeGenerator(), scoreTracker = new ScoreTracker() } = {}) {
    this.challengeGenerator = challengeGenerator;
    this.scoreTracker = scoreTracker;
    this.resetState();
  }

  resetState() {
    this.currentLine = new LineModel(1, 0);
    this.targetLine = this.challengeGenerator.generate();
    this.showSuccess = false;
  }

  setSlope(nextSlope) {
    this.currentLine = new LineModel(nextSlope, this.currentLine.intercept);
    this.evaluateMatch();
  }

  setIntercept(nextIntercept) {
    this.currentLine = new LineModel(this.currentLine.slope, nextIntercept);
    this.evaluateMatch();
  }

  evaluateMatch() {
    if (this.showSuccess) {
      return;
    }

    if (this.currentLine.equals(this.targetLine)) {
      this.showSuccess = true;
      this.scoreTracker.increment();
    }
  }

  nextChallenge() {
    this.targetLine = this.challengeGenerator.generate();
    this.showSuccess = false;
  }

  resetAll() {
    this.scoreTracker.reset();
    this.resetState();
  }

  getSnapshot() {
    return {
      slope: this.currentLine.slope,
      intercept: this.currentLine.intercept,
      targetSlope: this.targetLine.slope,
      targetIntercept: this.targetLine.intercept,
      score: this.scoreTracker.value(),
      showSuccess: this.showSuccess
    };
  }
}
