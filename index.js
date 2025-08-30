import BoundingBox from "./BoundingBox.js";

const canvas = document.getElementById("canvas");

function resize(_) {
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;
}
resize();
window.addEventListener("resize", resize);

const ctx = canvas.getContext("2d");

const letterBoxes = [];

let letterOpacity = 0;

function drawH(x, y) {
  const width = 20;
  const height = 200;

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

function drawh(x, y) {
  const width = 20;
  const height = 200;

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

function drawA(x, y) {
  const width = 20;
  const height = 100;

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

function drawN(x, y) {
  const width = 20;
  const height = 100;

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

let startX = (canvas.width - 710) / 2;
let startY = (canvas.height - 250) / 2;
let snowBox = undefined;

function init() {}

function drawLetterBoxes() {
  letterBoxes.forEach((boundingBox) => {
    if (boundingBox.particles.length != 0) return;
    boundingBox.addParticles();
  });
}

init();

let timer = 0; // stupid timer variable
const maxOpacity = 0.2;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (timer) {
    case 0:
      drawH(startX, startY);
      drawLetterBoxes();
      break;
    case 60:
      drawA(startX + 150, startY + 100);
      drawLetterBoxes();
      break;
    case 120:
      drawN(startX + 260, startY + 100);
      drawLetterBoxes();
      break;
    case 180:
      drawN(startX + 370, startY + 100);
      drawLetterBoxes();
      break;
    case 240:
      drawA(startX + 480, startY + 100);
      drawLetterBoxes();
      break;
    case 300:
      drawh(startX + 590, startY);
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
