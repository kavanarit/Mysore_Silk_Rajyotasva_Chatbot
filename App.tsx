
import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Gallery from './components/Gallery';
import SareeDetail from './components/SareeDetail';
import MakingProcess from './components/MakingProcess';
import Intro from './components/Intro';
import SilkTypes from './components/SilkTypes';

type View = 'intro' | 'welcome' | 'chat' | 'gallery' | 'sareeDetail' | 'makingProcess' | 'silkTypes';

interface Saree {
    src: string;
    alt: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<View>('intro');
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);

  if (view === 'intro') {
    return <Intro onExplore={() => setView('welcome')} />;
  }

  const renderContent = () => {
    switch (view) {
      case 'chat':
        return <ChatInterface onBack={() => setView('welcome')} />;
      case 'gallery':
        return (
            <Gallery 
                onBack={() => setView('welcome')} 
                onImageClick={(saree) => {
                    setSelectedSaree(saree);
                    setView('sareeDetail');
                }}
            />
        );
      case 'sareeDetail':
        if (!selectedSaree) {
            // Failsafe to prevent rendering with no saree
            setView('gallery');
            return null;
        }
        return (
            <SareeDetail 
                saree={selectedSaree}
                onBack={() => setView('gallery')}
            />
        );
      case 'makingProcess':
        return <MakingProcess onBack={() => setView('welcome')} />;
      case 'silkTypes':
        return <SilkTypes onBack={() => setView('welcome')} />;
      case 'welcome':
      default:
        return (
          <Welcome
            onStartChat={() => setView('chat')}
            onViewGallery={() => setView('gallery')}
            onViewProcess={() => setView('makingProcess')}
            onViewSilkTypes={() => setView('silkTypes')}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-gradient-to-br from-yellow-50 via-red-50 to-amber-100">
      <Header />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;