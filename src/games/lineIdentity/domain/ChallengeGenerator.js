import LineModel from './LineModel';

export default class ChallengeGenerator {
  constructor(randomFn = Math.random) {
    this.randomFn = randomFn;
  }

  generate() {
    const slope = (Math.floor(this.randomFn() * 9) - 4) * 0.5;
    const intercept = Math.floor(this.randomFn() * 7) - 3;
    return new LineModel(slope, intercept);
  }
}
