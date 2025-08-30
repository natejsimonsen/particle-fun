import { getRandomInt } from "./utils.js";

class Particle {
  constructor(x, y, opacity) {
    this.x = x;
    this.y = y;
    this.size = getRandomInt(1, 3);
    this.speedx = getRandomInt(-3, 3);
    this.speedy = getRandomInt(-3, 3);
    this.red = getRandomInt(0, 255);
    this.green = getRandomInt(0, 255);
    this.blue = getRandomInt(0, 255);
    this.opacity = opacity;
  }

  updatePosition() {
    this.x = this.nextX();
    this.y = this.nextY();
  }

  setOpacity(opacity) {
    this.opacity = opacity;
  }

  nextX() {
    return this.x + Math.sin(this.speedx);
  }

  nextY() {
    return this.y + Math.tan(this.speedy);
  }

  reverseX() {
    this.speedx *= -1;
  }

  reverseY() {
    this.speedy *= -1;
  }
}

export default class BoundingBox {
  constructor(x, y, width, height, opacity) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.particles = [];
    this.density = 0.04; // lower = less particles
    this.opacity = opacity;
    this.debug = false;
  }

  addParticles() {
    for (
      let i = 0;
      i < Math.min(this.width * this.height * this.density, 40000);
      i++
    ) {
      this.addParticle();
    }
  }

  addParticle() {
    const x = getRandomInt(0, this.width - 3);
    const y = getRandomInt(0, this.height - 3);
    this.particles.push(new Particle(x + this.x, y + this.y, this.opacity));
  }

  updateParticlePositions() {
    this.particles.forEach((particle) => {
      if (
        particle.nextX() + particle.size > this.x + this.width ||
        particle.nextX() < this.x
      ) {
        particle.reverseX();
      }

      if (
        particle.nextY() + particle.size > this.y + this.height ||
        particle.nextY() < this.y
      ) {
        particle.reverseY();
      }

      particle.updatePosition();
    });
  }

  updateOpacity(step) {
    this.opacity += step;

    this.particles.forEach((particle) => particle.setOpacity(this.opacity));
  }
}
