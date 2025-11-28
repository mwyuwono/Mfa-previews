import React, { useState, useMemo } from 'react';
import { ExternalLink, Search, Calendar, User, Hash, Copy, Check, X, Image as ImageIcon } from 'lucide-react';
import artworkData from './artworkData.json';

// Fallback copy mechanism for iframe environments
const copyToClipboardLegacy = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  document.body.removeChild(textArea);
};

const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-md shadow-lg flex items-center gap-3 z-50 animate-fade-in-up">
    <Check className="w-5 h-5 text-green-400" />
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white">
      <X className="w-4 h-4" />
    </button>
  </div>
);

const ArtworkCard = ({ artwork, onCopy }) => {
  const [justCopied, setJustCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopyClick = () => {
    onCopy(artwork.mfa_url);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
  };

  const placeholderUrl = `https://placehold.co/600x400/f1f5f9/94a3b8?text=${encodeURIComponent(artwork.title.length > 25 ? artwork.title.substring(0, 25) + '...' : artwork.title)}`;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 bg-gray-100 border-b border-gray-100 group overflow-hidden">
        {artwork.imageUrl && !imageError ? (
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
             <img
                src={placeholderUrl}
                alt="Preview placeholder"
                className="w-full h-full object-cover opacity-80"
             />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="font-serif text-lg font-semibold text-gray-900 leading-tight mb-3 line-clamp-2" title={artwork.title}>
          {artwork.title}
        </h3>

        <div className="space-y-2 mb-6 flex-grow">
          <div className="flex items-start text-sm text-gray-600">
            <User className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-red-800" />
            <span className="line-clamp-1">{artwork.artist_or_attribution}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-red-800" />
            <span>{artwork.date}</span>
          </div>

          <div className="flex items-center text-sm text-gray-400 font-mono">
            <Hash className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{artwork.accession_number}</span>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <a
            href={artwork.mfa_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            View
            <ExternalLink className="ml-2 -mr-1 w-4 h-4" />
          </a>
          <button
            onClick={handleCopyClick}
            className={`inline-flex items-center justify-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
              justCopied
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
            }`}
            title="Copy Link to Clipboard"
          >
            {justCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const filteredArtworks = useMemo(() => {
    return artworkData.filter(artwork =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.artist_or_attribution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleCopy = (url) => {
    copyToClipboardLegacy(url);
    setToastMessage("Link copied to clipboard!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-red-100 selection:text-red-900 relative">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-900 flex items-center">
                <ImageIcon className="w-8 h-8 mr-3 text-red-800" />
                MFA Collection Preview
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Browsing {filteredArtworks.length} of {artworkData.length} items
              </p>
            </div>

            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors duration-200"
                placeholder="Search by title, artist, or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.accession_number}
                artwork={artwork}
                onCopy={handleCopy}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No artworks found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms to find what you're looking for.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Data provided for educational purposes. All links direct to the Museum of Fine Arts official collection.
          </p>
        </div>
      </footer>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
