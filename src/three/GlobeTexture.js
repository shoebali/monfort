import * as THREE from "three";

export function createGlobeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0D1B2A";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(45,98,140,0.3)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += canvas.width / 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += canvas.height / 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  const land = [
    [[170, 140], [235, 105], [320, 125], [345, 190], [300, 235], [210, 225], [150, 185]],
    [[405, 105], [510, 95], [580, 145], [560, 225], [480, 250], [405, 205]],
    [[540, 260], [595, 315], [575, 410], [520, 455], [492, 350]],
    [[595, 130], [710, 110], [820, 165], [855, 250], [760, 290], [650, 245]],
    [[790, 305], [865, 330], [905, 395], [860, 430], [780, 390]],
    [[890, 240], [955, 260], [980, 325], [930, 345], [880, 305]],
  ];

  ctx.fillStyle = "#1A3050";
  land.forEach((poly) => {
    ctx.beginPath();
    poly.forEach(([x, y], index) => {
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
