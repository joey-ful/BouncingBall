export default class Ball {
  constructor(stageWidth, stageHeight, radius, speedX, speedY, src) {
    this.img = new Image();
    this.radius = radius;
    this.diameter = this.radius * 2;
    this.speedX = speedX;
    this.speedY = speedY;
    this.vx_minus = this.speedX < 0 ? -1 : 1;
    this.vy_minus = this.speedY < 0 ? -1 : 1;
    this.vx = this.speedX;
    this.vy = this.speedY;
    this.src = src;

    this.x = this.radius + Math.random() * (stageWidth - this.diameter);
    this.y = this.radius + Math.random() * (stageHeight - this.diameter);
  }

  draw(ctx, stageWidth, stageHeight) {
    this.interaction();
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(stageWidth, stageHeight);

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.shadowColor = '#dee2e6';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 3;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      this.img,
      this.x - this.radius,
      this.y - this.radius,
      this.diameter,
      this.diameter
    );
    this.img.src = this.src;
    ctx.restore();
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

  interaction() {
    this.canvas = document.getElementById('canvas');

    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mouseout', this.onMouseOut);
  }

  setMinus = () => {
    this.vx_minus = this.vx < 0 ? -1 : 1;
    this.vy_minus = this.vy < 0 ? -1 : 1;
  };

  applyMinus = () => {
    if (this.vx_minus * this.speedX < 0) {
      this.vx *= -1;
    }
    if (this.vy_minus * this.speedY < 0) {
      this.vy *= -1;
    }
  };

  onMouseDown = (e) => {
    this.setMinus();

    this.offsetX = e.clientX - this.x;
    this.offsetY = e.clientY - this.y;

    if (
      Math.abs(this.offsetX) <= this.radius &&
      Math.abs(this.offsetY) <= this.radius
    ) {
      this.canvas.addEventListener('mousemove', this.onMouseMove);
    }
  };

  onMouseMove = (e) => {
    this.x = e.clientX - this.offsetX;
    this.y = e.clientY - this.offsetY;

    this.vx = 0;
    this.vy = 0;
    this.draw(
      this.canvas.getContext(
        '2d',
        this.canvas.width / 2,
        this.canvas.height / 2
      )
    );
  };

  onMouseUp = (e) => {
    this.vx = this.speedX / 20;
    this.vy = this.speedY / 20;
    this.applyMinus();

    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  };

  onMouseOut = (e) => {
    this.vx = this.speedX;
    this.vy = this.speedY;
    this.applyMinus();

    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
  };
}