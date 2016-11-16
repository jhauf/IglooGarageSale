class Avatar {
  constructor() {
    this.avatarX = (canvas.width-avatarWidth)/2;
    this.avatarY = canvas.height - avatarHeight;
  }

  loadAvatar () {
    let avatarImg = new Image();
    avatarImg.onload = function() {
      ctx.drawImage(avatarImg, avatarX, avatarY, avatarWidth, avatarHeight);
    };
    avatarImg.src = 'avatar.png';
  }

}

module.exports = Avatar;
