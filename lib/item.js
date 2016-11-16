export default class Item {
  constructor(x,y,images) {
    this.x = x;
    this.y = y;
    this.image = images[Math.floor(Math.random() * images.length)];
  }
}
