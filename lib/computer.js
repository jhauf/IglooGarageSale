class Computer {
  constructor(computerX, computerY, computerWidth, computerHeight) {
    this.computerX = computerX;
    this.computerY = computerY;
    this.computerWidth = computerWidth;
    this.computerHeight = computerHeight;
    this.breathInc = .5;
    this.breathDir = 1;
    this.breathAmt = 0;
    this.breathMax = 3;
    this.updateBreath = this.updateBreath.bind(this);
  }

  updateBreath() {
  if (this.breathDir === 1) {
    this.breathAmt -= this.breathInc;
    if (this.breathAmt < -this.breathMax) {
      this.breathDir = -1;
    }
  } else {
    this.breathAmt += this.breathInc;
    if(this.breathAmt > this.breathMax) {
      this.breathDir = 1;
    }
  }
}
}

module.exports = Computer;
