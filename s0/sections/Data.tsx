import React from 'react';
import { mockPhotos } from '../data';

interface DataProps {
  className: string;
  revealedCells: Set<number>;
  imagesCounter: number;
}

const Data: React.FC<DataProps> = ({ className, revealedCells, imagesCounter }) => {
  return (
    <section className={`section ${className}`}>
      <div className="photo-wall">
        {Array.from({ length: 600 }).map((_, i) => (
          <div key={i} className={`photo-cell ${revealedCells.has(i) ? 'revealed' : ''}`}>
            <div className="photo-cell-inner" style={{ backgroundImage: `url(${mockPhotos[i % mockPhotos.length]})` }} />
          </div>
        ))}
      </div>
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h2 className="title-design text-5xl md:text-7xl mb-6">图像生成</h2>
        <p className="subtitle-design text-base md:text-lg mb-16 text-white/80">
          使用文生图模型，基于一套受控提示词生成图像样本
        </p>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-16 flex flex-col md:flex-row items-center gap-6 justify-center backdrop-blur-xl">
          <div className="flex items-center gap-3">
              <span className="text-[10px] text-purple-400 font-bold tracking-widest uppercase border border-purple-400/30 px-2 py-0.5 rounded">Prompt</span>
              <span className="text-white/90 font-mono text-sm">man · natural_light · medium_skinned</span>
          </div>
          <div className="h-px w-10 bg-white/10 hidden md:block"></div>
          <div className="text-center md:text-left">
            <div className="text-5xl md:text-7xl font-black tracking-tighter inline-block mr-2">
              {imagesCounter.toLocaleString()}+
            </div>
            <span className="text-[10px] uppercase tracking-widest text-purple-500 font-bold">Samples</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Data;
