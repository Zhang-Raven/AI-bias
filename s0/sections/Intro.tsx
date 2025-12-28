import React from 'react';
import { ParticleTextEffect } from '../components/ParticleTextEffect';

interface IntroProps {
  className: string;
}

const Intro: React.FC<IntroProps> = ({ className }) => {
  return (
    <section className={`section ${className} relative overflow-hidden min-h-screen flex flex-col items-center justify-center`}>
      {/* Fullscreen Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleTextEffect words={["镜中人：\\n生成式AI对“人类”的偏见"]} />
      </div>

      <div className="aura-bg pointer-events-none"></div>
      <div className="horizon-line pointer-events-none"></div>
      
      {/* Content Layer - pointer-events-none allows clicks to pass through to canvas, 
          but children need pointer-events-auto for interaction */}
      <div className="relative z-10 text-center px-4 w-full h-full flex flex-col items-center justify-between py-20 pointer-events-none">
        
      {/* Top Badge */}
        <div className="research-badge pointer-events-auto mt-4 md:mt-8">
          <div className="badge-line"></div>
          <div className="badge-pill">Mirror of Generative AI</div>
          <div className="badge-line"></div>
        </div>
        
        {/* Spacer for Particle Text (which renders in center) */}
        <div className="flex-1 w-full min-h-[20vh]"></div>

        {/* Bottom Subtitle & Scroll */}
        <div className="pointer-events-auto mb-6 md:mb-12">
            <p className="subtitle-design text-2xl md:text-3xl max-w-2xl mx-auto leading-relaxed font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mt-30
            ">
            机器如何理解世界：生成式 AI 中的偏见结构可视化
            </p>
            <div className="mt-12">
            <div className="w-px h-16 bg-gradient-to-b from-purple-500/80 to-transparent mx-auto"></div>
            <p className="mt-6 text-[10px] uppercase tracking-[0.5em] text-white/30 animate-pulse">Scroll to Research</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
