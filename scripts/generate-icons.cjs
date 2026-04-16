/**
 * Simple script to generate PWA icon PNGs from SVG.
 * Requires a canvas-capable environment.
 * Run: node scripts/generate-icons.js
 *
 * If canvas is not available, manually create 192x192 and 512x512 PNG icons
 * and place them in public/icons/
 */

const fs = require('fs');
const path = require('path');

const svgTemplate = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="#0a0a14"/>
  <circle cx="${size / 2}" cy="${size * 0.44}" r="${size * 0.22}" fill="none" stroke="rgba(160,140,220,0.7)" stroke-width="${size * 0.02}"/>
  <path d="M${size * 0.375} ${size * 0.44} A${size * 0.125} ${size * 0.125} 0 0 1 ${size * 0.625} ${size * 0.44}" fill="rgba(160,140,220,0.3)"/>
  <line x1="${size / 2}" y1="${size * 0.69}" x2="${size / 2}" y2="${size * 0.81}" stroke="rgba(160,140,220,0.5)" stroke-width="${size * 0.02}" stroke-linecap="round"/>
  <line x1="${size * 0.375}" y1="${size * 0.75}" x2="${size * 0.625}" y2="${size * 0.75}" stroke="rgba(160,140,220,0.5)" stroke-width="${size * 0.02}" stroke-linecap="round"/>
</svg>`;

const iconsDir = path.join(__dirname, '..', 'public', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Write SVG versions (used as fallback)
[192, 512].forEach((size) => {
  const svg = svgTemplate(size);
  fs.writeFileSync(path.join(iconsDir, `icon-${size}.svg`), svg);
  console.log(`Generated icon-${size}.svg`);
});

console.log('SVG icons generated. For PNG icons, use a tool like Inkscape or an online converter.');
