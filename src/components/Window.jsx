import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function Window({ windowData, isActive, isMinimized, isMaximized, zIndex, onClose, onFocus, onMinimize, onMaximize, theme, children }) {
  const { title, icon, width, height, defaultX, defaultY } = windowData;
  const contentRef = useRef(null);
  const isWin11 = theme === 'win11';

  const win11DynamicGradients = {
    comp: 'linear-gradient(135deg, rgba(230,245,255,0.85), rgba(255,255,255,0.7))',
    projects: 'linear-gradient(135deg, rgba(255,230,240,0.85), rgba(255,255,255,0.7))',
    skills: 'linear-gradient(135deg, rgba(255,245,230,0.85), rgba(255,255,255,0.7))',
    resume: 'linear-gradient(135deg, rgba(230,255,240,0.85), rgba(255,255,255,0.7))',
    about: 'linear-gradient(135deg, rgba(240,230,255,0.85), rgba(255,255,255,0.7))',
    recycle: 'linear-gradient(135deg, rgba(240,255,230,0.85), rgba(255,255,255,0.7))',
    notepad: 'rgba(255,255,255,0.9)',
    minesweeper: 'linear-gradient(135deg, rgba(255,255,240,0.85), rgba(240,255,255,0.7))',
  };

  const bgStyle = isWin11 ? (win11DynamicGradients[windowData.id] || 'rgba(255,255,255,0.8)') : undefined;

  const variants = {
    open: {
      opacity: 1,
      scale: 1,
      y: defaultY,
      x: defaultX,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      transition: { type: 'spring', bounce: isWin11 ? 0.2 : 0, duration: 0.4 },
      pointerEvents: 'auto'
    },
    maximized: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      width: '100vw',
      height: isWin11 ? 'calc(100vh - 48px)' : 'calc(100vh - 38px)',
      transition: { type: 'spring', bounce: isWin11 ? 0.2 : 0, duration: 0.3 },
      pointerEvents: 'auto'
    },
    minimized: {
      opacity: 0,
      scale: isWin11 ? 0.95 : 0.8,
      y: '100vh',
      x: defaultX,
      transition: { type: 'spring', bounce: 0, duration: 0.4 },
      pointerEvents: 'none'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: defaultY, x: defaultX, width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height }}
      animate={isMinimized ? 'minimized' : (isMaximized ? 'maximized' : 'open')}
      variants={variants}
      drag={!isMaximized}
      dragMomentum={false}
      onMouseDown={onFocus}
      className={isWin11 ? 'win11-window' : 'win98-outset'}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        zIndex,
        background: isWin11 ? bgStyle : undefined,
        border: isWin11 ? '1px solid rgba(255,255,255,0.5)' : undefined,
        boxShadow: isWin11 
          ? (isActive ? '0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.8)' : '0 10px 30px rgba(0,0,0,0.1)') 
          : (isActive ? '6px 6px 0 rgba(0,0,0,0.5), inset -1px -1px 0 var(--bevel-dark), inset 1px 1px 0 var(--bevel-light)' : '4px 4px 0 rgba(0,0,0,0.3), inset -1px -1px 0 var(--bevel-dark), inset 1px 1px 0 var(--bevel-light)'),
        borderRadius: isWin11 && !isMaximized ? 'var(--w11-border-radius)' : (isWin11 && isMaximized ? 0 : 0)
      }}
    >
      <div 
        className="title-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isWin11 ? '8px 12px' : '3px 4px 3px 6px',
          background: isWin11 ? 'transparent' : (isActive ? 'linear-gradient(90deg, var(--title-left), var(--title-right))' : 'var(--title-inactive)'),
          color: isWin11 ? 'var(--w11-text)' : 'white',
          fontWeight: isWin11 ? 500 : 'bold',
          cursor: isMaximized ? 'default' : 'grab',
          borderBottom: isWin11 ? '1px solid rgba(0,0,0,0.05)' : 'none'
        }}
        onPointerDown={(e) => {}}
        onDoubleClick={(e) => { e.stopPropagation(); onMaximize(); }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, userSelect: 'none' }}>
          {icon && <img src={icon} alt="Win Icon" style={{ width: 16, height: 16 }} />}
          <span style={{ fontSize: isWin11 ? 14 : 13, textShadow: isWin11 ? 'none' : '1px 1px 0 rgba(0,0,0,0.5)' }}>
            {title}
          </span>
        </div>

        <div style={{ display: 'flex', gap: isWin11 ? 8 : 2 }} onPointerDown={(e) => e.stopPropagation()}>
          {/* Minimize */}
          <button 
            className={isWin11 ? 'win11-button' : 'win98-button'}
            style={isWin11 ? { width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' } : { width: 18, height: 18, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            title="Minimize"
          >
            {isWin11 ? (
              <div style={{ width: 10, height: 1, background: 'currentColor' }} />
            ) : (
              <span style={{ transform: 'translateY(-2px)' }}>_</span>
            )}
          </button>
          
          {/* Maximize */}
          <button 
            className={isWin11 ? 'win11-button' : 'win98-button'}
            style={isWin11 ? { width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' } : { width: 18, height: 18, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            title="Maximize"
          >
            {isWin11 ? (
              isMaximized ? (
                 <div style={{ width: 10, height: 10, border: '1px solid currentColor', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, border: '1px solid currentColor', borderLeft: 'none', borderBottom: 'none' }} />
                 </div>
              ) : (
                 <div style={{ width: 11, height: 11, border: '1px solid currentColor', borderRadius: 2 }} />
              )
            ) : (
              isMaximized ? (
                <div style={{ position: 'relative', width: 10, height: 8 }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 6, border: '1px solid black', borderTopWidth: 2 }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: 8, height: 6, border: '1px solid black', borderTopWidth: 2, background: 'var(--panel)' }} />
                </div>
              ) : (
                <div style={{ width: 10, height: 8, border: '1px solid black', borderTopWidth: 2 }} />
              )
            )}
          </button>
          
          {/* Close */}
          <button 
            className={isWin11 ? 'win11-button' : 'win98-button'}
            style={isWin11 ? { width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' } : { width: 18, height: 18, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 2, fontWeight: 'bold' }}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Close"
            onMouseEnter={(e) => { if(isWin11) { e.currentTarget.style.backgroundColor = '#e81123'; e.currentTarget.style.color = 'white'; } }}
            onMouseLeave={(e) => { if(isWin11) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'inherit'; } }}
          >
            {isWin11 ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              "X"
            )}
          </button>
        </div>
      </div>
      <div 
        ref={contentRef}
        style={{ 
          flex: 1, 
          padding: isWin11 ? 16 : 8, 
          background: isWin11 ? 'rgba(255,255,255,0.4)' : 'var(--panel)', 
          overflow: 'auto',
          margin: isWin11 ? 0 : 2,
          display: 'flex',
          flexDirection: 'column',
          borderTop: isWin11 ? '1px solid rgba(255,255,255,0.3)' : 'none',
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  );
}
