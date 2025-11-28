# MFA Artwork Gallery

A beautiful, searchable gallery of artworks from the Museum of Fine Arts (MFA) collection, built with React, Vite, and Tailwind CSS.

## Features

- 🖼️ Preview images for each artwork
- 🔍 Real-time search functionality
- 📱 Responsive design
- 🔗 Direct links to MFA collection
- 📋 Copy-to-clipboard functionality
- ✨ Smooth animations and hover effects

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mwyuwono/Mfa-previews.git
cd Mfa-previews
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mwyuwono/Mfa-previews)

1. Click the "Deploy to Netlify" button above, or:
2. Push your code to GitHub
3. Connect your repository to Netlify
4. Netlify will automatically detect Vite and deploy your site

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mwyuwono/Mfa-previews)

1. Click the "Deploy with Vercel" button above, or:
2. Push your code to GitHub
3. Import your repository to Vercel
4. Vercel will automatically detect Vite and deploy your site

### Deploy to GitHub Pages

1. Install the `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

2. Add these scripts to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Update `vite.config.js` to set the base path:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/Mfa-previews/'
})
```

4. Deploy:
```bash
npm run deploy
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Data Source

All artwork data and links are from the Museum of Fine Arts, Boston official collection. This project is for educational purposes only.

## License

MIT License - feel free to use this project for your own purposes.
