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

  draw(ctx, stageWidth, stageHeight, block) {
    this.interaction();
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(stageWidth, stageHeight);

    this.block = block;
    this.bounceblock(this.block);

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.shadowColor = '#dee2e6';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 3;
    ctx.filter = 'drop-shadow()';
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

  bounceblock(block) {
    const minX = block.x - this.radius;
    const maxX = block.maxX + this.radius;
    const minY = block.y - this.radius;
    const maxY = block.maxY + this.radius;

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);
      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      if (min === min1) {
        this.vx *= -1;
        this.x += this.vx;
      } else if (min === min2) {
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  }
}
