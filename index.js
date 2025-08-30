import BoundingBox from "./BoundingBox.js";

const canvas = document.getElementById("canvas");

function resize(_) {
  canvas.width = window.innerWidth * 0.95;
  canvas.height = window.innerHeight * 0.85;
}
resize();
window.addEventListener("resize", resize);

const ctx = canvas.getContext("2d");

const letterBoxes = [];

let letterOpacity = 0;

function drawH(x, y, scale) {
  const width = 20 * scale;
  const height = 200 * scale;

  // left pillar
  letterBoxes.push(new BoundingBox(x, y, width, height, letterOpacity));

  // horizontal line
  letterBoxes.push(
    new BoundingBox(
      x + width,
      y + height / 2 - width / 2,
      height / 2,
      width,
      letterOpacity,
    ),
  );

  // right pillar
  letterBoxes.push(
    new BoundingBox(x + width + height / 2, y, width, height, letterOpacity),
  );
}

function drawh(x, y, scale) {
  const width = 20 * scale;
  const height = 200 * scale;

  // left pillar
  letterBoxes.push(new BoundingBox(x, y, width, height, letterOpacity));

  // horizontal line
  letterBoxes.push(
    new BoundingBox(
      x + width,
      y + height / 2 - width / 2,
      height / 2,
      width,
      letterOpacity,
    ),
  );

  // right pillar
  letterBoxes.push(
    new BoundingBox(
      x + height / 2,
      y + height / 2,
      width,
      height / 2,
      letterOpacity,
    ),
  );
}

function drawA(x, y, scale) {
  const width = 20 * scale;
  const height = 100 * scale;

  // left pillar
  letterBoxes.push(new BoundingBox(x, y, width, height, letterOpacity));

  // right pillar
  letterBoxes.push(
    new BoundingBox(x + height - width, y, width, height, letterOpacity),
  );

  // top pillar
  letterBoxes.push(
    new BoundingBox(x + width, y, height - 2 * width, width, letterOpacity),
  );

  // bottom pillar
  letterBoxes.push(
    new BoundingBox(
      x + width,
      y + height - width,
      height - 2 * width,
      width,
      letterOpacity,
    ),
  );
}

function drawN(x, y, scale) {
  const width = 20 * scale;
  const height = 100 * scale;

  // left pillar
  letterBoxes.push(new BoundingBox(x, y, width, height, letterOpacity));

  // right pillar
  letterBoxes.push(
    new BoundingBox(x + height - width, y, width, height, letterOpacity),
  );

  // top pillar
  letterBoxes.push(
    new BoundingBox(x + width, y, height - 2 * width, width, letterOpacity),
  );
}

function drawLetterBoxes() {
  letterBoxes.forEach((boundingBox) => {
    if (boundingBox.particles.length != 0) return;
    boundingBox.addParticles();
  });
}

let timer = 0; // stupid timer variable
const maxOpacity = 0.2;
const scale = canvas.width > 1000 ? 2 : 0.4;
let startX = (canvas.width - 710 * scale) / 2;
let startY = (canvas.height - 250 * scale) / 2;

console.log();

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (timer) {
    case 0:
      drawH(startX, startY, scale);
      drawLetterBoxes();
      break;
    case 60:
      drawA(startX + 150 * scale, startY + 100 * scale, scale);
      drawLetterBoxes();
      break;
    case 120:
      drawN(startX + 260 * scale, startY + 100 * scale, scale);
      drawLetterBoxes();
      break;
    case 180:
      drawN(startX + 370 * scale, startY + 100 * scale, scale);
      drawLetterBoxes();
      break;
    case 240:
      drawA(startX + 480 * scale, startY + 100 * scale, scale);
      drawLetterBoxes();
      break;
    case 300:
      drawh(startX + 590 * scale, startY, scale);
      drawLetterBoxes();
      break;
  }

  // draw bounding boxes
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;

  letterBoxes.forEach((boundingBox) => {
    // check particle collisions
    boundingBox.updateParticlePositions();

    if (boundingBox.opacity < maxOpacity) boundingBox.updateOpacity(0.004);

    // draw particles
    boundingBox.particles.forEach((particle) => {
      ctx.fillStyle = `rgba(${particle.red},${particle.green},${particle.blue},${particle.opacity})`;
      ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    });

    // draw outline if debug
    if (!boundingBox.debug) return;
    ctx.strokeRect(
      boundingBox.x,
      boundingBox.y,
      boundingBox.width,
      boundingBox.height,
    );
  });

  timer++;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
