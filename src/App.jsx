import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import StickyNote from './components/StickyNote';

import AboutContent from './components/windows/AboutContent';
import ProjectsContent from './components/windows/ProjectsContent';
import SkillsContent from './components/windows/SkillsContent';
import ResumeContent from './components/windows/ResumeContent';
import MinesweeperContent from './components/windows/MinesweeperContent';
import NotepadContent from './components/windows/NotepadContent';
import ComputerContent from './components/windows/ComputerContent';
import RecycleContent from './components/windows/RecycleContent';
import { getIcon } from './utils/icons';

const initialWindows = [
  { id: 'comp', title: 'My Computer', width: 420, height: 300, defaultX: 280, defaultY: 100 },
  { id: 'recycle', title: 'Recycle Bin', width: 340, height: 260, defaultX: 320, defaultY: 160 },
  { id: 'notepad', title: 'Notepad', width: 520, height: 400, defaultX: 360, defaultY: 200 },
  { id: 'about', title: 'About.txt', width: 440, height: 320, defaultX: 240, defaultY: 140 },
  { id: 'projects', title: 'Projects', width: 560, height: 400, defaultX: 120, defaultY: 80 },
  { id: 'skills', title: 'Skills', width: 540, height: 300, defaultX: 160, defaultY: 120 },
  { id: 'resume', title: 'Resume.pdf', width: 660, height: 540, defaultX: 200, defaultY: 100 },
  { id: 'minesweeper', title: 'Minesweeper', width: 'auto', height: 'auto', defaultX: 300, defaultY: 150 },
];

function App() {
  const [theme, setTheme] = useState('win98'); // 'win98' or 'win11'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [maximizedWindows, setMaximizedWindows] = useState({});
  const [zIndexCounter, setZIndexCounter] = useState(1);
  const [windowZIndices, setWindowZIndices] = useState({});
  const [isStickyOpen, setIsStickyOpen] = useState(true);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const openWindow = (id) => {
    // External links
    if(id === 'github') return window.open('https://github.com/smthom1', '_blank');
    if(id === 'linkedin') return window.open('https://www.linkedin.com/in/sm-thompson/', '_blank');
    if(id === 'sticky') {
      setIsStickyOpen(true);
      focusWindow('sticky');
      return;
    }

    const winDef = initialWindows.find(w => w.id === id);
    if (!winDef) return;

    if (!openWindows.find(w => w.id === id)) {
      setOpenWindows([...openWindows, winDef]);
      // If previously minimized, restore it
      const mins = { ...minimizedWindows };
      delete mins[id];
      setMinimizedWindows(mins);
    } else {
      // If already open but minimized, restore it
      if (minimizedWindows[id]) {
        toggleMinimize(id);
      }
    }
    focusWindow(id);
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
    const mins = { ...minimizedWindows };
    delete mins[id];
    setMinimizedWindows(mins);
  };

  const focusWindow = (id) => {
    setActiveWindow(id);
    setZIndexCounter(prev => prev + 1);
    setWindowZIndices(prev => ({ ...prev, [id]: zIndexCounter + 1 }));
  };

  const toggleMinimize = (id) => {
    setMinimizedWindows(prev => ({ ...prev, [id]: !prev[id] }));
    if (minimizedWindows[id]) {
      focusWindow(id);
    } else {
      if (activeWindow === id) setActiveWindow(null);
    }
  };

  const toggleMaximize = (id) => {
    focusWindow(id);
    setMaximizedWindows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderContent = (id) => {
    switch (id) {
      case 'about': return <AboutContent />;
      case 'projects': return <ProjectsContent />;
      case 'skills': return <SkillsContent />;
      case 'resume': return <ResumeContent />;
      case 'minesweeper': return <MinesweeperContent />;
      case 'comp': return <ComputerContent theme={theme} />;
      case 'notepad': return <NotepadContent />;
      case 'recycle': return <RecycleContent />;
      default: return null;
    }
  };

  const handleThemeToggle = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(t => t === 'win98' ? 'win11' : 'win98');
    }, 450);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900); // Wait for fade, swap, then pop out
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <motion.div
        animate={isTransitioning ? { scale: 0.95, filter: 'blur(15px)', opacity: 0 } : { scale: 1, filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, transformOrigin: 'center center' }}
      >
        <Desktop onOpen={openWindow} theme={theme} onThemeToggle={handleThemeToggle} />
        
        {openWindows.map(win => (
          <Window
            key={win.id}
            windowData={{ ...win, icon: getIcon(win.id, theme) }}
          theme={theme}
          isActive={activeWindow === win.id}
          isMinimized={!!minimizedWindows[win.id]}
          isMaximized={!!maximizedWindows[win.id]}
          zIndex={windowZIndices[win.id] || 1}
          onClose={() => closeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          onMinimize={() => toggleMinimize(win.id)}
          onMaximize={() => toggleMaximize(win.id)}
        >
          {renderContent(win.id)}
        </Window>
      ))}

      {isStickyOpen && (
        <StickyNote
          theme={theme}
          onClose={() => setIsStickyOpen(false)}
          zIndex={windowZIndices['sticky'] || 99}
          onFocus={() => focusWindow('sticky')}
        />
      )}

      <Taskbar
        theme={theme}
        openWindows={openWindows}
        activeWindow={activeWindow}
        minimizedWindows={minimizedWindows}
        onToggleWindow={openWindow}
        onMinimizeToggle={toggleMinimize}
      />
      </motion.div>
    </div>
  );
}

export default App;
