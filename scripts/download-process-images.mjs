import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const imageNumbers = {
  "architectural": [
    1,
    2,
    3
  ],
  "airflow-lab": [
    4,
    5,
    6
  ],
  "clear-living": [
    7,
    8,
    9
  ],
  "field-notes": [
    10,
    11,
    12
  ]
};
const template = process.argv[2];
if (!template || !imageNumbers[template]) {
  console.error("Usage: node ../../scripts/download-process-images.mjs <architectural|airflow-lab|clear-living|field-notes>");
  process.exit(1);
}

const outputDir = join(process.cwd(), "public", "images");
await mkdir(outputDir, { recursive: true });
for (let i = 0; i < imageNumbers[template].length; i += 1) {
  const number = String(imageNumbers[template][i]).padStart(4, "0");
  const filename = `process-${i + 1}.webp`;
  const url = `https://zartsair.com/airductcleaning/assets/img/gallery/zarts_before_after_${number}.webp`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AirductTemplateBuild/1.0)",
      "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"
    },
    redirect: "follow"
  });
  if (!response.ok) throw new Error(`Could not download ${template} ${filename}: HTTP ${response.status} from ${url}`);
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("image/")) throw new Error(`Expected an image for ${template} ${filename}; received Content-Type: ${contentType}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const validWebp = bytes.length > 16 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  if (!validWebp) throw new Error(`Downloaded file for ${template} ${filename} is not a valid WebP image`);
  await writeFile(join(outputDir, filename), bytes);
  console.log(`Verified image: ${template}/images/${filename} (${bytes.length} bytes)`);
}
