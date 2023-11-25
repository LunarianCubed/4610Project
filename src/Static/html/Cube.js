const canvas = document.getElementById('cubeCanvas');
const ctx = canvas.getContext('2d');

let angleX = 0.01;
let angleY = 0.01;
let angleZ = 0.01;

function drawCube() {
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const size = 100; // Cube size
  const halfSize = size / 2;

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(angleZ);

  // Draw cube faces
  ctx.beginPath();
  ctx.moveTo(-halfSize, -halfSize);
  ctx.lineTo(halfSize, -halfSize);
  ctx.lineTo(halfSize, halfSize);
  ctx.lineTo(-halfSize, halfSize);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-halfSize, -halfSize);
  ctx.lineTo(-halfSize, halfSize);
  ctx.lineTo(-halfSize * 1.5, halfSize * 1.5);
  ctx.lineTo(-halfSize * 1.5, -halfSize * 1.5);
  ctx.closePath();
  ctx.stroke();

  // Adjust angles for rotation
  angleX += 0.01;
  angleY += 0.01;
  angleZ += 0.01;

  ctx.restore();

  requestAnimationFrame(drawCube);
}

drawCube();
