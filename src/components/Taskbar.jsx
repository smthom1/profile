import React, { useState, useEffect } from 'react';
import { getIcon } from '../utils/icons';

export default function Taskbar({ openWindows, activeWindow, minimizedWindows, onToggleWindow, onMinimizeToggle, theme }) {
  const [time, setTime] = useState('');
  const [startOpen, setStartOpen] = useState(false);
  const isWin11 = theme === 'win11';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    };
    updateTime();
    const inv = setInterval(updateTime, 1000);
    return () => clearInterval(inv);
  }, []);

  return (
    <>
      <div
        className={isWin11 ? 'win11-taskbar' : 'win98-outset'}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: isWin11 ? 48 : 38,
          display: 'flex',
          alignItems: 'center',
          padding: '0 4px',
          zIndex: 10000,
          boxSizing: 'border-box',
          justifyContent: isWin11 ? 'center' : 'flex-start'
        }}
      >
        {isWin11 ? (
          // WIN11 Centered Dock
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              className="win11-button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 4,
                background: startOpen ? 'rgba(255,255,255,0.5)' : 'transparent',
              }}
              onClick={() => setStartOpen(!startOpen)}
            >
              <div style={{ width: 22, height: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                 <div style={{ background: '#00a4ef', borderRadius: 2 }}></div><div style={{ background: '#00a4ef', borderRadius: 2 }}></div>
                 <div style={{ background: '#00a4ef', borderRadius: 2 }}></div><div style={{ background: '#00a4ef', borderRadius: 2 }}></div>
              </div>
            </button>
            <div style={{ width: 1, height: 24, background: 'var(--w11-glass-border)' }} />
            {openWindows.map(win => {
              const isActive = activeWindow === win.id && !minimizedWindows[win.id];
              return (
                <button
                  key={win.id}
                  className="win11-button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    background: isActive ? 'rgba(255,255,255,0.6)' : 'transparent',
                    boxShadow: isActive ? 'inset 0 -2px 0 var(--w11-accent)' : 'none'
                  }}
                  onClick={() => onMinimizeToggle(win.id)}
                  title={win.title}
                >
                  <img src={getIcon(win.id, theme)} alt={win.title} style={{ width: 24, height: 24, objectFit: 'contain' }} />
                </button>
              );
            })}
          </div>
        ) : (
          // WIN98 Taskbar
          <>
            <button
              className="win98-button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 'bold',
                height: '28px',
                borderStyle: startOpen ? 'inset' : 'outset',
              }}
              onClick={() => setStartOpen(!startOpen)}
            >
              <img src={getIcon('start', theme)} alt="Start" style={{ width: 18 }} />
              Start
            </button>

            <div style={{ display: 'flex', gap: 4, marginLeft: 12, flex: 1, overflowX: 'hidden' }}>
              {openWindows.map(win => {
                const isActive = activeWindow === win.id && !minimizedWindows[win.id];
                return (
                  <button
                    key={win.id}
                    className="win98-button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      height: 28,
                      maxWidth: 160,
                      flex: 1,
                      fontWeight: isActive ? 'bold' : 'normal',
                      background: isActive ? 'repeating-linear-gradient(45deg, #DFDFDF, #DFDFDF 2px, #EAEAEA 2px, #EAEAEA 4px)' : 'var(--panel)',
                      borderTop: isActive ? '1px solid var(--bevel-darker)' : '1px solid var(--bevel-light)',
                      borderLeft: isActive ? '1px solid var(--bevel-darker)' : '1px solid var(--bevel-light)',
                      borderRight: isActive ? '1px solid var(--bevel-light)' : '1px solid var(--bevel-darker)',
                      borderBottom: isActive ? '1px solid var(--bevel-light)' : '1px solid var(--bevel-darker)',
                      boxShadow: isActive ? 'inset 1px 1px 0px var(--bevel-dark)' : 'inset -1px -1px 0px var(--bevel-dark), inset 1px 1px 0px #FFF',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis'
                    }}
                    onClick={() => onMinimizeToggle(win.id)}
                  >
                    <img src={getIcon(win.id, theme)} alt={win.title} style={{ width: 16, flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{win.title}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div
          className={isWin11 ? '' : 'win98-inset'}
          style={{
            height: isWin11 ? 40 : 28,
            padding: '0 8px',
            display: 'flex',
            alignItems: 'center',
            position: isWin11 ? 'fixed' : 'static',
            right: isWin11 ? 10 : 'auto',
            marginLeft: isWin11 ? 0 : 'auto',
            gap: 8,
            background: isWin11 ? 'rgba(255,255,255,0.2)' : 'transparent',
            borderRadius: isWin11 ? 4 : 0
          }}
        >
          <span style={{ fontSize: 13, fontWeight: isWin11 ? 500 : 'bold' }}>{time}</span>
        </div>
      </div>

      {startOpen && (
        <div
          className={isWin11 ? 'win11-window' : 'win98-outset'}
          style={{
            position: 'fixed',
            bottom: isWin11 ? 58 : 38,
            left: isWin11 ? '50%' : 0,
            transform: isWin11 ? 'translateX(-50%)' : 'none',
            width: isWin11 ? 320 : 240,
            zIndex: 10001,
            display: 'flex',
            flexDirection: isWin11 ? 'column' : 'row',
            padding: isWin11 ? 16 : 2,
            boxShadow: isWin11 ? '0 10px 40px rgba(0,0,0,0.2)' : 'none'
          }}
        >
          {!isWin11 && (
            <div style={{
              width: 32,
              background: 'linear-gradient(0deg, var(--title-left) 0%, var(--title-right) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              paddingBottom: 8,
              color: 'white',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: 'Tahoma, sans-serif',
              fontSize: 20,
              fontWeight: 'bold',
              letterSpacing: 2
            }}>
              Windows <span style={{ fontWeight: 'normal' }}>98</span>
            </div>
          )}
          
          <div style={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column' }}>
            {isWin11 && <div style={{ fontWeight: 600, marginBottom: 16, textAlign: 'center' }}>Pinned Apps</div>}
            {isWin11 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    {[
                      { id: 'projects' },
                      { id: 'skills' },
                      { id: 'resume' },
                      { id: 'minesweeper' },
                      { id: 'notepad' },
                      { id: 'about' }
                    ].map(({ id }) => (
                      <div
                        key={id}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
                        onClick={() => { onToggleWindow(id); setStartOpen(false); }}
                      >
                        <img src={getIcon(id, theme)} alt={id} style={{ width: 32, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                        <span style={{ fontSize: 12, textAlign: 'center' }}>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
                      </div>
                    ))}
                </div>
            ) : (
                [
                  { id: 'projects' },
                  { id: 'skills' },
                  { id: 'resume' },
                  { id: 'minesweeper' },
                  { id: 'notepad' },
                  { id: 'about' }
                ].map(({ id }) => (
                  <div
                    key={id}
                    style={{
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--title-left)'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; }}
                    onClick={() => {
                      onToggleWindow(id);
                      setStartOpen(false);
                    }}
                  >
                    <img src={getIcon(id, theme)} alt={id} style={{ width: 24 }} />
                    <span style={{ fontSize: 14 }}>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
                  </div>
                ))
            )}
            {!isWin11 && <div style={{ height: 1, width: '100%', background: 'var(--bevel-dark)', borderBottom: '1px solid white', margin: '4px 0' }} />}
            {isWin11 && <div style={{ height: 1, width: '100%', background: 'var(--w11-glass-border)', margin: '16px 0 8px 0' }} />}
            <div
               style={{ 
                 padding: isWin11 ? '8px' : '6px 12px', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: isWin11 ? 'center' : 'flex-start',
                 gap: 10, 
                 cursor: 'pointer',
                 borderRadius: isWin11 ? 4 : 0,
                 background: isWin11 ? 'rgba(0,0,0,0.05)' : 'transparent'
               }}
              onMouseEnter={(e) => { if(!isWin11) { e.currentTarget.style.backgroundColor = 'var(--title-left)'; e.currentTarget.style.color = 'white'; } else { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'; } }}
              onMouseLeave={(e) => { if(!isWin11) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; } else { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'; } }}
              onClick={() => {
                alert(isWin11 ? 'Shut down safely from Windows 11!' : 'It is now safe to turn off your computer.');
                setStartOpen(false);
              }}
            >
              <img src={getIcon('shutdown', theme)} alt="shut down" style={{ width: 24, filter: isWin11 ? 'grayscale(1)' : 'none' }} />
              <span style={{ fontSize: 14 }}>Shut Down...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
