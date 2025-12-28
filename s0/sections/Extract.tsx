import React from 'react';
import { extractCases, mockPhotos } from '../data';

interface ExtractProps {
  className: string;
  extractIdx: number;
  visibleTags: number[];
  isScanning: boolean;
}

const Extract: React.FC<ExtractProps> = ({ className, extractIdx, visibleTags, isScanning }) => {
  const currentCase = extractCases[extractIdx];

  return (
    <section className={`section ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center max-w-6xl w-full px-6">
        <div className="order-2 md:order-1">
          <h2 className="title-design text-5xl md:text-7xl mb-6">AI：从图像中抽取属性</h2>
          <p className="subtitle-design text-base md:text-lg leading-relaxed mb-12 text-white/80">
              将每张图自动转成结构化属性标签（如性别、表情、职业、肤色等）
          </p>
          <div className="flex flex-wrap gap-4 min-h-[150px] content-start">
            {currentCase.tags.map((tag, i) => (
              <div 
                key={`${extractIdx}-${i}`} 
                className={`chip transform transition-all duration-700 !text-lg ${visibleTags.includes(i) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
              >
                {tag[0]}:<span>{tag[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`order-1 md:order-2 relative w-full aspect-square max-w-md mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-opacity duration-500 ${isScanning ? 'opacity-100' : 'opacity-40'} ${isScanning ? 'scanning' : ''}`}>
           <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${mockPhotos[currentCase.imgIdx]})`, filter: isScanning ? 'none' : 'grayscale(1) brightness(0.5)' }}></div>
           <div className="absolute inset-0 bg-black/10"></div>
           <div className="scanner-line"></div>
           <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-[8px] font-mono text-purple-400">STATUS: ANALYZING_VISUAL_TENSORS...</div>
           <div className="absolute bottom-4 left-4 text-[8px] font-mono text-white/30 tracking-widest uppercase">Frame ID: 0x{Math.random().toString(16).slice(2,6).toUpperCase()}</div>
        </div>
      </div>
    </section>
  );
};

export default Extract;
