
import React, { useState } from 'react';
import { SCENES } from './constants';
import { Scene } from './types';
import SceneCard from './components/SceneCard';

const App: React.FC = () => {
  const [scenes, setScenes] = useState<Scene[]>(SCENES);

  const handleUpdateSceneImage = (id: string, url: string) => {
    setScenes(prev => prev.map(s => s.id === id ? { ...s, imageUrl: url } : s));
  };

  const handleDownloadAll = () => {
    scenes.forEach(scene => {
      if (scene.imageUrl) {
        const link = document.createElement('a');
        link.href = scene.imageUrl;
        link.download = `story-scene-${scene.id}.png`;
        link.click();
      }
    });
  };

  const generatedCount = scenes.filter(s => !!s.imageUrl).length;

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-amber-500 selection:text-white pb-20">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#451a03,transparent)]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 transform -rotate-3">
              <span className="text-white font-black text-2xl">دا</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Dastaan: Sher aur Chuha <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 font-black">STORY ENGINE</span>
              </h1>
              <p className="text-xs text-slate-400">Cinematic Assets for Urdu Shorts & Reels</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {generatedCount > 0 && (
              <button 
                onClick={handleDownloadAll}
                className="text-xs font-bold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-all"
              >
                Download Scene Pack ({generatedCount})
              </button>
            )}
            <div className="h-8 w-px bg-slate-800 mx-1 hidden md:block"></div>
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-amber-600 uppercase font-bold tracking-widest">Story Progress</div>
              <div className="text-sm font-mono text-amber-400">{generatedCount} / {scenes.length} Illustrated</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-4">
            3-Minute Urdu Story Script
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-slate-400">
            Generate Cinematic Visuals for <br className="hidden md:block" /> 'The Lion and the Mouse'
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Every image is generated in <span className="text-amber-400 font-bold">9:16 Portrait</span> format. 
            Perfect for high-engagement YouTube Shorts, TikToks, and Instagram Reels.
          </p>
        </section>

        {/* Scene Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scenes.map((scene) => (
            <SceneCard 
              key={scene.id} 
              scene={scene} 
              onUpdate={handleUpdateSceneImage} 
            />
          ))}
        </div>

        {/* Pro Tips Footer */}
        <section className="mt-20 glass rounded-2xl p-8 border-t border-amber-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
              <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Creator Guide: Sher aur Chuha</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <p className="text-amber-400 font-black text-[10px] uppercase tracking-widest">Audio Setup</p>
                  <p className="text-slate-400">Record the Urdu narration with a <span className="text-slate-200 font-medium italic">Deep Storyteller Voice</span>. Use nature sounds (crickets, wind) for the background layer.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-400 font-black text-[10px] uppercase tracking-widest">Visual Style</p>
                  <p className="text-slate-400">The prompts are tuned for <span className="text-slate-200 font-medium">Photorealism</span>. In CapCut, add a slight 'Lens Blur' transition between these scenes.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-400 font-black text-[10px] uppercase tracking-widest">Text Overlays</p>
                  <p className="text-slate-400">Place Urdu subtitles in the <span className="text-slate-200 font-medium italic">lower-third</span> of the screen. Use a 'Jameel Noori Nastaleeq' font for the best look.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-400 font-black text-[10px] uppercase tracking-widest">Duration</p>
                  <p className="text-slate-400">This script covers <span className="text-slate-200 font-medium">3 full minutes</span>. You may want to generate multiple variations of Scene 4 and 5 for faster pacing.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 px-6 py-3 flex justify-between items-center z-50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="text-xs font-medium text-slate-400">Dastaan Engine Ready</span>
        </div>
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Model: Gemini 2.5 Flash Image 
        </div>
      </footer>
    </div>
  );
};

export default App;
