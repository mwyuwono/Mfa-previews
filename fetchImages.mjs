// Script to fetch preview images from MFA collection pages
// For research purposes only

import https from 'https';
import { writeFileSync, readFileSync } from 'fs';

const artworkData = JSON.parse(readFileSync('./src/artworkData.json', 'utf8'));

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractImageUrl(html) {
  // Try to find the main artwork image
  // MFA uses different patterns, let's try several

  // Pattern 1: Look for og:image meta tag
  const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (ogImageMatch) return ogImageMatch[1];

  // Pattern 2: Look for primary image in JSON-LD
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">(.+?)<\/script>/s);
  if (jsonLdMatch) {
    try {
      const jsonData = JSON.parse(jsonLdMatch[1]);
      if (jsonData.image) return jsonData.image;
    } catch (e) {}
  }

  // Pattern 3: Look for large image URL in the page
  const largeImageMatch = html.match(/https?:\/\/[^"'\s]+\/full\/[^"'\s]+\.jpg/);
  if (largeImageMatch) return largeImageMatch[0];

  return null;
}

async function processArtworks() {
  const updatedData = [];

  for (const artwork of artworkData) {
    console.log(`Processing: ${artwork.title}...`);

    if (artwork.imageUrl) {
      console.log('  Already has image URL');
      updatedData.push(artwork);
      continue;
    }

    try {
      const html = await fetchPage(artwork.mfa_url);
      const imageUrl = extractImageUrl(html);

      if (imageUrl) {
        console.log(`  Found image: ${imageUrl}`);
        updatedData.push({ ...artwork, imageUrl });
      } else {
        console.log('  No image found');
        updatedData.push(artwork);
      }

      // Be nice to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`  Error: ${error.message}`);
      updatedData.push(artwork);
    }
  }

  writeFileSync('./src/artworkData.json', JSON.stringify(updatedData, null, 2));
  console.log('\nDone! Updated artworkData.json');
}

processArtworks();
