class Avatar {
  constructor(avatarX, avatarY, avatarWidth, avatarHeight) {
    this.avatarX = avatarX;
    this.avatarY = avatarY;
    this.avatarWidth = avatarWidth;
    this.avatarHeight = avatarHeight;
    this.breathInc = 1.25;
    this.breathDir = 1;
    this.breathAmt = 0;
    this.breathMax = 1.25;
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

module.exports = Avatar;
