export default class LineModel {
  constructor(slope, intercept) {
    this.slope = slope;
    this.intercept = intercept;
  }

  equals(otherLine) {
    return this.slope === otherLine.slope && this.intercept === otherLine.intercept;
  }

  evaluate(x) {
    return this.slope * x + this.intercept;
  }

  toSvgY(xPixel, scale = 20) {
    const x = xPixel / scale;
    return -this.evaluate(x) * scale;
  }
}
