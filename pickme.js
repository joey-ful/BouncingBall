export default class Block {
  constructor(stageWidth, stageHeight) {
    this.img = new Image();
    this.width = 600;
    this.height = 150;
    this.x = stageWidth / 2 - this.width / 2;
    this.y = stageHeight / 2 - this.height / 2;
    this.maxX = this.width + this.x;
    this.maxY = this.height + this.y;
  }

  draw(ctx) {
    const xGap = 20;
    const yGap = 20;

    ctx.save();
    ctx.fillStyle = '#f8f9fa';
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      this.img,
      this.x + 20,
      this.y + 20,
      this.width - 40,
      this.height - 40
    );
    this.img.src = './srcs/PICK Me.png';
    ctx.restore();

    ctx.fillStyle = '#495057';
    ctx.beginPath();
    ctx.moveTo(this.maxX, this.maxY);
    ctx.lineTo(this.maxX - xGap, this.maxY + yGap);
    ctx.lineTo(this.x - xGap, this.maxY + yGap);
    ctx.lineTo(this.x, this.maxY);
    ctx.fill();

    ctx.fillStyle = '#868e96';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.maxY);
    ctx.lineTo(this.x - xGap, this.maxY + yGap);
    ctx.lineTo(this.x - xGap, this.maxY + yGap - this.height);
    ctx.fill();
  }
}
