// scripts/downsize-images.mjs
// Reduz imagens de origem sobredimensionadas em public/ (fotos servidas
// via next/image a poucas centenas de px mas guardadas a 10 MB). Cap no
// lado maior a 1920px e re-encode com qualidade alta (82). Preserva o
// formato e o nome do ficheiro (não quebra referências). Só encolhe se
// for maior que o cap — imagens já pequenas ficam intactas.
//
// Uso: node scripts/downsize-images.mjs
import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const PUBLIC = path.resolve("public");
const MAX_EDGE = 1920;
const Q = 82;

const targets = [
  "ana.webp", "mj.webp", "antonio.webp",
  "recriacao-passo1-foto.jpg", "recriacao-passo3-prensagem.jpg", "recriacao-passo4-quadro.jpg",
  "historia-aniversario-flores.jpg", "historia-casamento-recente.jpg",
  "antesedepois.png", "detalhe.webp",
  "Envio/1.png", "Envio/2.png", "Envio/3.png", "Envio/4.png", "Envio/5.png",
];

const mb = (n) => (n / 1024 / 1024).toFixed(2);

for (const rel of targets) {
  const file = path.join(PUBLIC, rel);
  let before;
  try {
    before = (await stat(file)).size;
  } catch {
    console.log(`(salta, não existe) ${rel}`);
    continue;
  }
  const input = await readFile(file);
  const img = sharp(input, { failOn: "none" });
  const meta = await img.metadata();
  const ext = path.extname(rel).toLowerCase();

  let pipe = img.rotate(); // respeita orientação EXIF
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);
  if (longEdge > MAX_EDGE) {
    pipe = pipe.resize({ width: meta.width >= meta.height ? MAX_EDGE : null,
                         height: meta.height > meta.width ? MAX_EDGE : null,
                         withoutEnlargement: true });
  }
  if (ext === ".webp") pipe = pipe.webp({ quality: Q });
  else if (ext === ".jpg" || ext === ".jpeg") pipe = pipe.jpeg({ quality: Q, mozjpeg: true });
  else if (ext === ".png") pipe = pipe.png({ compressionLevel: 9, palette: true, quality: 90 });

  const out = await pipe.toBuffer();
  if (out.length >= before) {
    console.log(`(mantém, já otimizada) ${rel}  ${mb(before)}MB`);
    continue;
  }
  await writeFile(file, out);
  console.log(`${rel}  ${mb(before)}MB → ${mb(out.length)}MB  (${meta.width}×${meta.height}, lado→${Math.min(longEdge, MAX_EDGE)})`);
}
console.log("Feito.");
