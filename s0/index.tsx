import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { extractCases, logicRules } from './data';
import Intro from './sections/Intro';
import Data from './sections/Data';
import Extract from './sections/Extract';
import Logic from './sections/Logic';
import Lift from './sections/Lift';

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [prevSection, setPrevSection] = useState(-1);
  const [imagesCounter, setImagesCounter] = useState(0);
  const [revealedCells, setRevealedCells] = useState(new Set<number>());
  
  const [extractIdx, setExtractIdx] = useState(0);
  const [visibleTags, setVisibleTags] = useState<number[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const [logicIdx, setLogicIdx] = useState(0);
  const [isLogicTransitioning, setIsLogicTransitioning] = useState(false);
  const [drawAxis, setDrawAxis] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // 照片墙翻转逻辑
  useEffect(() => {
    if (activeSection === 1) {
      setRevealedCells(new Set());
      const interval = setInterval(() => {
        setRevealedCells(prev => {
          const next = new Set(prev);
          if (next.size < 600) {
            for (let i = 0; i < 8; i++) next.add(Math.floor(Math.random() * 600));
          }
          return next;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [activeSection]);

  // Extract 自动轮播
  useEffect(() => {
    if (activeSection === 2) {
      const runCycle = () => {
        setIsScanning(true);
        setVisibleTags([]);
        const currentCase = extractCases[extractIdx];
        currentCase.tags.forEach((_, i) => {
          setTimeout(() => setVisibleTags(prev => [...prev, i]), 800 + i * 400);
        });
        setTimeout(() => {
          setIsScanning(false);
          setExtractIdx(prev => (prev + 1) % extractCases.length);
        }, 5000);
      };
      runCycle();
      const mainInterval = setInterval(runCycle, 5500);
      return () => { clearInterval(mainInterval); setIsScanning(false); };
    }
  }, [activeSection, extractIdx]);

  // Logic 轮播及轴向动画重置
  useEffect(() => {
    if (activeSection === 3 || activeSection === 4) {
      setDrawAxis(true);
      const firstTimer = setTimeout(() => setShowResult(true), 1300);

      const interval = setInterval(() => {
        setIsLogicTransitioning(true);
        setDrawAxis(false);
        setShowResult(false);

        setTimeout(() => {
          setLogicIdx(prev => (prev + 1) % logicRules.length);
          setIsLogicTransitioning(false);
          
          setTimeout(() => {
            setDrawAxis(true);
            setTimeout(() => setShowResult(true), 1300);
          }, 50);
        }, 600);
      }, 6500);

      return () => {
        clearInterval(interval);
        clearTimeout(firstTimer);
      };
    } else {
        setDrawAxis(false);
        setShowResult(false);
    }
  }, [activeSection]);

  const startCounter = () => {
    const end = 31500; const dur = 2000; const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setImagesCounter(Math.floor((1 - Math.pow(2, -10 * p)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-index') || '0');
          if (idx !== activeSection) {
            setPrevSection(activeSection);
            setActiveSection(idx);
            if (idx === 1) startCounter();
          }
        }
      });
    }, { threshold: 0.5 });
    container.querySelectorAll('.scroll-trigger').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeSection]);

  const scrollTo = (idx: number) => {
    const triggers = scrollRef.current?.querySelectorAll('.scroll-trigger');
    triggers?.[idx]?.scrollIntoView({ behavior: 'smooth' });
  };

  const getSectionClass = (idx: number) => {
    if (activeSection === idx) return 'active';
    if (prevSection === idx) return 'exiting';
    return '';
  };

  return (
    <>
      <div className="noise"></div>
      
      <header>
        <div className="flex items-center gap-4">
            <div className="w-[2.1rem] h-[2.1rem] rounded bg-white flex items-center justify-center">
                <div className="w-[0.9rem] h-[0.9rem] rounded-full border-[2.5px] border-black border-t-transparent animate-spin"></div>
            </div>
            <span className="font-black text-[1.2rem] tracking-tighter hidden md:block uppercase">Mirror Man</span>
        </div>
        <nav className="nav-pills">
          {['Intro', 'Data', 'Extract', 'Logic', 'Lift'].map((label, i) => (
            <button key={i} className={activeSection === i ? 'active' : ''} onClick={() => scrollTo(i)}>{label}</button>
          ))}
        </nav>
        <div className="w-24 hidden md:block"></div>
      </header>

      <div className="snap-container" ref={scrollRef}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="scroll-trigger" data-index={i}></div>
        ))}
      </div>

      <div className="fixed-stage">
        <Intro className={getSectionClass(0)} />
        
        <Data 
          className={getSectionClass(1)} 
          revealedCells={revealedCells} 
          imagesCounter={imagesCounter} 
        />
        
        <Extract 
          className={getSectionClass(2)} 
          extractIdx={extractIdx} 
          visibleTags={visibleTags} 
          isScanning={isScanning} 
        />
        
        <Logic 
          className={getSectionClass(3)} 
          logicIdx={logicIdx} 
          isLogicTransitioning={isLogicTransitioning} 
          drawAxis={drawAxis} 
          showResult={showResult} 
        />
        
        <Lift 
          className={getSectionClass(4)} 
          logicIdx={logicIdx} 
          isActive={activeSection === 4} 
        />
      </div>
    </>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
