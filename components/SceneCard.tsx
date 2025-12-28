
import React, { useState } from 'react';
import { Scene } from '../types';
import { generateImageFromPrompt } from '../services/gemini';

interface SceneCardProps {
  scene: Scene;
  onUpdate: (id: string, url: string) => void;
}

const SceneCard: React.FC<SceneCardProps> = ({ scene, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await generateImageFromPrompt(scene.prompt);
      onUpdate(scene.id, url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full border border-slate-700/50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-amber-400">{scene.title}</h3>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{scene.timeRange}</span>
        </div>
      </div>
      
      <div className="relative aspect-[9/16] w-full bg-slate-900 rounded-lg overflow-hidden mb-4 border border-slate-800 group">
        {scene.imageUrl ? (
          <img src={scene.imageUrl} alt={scene.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 p-8 text-center">
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
                <p className="text-sm font-medium animate-pulse text-amber-400">Illustrating scene...</p>
              </div>
            ) : (
              <>
                <svg className="w-12 h-12 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm italic">Click Generate to start</p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-amber-600 uppercase block mb-1 tracking-widest">Urdu Script</label>
          <p dir="rtl" className="text-lg text-white font-medium bg-black/40 p-3 rounded-lg border border-white/5 leading-relaxed text-right">
            {scene.scriptUrdu}
          </p>
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase block mb-1 tracking-widest">AI Prompt</label>
          <p className="text-xs text-slate-400 italic line-clamp-2">
            "{scene.prompt}"
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-2 text-xs text-red-400 bg-red-900/20 border border-red-500/30 rounded">
          {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`mt-6 w-full py-3 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
          loading 
          ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
          : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg shadow-amber-900/20 active:scale-95'
        }`}
      >
        {loading ? (
          'Generating...'
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {scene.imageUrl ? 'Re-generate Image' : 'Generate Visual'}
          </>
        )}
      </button>
      
      {scene.imageUrl && (
        <a 
          href={scene.imageUrl} 
          download={`story-scene-${scene.id}.png`}
          className="mt-3 text-[10px] font-bold text-center text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
        >
          Download HQ Asset
        </a>
      )}
    </div>
  );
};

export default SceneCard;
