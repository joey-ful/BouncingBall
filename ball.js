export class Ball {
  constructor(x, y, radius, speed) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;
    this.x = x;
    this.y = y;
  }

  draw(ctx, color, canvasWidth, canvasHeight) {
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = color;
    ctx.fill();
  }

  bounceWindow(stageWidth, stageHeight) {
    if (this.x <= this.radius || this.x >= stageWidth - this.radius) {
      this.vx *= -1;
      this.x += this.vx;
    }
    if (this.y <= this.radius || this.y >= stageHeight - this.radius) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }
}
