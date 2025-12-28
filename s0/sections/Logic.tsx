import React from 'react';
import { logicRules } from '../data';

interface LogicProps {
  className: string;
  logicIdx: number;
  isLogicTransitioning: boolean;
  drawAxis: boolean;
  showResult: boolean;
}

const Logic: React.FC<LogicProps> = ({ className, logicIdx, isLogicTransitioning, drawAxis, showResult }) => {
  const currentRule = logicRules[logicIdx];

  return (
    <section className={`section ${className}`}>
      <div className="flex flex-col items-center justify-start text-center max-w-5xl w-full px-4 mx-auto h-full mt-32">
        <h2 className="title-design text-5xl md:text-7xl mb-6">挖掘关联规律：A &rarr; B</h2>
        <p className="subtitle-design text-base md:text-lg mb-20 text-white/80">
          当 antecedents（前件）出现时，consequence（后件）更容易被生成
        </p>
        <div className="flex flex-col items-center justify-center min-h-[520px] w-full relative">
          <div className="overflow-visible min-h-[120px] flex items-center w-full px-4">
            <div className={`flex flex-wrap justify-center gap-x-8 gap-y-6 w-full ${isLogicTransitioning ? 'slide-left-exit' : 'slide-right-enter'}`}>
              {currentRule.A.map((item, i) => (
                <div key={`${logicIdx}-A-${i}`} className="chip !text-xl scale-110">
                  {item[0]}:<span>{item[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`flow-line mx-auto ${drawAxis ? 'animate-draw' : ''}`}></div>

          <div className="overflow-visible min-h-[180px] flex items-center relative w-full justify-center">
            <div 
              className={`relative flex flex-col items-center transition-all duration-700 ${showResult ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
            >
              <div className="lift-badge-new bg-purple-600 text-white text-[12px] px-6 py-2 rounded-full font-black shadow-[0_0_20px_rgba(167,139,250,0.5)] animate-bounce flex items-center gap-2 whitespace-nowrap mb-6">
                <span className="opacity-70 text-[10px] font-normal uppercase tracking-wider">Bias Magnified</span>
                LIFT &times;{currentRule.lift}
              </div>
              
              <div className="chip border-purple-500/60 bg-purple-500/20 scale-125 py-3 px-8 shadow-purple-500/15 shadow-2xl whitespace-nowrap !text-xl">
                {currentRule.B[0]}:<span>{currentRule.B[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Logic;
