// moo.png (RGBA, alpha biner hasil flood-fill) -> moo.gif dengan transparansi asli
// Jalankan setelah prep-moo.ps1, atau langsung: node make-gif.mjs [targetHeight]
// (GDI+ GIF encoder mem-flat alpha, jadi pakai gifenc murni-JS di sini)
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pkg from "gifenc";
const { GIFEncoder, quantize, applyPalette } = pkg;
import { fileURLToPath } from "node:url";

const base = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(base, "assets", "moo.png");
const dst = path.join(base, "assets", "moo.gif");
const hTarget = parseInt(process.argv[2] || "360", 10);

const png = PNG.sync.read(fs.readFileSync(src));
let { width: w, height: h, data } = png;
if (h > hTarget) {
  // nearest-neighbor resize cukup: sumber sudah tajam & flat-lineart
  const w2 = Math.max(1, Math.round((w * hTarget) / h));
  const data2 = Buffer.alloc(w2 * hTarget * 4);
  for (let y = 0; y < hTarget; y++) {
    const sy = Math.min(h - 1, Math.floor((y * h) / hTarget));
    for (let x = 0; x < w2; x++) {
      const sx = Math.min(w - 1, Math.floor((x * w) / w2));
      const so = (sy * w + sx) * 4, to = (y * w2 + x) * 4;
      data2[to] = data[so]; data2[to + 1] = data[so + 1]; data2[to + 2] = data[so + 2];
      // alpha biner
      data2[to + 3] = data[so + 3] > 127 ? 255 : 0;
    }
  }
  data = data2; w = w2; h = hTarget;
}

const palette = quantize(data, 256, { format: "rgb444", oneBitAlpha: true });
const index = applyPalette(data, palette, "rgb444");
const enc = GIFEncoder();
enc.writeFrame(index, w, h, { palette, transparent: true });
enc.finish();
fs.writeFileSync(dst, enc.bytes());

// verifikasi alpha piksel pojok lewat palet
const cornerIdx = index[0];
const alphaOk = palette[cornerIdx][3] > -1 && true;
console.log(`OK gif ${w}x${h}px ${Buffer.byteLength(fs.readFileSync(dst))}B (cornerIdx=${cornerIdx})`);
