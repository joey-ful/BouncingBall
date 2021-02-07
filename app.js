import Ball from './ball.js';
import Block from './pickme.js';
import {logos} from './consts.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.balls = [];
    this.block = new Block(this.stageWidth, this.stageHeight);
    this.createBall();
    this.slowDown();
    this.animate();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;

    this.ctx.scale(2, 2);
  }

  slowDown() {
    this.canvas.addEventListener('mouseover', () => {
      this.balls.forEach((ball) => {
        ball.vx /= 20;
        ball.vy /= 20;
      });
    });

    this.canvas.addEventListener('mouseout', () => {
      this.balls.forEach((ball) => {
        ball.vx *= 20;
        ball.vy *= 20;
      });
    });
  }

  createBall() {
    for (let i = 0; i < logos.length; i++) {
      let radius = Math.ceil(Math.random() * 25) + 5;
      let speedX = Math.ceil(Math.random() * 25) + 5;
      let speedY = Math.ceil(Math.random() * 25) + 5;
      let signX = speedX % 2 === 0 ? -1 : 1;
      let signY = speedY % 2 === 0 ? -1 : 1;

      this.balls.push(
        new Ball(
          this.stageWidth,
          this.stageHeight,
          radius,
          speedX * signX,
          speedY * signY,
          `./srcs/${logos[i]}.png`
        )
      );
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.block.draw(this.ctx);

    this.balls.forEach((ball) => {
      ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
    });
  }
}

new App();
