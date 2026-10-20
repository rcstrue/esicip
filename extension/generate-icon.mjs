// Generates the ESIC IP Auto-Fill extension icon.
// Uses z-ai-web-dev-sdk to produce a 1024x1024 image, then sharp to resize
// it down to the required 128x128 PNG.
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUTPUT_PATH = '/home/z/my-project/extension/icon.png';
const TMP_PATH = '/home/z/my-project/extension/_icon_1024.png';

const PROMPT = [
  'Minimalist flat-design app icon, centered on a pure white background.',
  'A solid red (#dc2626) rounded-square document/form icon with three short',
  'white horizontal lines inside representing text input fields. A white',
  'checkmark inside a small red circle overlapping the bottom-right corner',
  'of the document. Bold sans-serif letters "ESIC" in red (#dc2626) centered',
  'below the document icon. Flat design, no gradients, no drop shadows,',
  'no 3D effects, no photorealism. Crisp vector-style edges, high contrast,',
  'professional, clean, simple, balanced composition, lots of white space',
  'around the icon. Suitable as a small browser-extension icon.'
].join(' ');

async function main() {
  console.log('Creating ZAI client...');
  const zai = await ZAI.create();

  console.log('Requesting 1024x1024 image generation...');
  const response = await zai.images.generations.create({
    prompt: PROMPT,
    size: '1024x1024'
  });

  if (!response?.data?.[0]?.base64) {
    throw new Error('Image generation returned no base64 data: ' + JSON.stringify(response));
  }

  const imageBase64 = response.data[0].base64;
  const buffer = Buffer.from(imageBase64, 'base64');
  fs.writeFileSync(TMP_PATH, buffer);
  console.log(`Saved 1024x1024 temp image to ${TMP_PATH} (${buffer.length} bytes)`);

  console.log('Resizing to 128x128 with sharp...');
  await sharp(TMP_PATH)
    .resize(128, 128, { fit: 'cover', position: 'center' })
    .png({ compressionLevel: 9 })
    .toFile(OUTPUT_PATH);

  const finalStat = fs.statSync(OUTPUT_PATH);
  console.log(`Saved final icon to ${OUTPUT_PATH} (${finalStat.size} bytes)`);

  // Cleanup temp
  try { fs.unlinkSync(TMP_PATH); } catch (_) { /* ignore */ }
  console.log('Done.');
}

main().catch((err) => {
  console.error('Error generating icon:', err);
  process.exit(1);
});
