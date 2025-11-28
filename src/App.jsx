import React, { useState, useMemo } from 'react';
import { ExternalLink, Search, Calendar, User, Hash, Copy, Check, X, Image as ImageIcon } from 'lucide-react';

const artworkData = [
  {
    "title": "New England Interior",
    "artist_or_attribution": "Edmund Tarbell",
    "date": "1906",
    "accession_number": "1985.66",
    "mfa_url": "https://collections.mfa.org/objects/34680/new-england-interior",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Edmund_C._Tarbell_-_New_England_Interior_-_Google_Art_Project.jpg"
  },
  {
    "title": "Oil flask (lekythos) with Eros playing double flute (aulos)",
    "artist_or_attribution": "Attributed to the Providence Painter",
    "date": "470–460 BCE",
    "accession_number": "00.341",
    "mfa_url": "https://collections.mfa.org/objects/153777/oil-flask-lekythos-with-eros-playing-double-flute-aulos"
  },
  {
    "title": "The Granddaughter",
    "artist_or_attribution": "Francis Davis Millet",
    "date": "1885",
    "accession_number": "1981.77",
    "mfa_url": "https://collections.mfa.org/objects/34418/the-granddaughter",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/99/Francis_Davis_Millet_-_The_Granddaughter_-_1981.77_-_Museum_of_Fine_Arts.jpg"
  },
  {
    "title": "High-handled drinking cup (kantharos) with erotic scenes",
    "artist_or_attribution": "Nikosthenes Painter; signed by Nikosthenes as potter",
    "date": "520–510 BCE",
    "accession_number": "95.61",
    "mfa_url": "https://collections.mfa.org/objects/153641/highhandled-drinking-cup-kantharos-with-erotic-scenes"
  },
  {
    "title": "Drinking cup (kylix) with a group of youths and older men at a symposium",
    "artist_or_attribution": "Euaion Painter",
    "date": "about 450 BCE",
    "accession_number": "01.8078",
    "mfa_url": "https://collections.mfa.org/objects/153771/drinking-cup-kylix-with-young-and-older-men-at-a-symposium"
  },
  {
    "title": "Wine pitcher (oinochoe) with revelers",
    "artist_or_attribution": "Chicago Painter",
    "date": "about 450 BCE",
    "accession_number": "13.192",
    "mfa_url": "https://collections.mfa.org/objects/153737/wine-pitcher-oinochoe-with-revelers"
  },
  {
    "title": "Upper part of a grave stele: Sphinx seated atop a volute capital",
    "artist_or_attribution": "Greek, Archaic period",
    "date": "525–520 BCE",
    "accession_number": "40.576",
    "mfa_url": "https://collections.mfa.org/objects/150591/upper-part-of-a-grave-stele-sphinx-seated-atop-a-volute-c"
  },
  {
    "title": "Athlete crowning himself in victory",
    "artist_or_attribution": "Greek, Early Classical period",
    "date": "about 470 BCE",
    "accession_number": "96.706",
    "mfa_url": "https://collections.mfa.org/objects/153505/athlete-crowning-himself-in-victory"
  },
  {
    "title": "Victorious boxer",
    "artist_or_attribution": "Greek, Early Classical period",
    "date": "mid-5th century BCE",
    "accession_number": "01.7475",
    "mfa_url": "https://collections.mfa.org/objects/153508/victorious-boxer"
  },
  {
    "title": "Deep drinking cup (skyphos) showing an athlete with a wreath",
    "artist_or_attribution": "Erra Painter",
    "date": "340–330 BCE",
    "accession_number": "93.103",
    "mfa_url": "https://collections.mfa.org/objects/153692/deep-drinking-cup-skyphos-showing-an-athlete-with-a-wreath"
  },
  {
    "title": "Two-handled jar (amphora) with an athletic victor",
    "artist_or_attribution": "Kleophrades Painter",
    "date": "about 490 BCE",
    "accession_number": "10.178",
    "mfa_url": "https://collections.mfa.org/objects/153702/amphora-with-athletic-victor"
  },
  {
    "title": "Panathenaic prize vase (amphora) with distance runners",
    "artist_or_attribution": "Euphiletos Painter",
    "date": "530–520 BCE",
    "accession_number": "99.520",
    "mfa_url": "https://collections.mfa.org/objects/153720/panathenaic-prize-vase-amphora-with-distance-runners"
  },
  {
    "title": "Wine cooler (psykter) with pentathletes",
    "artist_or_attribution": "Phintias",
    "date": "520–515 BCE",
    "accession_number": "01.8019",
    "mfa_url": "https://collections.mfa.org/objects/153729/wine-cooler-psykter-with-pentathletes"
  },
  {
    "title": "Covered wine cup (kylix) depicting athletes and judges",
    "artist_or_attribution": "Greek, late Archaic period",
    "date": "about 500 BCE",
    "accession_number": "95.16",
    "mfa_url": "https://collections.mfa.org/objects/153715/covered-wine-cup-kylix-depicting-athletes-and-judges"
  },
  {
    "title": "Mixing bowl (dinos) with athletes training",
    "artist_or_attribution": "Manner of the Dinos Painter",
    "date": "430–420 BCE",
    "accession_number": "96.720",
    "mfa_url": "https://collections.mfa.org/objects/153725/dinos-mixing-bowl-with-athletes-training"
  },
  {
    "title": "Miniature chariot wheel",
    "artist_or_attribution": "Greek, Archaic period",
    "date": "525–500 BCE",
    "accession_number": "35.61",
    "mfa_url": "https://collections.mfa.org/objects/150379/miniature-chariot-wheel"
  },
  {
    "title": "Wine cup (kylix) with palaestra scenes",
    "artist_or_attribution": "Penthesilea Painter",
    "date": "about 460 BCE",
    "accession_number": "28.48",
    "mfa_url": "https://collections.mfa.org/objects/153768/wine-cup-kylix-with-palaestra-scenes"
  },
  {
    "title": "Stooping athlete",
    "artist_or_attribution": "Greek, early Classical period",
    "date": "470–460 BCE",
    "accession_number": "96.710",
    "mfa_url": "https://collections.mfa.org/objects/153506/stooping-athlete"
  },
  {
    "title": "Discus thrower (diskobolos)",
    "artist_or_attribution": "Greek, Early Classical period",
    "date": "about 480 BC",
    "accession_number": "50.22",
    "mfa_url": "https://collections.mfa.org/objects/153514/discus-thrower-diskobolos"
  },
  {
    "title": "Athlete lifting weight",
    "artist_or_attribution": "Greek, Classical period",
    "date": "about 420 BC",
    "accession_number": "50.21",
    "mfa_url": "https://collections.mfa.org/objects/153513/athlete-lifting-weight"
  },
  {
    "title": "Wine cup (kylix) depicting a boxer wrapping his fist with a leather strap",
    "artist_or_attribution": "Attributed to the Amasis Painter",
    "date": "about 500 BC",
    "accession_number": "01.8030",
    "mfa_url": "https://collections.mfa.org/objects/153773/wine-cup-kylix-depicting-a-boxer-wrapping-his-fist"
  },
  {
    "title": "Wine cup (kylix) with pentathletes",
    "artist_or_attribution": "Greek, Early Classical period",
    "date": "about 470–460 BC",
    "accession_number": "01.8039",
    "mfa_url": "https://collections.mfa.org/objects/153774/wine-cup-kylix-with-pentathletes"
  },
  {
    "title": "Jumping weight (halter)",
    "artist_or_attribution": "Greek, Archaic or Classical period",
    "date": "6th–4th century BC",
    "accession_number": "10.176",
    "mfa_url": "https://collections.mfa.org/objects/153512/jumping-weight-halter"
  },
  {
    "title": "Wine cup (kylix) depicting athletic combats",
    "artist_or_attribution": "Onesimos",
    "date": "about 490–480 BC",
    "accession_number": "1972.44",
    "mfa_url": "https://collections.mfa.org/objects/153767/wine-cup-kylix-depicting-athletic-combats"
  },
  {
    "title": "Head of a youthful god (Ares?)",
    "artist_or_attribution": "Roman, Imperial period",
    "date": "mid–2nd century A.D.",
    "accession_number": "03.746",
    "mfa_url": "https://collections.mfa.org/objects/152632/head-of-a-youthful-god-ares"
  },
  {
    "title": "Lower body of a youth",
    "artist_or_attribution": "Roman, Imperial period",
    "date": "2nd–3rd century A.D.",
    "accession_number": "2003.47",
    "mfa_url": "https://collections.mfa.org/objects/150602/lower-body-of-a-youth"
  },
  {
    "title": "High-handled cup (kantharos) with Poseidon battling a Giant",
    "artist_or_attribution": "Amphitrite Painter; signed by Hieron, son of Medon, as potter",
    "date": "about 470–460 BCE",
    "accession_number": "98.932",
    "mfa_url": "https://collections.mfa.org/objects/153643/highhandled-cup-kantharos-with-poseidon-battling-a-giant"
  },
  {
    "title": "Bowl with bats, rocks, and waves",
    "artist_or_attribution": "Qing dynasty, Yongzheng period; Jingdezhen ware",
    "date": "1723–35",
    "accession_number": "1987.568",
    "mfa_url": "https://collections.mfa.org/objects/41437/bowl-with-bats-rocks-and-waves"
  }
];

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
        <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-md border border-blue-200 flex items-start text-sm">
           <div className="flex-shrink-0 mr-3">
             <ExternalLink className="h-5 w-5" />
           </div>
           <div>
             <p className="font-medium">Note regarding external links:</p>
             <p>If the "View" button does not open a new tab due to browser security settings, please use the <strong>Copy Link</strong> button and paste the URL into a new browser tab.</p>
           </div>
        </div>

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
