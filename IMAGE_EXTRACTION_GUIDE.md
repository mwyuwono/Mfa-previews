# Guide to Adding Preview Images

Since automated fetching is blocked by the MFA website, here are manual methods to add preview images for your research:

## Method 1: Browser Console Script (Easiest)

1. **Open the MFA collection page** in your browser (e.g., https://collections.mfa.org/objects/153777)

2. **Open browser console** (F12 or Right-click → Inspect → Console)

3. **Paste this script** and press Enter:

```javascript
// Extract image URL from current MFA page
const getImageUrl = () => {
  // Try og:image meta tag
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) return ogImage.content;

  // Try to find the main image element
  const mainImage = document.querySelector('.artwork-image img, .object-image img, img[alt*="artwork"]');
  if (mainImage) return mainImage.src;

  // Try JSON-LD structured data
  const jsonLd = document.querySelector('script[type="application/ld+json"]');
  if (jsonLd) {
    try {
      const data = JSON.parse(jsonLd.textContent);
      if (data.image) return data.image;
    } catch(e) {}
  }

  return 'Not found';
};

console.log('Image URL:', getImageUrl());
```

4. **Copy the image URL** from the console output

5. **Add it to `src/artworkData.json`** for the corresponding artwork

## Method 2: Extract All at Once (Browser Bookmarklet)

1. **Create a new bookmark** in your browser with this code as the URL:

```javascript
javascript:(function(){const urls=[];document.querySelectorAll('img').forEach(img=>{if(img.src.includes('collections.mfa.org')&&img.naturalWidth>400){urls.push(img.src)}});if(urls.length>0){prompt('Found images (copy this):',urls.join('\n'))}else{alert('No large images found')}})();
```

2. **Visit an MFA artwork page**
3. **Click the bookmarklet** - it will show you all large images on the page
4. **Copy the relevant URL**

## Method 3: Right-Click Method (Simplest)

1. Visit an MFA artwork page
2. Right-click on the artwork image
3. Select "Copy Image Address" or "Open Image in New Tab"
4. Use that URL in your artworkData.json

## Method 4: Inspect Element

1. Visit an MFA artwork page
2. Right-click the artwork image → Inspect
3. Look for the `src` attribute in the `<img>` tag
4. Copy the URL value

## Example: Adding an Image URL

In `src/artworkData.json`, add the `imageUrl` field:

```json
{
  "title": "Oil flask (lekythos) with Eros playing double flute (aulos)",
  "artist_or_attribution": "Attributed to the Providence Painter",
  "date": "470–460 BCE",
  "accession_number": "00.341",
  "mfa_url": "https://collections.mfa.org/objects/153777/...",
  "imageUrl": "PASTE_IMAGE_URL_HERE"
}
```

## Bulk Processing Script

I've also created a browser script that you can run while on the MFA collections site. Open the browser console and paste this:

```javascript
// Run this on collections.mfa.org to batch extract image URLs
const artworks = [
  {accession: "00.341", url: "https://collections.mfa.org/objects/153777/..."},
  // Add more...
];

async function fetchImageUrls() {
  const results = [];
  for (const artwork of artworks) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    await new Promise((resolve) => {
      iframe.onload = () => {
        const doc = iframe.contentDocument;
        const ogImage = doc.querySelector('meta[property="og:image"]');
        results.push({
          accession: artwork.accession,
          imageUrl: ogImage ? ogImage.content : 'Not found'
        });
        document.body.removeChild(iframe);
        resolve();
      };
      iframe.src = artwork.url;
    });

    await new Promise(r => setTimeout(r, 1000)); // Rate limit
  }

  console.table(results);
  return results;
}

fetchImageUrls();
```

## Tips

- **Image Quality**: MFA images are usually served in multiple sizes. Look for URLs with `/full/` or high resolution parameters
- **IIIF Images**: If the MFA uses IIIF, URLs might look like: `https://iiif.mfa.org/...`
- **Respect Copyright**: These images are for your research only

## Alternative: Use the Placeholder System

If finding images is too time-consuming, the current placeholder system already provides a good research experience with automatic fallback images.
